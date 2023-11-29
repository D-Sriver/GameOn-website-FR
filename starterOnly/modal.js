// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const formFields = document.querySelectorAll('.text-control, #birthdate, #quantity, [name="location"], #checkbox1');
const form = document.getElementById("form");
const confirmationMessage = document.createElement("div");

const errorMessages = {
  first: "Veuillez entrer 2 caractères ou plus pour le champ du nom.",
  last: "Veuillez entrer 2 caractères ou plus pour le champ du prénom.",
  email: "Veuillez remplir une adresse e-mail valide.",
  birthdate: "Veuillez sélectionner une date de naissance.",
  quantity: "Vous devez choisir une option.",
  location: "Vous devez choisir une option.",
  checkbox1: "Vous devez vérifier que vous acceptez les termes et conditions."
};
/// Event Listeners ///
// ouvre la modale si le bouton est cliqué
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// ferme la modale si le bouton est cliqué
modalBtn.forEach((btn) => btn.addEventListener("click", closeModal));
//change la couleur du bouton de soumission si les champs sont valides
formFields.forEach(field => field.addEventListener('input', updateButtonColor));
formFields.forEach(field => field.addEventListener('input', () => {
  updateButtonColor();
  updateValidationMessages();
}));

/// Functions ///
// Fonction qui ouvre la modale
function launchModal() {
	if (submitBtn.disabled) {
		// Si le bouton est désactivé, vérifier les champs et afficher les messages d'erreur
		updateValidationMessages();
	} else {
		modalbg.style.display = "block";
	}
}
// Fonction qui ferme la modale par la croix
function closeModal() {
  if (modalbg.style.display === "block") {
    document.querySelector(".close").addEventListener("click", function () {
      modalbg.style.display = "none";
    });
  }
}
// Fonction qui change la couleur du bouton de soumission
function updateButtonColor() {
  const isValid = validate();
  const submitBtn = document.getElementById("submitBtn");
//si le formulaire est valide, changez la couleur du bouton en rouge
  if (isValid) {
    submitBtn.style.backgroundColor = "#ff0000";
    submitBtn.addEventListener("click", submitForm); // Ajoutez cet événement au bouton de soumission
// si pas la couleur reste grise
  } else {
    submitBtn.style.backgroundColor = "#e7e7e7";
    submitBtn.removeEventListener("click", submitForm); // Supprimez cet événement du bouton de soumission

  }
}
function resetForm() {
	form.reset();
}
// Fonction appelée lors de la soumission du formulaire
function submitForm(event) {
  event.preventDefault();
	//affiche le message de confirmation dans la console
  console.log("Formulaire soumis");
	//recupere les données du formulaire dans une constante formData
  const formData = {
    first: document.getElementById("first").value,
    last: document.getElementById("last").value,
    email: document.getElementById("email").value,
    birthdate: document.getElementById("birthdate").value,
    quantity: document.getElementById("quantity").value,
    location: document.querySelector('input[name="location"]:checked').value,
    checkbox1: document.getElementById("checkbox1").checked
  };
	// Affiche les données du formulaire dans la console sous forme de tableau
  console.table(formData);
	//cache tout le formulaire dans la modale
	document.getElementById("form").style.display = "none";
	// remplace le formulaire par le message de confirmation dans la modale
	document.getElementById("confirmationSection").style.display = "block";
	document.body.appendChild(confirmationMessage);
	// cache le message de confirmation après 4 secondes
	setTimeout(function() {
		modalbg.style.display = "none";
	}, 4000);
	//reset le formulaire
	resetForm();
}
function editNav() {
	var x = document.getElementById("myTopnav");
	if (x.className === "topnav") {
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}
// Fonction qui vérifie les champs du formulaire et affiche les messages d'erreur
function updateValidationMessages() {
  formFields.forEach(field => {
    const container = field.closest(".formData");
    const fieldName = field.id;
    const errorDiv = container.querySelector('.error-message');
    // Supprimer les messages existants
    errorDiv?.remove();
//si le champ est vide, ajoutez un message d'erreur
    if (field.value.trim() === "") {
      container.setAttribute("data-error", errorMessages[fieldName]);
    } else {
			//si le champ n'est pas vide, supprimez le message d'erreur
      container.removeAttribute("data-error");
      container.setAttribute("data-error-visible", "true");
    }
  });
}
// Fonction qui vérifie si le formulaire est valide
function validate() {
	const firstName = document.getElementById("first").value;
	const lastName = document.getElementById("last").value;
	const email = document.getElementById("email").value;
	const birthDate = document.getElementById("birthdate").value;
	const quantity = document.getElementById("quantity").value;
	const locationRadios = document.getElementsByName("location");
	let locationSelected = false;
	const checkbox1 = document.getElementById("checkbox1").checked;
// Regex pour vérifier l'adresse e-mail
	let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Vérifiez que tous les champs sont remplis
	switch (true) {
		case !emailRegex.test(email.trim()):
		case firstName.trim() === "":
		case lastName.trim() === "":
		case birthDate.trim() === "":
			return false;
		// Verifie que la date de naissance est valide
		default:
			const birthDateObj = new Date(birthDate);
			const eighteenYearsAgo = new Date();
			eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

			switch (true) {
				case birthDateObj > eighteenYearsAgo:
				case quantity.trim() === "" || isNaN(quantity):
					return false;
        // Vérifiez que l'une des options de localisation est sélectionnée
				default:
					for (let i = 0; i < locationRadios.length; i++) {
						if (locationRadios[i].checked) {
							locationSelected = true;
							break;
						}
					}
					// Vérifiez que les conditions acceptées
					return checkbox1;
			}
	}
}