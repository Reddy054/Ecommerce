const pro_table = document.getElementById("products-table");
const table = document.getElementById("table-cart");
const errorMsg = document.getElementById("error-msg");
const totalAmount = document.getElementById("total-amount");
const subTotalAmount = document.getElementById("sub-total-amount");

function eachCart(data) {
  const { _id, title, price, images } = data;
  const trElement = document.createElement("tr");
  table.appendChild(trElement);
  // image
  const tdElement1 = document.createElement("td");
  const imgElement = document.createElement("img");
  imgElement.src = images[0].url;
  imgElement.setAttribute("id", "cart-img");
  tdElement1.appendChild(imgElement);
  trElement.appendChild(tdElement1);

  //product title
  const tdElement2 = document.createElement("td");
  const pElement = document.createElement("p");
  pElement.textContent = title;
  pElement.setAttribute("id", "pname-cart");
  tdElement1.appendChild(pElement);
  trElement.appendChild(tdElement2);
  /// price
  const tdElement3 = document.createElement("td");
  tdElement3.textContent = "₹ " + price + ".00";
  trElement.appendChild(tdElement3);

  //  quantity
  const tdElement4 = document.createElement("td");
  const input = document.createElement("input");
  input.setAttribute("value", "1");
  input.setAttribute("type", "number");
  tdElement4.appendChild(input);
  trElement.appendChild(tdElement4);

  //  subtotal
  const tdElement5 = document.createElement("td");
  const subtotalEl = document.createElement("p");
  const strongEl = document.createElement("strong");
  strongEl.textContent = "₹ " + price + ".00";
  subtotalEl.appendChild(strongEl);
  tdElement5.appendChild(subtotalEl);
  trElement.appendChild(tdElement5);

  // remove
  const tdElement6 = document.createElement("td");

  tdElement6.onclick = function () {
    const cartProducts = JSON.parse(localStorage.getItem("cart"));
    const filteredData = cartProducts.filter((each) => each._id != _id);
    localStorage.setItem("cart", JSON.stringify(filteredData));
  };
  const aEl = document.createElement("a");
  aEl.setAttribute("href", "");
  const iCon = document.createElement("i");
  iCon.classList.add("bi-x-lg");
  iCon.classList.add("bi");

  aEl.appendChild(iCon);
  tdElement6.appendChild(aEl);
  trElement.appendChild(tdElement6);
}

const getCartProducts = () => {
  const cartProducts = JSON.parse(localStorage.getItem("cart"));
  if (cartProducts.length === 0) {
    pro_table.classList.add("d-none");
    errorMsg.classList.add("d-block");
    totalAmount.textContent = "₹ " + 0 + ".00";
    subTotalAmount.textContent = "₹ " + 0 + ".00";

    return;
  }
  errorMsg.classList.add("d-none");
  let total = 0;
  for (let index = 0; index < cartProducts.length; index++) {
    eachCart(cartProducts[index]);
    total += cartProducts[index].price;
  }
  totalAmount.textContent = "₹ " + total + ".00";
  subTotalAmount.textContent = "₹ " + total + ".00";
};
getCartProducts();
