
window.onload = () => {
    console.log("Cargado DOM");

    document.querySelector("nav").addEventListener("click", pageNav );



    document.querySelector("#user_login").addEventListener("click", (e) => {
        e.preventDefault();
        const uPanel = document.querySelector("#user_login_panel");

        if (uPanel.style.display === "none") {
            uPanel.style.display = "flex";
          } else {
            uPanel.style.display = "none";
          }
        // console.log("display", uPanel.computedStyleMap().get("display").value );
        
    });

    document.addEventListener('mouseup', function(e) {
        const uPanel = document.querySelector("#user_login_panel");

        if (!uPanel.contains(e.target)) {
            uPanel.style.display = 'none';
        }
    });

}


function pageNav(e) { 
    e.preventDefault();
    

    switch (e.target.id) {
        case "supermercado":
            // console.log(e.target);

            navSelected(e.target.id);
            
            // if(!e.target.classList.contains("active")) {
            //     e.target.classList.add("active");
            // } else {
            //     e.target.classList.remove("active");
            // }

        break;
    
        case "bodega":
            

        navSelected(e.target.id);

            // console.log(e.target);
            // console.log(e.target.classList.contains("active"));

            // if(!e.target.classList.contains("active")) {
            //     e.target.classList.add("active");
            // } else {
            //     e.target.classList.remove("active");
            // }   
        break;
    
        case "moda":
        navSelected(e.target.id);
            
        break;
    
        case "tecnologia":
        navSelected(e.target.id);
            
        break;
    
        case "gaming":
        navSelected(e.target.id);
            
        break;
    
        case "hogar":
        navSelected(e.target.id);
            
        break;
    
        default:
            break;
    }

}



function navSelected( navItem ) {

    const navItems = document.querySelectorAll(".nav_item");

    navItems.forEach( e => {
        if( e.id == navItem ) {
            e.classList.add("active");            
            document.querySelector(".nav_title_banner h2").innerHTML = navItem;
            // document.querySelector(".nav_title_banner img").src = navItem;

        } else {
            e.classList.remove("active");
        }
    });

}
