
let username = document.getElementById("loginUsuario");


const validarFormulario = (e) => {
    e.preventDefault();
    sessionStorage.setItem("user", username.value);
    window.location.href = "balance.html";
}

document.getElementById("formLogin").addEventListener("submit", validarFormulario);

