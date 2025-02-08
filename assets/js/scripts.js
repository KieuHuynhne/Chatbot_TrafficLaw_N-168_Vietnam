document.addEventListener("DOMContentLoaded", function () {
    const messageInput = document.querySelector("#messageInput");
    const sendButton = document.querySelector(".send_btn");
    const msgContainer = document.querySelector(".msg_card_body");
    const modelSelector = document.querySelector("#modelSelector"); // Dropdown

    const API_URL = "http://127.0.0.1:8000/ask"; // Đường dẫn API backend

    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (!messageText) return;

        // Lấy mô hình được chọn
        const selectedModel = modelSelector.value;

        // Hiển thị tin nhắn của người dùng
        appendMessage(messageText, "msg_cotainer_send");

        // Gửi tin nhắn đến backend
        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: messageText }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Hiển thị phản hồi từ chatbot
                const responseText = data.answer || "Xin lỗi, tôi không hiểu câu hỏi.";
                appendMessage(responseText, "msg_cotainer");
            })
            .catch((error) => {
                console.error("Error:", error);
                appendMessage("Đã xảy ra lỗi khi kết nối đến server.", "msg_cotainer");
            });

        // Xóa nội dung input
        messageInput.value = "";
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
