from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer, pipeline
import torch

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

# Đường dẫn tới mô hình
model_path = "models/vit5_finetuned_QA"

# Load mô hình và tokenizer
tokenizer = AutoTokenizer.from_pretrained(model_path)
model = AutoModelForSeq2SeqLM.from_pretrained(model_path)

# Tạo pipeline với các tham số tối ưu
qa_pipeline = pipeline(
    "text2text-generation",
    model=model,
    tokenizer=tokenizer,
    max_length=128,  # Đặt giới hạn chiều dài của câu trả lời
    num_beams=5,     # Beam search để tăng chất lượng câu trả lời
    early_stopping=True  # Dừng sớm nếu đạt kết quả tốt nhất
)

# Định nghĩa input schema
class QuestionRequest(BaseModel):
    question: str

@app.post("/ask")
async def answer_question(request: QuestionRequest):
    # Sử dụng pipeline để sinh câu trả lời
    output = qa_pipeline(request.question)
    answer = output[0]["generated_text"]  # Lấy câu trả lời từ output
    return {"answer": answer}

# Chạy ứng dụng (sử dụng khi phát triển cục bộ)
# uvicorn app:app --host 0.0.0.0 --port 8000 --reload
