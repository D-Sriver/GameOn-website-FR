// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
function editNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
function closeModal() {
  if (modalbg.style.display === "block") {
    document.querySelector(".close").addEventListener("click", function () {
      modalbg.style.display = "none";
    });
  }
}

// Fonction pour mettre à jour la couleur du bouton si validate() du formulaire (true)
function updateButtonColor() {
  const isValid = validate();
  const submitBtn = document.getElementById("submitBtn");

  if (isValid) {
    submitBtn.style.backgroundColor = "#ff0000";
  }
}
// vérifie à chaque modification des inputs si le formulaire est valide, si oui change la couleur du bouton
const formFields = document.querySelectorAll('.text-control, #birthdate, #quantity, [name="location"], #checkbox1');
formFields.forEach(field => {
  field.addEventListener('input', updateButtonColor);
});
function validate() {
  const firstName = document.getElementById("first").value;
  const lastName = document.getElementById("last").value;
  const email = document.getElementById("email").value;
  const birthDate = document.getElementById("birthdate").value;
  const quantity = document.getElementById("quantity").value;
  const locationRadios = document.getElementsByName("location");
  let locationSelected = false;
  const checkbox1 = document.getElementById("checkbox1").checked;

  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return false;
  }
  if (firstName.trim() === "") {
    return false;
  }
  if (lastName.trim() === "") {
    return false;
  }
  if (birthDate.trim() === "") {
    return false;
  }
  if (quantity.trim() === "" || isNaN(quantity)) {
    return false;
  }
  for (let i = 0; i < locationRadios.length; i++) {
    if (locationRadios[i].checked) {
      locationSelected = true;
      break;
    }
  }
  if (!locationSelected) {
    return false;
  }
  return checkbox1;
}