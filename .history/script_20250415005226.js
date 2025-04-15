const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-box");
const searchButton = document.querySelector(".btn-search");
const foodItems = document.querySelectorAll(".food-item");

const message = document.createElement("p");
message.textContent = "Không tìm thấy công thức nào!";
message.style.color = "red";
message.style.fontSize = "20px";
message.style.display = "none";
message.style.textAlign = "center";
document.querySelector("main").appendChild(message); // Gắn vào main cho hợp lý

searchButton.addEventListener("click", (e) => {
    e.preventDefault(); // Chặn reload khi bấm Search

    const query = searchInput.value.trim().toLowerCase();
    let foundAny = false;

    for (let item of foodItems) {
        const name = item.querySelector(".food-name").textContent.toLowerCase();
        if (name.includes(query)) {
            item.style.display = "block";
            foundAny = true;
        } else {
            item.style.display = "none";
        }
    }

    message.style.display = foundAny ? "none" : "block";
});



// Xem công thức chi tiết
// lay tat ca cac nut xem cong thuc
const viewButtons = document.querySelectorAll(".btn-card");

// lấy tất phần tử modal, tiêu đề, nội dung công thức và nút đóng
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal-overlay");
const modalRecipe = document.querySelector(".modal");
const closeModal = document.querySelector(".modal-recipe");

// một oject chứa công thức món ăn tương ứng với tên món ăn
const recipes = {
    "Bánh xèo": "C1. Trộn bột gạo, nước cốt dừa...\n2. Đổ bột vào chảo...",
    "Bánh khọt": "1. Làm bột khọt...\n2. Chiên cho giòn...",
    "Phở": "1. Ninh xương bò...\n2. Trụng bánh phở...",
    // Thêm các công thức khác ở đây
}; 

viewButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
    }
)});


