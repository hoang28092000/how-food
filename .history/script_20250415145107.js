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
// Lấy tất cả các nút "Xem công thức"
const viewButtons = document.querySelectorAll(".btn-card");

// Lấy phần modal (popup), tiêu đề, nội dung công thức và nút đóng
const modal = document.querySelector(".modal-overlay");
const modalTitle = document.querySelector(".modal-title");
const modalRecipe = document.querySelector(".modal-recipe");
const closeModal = document.querySelector(".close-modal");

// Một object chứa công thức món ăn tương ứng với tên món
const recipes = {
  "Bánh Xèo": {
    ingredients: `
- 200g bột gạo
- 50g bột chiên giòn
- 300ml nước lọc
- 100ml nước cốt dừa
- 1/2 muỗng cà phê muối
- 1/2 muỗng cà phê bột nghệ
- 100g thịt ba chỉ
- 100g tôm
- 100g giá đỗ
- Rau sống, nước mắm chua ngọt
    `,
    
  },
  "Bánh khọt": "1. Làm bột khọt...\n2. Chiên cho giòn...",
  Phở: "1. Ninh xương bò...\n2. Trụng bánh phở...",
};

// Lặp qua tất cả các nút "Xem công thức"
viewButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault(); // Ngăn trình duyệt chuyển hướng (vì là thẻ <a>)

    // Tìm phần tử cha gần nhất có class "food-item"
    const item = button.closest(".food-item");

    // Lấy tên món ăn từ trong phần tử đó (thẻ h3)
    const name = item.querySelector(".food-name").textContent.trim();

    // Đặt tiêu đề của popup là tên món ăn
    modalTitle.textContent = name;

    // Hiển thị công thức từ object "recipes", nếu chưa có thì báo chưa có công thức
    modalRecipe.textContent = recipes[name] || "Chưa có công thức chi tiết.";

    // Hiện popup bằng cách bỏ class "hidden"
    modal.classList.remove("hidden");
  });
});

// Gắn sự kiện click vào nút đóng (dấu ×)
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden"); // Ẩn popup bằng cách thêm lại class "hidden"
});

// Nếu người dùng click ra ngoài vùng modal-content thì cũng ẩn popup
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});
