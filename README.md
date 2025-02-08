
# Chatbot Luật Giao Thông

Ứng dụng chatbot hỏi đáp về luật giao thông, sử dụng các mô hình như T5, GPT-2 và PhoBERT để trả lời câu hỏi.

---

## **Cách cài đặt và sử dụng**

### **1. Cài đặt môi trường**
1. **Tạo môi trường ảo (venv):**
   ```bash
   python -m venv venv
   ```
2. **Kích hoạt môi trường ảo:**
   - **Windows**:
     ```bash
     .\venv\Scripts\activate
     ```
   - **macOS/Linux**:
     ```bash
     source venv/bin/activate
     ```

3. **Cài đặt các thư viện cần thiết từ file `requirements.txt`:**
   ```bash
   pip install -r requirements.txt
   ```

---

### **2. Chuẩn bị mô hình**
1. Tải các mô hình đã huấn luyện (`T5`, `GPT-2`, `PhoBERT`), giải nén và đặt vào thư mục `models`. Cấu trúc thư mục:
   ```
   models/
   ├── vit5_finetuned_QA/
   ├── gpt2_finetuned/
   └── phobert_finetuned/
   ```
   Link tải model: https://drive.google.com/drive/folders/1oGd39mldBDEmp3SFq022nTPhe8Yols_i?usp=sharing
   
2. Đảm bảo mỗi thư mục mô hình chứa đầy đủ các file như `config.json`, `pytorch_model.bin`, `tokenizer.json`, v.v.

---

### **3. Chạy Backend**
1. Khởi chạy server FastAPI:
   ```bash
   uvicorn app:app --host 0.0.0.0 --port 8000 --reload
   ```
2. Truy cập giao diện API tại [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) để kiểm tra các endpoint.

---

### **4. Chạy Frontend**
1. Mở file `index.html` trong trình duyệt.
2. Frontend sẽ giao tiếp với Backend thông qua API tại địa chỉ `http://127.0.0.1:8000`.

---

## **Chức năng**
- **Chọn mô hình:** Cho phép người dùng chọn giữa các mô hình T5, GPT-2, và PhoBERT để xử lý câu hỏi.
- **Gợi ý câu hỏi:** Cung cấp các nút gợi ý câu hỏi cho người dùng.
- **Lưu lịch sử chat:** Hiển thị lịch sử chat trong cùng một phiên.

---

## **Lưu ý**
- **Môi trường Python:** Ứng dụng yêu cầu Python 3.8 trở lên.
- **Cổng Backend:** Mặc định sử dụng cổng `8000`. Nếu bạn muốn thay đổi, chỉnh sửa tham số `--port` khi chạy lệnh `uvicorn`.
- **Yêu cầu thư viện:** Danh sách thư viện cần thiết nằm trong file `requirements.txt`.

---

## **Thư viện sử dụng**
- **FastAPI:** Framework xây dựng backend.
- **Uvicorn:** Server chạy ứng dụng FastAPI.
- **Transformers:** Xử lý và chạy các mô hình NLP từ Hugging Face.

---

## **Góp ý và liên hệ**
Nếu bạn gặp vấn đề hoặc cần hỗ trợ, hãy liên hệ qua email.
Email: knnhuynh03@gmail.com
---

Chúc bạn sử dụng chatbot thành công! 🚀
