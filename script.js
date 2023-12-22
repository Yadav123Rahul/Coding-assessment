// if user will come on this application , display shows the preRender data

function preRender() {
  fetch(
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const dataItems = data.categories;
      if (dataItems) {
        renderData(dataItems[0].category_products);
      }
    })
    .catch((err) => console.error(err));
}
// here I'm accessing all button's value from navbar

const element = document.getElementById("nav");
const buttons = element.getElementsByTagName("button");

// Button's variable have array data format so that we can easily iterate all buttons value

for (const button of buttons) {
  // Here adding eventlistener for each button

  button.addEventListener("click", function () {
    for (const btn of buttons) {
      btn.classList.remove("selected");
    }
    button.classList.add("selected");

    // Accessing a data from API

    fetch(
      "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const dataItems = data.categories;
        dataItems.forEach((category) => {
          if (category.category_name === button.value) {
            renderData(category.category_products);
          }
        });
      })
      .catch((err) => console.error(err));
  });
}

// Here I'm showing the data in dynamic format

function renderData(categories) {
  const mainCard = document.getElementById("main");
  mainCard.innerHTML = "";

  categories.forEach((category) => {
    const innerCard = document.createElement("div");
    // Check if badge_text is not null
    const badgeText =
      category.badge_text != null
        ? `<div class="badge_text">${category.badge_text}</div>`
        : "";

    innerCard.innerHTML = `<div class="card">${badgeText}<img src="${
      category.image
    }" alt="Card Image">
    <div class="title"><div class="title-ellips">${category.title}</div>
    <span class="vendor"><svg style="height: 10px; width:10px;" xmlns="http://www.w3.org/2000/svg" width="2" height="3" viewBox="0 0 2 3" fill="none">
        <circle cx="1" cy="1" r="1" fill="black"/>
        </svg>&nbsp;&nbsp;${category.vendor}</span></div>
    <div class="price">Rs ${category.price}.00 <span class="comp"><s>${
      category.compare_at_price
    }.00</s></span><span class="off">${calculatePercentOff(
      category.price,
      category.compare_at_price
    )}% off</span></div>
    <button class="button">Add to Cart</button></div>`;
    mainCard.appendChild(innerCard);
  });
}
//Here I'm writting an algorithm of calculate percentage

function calculatePercentOff(price, off) {
  const percentage = Math.round(((off - price) * 100) / off);
  return percentage;
}
