
let username = document.getElementById("loginUsuario");


const validarFormulario = (e) => {
    console.log("intento validar");
    e.preventDefault();
    sessionStorage.setItem("user", username.value);
    window.location.href = "balance.html";
}

document.getElementById("formLogin").addEventListener("submit", validarFormulario);

