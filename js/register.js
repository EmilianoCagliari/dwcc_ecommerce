
window.onload = () => {
    document.querySelector(".nav_title_banner h2").style.fontWeight = 400;
    document.querySelectorAll(".nav_list");

    loadWarnings();
    document.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target));
        console.log(data);
    });
}


function registerUser( userData ) { 
    console.log(userData);
}


function loadWarnings() {
    const inputs = document.querySelectorAll(".input");
    // console.log(inputs);
    console.log();

    const div = document.createElement("div");
    div.style.margin = "10px 0px";
    div.style.padding = "10px";
    div.style.borderRadius = "10px";
    div.style.border = "2px dashed blue";
    const p = document.createElement("p");
    p.style.fontSize = "14px";
    p.style.fontWeight = "700";
    p.innerHTML = "Las contraseñas no son iguales";
    div.appendChild(p);
    inputs[9].parentNode.parentNode.appendChild(div, inputs[9].parentElement);
    // inputs[8].parentNode.parentNode.append(div);

    // inputs[9].style.borderColor = "red";

}