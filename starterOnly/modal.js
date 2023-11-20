function editNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
//TODO: fermer la modale
modalBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
//TODO: fermer la modale
function closeModal() {
  if (modalbg.style.display === "block") {
    document.querySelector(".close").addEventListener("click", function () {
      modalbg.style.display = "none";
    });
  }
}
//TODO Implémenter entrées du formulaire


