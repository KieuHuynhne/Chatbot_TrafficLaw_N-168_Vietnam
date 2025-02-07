// $(document).ready(function(){
// 	$('#action_menu_btn').click(function(){
// 		$('.action_menu').toggle();
// 	});
// });

// document.addEventListener("DOMContentLoaded", function () {
//     const messageInput = document.getElementById("messageInput");
//     const msgContainer = document.querySelector(".msg_card_body");

//     const responses = {
//         "vượt đèn đỏ": "Bạn có thể bị phạt từ 4-5 triệu đồng.",
//         "rẽ phải đèn đỏ": "Nếu không có biển cấm, bạn có thể rẽ phải khi đèn đỏ.",
//         "xe ưu tiên": "Bạn có thể được miễn phạt nếu nhường đường cho xe ưu tiên đúng quy định."
//     };

//     function sendMessage() {
//         const messageText = messageInput.value.trim();
//         if (messageText === "") return;

//         // Thêm tin nhắn của người dùng vào giao diện
//         appendMessage(messageText, "msg_cotainer_send");

//         // Kiểm tra phản hồi tự động
//         let responseText = "Xin lỗi, tôi không hiểu câu hỏi của bạn.";
//         for (let key in responses) {
//             if (messageText.toLowerCase().includes(key)) {
//                 responseText = responses[key];
//                 break;
//             }
//         }

//         // Giả lập thời gian phản hồi sau 1 giây
//         setTimeout(() => {
//             appendMessage(responseText, "msg_cotainer");
//         }, 1000);

//         // Xóa nội dung input
//         messageInput.value = "";
//     }

//     function appendMessage(text, className) {
//         const messageDiv = document.createElement("div");
//         messageDiv.classList.add("d-flex", className === "msg_cotainer_send" ? "justify-content-end" : "justify-content-start", "mb-4");

//         const messageContent = document.createElement("div");
//         messageContent.classList.add(className);
//         messageContent.textContent = text;

//         messageDiv.appendChild(messageContent);
//         msgContainer.appendChild(messageDiv);

//         // Cuộn xuống tin nhắn mới nhất
//         msgContainer.scrollTop = msgContainer.scrollHeight;
//     }

//     // Gửi tin nhắn khi nhấn nút gửi
//     document.querySelector(".send_btn").addEventListener("click", sendMessage);

//     // Gửi tin nhắn khi nhấn Enter
//     messageInput.addEventListener("keypress", function (event) {
//         if (event.key === "Enter") {
//             sendMessage();
//             event.preventDefault();
//         }
//     });
// });

document.addEventListener("DOMContentLoaded", function () {
    const messageInput = document.querySelector(".type_msg");
    const sendButton = document.querySelector(".send_btn");
    const msgContainer = document.querySelector(".msg_card_body");

    // Danh sách phản hồi tự động
    const responses = {
        "vượt đèn đỏ": "Bạn có thể bị phạt từ 4-5 triệu đồng.",
        "rẽ phải đèn đỏ": "Nếu không có biển cấm, bạn có thể rẽ phải khi đèn đỏ.",
        "xe ưu tiên": "Bạn có thể được miễn phạt nếu nhường đường cho xe ưu tiên đúng quy định."
    };

    // Khởi động chat từ Local Storage
    function loadChatHistory() {
        const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
        chatHistory.forEach(msg => appendMessage(msg.text, msg.className));
    }

    function saveMessage(text, className) {
        let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
        chatHistory.push({ text, className });
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    }

    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText === "") return;

        // Thêm tin nhắn người dùng vào giao diện và lưu vào lịch sử
        appendMessage(messageText, "msg_cotainer_send");
        saveMessage(messageText, "msg_cotainer_send");

        // Kiểm tra phản hồi tự động
        let responseText = "Xin lỗi, tôi không hiểu câu hỏi của bạn.";
        for (let key in responses) {
            if (messageText.toLowerCase().includes(key)) {
                responseText = responses[key];
                break;
            }
        }

        // Giả lập thời gian phản hồi sau 1 giây
        setTimeout(() => {
            appendMessage(responseText, "msg_cotainer");
            saveMessage(responseText, "msg_cotainer");
        }, 1000);

        // Xóa nội dung input
        messageInput.value = "";
    }

    function appendMessage(text, className) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("d-flex", className === "msg_cotainer_send" ? "justify-content-end" : "justify-content-start", "mb-4");

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

    // Tải lịch sử khi mở trang
    loadChatHistory();
});
