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
document.body.appendChild(message);

searchButton.addEventListener("click", (e )=> {
    const query = searchInput.value.trim();
    let foundAny = false;

    for(let group of listFood){
        let foundInGroup = false;
        const products = group.querySelectorAll(".food-item");

        for(let product of products){
            const name = product.querySelector(".product-name").textContent.toLowerCase();
            if(name.includes(query)){
                product.classList.remove("hidden");
                product.classList.add("show");
                foundInGroup = true;
                foundAny = true;
            }else{
                product.classList.add("show");
                product.classList.remove("hidden");
            }
        }
        group.style.display = foundInGroup ? "block" : "none";
    }
    message.style.display = foundAny ? "none" : "block";
});