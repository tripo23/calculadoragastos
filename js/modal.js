
// Get the modal
let modal = document.getElementById("myModal");
let modalContent = document.getElementsByClassName("modal-content");

// Get the <span> element that closes the modal
let verBalance = document.getElementsByClassName("btnModal")[0];
let cargarOtro = document.getElementsByClassName("btnModal")[1];


// When the user clicks on <verBalance> (x), changes the page
verBalance.onclick = function() {
  modal.style.display = "none";
  window.location.href = "balance.html";
}

// When the user clicks on <cargarOtro> (x), close the modal
cargarOtro.onclick = function() {
    modal.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

export {modal, modalContent};