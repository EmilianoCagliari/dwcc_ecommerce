const PASSWORD_DO_NOT_MATCH =
  "Las contraseñas no son iguales, verifique nuevamente.";

window.onload = () =>  {
  document.querySelector(".nav_title_banner h2").style.fontWeight = 400;
  document.querySelectorAll(".nav_list");

  document.addEventListener("submit", async(e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    // console.log(data);
    if (!loadWarnings()) {
      console.log("Errores");
    } else {
      if (document.querySelector("small")) {
        const pass = document.querySelector("#password");
        const passwordConfirm = document.querySelector("#passwordConfirm");
        pass.style.border = "2px solid #574fB4";
        passwordConfirm.style.border = "2px solid #574fB4";
        document.querySelector("small").remove();
      }

      try {
        const resp = await registerUser(data);
        console.log(resp);

        document.body.appendChild(successMsg("¡El registro se ha realizado correctamente!", true));
        setTimeout(() => {
          document.querySelector(".modal").remove();
          location.replace("/");
        }, 2000);


      } catch (error) {
        console.log("tryCatch Error:", error);
        document.body.appendChild(successMsg("Error al crear el usuario", false));

        setTimeout(() => {
          document.querySelector(".modal").remove();
        }, 2000);
      }
    }
  });
};

function loadWarnings() {
  const inputs = document.querySelectorAll(".input");
  const pass = document.querySelector("#password");
  const passwordConfirm = document.querySelector("#passwordConfirm");
  // console.log(inputs);
  // console.log(inputs);

  const isMatchPassword = pass.value == passwordConfirm.value;

  if (!isMatchPassword) {
    const passLabel = document.querySelector("label[for=password]");
    if (!document.querySelector("#errorMsg")) {
      pass.style.border = "2px solid red";
      passwordConfirm.style.border = "2px solid red";
      errorMsg(passLabel, PASSWORD_DO_NOT_MATCH);
    }
  }

  console.log("Contraseña Correcta?:", isMatchPassword);
  return isMatchPassword;
}

function errorMsg(element, msg) {
  const small = document.createElement("small");
  small.style.width = "57%";
  small.style.display = "flex";
  small.style.alignItems = "center";
  small.style.alignSelf = "end";
  small.id = "errorMsg";
  small.innerHTML = msg;
  small.style.color = "red";
  element.parentNode.insertBefore(small, element);
}

function successMsg(msg, status) {

    

  // div BASE
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.style.display = "flex";
  modal.style.top = `${window.top.scrollY}px`;

  const modal_card = document.createElement("div");
  modal_card.classList.add("modal_card");

  const h1 = document.createElement("h1");
  h1.innerHTML = msg;
  h1.style.textAlign = "center";

  modal_card.appendChild( svgSuccess(status) );
  modal_card.appendChild(h1);
  modal.appendChild(modal_card);

  return modal;
}

function svgSuccess(status) {
  const svgSuccess = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );

  svgSuccess.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svgSuccess.setAttribute("width", "120");
  svgSuccess.setAttribute("height", "120");
  svgSuccess.setAttribute("viewBox", "0 0 24 24");
  svgSuccess.setAttribute("stroke-width", "2");
  svgSuccess.setAttribute("stroke", status ? "#29a567" : "#E74646");
  svgSuccess.setAttribute("fill", "none");
  svgSuccess.setAttribute("stroke-linecap", "round");
  svgSuccess.setAttribute("stroke-linejoin", "round");

  svgSuccess.innerHTML = `
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M20.925 13.163a8.998 8.998 0 0 0 -8.925 -10.163a9 9 0 0 0 0 18"></path>
    <path d="M9 10h.01"></path>
    <path d="M15 10h.01"></path>
    <path d="M9.5 15c.658 .64 1.56 1 2.5 1s1.842 -.36 2.5 -1"></path>
    <path d="M15 19l2 2l4 -4"></path>
  `;

  svgSuccess.classList.add("animate__animated", "animate__backInDown");
  return svgSuccess;
}

/* ========================= POCKETBASE ======================== */

async function registerUser(userData) {
  const pb = new PocketBase("http://127.0.0.1:8090");

  const record = await pb.collection("users").create( JSON.stringify(userData));

  
  return record;

  // let schemaDb = {
  //   "full_name": userData.full_name,
  //   "email": userData.email,
  //   "dni": userData.dni,
  //   "address": userData.address,
  //   "phone": userData.phone,
  //   "birthday": userData.birthday,
  //   "family_members": userData.family_members,
  //   "loyalty_number": userData.loyalty_number,
  //   "password": userData.password,
  //   "passwordConfirm": userData.passwordConfirm
  // };

  // console.log("datos:", schemaDb);

  // let resp = [];

  // const options = {
  //   method: 'POST',
  //   body: JSON.stringify(schemaDb)
  // };

  // fetch('http://127.0.0.1:8090/api/collections/users/records', options)
  //   .then((response) => response.json())
  //   .then((response) => {
  //     console.log("response", response);
  //     if(response.code != 200) {
  //       let resp = [];
  //       resp.push(resp.message);
  //       resp.push(false);
  //       return resp;
  //     } else {
  //       resp.push("¡El registro se ha realizado correctamente!", true);
  //       return;
  //     }
  //     // console.log(response);
  //   })
  //   .catch(err => console.error(err.status));

  /*
   
   // example create data
    const data = {
      "username": "test_username",
      "email": "test@example.com",
      "emailVisibility": true,
      "password": "12345678",
      "passwordConfirm": "12345678",
      "full_name": "test",
      "dni": "test",
      "address": "test",
      "phone": 123,
      "birthday": "2022-01-01 10:00:00.123Z",
      "family_members": 123,
      "loyalty_number": "test"
    };  
   
   */
}
