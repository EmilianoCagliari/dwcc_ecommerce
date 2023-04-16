const clientData = [];
const CLUB_DISCOUNT = 10;
const PREMIUM_DISCOUNT = 15;

const pb = new PocketBase("http://127.0.0.1:8090");

window.onload = () => {
  // console.log("Cargado DOM");

  // test();

  document.querySelector("#login").addEventListener("click", loginUser);

  /**
   *   ======  CHECK IF USER IS LOGGED IN ========
   */

  const usrData = JSON.parse(checkLocalStorage("user_data"));
  // console.log(usrData);

  if (usrData != undefined) {
    // console.log("1er localstorage");

    const cart_item_quantity_value = document.querySelector(
      "#cart_item_quantity_value"
    );
    const cart = checkLocalStorage("cart");
    if (cart != null) {
      const objCart = JSON.parse(cart);
      // console.log(objCart);

      updateTotalPrice();

      if (objCart.length >= 10) {
        cart_item_quantity_value.setAttribute("x", "2");
      }
      cart_item_quantity_value.textContent = objCart.length;
    }

    if (document.querySelector("#user_login")) {
      document.querySelector("#user_login").replaceWith(
        loggedUserComponent(
          usrData[0]
          // (usrData[0].club) ? "club" : (usrData[0].premium) ? "premium" : "",
          // "assets/user_avatar/no-image.png",
          // usrData[0].nombreCompleto
        )
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
          document.querySelector(
            ".modal"
          ).style.top = `${window.top.scrollY}px`;
          document.querySelector(".modal").style.display = "flex";
          document.querySelector(".modal").style.zIndex = "300";
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

  /**
   *  ============= CART PRODUCTS CHECKOUT ==============
   */

  if (document.querySelector("#cart")) {
    document.querySelector("#cart").addEventListener("click", (e) => {
      e.preventDefault();

      /**
       *   CART CHECKOUT COMPONENT
       */

      cartCheckoutComponent();
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

      const logged_user_panel = document.querySelector("#logged_user_panel");

      if (logged_user_panel.style.display === "none") {
        document.querySelector("#logged_user").classList.add("active");
        logged_user_panel.style.display = "flex";
      } else {
        logged_user_panel.style.display = "none";
      }

      /**
       *    ========= LOG OUT USER ==========
       */
      document
        .querySelector("#btn_user_logout")
        .addEventListener("click", () => {
          deleteLocalStorage("user_data");

          if (checkLocalStorage("cart") != null) {
            deleteLocalStorage("cart");
          }
          location.reload();
          console.log("Logout button");
        });
    });

    document.addEventListener("mouseup", function (e) {
      const logged_user_panel = document.querySelector("#logged_user_panel");

      if (!logged_user_panel.contains(e.target)) {
        logged_user_panel.style.display = "none";
        document.querySelector("#logged_user").classList.remove("active");
      }
    });
  }
};

/**
 *   ============= HEADER FIXED ON SCROLLING ===============
 */

// Obtener el elemento del encabezado del navegador
var header = document.querySelector("header");

// Obtener la posición inicial del elemento del encabezado del navegador
var headerOffsetTop = 100;

// Función para fijar el encabezado del navegador cuando se hace scroll
function fixHeader() {
  if (window.pageYOffset >= headerOffsetTop) {
    // Si el scroll alcanza la posición inicial del encabezado
    // Se aplica la propiedad CSS 'position: fixed' para fijarlo en la parte superior
    // header.setAttribute("position", "fixed");
    // header.setAttribute("background-color", "#ffffff");
    // header.setAttribute("z-index", "20");
    // header.setAttribute("min-width", "1024px");
    // header.setAttribute("width", "80%");
    // header.setAttribute("top", "0");

    header.style.position = "fixed";
    header.style.backgroundColor = "#ffffff";
    header.style.zIndex = 20;
    header.style.minWidth = "1024px";
    header.style.width = "80%";
    header.style.top = "0";
  } else {
    // Si el scroll está por debajo de la posición inicial del encabezado
    // Se aplica la propiedad CSS 'position: static' para que el encabezado siga el flujo normal
    header.style.position = "static";
    header.style.removeProperty("backgroundColor");
    header.style.removeProperty("zIndex");
    header.style.removeProperty("minWidth");
    header.style.removeProperty("width");
    header.style.removeProperty("top");
  }
}

// Agregar un evento de scroll para llamar a la función fixHeader() cuando se hace scroll
window.addEventListener("scroll", fixHeader);

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
      clubDiscount.innerHTML = `${CLUB_DISCOUNT}% Off!`;

      //Precio con descuento aplicado
      const clubdiscountPrice = document.createElement("p");
      clubdiscountPrice.innerHTML =
        (
          producto.price -
          producto.price * parseFloat(`.${CLUB_DISCOUNT}`)
        ).toFixed(2) + " €";

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
      premiumDiscount.innerHTML = `${PREMIUM_DISCOUNT}% Off!`;

      //Precio con descuento aplicado
      const premiumdiscountPrice = document.createElement("p");
      premiumdiscountPrice.innerHTML =
        (
          producto.price -
          producto.price * parseFloat(`.${PREMIUM_DISCOUNT}`)
        ).toFixed(2) + " €";

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

  buy_button.addEventListener("click", () => {
    //Asignacion de ID por cantidad de articulos agregados al carrito

    const lsProd = JSON.parse(checkLocalStorage("cart"));
    const idx_local_prod = lsProd != undefined ? lsProd.length + 1 : 1;

    // console.log("idx_local_prod", idx_local_prod);
    producto.id = idx_local_prod;

    // SE agrega al carrito el producto con el ID asignado
    addToCart(producto);

    //Se actualiza el precio en los dos elementos
    updateTotalPrice();
  });

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

function loggedUserComponent(usrData) {
  const hasCategory = usrData.club || usrData.premium;
  // console.log(hasCategory);
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
    if (usrData.premium) {
      user_category_banner.style.backgroundColor = "#e74646";
    }
    const p_user_category_banner = document.createElement("p");
    p_user_category_banner.innerHTML = usrData.club
      ? "club"
      : usrData.premium
      ? "premium"
      : "";

    user_category_banner.appendChild(p_user_category_banner);
  }

  /**
   *  User img avatar
   */

  const img = document.createElement("img");
  img.src = "assets/user_avatar/no-image.png";

  /**
   *  User Name DIV
   */

  const logged_user_welcome = document.createElement("div");
  logged_user_welcome.classList.add("logged_user_welcome");

  const p_logged_user_welcome = document.createElement("p");
  p_logged_user_welcome.innerHTML = usrData.nombreCompleto;

  logged_user_welcome.appendChild(p_logged_user_welcome);
  /**
   * Agregando componentes a logged_user
   */

  if (hasCategory) {
    logged_user.appendChild(user_category_banner);
  }

  logged_user.appendChild(img);
  logged_user.appendChild(logged_user_welcome);
  logged_user.appendChild(svgChevronDown());

  return logged_user;
}

/**
 * ===================  SVG's =========================
 */

function svgCart() {
  // Crea un nuevo elemento SVG
  const svgCart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
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

function svgChevronDown() {
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

function svgTrash() {
  const svgTrash = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );

  svgTrash.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgTrash.setAttribute("width", "24");
  svgTrash.setAttribute("height", "24");
  svgTrash.setAttribute("viewBox", "0 0 24 24");
  svgTrash.setAttribute("stroke-width", "2");
  svgTrash.setAttribute("stroke", "currentColor");
  svgTrash.setAttribute("fill", "none");
  svgTrash.setAttribute("stroke-linecap", "round");
  svgTrash.setAttribute("stroke-linejoin", "round");
  svgTrash.setAttribute("pointerEvents", "none");

  svgTrash.innerHTML = `
    <path stroke="none" d="M0 0h24v24H0z"fill="none"></path>
    <path d="M4 7h16"></path>
    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
    <path d="M10 12l4 4m0 -4l-4 4"></path>
  `;

  return svgTrash;
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

async function loginUser() {
  const modal_card_main = document.querySelector(".modal_card_main");
  const error = document.createElement("small");

  const email = document.querySelector("#login_email");
  const password = document.querySelector("#login_password");

  console.log("email", email.value);
  console.log("password", password.value);

  email.value == ""
    ? (email.style.border = "2px solid red")
    : (email.style.border = "2px solid #574fB4");
  password.value == ""
    ? (password.style.border = "2px solid red")
    : (password.style.border = "2px solid #574fB4");

  if (email.value != "" && password != "") {
    const data = {
      identity: email.value,
      password: password.value,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    await fetch(
      "http://127.0.0.1:8090/api/collections/users/auth-with-password",
      options
    )
      .then((response) => response.json())
      .then((resp) => {
        console.log(resp);
        if (resp.code != undefined) {
          if (!document.querySelector("#errorMsg")) {
            error.innerHTML = resp.message;
            error.style.color = "red";
            error.id = "errorMsg";
            modal_card_main.appendChild(error);
          }
        } else {
          // "record": {
          //   "address": "Test 123, vigo",
          //   "birthday": "1989-02-02 00:00:00.000Z",
          //   "collectionId": "_pb_users_auth_",
          //   "collectionName": "users",
          //   "created": "2023-04-15 21:25:07.583Z",
          //   "dni": "123456789X",
          //   "email": "test@test.com",
          //   "emailVisibility": false,
          //   "family_members": 4,
          //   "full_name": "Test test test",
          //   "id": "jup010zh4ww5ehy",
          //   "loyalty_number": "2",
          //   "phone": 0,
          //   "updated": "2023-04-15 21:25:07.583Z",
          //   "username": "users21457",
          //   "verified": false
          // },

          const cliente = new Cliente(
            resp.record.full_name,
            resp.record.dni,
            resp.record.address,
            resp.record.phone,
            resp.record.birthday,
            resp.record.family_members,
            resp.record.loyalty_number,
            resp.record.club,
            resp.record.premium
          );

          clientData.push(cliente, resp.token);

          const created = createLocalStorage(
            "user_data",
            JSON.stringify(clientData)
          );
          if (created) {
            location.reload();
          }
          console.log("Error");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

/**
 * Funcion de agregar producto al carrito (crea en localstorage)
 * @param {*} producto
 */

function addToCart(producto) {
  // console.log( "PRODUCTO:", producto);

  // prod.price = updateCategoryPrice( producto );

  // console.log("PROD MODIF:", prod);
  let products = [];

  if (checkLocalStorage("user_data") != undefined) {
    /**
     * Modificacion de precio si el cliente es club o premium en localstorage
     * Se utiliza el OPERADOR SPREAD para modificar el atributo PRICE con el nuevo valor basado en
     * la categoria del cliente.
     */

    let prod = {
      ...producto,
      price: updateCategoryPrice(producto),
    };

    const hasProducts = checkLocalStorage("cart");
    if (hasProducts != undefined) {
      products = JSON.parse(hasProducts);
      products.push(prod);
    } else {
      products.push(prod);
      checkoutListTotalComponent();
    }

    animationCartQuantity(products.length);
    createLocalStorage("cart", JSON.stringify(products));

    // createLocalStorage(producto.title, JSON.stringify(producto));
  } else {
    document.querySelector(".modal").style.top = `${window.top.scrollY}px`;
    document.querySelector(".modal").style.display = "flex";
    document.querySelector(".modal").style.zIndex = "300";
    // console.log("NO INICIO SESION");
  }
}

function deleteToCart(prod) {
  const cartItems = JSON.parse(checkLocalStorage("cart"));

  // console.log(cartItems.length);

  cartItems.splice(
    cartItems.findIndex((localProd) => localProd.id === prod.id),
    1
  );

  // console.log("LocalProd_with_deleted Item", cartItems);
  animationCartQuantity(cartItems.length);
  createLocalStorage("cart", JSON.stringify(cartItems));
  updateTotalPrice();

  if (cartItems.length < 10) {
    const prodList = document.querySelector("#checkout_list_main");

    if (prodList.style.height != "") {
      prodList.style.removeProperty("height");
      prodList.style.overflowY = "hidden";
    }
  }

  if (checkLocalStorage("cart") != undefined && cartItems.length === 0) {
    deleteLocalStorage("cart");

    document.querySelector("#checkout_no_product_item").style.display = "block";

    document.querySelector("#checkout_list_total_price").remove();
    document.querySelector("#btn_checkout").style.display = "none";
    document
      .querySelector("#btn_checkout")
      .removeEventListener("click", checkOutProducts);
  }
  // console.log("deleteToCart:", prod);
}

// ================= SVG ANIMATION  =================

function animationCartQuantity(qty) {
  const cart_item_quantity = document.querySelector(".cart_item_quantity");
  const cart_item_quantity_value = document.querySelector(
    "#cart_item_quantity_value"
  );

  if (qty >= 10) {
    cart_item_quantity_value.setAttribute("x", "2");
  } else {
    cart_item_quantity_value.setAttribute("x", "6");
  }

  cart_item_quantity_value.textContent = qty;
  // Establecer el centro del rebote
  const centroX = 50;
  const centroY = 50;

  // Establecer los valores iniciales y finales para la animación
  const inicioY = 0;
  const alturaSalto = 10;
  const duracion = 1000; // duración de la animación en milisegundos

  const svgAction = [
    { transform: `translateY(${inicioY}px)` },
    { transform: `translateY(${inicioY - alturaSalto}px)` },
    { transform: `translateY(${inicioY}px)` },
  ];

  const svgTiming = {
    duration: 250,
    iterations: 3,
  };

  cart_item_quantity.animate(svgAction, svgTiming);
}

// ================= CART CHECKOUT COMPONENT  =================

function cartCheckoutComponent() {
  const cart_checkout = document.querySelector("#cart_product_list_checkout");

  const cartItems = JSON.parse(checkLocalStorage("cart"));

  if (cartItems != undefined) {
    const list_main = document.querySelector("#checkout_list_main");

    const no_item = document.querySelector("#checkout_no_product_item");
    no_item != undefined ? (no_item.style.display = "none") : "";

    const prod_items_show = document.querySelectorAll(".checkout_product_item");

    // console.log(prod_items_show.length);
    // console.log(cartItems.length);

    //Se agrega los articuos a la lista HTML si supera el Localhost de los que se encuentran ya visualizados
    if (cartItems.length > prod_items_show.length) {
      for (let i = prod_items_show.length; i < cartItems.length; i++) {
        const prod = cartItems[i];

        list_main.appendChild(productItem(prod));
      }

      const prodList = document.querySelector("#checkout_list_main");

      if (cartItems.length > 10) {
        prodList.style.height = "460px";
        prodList.style.overflowY = "scroll";
      } else {
        if (prodList.style.height != "") {
          prodList.style.removeProperty("height");
          prodList.style.removeProperty("overflowY");
        }
      }
    }

    //Suma de los articulos para mostrarlos en el precio total

    updateTotalPrice();

    checkoutListTotalComponent();
  } else {
    document.querySelector("#btn_checkout").style.display = "none";
  }

  if (cart_checkout.style.display === "none") {
    document.querySelector("#cart").classList.add("active");
    cart_checkout.style.display = "flex";
  } else {
    cart_checkout.style.display = "none";
  }

  document
    .querySelector("#btn_checkout")
    .addEventListener("click", checkOutProducts);
}

function checkoutListTotalComponent() {
  if (document.querySelector("#checkout_list_total_price") == undefined) {
    // checkout_list_total DIV de precio con articulos sumados
    const checkout_list_total_price = document.createElement("div");
    checkout_list_total_price.classList.add("checkout_list_total_price");
    checkout_list_total_price.id = "checkout_list_total_price";

    //Elementos total y precio sumado
    const p_checkout_list_total_price = document.createElement("p");
    p_checkout_list_total_price.innerHTML = "Total: ";

    const priceTotal_checkout_list_total_price = document.createElement("p");
    priceTotal_checkout_list_total_price.id =
      "priceTotal_checkout_list_total_price";

    //Agregamos los elementos al div base creado checkout_list_total_price
    checkout_list_total_price.appendChild(p_checkout_list_total_price);
    checkout_list_total_price.appendChild(priceTotal_checkout_list_total_price);

    //Agregamos el div nuevo con el total al div padre "checkout_list_total"
    document
      .querySelector("#checkout_list_total")
      .appendChild(checkout_list_total_price);

    updateTotalPrice();
  } else {
    updateTotalPrice();
  }

  document.querySelector("#btn_checkout").style.display = "block";
}

function productItem(prod) {
  //  Creacion de DIV de producto BASE
  const checkout_product_item = document.createElement("div");
  checkout_product_item.classList.add("checkout_product_item");

  // Creacion de los elementos a mostrar
  const prod_img = document.createElement("img");
  prod_img.src = prod.img_url;

  const prod_title = document.createElement("p");
  prod_title.innerHTML = prod.title;

  const prod_price = document.createElement("p");
  prod_price.innerHTML = prod.price + " €";

  // Creacion de boton para eliminar el articulo agregado
  const prod_delete_btn = document.createElement("button");
  prod_delete_btn.classList.add("btn_product_delete");
  prod_delete_btn.appendChild(svgTrash());

  prod_delete_btn.addEventListener("click", (e) => {
    e.target.parentNode.remove();
    deleteToCart(prod);
  });

  //Agregamos todos los elementos al DIV BASE
  checkout_product_item.appendChild(prod_img);
  checkout_product_item.appendChild(prod_title);
  checkout_product_item.appendChild(prod_price);
  checkout_product_item.appendChild(prod_delete_btn);

  return checkout_product_item;
}

// ================= UPDATE TOTAL CART PRICE FUNCTION =================

function updateCategoryPrice(prod) {
  let newPrice = parseFloat(prod.price).toFixed(2);
  const userData = JSON.parse(checkLocalStorage("user_data"));

  if (userData[0].club && prod.club) {
    newPrice = (
      prod.price -
      prod.price * parseFloat(`.${CLUB_DISCOUNT}`)
    ).toFixed(2);
  }

  if (userData[0].premium && prod.premium) {
    newPrice = (
      prod.price -
      prod.price * parseFloat(`.${PREMIUM_DISCOUNT}`)
    ).toFixed(2);
  }

  return newPrice;
}

function updateTotalPrice() {
  const cart_total_nav = document.querySelector("#cart_total_nav");
  const priceTotal_checkout_list_total_price = document.querySelector(
    "#priceTotal_checkout_list_total_price"
  );

  const cartItems = JSON.parse(checkLocalStorage("cart"));
  let total = 0;

  if (cartItems != undefined) {
    total = cartItems.reduce((sumaTotal, prod) => {
      return sumaTotal + parseFloat(prod["price"]);
    }, 0);

    cart_total_nav.innerHTML = `${total.toFixed(2)} €`;

    if (priceTotal_checkout_list_total_price != undefined) {
      priceTotal_checkout_list_total_price.innerHTML = `${total.toFixed(2)} €`;
    }
  }
}

function checkOutProducts() {
  console.log("Checkout Button");
}

// ================= Pocketbase Database Area  =================

async function pocketBaseLogin(user, pass) {
  // try {
  //   const authData = await pb.collection("users").authWithPassword(user, pass);
  //   console.log("PocketBase", authData);
  //   return true;
  // } catch (error) {
  //   console.log(error);
  //   return false;
  // }
}
