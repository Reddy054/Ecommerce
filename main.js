
// NAV BAR HAMBERGER MENU
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const menu = document.getElementById('navmenu');

if (bar) {
    bar.addEventListener('click', () => {
        menu.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        menu.classList.remove('active');
    })
} 




const productContainer = document.getElementById("featured-products");

const new_arrivals = document.getElementById("new-arrivals");



function eachProduct(data, element){
    const { _id, brand, images, title, price} = data;
    const product_id = _id
    const pro = document.createElement("div");
    pro.setAttribute("id", product_id);
    pro.classList.add("pro");
    pro.onclick = function() {
        localStorage.setItem("product_details", JSON.stringify(product_id));
        window.location.href = "productpage.html"
    }
    productContainer.appendChild(pro);
    

    // Image
    const pro_img = document.createElement("img");
    pro_img.src = images[0].url;
    pro.appendChild(pro_img);

// div description
    const pro_description = document.createElement("div");
    pro_description.classList.add("description");
    pro.appendChild(pro_description);

// brand name
    const brandName = document.createElement("span");
    brandName.textContent = brand;
    pro_description.appendChild(brandName);

// title
const pro_title = document.createElement("h5");
pro_title.textContent = title;
pro_description.appendChild(pro_title);

// rating
const ratingContainer = document.createElement("div");
ratingContainer.classList.add("star");

for (let index = 0; index < 5; index++){
    const ratingStar = document.createElement("i");
    ratingStar.classList.add("bi-star-fill");
    ratingContainer.appendChild(ratingStar);
}

pro_description.appendChild(ratingContainer)


// price

const pro_price = document.createElement("h4");
pro_price.textContent = price;
pro_description.appendChild(pro_price);


element.appendChild(pro);

}

function getAllProducts(data, element){
    for (let index = 0; index <data.length; index++){
        eachProduct(data[index], element);
    }
}

const getProducts = async() => {
    const url = 'https://gangadhar.cyclic.app/products'
    const res = await fetch(url)
    const data = await res.json()


    const old = data.slice(0, 8)
    const latest = data.slice(8, 16)

    getAllProducts(old ,productContainer);
    getAllProducts(latest ,new_arrivals);

}
getProducts()


