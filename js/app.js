const taxRate = 0.18;
const shippingPrice = 15;
const shippingFreePrice = 150;

window.addEventListener("load", () => {
  calculateTotalPrice();
  // ? set items to localStorage
  localStorage.setItem("taxRate", taxRate);
  localStorage.setItem("shippingPrice", shippingPrice);
  localStorage.setItem("shippingFreePrice", shippingFreePrice);

  // ? set items to sessionStorage
  sessionStorage.setItem("taxRate", taxRate);
  sessionStorage.setItem("shippingPrice", shippingPrice);
  sessionStorage.setItem("shippingFreePrice", shippingFreePrice);
});

const cartsSection = document.querySelector(".carts");
// ? Capturing vs. Bubbling
cartsSection.addEventListener("click", (e) => {
  if (e.target.className == "fa-solid minus fa-minus") {
    // console.log("minus btn is clicked!");

    if (
      e.target.parentElement.parentElement.querySelector(".number").innerText >
      1
    ) {
      e.target.parentElement.nextElementSibling.innerText--;
      calculateProductPrice(e.target);
      calculateTotalPrice();
    } else {
      if (
        confirm(
          `Are you sure you want remove ${
            e.target.parentElement.parentElement.parentElement.querySelector(
              "h2"
            ).innerText
          }`
        )
      ) {
        // remove
        // e.target.parentElement.parentElement.parentElement.parentElement.remove();

        // ! With closest() short way
        e.target.closest(".cart-item").remove();
        calculateTotalPrice();
      }
    }
  } else if (e.target.classList.contains("fa-plus")) {
    // console.log("plus btn is clicked!");

    e.target.parentElement.previousElementSibling.innerText++;
    calculateProductPrice(e.target);
    calculateTotalPrice();
  } else if (e.target.classList.contains("remove")) {
    // console.log("remove btn is clicked!");

    e.target.parentElement.parentElement.remove();
    calculateTotalPrice();
  } else {
    // console.log("other elements clicked!");
  }
});

const calculateProductPrice = (clickedBtn) => {
  const priceInfo = clickedBtn.parentElement.parentElement.parentElement;
  // console.log(priceInfo);

  const price = priceInfo.querySelector(".orange-span").innerText;

  const numberOfProduct = priceInfo.querySelector(".counter .number").innerText;

  const totalProductPrice = priceInfo.querySelector(".sp-total span ");

  totalProductPrice.innerText = (price * numberOfProduct).toFixed(2);
};

const calculateTotalPrice = () => {
  const totalProductPriceDivs = document.querySelectorAll(".sp-total span ");
  //! foreach ==> NodeList, Array
  //?const productsTotalPricesDivs = [...document.getElementsByClassName("product-line-price")];

  // ! Alternetive subtotal method

  // let subtotal = 0;
  // totalProductPriceDivs.forEach(
  //   (div) => (subtotal += parseFloat(div.innerText))
  // );

  //! alternative reduce method
  const subtotal = [...totalProductPriceDivs].reduce(
    (acc, price) => acc + Number(price.innerText),
    0
  );

  // console.log(subtotal);

  const taxPrice = subtotal * localStorage.getItem("taxRate");
  const shippingPrice = parseFloat(
    subtotal > 0 && subtotal < localStorage.getItem("shippingFreePrice")
      ? localStorage.getItem("shippingPrice")
      : 0
  );

  // console.log(shippingPrice);

  document.querySelector("#subtotal").innerText = subtotal.toFixed(2);

  document.getElementById("vat").innerText = taxPrice.toFixed(2);

  document.querySelector("#shipping").innerText = shippingPrice.toFixed(2);

  document.querySelector("#total-price").innerText = (
    subtotal +
    taxPrice +
    shippingPrice
  ).toFixed(2);
};
