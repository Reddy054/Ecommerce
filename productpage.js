const main_img = document.getElementById("mainimg");
const small_img = document.getElementById("small-img");
const brad_name = document.getElementById("bname");
const pro_name = document.getElementById("pro-title");
const cost = document.getElementById("pro-price");
const pro_details = document.getElementById("pro-description");

const small_images = document.getElementById("small-img-group");

const addToCartbtn = document.getElementById("addtocart");

function eachImage(img) {
  // div

  const divImg = document.createElement("div");
  divImg.classList.add("small-img-col");

  // image

  const smallImage = document.createElement("img");
  smallImage.src = img.url;
  smallImage.classList.add("small-img");
  smallImage.setAttribute("width", "100%");
  divImg.appendChild(smallImage);

  divImg.onclick = function () {
    main_img.src = img.url;
  };

  small_images.appendChild(divImg);
}

function setAllImages(images) {
  for (let index = 0; index < images.length; index++) {
    eachImage(images[index]);
  }
}

const getProductDetails = async () => {
  const product_id = JSON.parse(localStorage.getItem("product_details"));

  const url = "https://e-com-nr.herokuapp.com/product/" + product_id;
  const res = await fetch(url);
  const data = await res.json();

  const { brand, images, title, price } = data;

  main_img.src = images[0].url;
  brad_name.textContent = brand;
  pro_name.textContent = title;
  cost.textContent = "₹ " + price + ".00";

  setAllImages(images);

  addToCartbtn.onclick = function () {
    const cartProducts =
      JSON.parse(localStorage.getItem("cart")) === null
        ? []
        : JSON.parse(localStorage.getItem("cart"));

    const newProductArr = [...cartProducts, data];

    localStorage.setItem("cart", JSON.stringify(newProductArr));
  };
};

getProductDetails();
