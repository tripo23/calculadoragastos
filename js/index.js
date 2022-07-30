const formLogin = document.getElementById("formLogin");
let userInput = document.getElementById("loginUsuario");
let username = "";

/* Si el usuario ya está logueado, lo llevo directo a la pestaña de balance. */
if (localStorage.getItem("userCDG")) {
    window.location.href = "balance.html";
}


formLogin.onsubmit = () => {
    validarFormulario(event);
}

const validarFormulario = (e) => {
    console.log("entro a la función del form");
    e.preventDefault();
    localStorage.setItem("userCDG", userInput.value);
    username = userInput.value;
    window.location.href = "balance.html";
}

