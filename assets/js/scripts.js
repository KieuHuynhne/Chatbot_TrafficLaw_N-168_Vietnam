
document.addEventListener("DOMContentLoaded", function () {
    const messageInput = document.querySelector("#messageInput");
    const sendButton = document.querySelector(".send_btn");
    const msgContainer = document.querySelector(".msg_card_body");
    const modelSelector = document.querySelector("#modelSelector"); // Dropdown
    const suggestions = document.querySelector(".suggestions");

    const API_URL = "http://127.0.0.1:8000/ask"; // Đường dẫn API backend

    // Thêm sự kiện cho các nút gợi ý
    const suggestionButtons = document.querySelectorAll(".suggestion-btn");
    suggestionButtons.forEach(button => {
        button.addEventListener("click", function () {
            const question = this.getAttribute("data-question");
            messageInput.value = question; // Đưa gợi ý vào input
            sendMessage(); // Gửi luôn câu hỏi
            suggestions.style.display = "none"; // Ẩn nút gợi ý sau khi nhấn
        });
    });

    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (!messageText) return;

        // Lấy mô hình được chọn
        const selectedModel = modelSelector.value;

        // Hiển thị tin nhắn của người dùng
        appendMessage(messageText, "msg_cotainer_send");

        // Gửi đến backend
        fetch("http://127.0.0.1:8000/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: messageText, model: selectedModel }),
        })
            .then((response) => response.json())
            .then((data) => {
                appendMessage(data.answer || "Không có phản hồi.", "msg_cotainer");
            })
            .catch((error) => {
                console.error("Error:", error);
                appendMessage("Lỗi kết nối đến server.", "msg_cotainer");
            });

        // Xóa nội dung input
        messageInput.value = "";
        // Ẩn nút gợi ý sau khi gửi tin nhắn
        suggestions.style.display = "none";
    }

    function appendMessage(text, className) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add(
            "d-flex",
            className === "msg_cotainer_send" ? "justify-content-end" : "justify-content-start",
            "mb-4"
        );

        const messageContent = document.createElement("div");
        messageContent.classList.add(className);
        messageContent.textContent = text;

        messageDiv.appendChild(messageContent);
        msgContainer.appendChild(messageDiv);

        // Cuộn xuống tin nhắn mới nhất
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }

    // Gửi tin nhắn khi nhấn nút gửi
    sendButton.addEventListener("click", sendMessage);

    // Gửi tin nhắn khi nhấn Enter
    messageInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
            event.preventDefault();
        }
    });
});


// document.addEventListener("DOMContentLoaded", function () {
//     const messageInput = document.querySelector("#messageInput");
//     const sendButton = document.querySelector(".send_btn");
//     const msgContainer = document.querySelector(".msg_card_body");

//     const API_URL = "http://127.0.0.1:8000/ask"; // Đường dẫn API backend

//     function appendMessage(text, className) {
//         const messageDiv = document.createElement("div");
//         messageDiv.classList.add(
//             "d-flex",
//             className === "msg_cotainer_send" ? "justify-content-end" : "justify-content-start",
//             "mb-4"
//         );

//         const messageContent = document.createElement("div");
//         messageContent.classList.add(className);
//         messageContent.textContent = text;

//         messageDiv.appendChild(messageContent);
//         msgContainer.appendChild(messageDiv);

//         // Cuộn xuống tin nhắn mới nhất
//         msgContainer.scrollTop = msgContainer.scrollHeight;
//     }

//     function sendMessage() {
//         const messageText = messageInput.value.trim();
//         if (!messageText) return;

//         // Hiển thị tin nhắn người dùng
//         appendMessage(messageText, "msg_cotainer_send");

//         // Phản hồi tự động (dữ liệu mẫu)
//         setTimeout(() => {
//             appendMessage("Đây là phản hồi từ chatbot của bạn.", "msg_cotainer");
//         }, 1000);

//         // Xóa nội dung input
//         messageInput.value = "";
//     }

//     // Gửi tin nhắn khi nhấn nút gửi
//     sendButton.addEventListener("click", sendMessage);

//     // Gửi tin nhắn khi nhấn Enter
//     messageInput.addEventListener("keypress", function (event) {
//         if (event.key === "Enter") {
//             sendMessage();
//             event.preventDefault();
//         }
//     });
// });
