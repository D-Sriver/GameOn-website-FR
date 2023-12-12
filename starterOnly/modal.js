// Fonction pour basculer la topnav en topnav responsive
function editNav() {
	let x = document.getElementById("myTopnav");
	if (x.className === "topnav") {
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}

// Sélection des éléments dans le DOM et création de constantes
const texteRemerciement = document.querySelector(".text-label");
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector(".close");
const first = document.getElementById("first");
const last = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const locationsErreur = document.getElementById("location1");
const checkbox1 = document.getElementById("checkbox1");
const submitBouton = document.querySelector(".btn-submit");

// Ajout d'EventListener aux boutons
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeBtn.addEventListener("click", closeModal);
submitBouton.addEventListener("click", SubmitForm);

// Fonction pour lancer la modal
function launchModal() {
	// Affiche la modal
	modalbg.style.display = "block";
	displayElements();
}

// Fonction pour fermer la modal
function closeModal() {
	// Ferme la modal
	modalbg.style.display = "none";
	// Reset le formulaire
	resetForm();
}

// Fonction pour soumettre le formulaire au clic du bouton
function SubmitForm(event) {
	event.preventDefault(); // Empêche le rechargement de la page
	if (submitBouton.value === "Fermer") {
		closeModal();
		resetForm();
	} else {
		if (validate()) {
			ValidationModal();
			consoleTable();		// Affiche les valeurs du formulaire dans la console
		}
	}
}

// Fonction pour vérifier les formData du formulaire
function displayElements() {
	formData.forEach(element => {
		element.style.display = "block";
	});
}

// Fonction pour réinitialiser le formulaire
function resetForm() {
	// Réinitialisation des valeurs des champs
	first.value = "";
	last.value = "";
	email.value = "";
	birthdate.value = "";
	quantity.value = "";
	displayElements();

	// Réinitialisation du texte de remerciement et du bouton de soumission
	texteRemerciement.textContent = "À quel tournoi souhaitez-vous participer cette année ?";
	texteRemerciement.style.padding = "0";
	texteRemerciement.style.fontSize = "17px";
	texteRemerciement.style.textAlign = "justify";
	submitBouton.value = "C'est parti";
}

// Fonction pour valider le champ du formulaire avec regex
function validateField(value, minLength, errorMessage, element, regex) {
	if (value.length < minLength || !regex.test(value)) {
		// Affiche le message d'erreur
		element.closest("div").setAttribute("data-error-visible", true);
		element.closest("div").setAttribute("data-error", errorMessage);
		return false;
	} else {
		// Efface le message d'erreur
		element.closest("div").setAttribute("data-error-visible", false);
		element.closest("div").removeAttribute("data-error");
		return true;
	}
}

// Fonction pour valider l'ensemble du formulaire
function validate() {
	// Utilisation de regex pour le nom/prénom et e-mail
	const nameRegex = /^[A-Za-zéèêëîïôöùûü\s-]+$/;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const errors = [];

	if (!validateField(first.value, 2, "Veuillez entrer un prénom valide (sans chiffres).", first, nameRegex)) {
		errors.push("first");
	}
	if (!validateField(last.value, 2, "Veuillez entrer un nom valide (sans chiffres).", last, nameRegex)) {
		errors.push("last");
	}
	if (!validateField(email.value, 1, "Veuillez entrer un e-mail valide.", email, emailRegex)) {
		errors.push("email");
	}
	if (!validateBirthdate()) {
	}
	if (!validateQuantity()) {
	}
	if (!validateLocation()) {
	}
	if (!validateCheckbox()) {
	}

	// Afficher tous les messages d'erreur en même temps
	errors.forEach(error => {
		document.getElementById(error).closest("div").setAttribute("data-error-visible", true);
	});

	return errors.length === 0; // Retourne vrai s'il n'y a aucune erreur
}

// Fonction pour valider la date de naissance
function validateBirthdate() {
	let Anniv = new Date(birthdate.value);
	let YearAnniv = Anniv.getFullYear();
	if (YearAnniv > 1900 && YearAnniv < 2023) {
		birthdate.closest("div").setAttribute("data-error-visible", false);
		return true;
	} else {
		birthdate.closest("div").setAttribute("data-error-visible", true);
		birthdate.closest("div").setAttribute("data-error", "Vous devez entrer votre date de naissance.");
		return false;
	}
}

// Fonction pour valider le nombre de tournois
function validateQuantity() {
	let quantityvalid = /^[0-9]{1,2}$/;
	if (quantityvalid.test(quantity.value)) {
		quantity.closest("div").setAttribute("data-error-visible", false);
		return true;
	} else {
		quantity.closest("div").setAttribute("data-error-visible", true);
		quantity.closest("div").setAttribute("data-error", "Veuillez entrer un chiffre valide.");
		return false;
	}
}

// Fonction pour valider le radio bouton
function validateLocation() {
	let AllLocations = document.querySelectorAll('input[name="location"]');
	let OneLocation = Array.prototype.slice.call(AllLocations).some((x) => x.checked);
	if (OneLocation === false) {
		locationsErreur.closest("div").setAttribute("data-error-visible", true);
		locationsErreur.closest("div").setAttribute("data-error", "Vous devez choisir une option");
		return false;
	} else {
		locationsErreur.closest("div").setAttribute("data-error-visible", false);
		return true;
	}
}

// Fonction pour valider les conditions d'utilisation
function validateCheckbox() {
	if (checkbox1.checked === false) {
		checkbox1.closest("div").setAttribute("data-error-visible", true);
		checkbox1.closest("div").setAttribute("data-error", "Vous devez vérifier que vous acceptez les termes et conditions.");
		return false;
	} else {
		checkbox1.closest("div").setAttribute("data-error-visible", false);
		return true;
	}
}

// Fonction pour afficher et créer la modale de validation
function ValidationModal() {
	for (let i = 0; i < formData.length; i++) {
		formData[i].style.display = "none";
	}
	texteRemerciement.textContent = "Merci pour votre inscription !";
	texteRemerciement.style.padding = "30% 25px";
	texteRemerciement.style.fontSize = "30px";
	texteRemerciement.style.textAlign = "center";
	submitBouton.value = "Fermer";
	console.log("inscription valide");
}

function consoleTable() {
	console.table({
		Prénom: first.value,
		Nom: last.value,
		Email: email.value,
		Date_de_naissance: birthdate.value,
		Quantité_de_tournois: quantity.value,
		Ville: document.querySelector('input[name="location"]:checked').value,
		Conditions_d_utilisation: checkbox1.checked,
	});
}