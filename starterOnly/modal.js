// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const formFields = document.querySelectorAll('.text-control, #birthdate, #quantity, [name="location"], #checkbox1');

const errorMessages = {
  first: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
  last: "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
  email: "Veuillez remplir une adresse e-mail valide.",
  birthdate: "Veuillez sélectionner une date de naissance.",
  quantity: "Vous devez choisir une option.",
  location: "Vous devez choisir une option.",
  checkbox1: "Vous devez vérifier que vous acceptez les termes et conditions."
};
// Event Listeners
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalBtn.forEach((btn) => btn.addEventListener("click", closeModal));
formFields.forEach(field => field.addEventListener('input', updateButtonColor));
formFields.forEach(field => field.addEventListener('input', () => {
  updateButtonColor();
  updateValidationMessages();
}));

// Functions
function launchModal() {
  modalbg.style.display = "block";
}

function closeModal() {
  if (modalbg.style.display === "block") {
    document.querySelector(".close").addEventListener("click", function () {
      modalbg.style.display = "none";
    });
  }
}

function updateButtonColor() {
  const isValid = validate();
  const submitBtn = document.getElementById("submitBtn");

  if (isValid) {
    submitBtn.style.backgroundColor = "#ff0000";
  } else {
    submitBtn.style.backgroundColor = "#e7e7e7";
  }
}

function updateValidationMessages() {
  formFields.forEach(field => {
    const container = field.closest(".formData");
    const fieldName = field.id;
    const errorDiv = container.querySelector('.error-message');
    // Supprimer les messages existants
    errorDiv?.remove();

    if (field.value.trim() === "") {
      container.setAttribute("data-error", errorMessages[fieldName]);
    } else {
      container.removeAttribute("data-error");
      container.setAttribute("data-error-visible", "true");
    }
  });
}

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

  const birthDateObj = new Date(birthDate);
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

  if (birthDateObj > eighteenYearsAgo) {
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