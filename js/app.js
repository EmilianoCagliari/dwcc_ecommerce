

window.onload = () => {
    console.log("Cargado DOM");

    document.querySelector("nav").addEventListener("click", pageNav );

    document.querySelector("#login_cancel").addEventListener("click", () => {
        document.querySelector(".modal").style.display =  "none";
    });
    document.querySelector("#user_login").addEventListener("click", (e) => {
        e.preventDefault();
        const uPanel = document.querySelector("#user_login_panel");

        if (uPanel.style.display === "none") {
            uPanel.style.display = "flex";
          } else {
            uPanel.style.display = "none";
          }


        document.querySelector("#btn_user_register").addEventListener("click", () => {
            window.location = "/register.html";
            registrationPage();
            console.log("register button");
        });

        

        document.querySelector("#btn_user_login").addEventListener("click", () => {
            uPanel.style.display = "none";
            document.querySelector(".modal").style.display = "flex";
        })
        // console.log("display", uPanel.computedStyleMap().get("display").value );
        

    });

    document.addEventListener('mouseup', function(e) {
        const uPanel = document.querySelector("#user_login_panel");

        if (!uPanel.contains(e.target)) {
            uPanel.style.display = 'none';
        }

    });

}

// const { range, filter, map } = rxjs;

// range(1, 200)
//   .pipe(
//     filter((x) => x % 2 === 1),
//     map((x) => x + x)
//   )
//   .subscribe((x) => console.log(x));


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
            const imgSrc = document.querySelector(".nav_title_banner img").src;
            const newImgSrc = `${imgSrc.substring(0, (imgSrc.lastIndexOf('/') + 1 ))}${navItem}.jpg`;

            document.querySelector(".nav_title_banner img").src = newImgSrc;
            // console.log("img", );
            // document.querySelector(".nav_title_banner img").src = navItem;

        } else {
            e.classList.remove("active");
        }
    });

}



function registrationPage() {
    
}