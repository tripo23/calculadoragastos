const formLogin = document.getElementById("formLogin");
let userInput = document.getElementById("loginUsuario");
let username = "";

formLogin.onsubmit = () => {
    validarFormulario(event);
}

const validarFormulario = (e) => {
    console.log("entro a la función del form");
    e.preventDefault();
    localStorage.setItem("user", userInput.value);
    username = userInput.value;
    window.location.href = "balance.html";
}

