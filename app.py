from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
import torch

# Tạo ứng dụng FastAPI
app = FastAPI()

# Đường dẫn tới mô hình
model_path = "models/vit5_finetuned"

# Load mô hình và tokenizer
tokenizer = AutoTokenizer.from_pretrained(model_path)
model = AutoModelForSeq2SeqLM.from_pretrained(model_path)

# Định nghĩa input schema
class QuestionRequest(BaseModel):
    question: str

# Endpoint để nhận câu hỏi và trả lời
@app.post("/ask")
async def answer_question(request: QuestionRequest):
    inputs = tokenizer(request.question, return_tensors="pt", truncation=True, padding=True)
    outputs = model.generate(**inputs)
    answer = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"answer": answer}

# Chạy ứng dụng (sử dụng khi phát triển cục bộ)
# uvicorn app:app --host 0.0.0.0 --port 8000 --reload
