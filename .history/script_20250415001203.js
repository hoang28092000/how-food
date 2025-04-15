const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-box");
const searchButton = document.querySelector(".btn-search");
const listFood = document.querySelector(".list-food");

const message = document.createElement("p");
message.textContent = "Không tìm thấy công thức nào!";
message.style.color = "red";
message.style.fontSize = "20px";
message.style.display = "none";
message.style.textAlign = "center";
