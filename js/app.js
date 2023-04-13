const pb = new PocketBase("http://127.0.0.1:8090");

window.onload = () => {
  // console.log("Cargado DOM");

  // test();

  if (localStorage.getItem("products") == null) {
    // console.log("1er localstorage");
    createLocalStorage("b", "c");

    if( document.querySelector("#user_login")) {
      document.querySelector("#user_login").replaceWith(
        loggedUserComponent("club","assets/user_avatar/user_avatar.jpg","Maria Angeles Diaz" )
      );
      // const b_list = document.querySelector(".user_basket_list");
      // b_list.appendChild()
    }


  }
  pageNav();

  document.querySelector("nav").addEventListener("click", pageNav);

  document.querySelector("#login_cancel").addEventListener("click", () => {
    document.querySelector(".modal").style.display = "none";
  });

  if (document.querySelector("#user_login") != undefined) {
    document.querySelector("#user_login").addEventListener("click", (e) => {
      e.preventDefault();
      const uPanel = document.querySelector("#user_login_panel");

      if (uPanel.style.display === "none") {
        uPanel.style.display = "flex";
        document.querySelector("#user_login").classList.add("active");
      } else {
        uPanel.style.display = "none";
      }

      document
        .querySelector("#btn_user_register")
        .addEventListener("click", () => {
          window.location = "/register.html";
          registrationPage();
          console.log("register button");
        });

      document
        .querySelector("#btn_user_login")
        .addEventListener("click", () => {
          uPanel.style.display = "none";
          document.querySelector(".modal").style.display = "flex";
        });
      // console.log("display", uPanel.computedStyleMap().get("display").value );
    });

    document.addEventListener("mouseup", function (e) {
      const uPanel = document.querySelector("#user_login_panel");

      if (!uPanel.contains(e.target)) {
        uPanel.style.display = "none";
        document.querySelector("#user_login").classList.remove("active");
      }
    });
  }

  if (document.querySelector("#cart")) {
    document.querySelector("#cart").addEventListener("click", (e) => {
      e.preventDefault();

      const cart_checkout = document.querySelector(
        "#cart_product_list_checkout"
      );

      if (cart_checkout.style.display === "none") {
        document.querySelector("#cart").classList.add("active");
        cart_checkout.style.display = "flex";
      } else {
        cart_checkout.style.display = "none";
      }

      document.querySelector("#btn_checkout").addEventListener("click", () => {
        console.log("Checkout button");
      });
    });

    document.addEventListener("mouseup", function (e) {
      const cart_checkout = document.querySelector(
        "#cart_product_list_checkout"
      );

      if (!cart_checkout.contains(e.target)) {
        cart_checkout.style.display = "none";
        document.querySelector("#cart").classList.remove("active");
      }
    });
  }

  if (document.querySelector("#logged_user")) {
    document.querySelector("#logged_user").addEventListener("click", (e) => {
      e.preventDefault();

      const logged_user_panel = document.querySelector(
        "#logged_user_panel"
      );

      if (logged_user_panel.style.display === "none") {
        document.querySelector("#logged_user").classList.add("active");
        logged_user_panel.style.display = "flex";
      } else {
        logged_user_panel.style.display = "none";
      }

      document.querySelector("#btn_user_logout").addEventListener("click", () => {
        console.log("Logout button");
      });
    });

    document.addEventListener("mouseup", function (e) {
      const logged_user_panel = document.querySelector(
        "#logged_user_panel"
      );

      if (!logged_user_panel.contains(e.target)) {
        logged_user_panel.style.display = "none";
        document.querySelector("#logged_user").classList.remove("active");
      }
    });
  }
};

// const { range, filter, map } = rxjs;

// range(1, 200)
//   .pipe(
//     filter((x) => x % 2 === 1),
//     map((x) => x + x)
//   )
//   .subscribe((x) => console.log(x));

function pageNav(e, def = "supermercado") {
  e == undefined ? "" : e.preventDefault();

  switch (e == undefined ? def : e.target.id) {
    case "supermercado":
      // console.log(e.target);
      loading(true);

      if (e !== undefined) {
        navSelected(e.target.id);
      }
      removeGridProducts();

      setTimeout(() => {
        loading(false);
        loadingProducts("supermercado");
      }, 1000);

      // if(!e.target.classList.contains("active")) {
      //     e.target.classList.add("active");
      // } else {
      //     e.target.classList.remove("active");
      // }

      break;

    case "bodega":
      navSelected(e.target.id);
      removeGridProducts();
      loading(true);

      setTimeout(() => {
        loading(false);
        loadingProducts(e.target.id);
      }, 1000);

      break;

    case "moda":
      navSelected(e.target.id);
      removeGridProducts();
      loading(true);

      setTimeout(() => {
        loading(false);
        loadingProducts(e.target.id);
      }, 1000);
      break;

    case "tecnologia":
      navSelected(e.target.id);
      removeGridProducts();
      loading(true);

      setTimeout(() => {
        loading(false);
        loadingProducts(e.target.id);
      }, 1000);
      break;

    case "gaming":
      navSelected(e.target.id);
      removeGridProducts();
      loading(true);

      setTimeout(() => {
        loading(false);
        loadingProducts(e.target.id);
      }, 1000);
      break;

    case "hogar":
      navSelected(e.target.id);
      removeGridProducts();
      loading(true);

      setTimeout(() => {
        loading(false);
        loadingProducts(e.target.id);
      }, 1000);
      break;

    default:
      break;
  }
}

function navSelected(navItem) {
  const navItems = document.querySelectorAll(".nav_item");

  navItems.forEach((e) => {
    if (e.id == navItem) {
      e.classList.add("active");
      document.querySelector(".nav_title_banner h2").innerHTML = navItem;
      const imgSrc = document.querySelector(".nav_title_banner img").src;
      const newImgSrc = `${imgSrc.substring(
        0,
        imgSrc.lastIndexOf("/") + 1
      )}${navItem}.jpg`;

      document.querySelector(".nav_title_banner img").src = newImgSrc;
      // console.log("img", );
      // document.querySelector(".nav_title_banner img").src = navItem;
    } else {
      e.classList.remove("active");
    }
  });
}

function registrationPage() {}

function removeGridProducts() {
  const hasProdcuts = document.querySelector(".products_grid_section");

  if (hasProdcuts) {
    hasProdcuts.remove();
  }
}

async function loadingProducts(section) {
  const data = await getSectionProducts(section);
  const main = document.querySelector("main");
  const products_grid_section = document.createElement("div");
  products_grid_section.classList.add("products_grid_section");

  data.forEach((item) => {
    const card = productCard(item);
    products_grid_section.appendChild(card);
  });

  main.appendChild(products_grid_section);
  // console.log(data);
}

function productCard(data) {
  const producto = new Producto(
    data.title,
    data.price,
    data.img_url,
    data.off2x1,
    data.club,
    data.premium,
    data.category
  );

  let offerName = "";
  if (producto.club) {
    offerName = "club";
  } else if (offerName == "" && producto.premium) {
    offerName = "premium";
  } else if (offerName == "" && producto.off2x1) {
    offerName = "2x1";
  }

  // base product card
  const card = document.createElement("div");
  card.classList.add("card_product");

  /* ========================= START card_product_banner ========================== */

  if (offerName != "") {
    const card_product_banner = document.createElement("div");
    card_product_banner.classList.add(`card_product_banner_${offerName}`);
    const oferta = document.createElement("p");
    oferta.innerHTML = "Oferta";
    const tipoOferta = document.createElement("p");
    if (offerName == "2x1") {
      tipoOferta.innerHTML = "2x1 !";
    } else {
      tipoOferta.innerHTML = `Clientes ${offerName}`;
    }

    card_product_banner.appendChild(oferta);
    card_product_banner.appendChild(tipoOferta);
    card.appendChild(card_product_banner);
  }

  /* ========================= END card_product_banner ========================== */

  /* ========================= START card_img_and_info ========================== */

  // Card img and info BASE
  const card_img_info = document.createElement("div");
  card_img_info.classList.add("card_img_and_info");

  // Div product img
  const card_product_img = document.createElement("div");
  card_product_img.classList.add("card_product_img");

  // img
  const img = document.createElement("img");
  img.src = producto.img_url;

  // Agregamos img en el div Card img
  card_product_img.appendChild(img);

  // Div product info
  const card_product_info = document.createElement("div");
  card_product_info.classList.add("card_product_info");

  const p_card_product_info = document.createElement("p");
  p_card_product_info.innerHTML = producto.title;
  card_product_info.appendChild(p_card_product_info);

  //Agregamos card_product_img a card_img_info
  card_img_info.appendChild(card_product_img);

  //Agregamos card_product_info a card_img_info
  card_img_info.appendChild(card_product_info);

  //Agregamos card_img_and_info a card
  card.appendChild(card_img_info);

  /* ========================= END card_img_and_info ========================== */

  /* ========================= START card_product_price_and_buy ========================== */

  const card_product_price_and_buy = document.createElement("div");
  card_product_price_and_buy.classList.add("card_product_price_and_buy");

  //TODO: FALTA AGREGAR PRECIO ESPECIAL ACORDE A LA CATEGORIA

  let priceDiv;

  switch (offerName) {
    case "club":
      //Div card_product_price_club BASE
      const card_product_price_club = document.createElement("div");
      card_product_price_club.classList.add("card_product_price_club");

      //Precio original
      const clubCurrentPrice = document.createElement("p");
      clubCurrentPrice.innerHTML = producto.price.toFixed(2) + " €";

      //Agregamos el precio original al div BASE
      card_product_price_club.appendChild(clubCurrentPrice);

      //Div card_product_price_club_discount
      const card_product_price_club_discount = document.createElement("div");
      card_product_price_club_discount.classList.add(
        "card_product_price_club_discount"
      );

      //Descuento aplicado (Club)
      const clubDiscount = document.createElement("p");
      clubDiscount.innerHTML = "10% Off!";

      //Precio con descuento aplicado
      const clubdiscountPrice = document.createElement("p");
      clubdiscountPrice.innerHTML =
        (producto.price - producto.price * parseFloat(".10")).toFixed(2) + " €";

      //Agregamos los dos datos al div card_product_price_club_discount
      card_product_price_club_discount.appendChild(clubDiscount);
      card_product_price_club_discount.appendChild(clubdiscountPrice);

      //Agregamos el div card_product_price_club_discount al div BASE
      card_product_price_club.appendChild(card_product_price_club_discount);

      //Asignamos el elemento a la variable priceDiv para luego integrarlo
      priceDiv = card_product_price_club;

      break;
    case "premium":
      //Div card_product_price_club BASE
      const card_product_price_premium = document.createElement("div");
      card_product_price_premium.classList.add("card_product_price_premium");

      //Precio original
      const premiumCurrentPrice = document.createElement("p");
      premiumCurrentPrice.innerHTML = producto.price.toFixed(2) + " €";

      //Agregamos el precio original al div BASE
      card_product_price_premium.appendChild(premiumCurrentPrice);

      //Div card_product_price_premium_discount
      const card_product_price_premium_discount = document.createElement("div");
      card_product_price_premium_discount.classList.add(
        "card_product_price_premium_discount"
      );

      //Descuento aplicado (Premium)
      const premiumDiscount = document.createElement("p");
      premiumDiscount.innerHTML = "15% Off!";

      //Precio con descuento aplicado
      const premiumdiscountPrice = document.createElement("p");
      premiumdiscountPrice.innerHTML =
        (producto.price - producto.price * parseFloat(".15")).toFixed(2) + " €";

      //Agregamos los dos datos al div card_product_price_premium_discount
      card_product_price_premium_discount.appendChild(premiumDiscount);
      card_product_price_premium_discount.appendChild(premiumdiscountPrice);

      //Agregamos el div card_product_price_premium_discount al div BASE
      card_product_price_premium.appendChild(
        card_product_price_premium_discount
      );

      //Asignamos el elemento a la variable priceDiv para luego integrarlo
      priceDiv = card_product_price_premium;

      break;

    default:
      //Div card_product_price BASE
      const card_product_price = document.createElement("div");
      card_product_price.classList.add("card_product_price");

      const price = document.createElement("p");
      price.innerHTML = producto.price.toFixed(2) + " €";

      //Agregamos el precio al div card_product_price
      card_product_price.appendChild(price);

      priceDiv = card_product_price;
      break;
  }

  //Div card_product_buy
  const card_product_buy = document.createElement("div");
  card_product_buy.classList.add("card_product_buy");

  const p_agregar_carrito = document.createElement("p");
  p_agregar_carrito.innerHTML = "Agregar al carrito";

  const buy_button = document.createElement("button");
  buy_button.classList.add("btn_product_buy");

  //Agregamos el SVG dentro del boton
  buy_button.appendChild(svgCart());

  card_product_buy.appendChild(p_agregar_carrito);
  card_product_buy.appendChild(buy_button);

  // Agregamos card_product_price a card_product_price_and_buy

  // console.log(priceDiv);

  card_product_price_and_buy.appendChild(priceDiv);

  // Agregamos card_product_buy a card_product_price_and_buy
  card_product_price_and_buy.appendChild(card_product_buy);

  //Agregamos card_product_price_and_buy a card
  card.appendChild(card_product_price_and_buy);

  /* ========================= END card_product_price_and_buy ========================== */
  
  return card;
  // console.log("product Card", producto);
}




/* ========================= Components and icons SVG ========================== */



function loading(isLoad) {
  document.querySelector(".loader").style.display = isLoad ? "flex" : "none";
}


          /* ========= Logged User Component ========= */

function loggedUserComponent( category, imgUrl, userName) {

  const hasCategory = (category.length > 0);
  console.log(hasCategory);
  /**
   *  Base DIV
   **/
  const logged_user = document.createElement("div");
  logged_user.classList.add("logged_user");
  logged_user.id = "logged_user";

  /**
   *  Category Banner - Club - Premium 
   *  Se agrega si tiene perfil club o premium 
   **/

  const user_category_banner = document.createElement("div");
  if (hasCategory) {
    user_category_banner.classList.add("user_category_banner");
    const p_user_category_banner = document.createElement("p");
    p_user_category_banner.innerHTML = category;

    user_category_banner.appendChild(p_user_category_banner);

  }
  

  /**
   *  User img avatar
   */

  const img = document.createElement("img");
  img.src = imgUrl;

  /**
   *  User Name DIV
   */
  
  const logged_user_welcome = document.createElement("div");
  logged_user_welcome.classList.add("logged_user_welcome");

  const p_logged_user_welcome = document.createElement("p");
  p_logged_user_welcome.innerHTML = userName;

  logged_user_welcome.appendChild(p_logged_user_welcome);
  /**
   * Agregando componentes a logged_user
   */

  if(hasCategory){
    logged_user.appendChild(user_category_banner);
  }

  logged_user.appendChild(img);
  logged_user.appendChild(logged_user_welcome);
  logged_user.appendChild( svgChevronDown() );


  return logged_user;
}



function svgCart() {
  // Crea un nuevo elemento SVG
  const svgCart = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  svgCart.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgCart.setAttribute("width", "24");
  svgCart.setAttribute("height", "24");
  svgCart.setAttribute("viewBox", "0 0 24 24");
  svgCart.setAttribute("stroke-width", "2");
  svgCart.setAttribute("stroke", "#ffffff");
  svgCart.setAttribute("fill", "none");
  svgCart.setAttribute("stroke-linecap", "round");
  svgCart.setAttribute("stroke-linejoin", "round");

  // Agrega los elementos <path> al SVG
  svgCart.innerHTML = `
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
      <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
      <path d="M17 17h-11v-14h-2"></path>
      <path d="M6 5l6 .429m7.138 6.573l-.143 1h-13"></path>
      <path d="M15 6h6m-3 -3v6"></path>
  `;

  return svgCart;
}


function svgChevronDown(){
  const svgChevronDown = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );

  svgChevronDown.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgChevronDown.setAttribute("width", "16");
  svgChevronDown.setAttribute("height", "24");
  svgChevronDown.setAttribute("viewBox", "0 0 24 24");
  svgChevronDown.setAttribute("stroke-width", "3");
  svgChevronDown.setAttribute("stroke", "currentColor");
  svgChevronDown.setAttribute("fill", "none");
  svgChevronDown.setAttribute("stroke-linecap", "round");
  svgChevronDown.setAttribute("stroke-linejoin", "round");

  // Agrega los elementos <path> al SVG
  svgChevronDown.innerHTML = `
  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
  <path d="M6 9l6 6l6 -6"></path>
  `;

  return svgChevronDown;

}

// ================= JSON Database Area  =================

async function getSectionProducts(section) {
  let resp;

  await fetch("../config/products.json")
    .then((response) => response.json())
    .then((products) => {
      resp = products[section];
    });

  return resp;
}

// ================= Pocketbase Database Area  =================

async function test() {
  const authData = await pb
    .collection("users")
    .authWithPassword("test@test.com", "test1234");
  console.log("PocketBase", authData);
}
