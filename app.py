from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoModelForSeq2SeqLM, AutoModelForCausalLM, AutoTokenizer, pipeline
import torch
import sentencepiece


# Tạo ứng dụng FastAPI
app = FastAPI()

# Cấu hình CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cho phép tất cả các nguồn, bạn có thể chỉ định ["http://127.0.0.1:5500"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Đường dẫn tới các mô hình
models = {
    "t5": "models/vit5_finetuned_QA",
    "gpt2": "models/gpt2_finetuned_vi",
    "bartpho": "models/bartpho-qa"
}
from transformers import AutoTokenizer

# Tải tokenizer nếu chưa có trong checkpoint Bartpho
import os
bartpho_checkpoint = "models/bartpho-qa/checkpoint-1194"
if not os.path.exists(os.path.join(bartpho_checkpoint, "tokenizer.json")):
    print("🔹 Không tìm thấy tokenizer cho Bartpho, đang tải lại từ Hugging Face...")
    tokenizer = AutoTokenizer.from_pretrained("vinai/bartpho-word")
    tokenizer.save_pretrained(bartpho_checkpoint)
    print("✅ Đã tải và lưu tokenizer vào checkpoint")


# Cache các pipeline đã tải
loaded_pipelines = {}

def load_pipeline(model_name):
    """
    Hàm tải pipeline cho mô hình tương ứng.
    """
    if model_name not in loaded_pipelines:
        if model_name not in models:
            raise ValueError(f"Model {model_name} không được hỗ trợ.")
        
        tokenizer = AutoTokenizer.from_pretrained(models[model_name])

        # Kiểm tra loại mô hình để tải đúng class
        if model_name == "t5" or model_name == "bartpho":  # Mô hình Seq2Seq như T5
            model = AutoModelForSeq2SeqLM.from_pretrained(models[model_name])
            loaded_pipelines[model_name] = pipeline(
                "text2text-generation",
                model=model,
                tokenizer=tokenizer,
                max_length=128,
                num_beams=5,
                early_stopping=True,
            )
        elif model_name == "gpt2":  # Mô hình causal như GPT-2
            model = AutoModelForCausalLM.from_pretrained(models[model_name])
            loaded_pipelines[model_name] = pipeline(
                "text-generation",
                model=model,
                tokenizer=tokenizer,
                max_length=128,
                num_return_sequences=1,
            )
        else:
            raise ValueError(f"Model {model_name} không được hỗ trợ.")
    
    return loaded_pipelines[model_name]

# Định nghĩa input schema
class QuestionRequest(BaseModel):
    question: str
    model: str  

@app.post("/ask")
async def answer_question(request: QuestionRequest):
    """
    Endpoint nhận câu hỏi và mô hình để sinh câu trả lời.
    """
    # Load pipeline cho mô hình được chọn
    qa_pipeline = load_pipeline(request.model)
    
    if request.model == "gpt2":
        # GPT-2 sinh output khác với Seq2Seq
        output = qa_pipeline(request.question, max_length=128, num_return_sequences=1)
        answer = output[0]["generated_text"]
    else:
        # T5 hoặc mô hình Seq2Seq khác
        output = qa_pipeline(request.question)
        answer = output[0]["generated_text"]
    
    return {"answer": answer}