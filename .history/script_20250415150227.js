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
    steps: `
    1. Trộn đều bột gạo, bột chiên giòn, bột nghệ, nước lọc, nước cốt dừa và muối. Để nghỉ 15–20 phút.
    2. Ướp thịt và tôm với chút nước mắm, tiêu, tỏi.
    3. Làm nóng chảo, cho ít dầu, xào sơ nhân.
    4. Đổ bột vào chảo, xoay tròn cho mỏng, thêm nhân và giá đỗ.
    5. Đậy nắp 2–3 phút, gập đôi bánh, lấy ra đĩa.
    6. Ăn kèm rau sống và nước mắm chua ngọt.`,
  },
  Phở: {
    ingredients: `
- Xương bò
- Bánh phở tươi
- Thịt bò tái/lá lách/nạm
- Hành tây, hành lá
- Gia vị: quế, hồi, gừng nướng, nước mắm
    `,
    steps: `
    1. Ninh xương bò với gừng nướng, hành nướng và gia vị trong 3–4 tiếng.
    2. Trụng bánh phở qua nước sôi.
    3. Xếp bánh phở ra bát, thêm thịt bò, chan nước dùng.
    4. Ăn kèm rau thơm, chanh, ớt.`,
  },
  "Phở bò": {
    ingredients: `
      - Xương ống bò, bắp bò, giò heo
      - Sả cây, hành tây, gừng, thơm
      - Mắm ruốc Huế, ớt sa tế
      - Bún sợi to, rau sống ăn kèm
    `,
    steps: `
      - Hầm xương ống bò, bắp bò, giò heo cùng sả, hành tây, gừng và thơm để lấy nước dùng.
      - Nêm mắm ruốc Huế, ớt sa tế vào nước dùng cho đậm đà.
      - Trụng bún, xếp vào tô, thêm thịt và chan nước dùng lên. Ăn kèm rau sống.
`,
  },
  Lẩu: {
    ingredients: `
- Xương ống, cà chua, sả, chanh, riềng, dứa
- Sốt Tom Yum, nước cốt dừa, lá chanh
- Hải sản: mực, tôm, bề bề, ngao, thịt bò
 -Nấm, ngô ngọt, rau cải, rau cần
    `,
    steps: `
  - Hầm xương ống với cà chua, sả, riềng, dứa để làm nước dùng.
  - Thêm sốt Tom Yum, nước cốt dừa, lá chanh vào nước dùng.
  - Khi ăn, nhúng hải sản, nấm và rau vào nồi lẩu đang sôi.`,
  },
  "Nem rán": {
    ingredients: `
- Thịt nạc vai xay, tôm nõn, mộc nhĩ, nấm hương
- Miến, củ đậu, hành tây, su hào, cà rốt
- Trứng, hành khô, bánh đa nem
    `,
    steps: `
    - Trộn tất cả nguyên liệu với gia vị.
    - Gói nhân vào bánh đa nem, phết bia lên bề mặt bánh để khi rán giòn hơn.
    - Rán nem trong dầu nóng đến khi vàng giòn.`,
  },
  "Rau muống xào tỏi": {
    ingredients: `
  - Rau muống, tỏi băm, dầu ăn

  - Gia vị: hạt nêm, đường, bột ngọt, dầu hào
    `,
    steps: `
  - Phi thơm tỏi trong dầu nóng.
  - Cho rau muống vào xào trên lửa lớn, thêm chút nước lọc.
  - Nêm gia vị, xào đều tay đến khi rau chín.`,
  },
  "Thịt kho": {
    ingredients: `
- Thịt ba chỉ, hành tím, tỏi, ớt

- Gia vị: nước mắm, tiêu hạt, đường, muối, bột ngọt
    `,
    steps: `
- Ướp thịt với gia vị trong 15 phút.

- Phi thơm hành tỏi, cho thịt vào xào săn.

- Thêm nước, kho nhỏ lửa đến khi thịt mềm và nước sánh lại.`,
  },
  "Vịt quay": {
    ingredients: `
Vịt nguyên con, nước tương, muối, hạt nêm

Đường, dầu hào, ngũ vị hương
    `,
    steps: `
  Ướp vịt với hỗn hợp gia vị trong vài giờ.

Quay vịt trong lò hoặc trên than đến khi da vàng giòn.`,
  },
  Phở: {
    ingredients: `
- Xương bò
- Bánh phở tươi
- Thịt bò tái/lá lách/nạm
- Hành tây, hành lá
- Gia vị: quế, hồi, gừng nướng, nước mắm
    `,
    steps: `
    1. Ninh xương bò với gừng nướng, hành nướng và gia vị trong 3–4 tiếng.
    2. Trụng bánh phở qua nước sôi.
    3. Xếp bánh phở ra bát, thêm thịt bò, chan nước dùng.
    4. Ăn kèm rau thơm, chanh, ớt.`,
  },
  Phở: {
    ingredients: `
- Xương bò
- Bánh phở tươi
- Thịt bò tái/lá lách/nạm
- Hành tây, hành lá
- Gia vị: quế, hồi, gừng nướng, nước mắm
    `,
    steps: `
    1. Ninh xương bò với gừng nướng, hành nướng và gia vị trong 3–4 tiếng.
    2. Trụng bánh phở qua nước sôi.
    3. Xếp bánh phở ra bát, thêm thịt bò, chan nước dùng.
    4. Ăn kèm rau thơm, chanh, ớt.`,
  },
  Phở: {
    ingredients: `
- Xương bò
- Bánh phở tươi
- Thịt bò tái/lá lách/nạm
- Hành tây, hành lá
- Gia vị: quế, hồi, gừng nướng, nước mắm
    `,
    steps: `
    1. Ninh xương bò với gừng nướng, hành nướng và gia vị trong 3–4 tiếng.
    2. Trụng bánh phở qua nước sôi.
    3. Xếp bánh phở ra bát, thêm thịt bò, chan nước dùng.
    4. Ăn kèm rau thơm, chanh, ớt.`,
  },
  Phở: {
    ingredients: `
- Xương bò
- Bánh phở tươi
- Thịt bò tái/lá lách/nạm
- Hành tây, hành lá
- Gia vị: quế, hồi, gừng nướng, nước mắm
    `,
    steps: `
    1. Ninh xương bò với gừng nướng, hành nướng và gia vị trong 3–4 tiếng.
    2. Trụng bánh phở qua nước sôi.
    3. Xếp bánh phở ra bát, thêm thịt bò, chan nước dùng.
    4. Ăn kèm rau thơm, chanh, ớt.`,
  },
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
