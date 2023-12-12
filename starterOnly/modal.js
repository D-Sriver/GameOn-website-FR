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
const submitBouton = document.querySelector(".btn-submit");
// Création de constantes pour les champs du formulaire
const first = document.getElementById("first");
const last = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const locationsErreur = document.getElementById("location1");
const checkbox1 = document.getElementById("checkbox1");

// Ajout d'EventListener aux boutons
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeBtn.addEventListener("click", closeModal);
submitBouton.addEventListener("click", SubmitForm);

// Fonction pour lancer la modale
function launchModal() {
	// Affiche la modal
	modalbg.style.display = "block";
	displayElements();
}
// Fonction pour fermer la modale
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
		}
	}
}
//fonction qui sert à afficher les elements du formulaire
function displayElements() {
	formData.forEach(element => {
		element.style.display = "block";
	});
}

// Fonction pour réinitialiser le formulaire
function resetForm() {
	// Réinitialisation des valeurs des champs à null
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
// si les champs validateField sont faux
	if (!validateField(first.value, 2, "Veuillez entrer 2 caractères ou plus pour le champ du prénom.", first, nameRegex)) {
		errors.push("first");
	}
	if (!validateField(last.value, 2, "Veuillez entrer 2 caractères ou plus pour le champ du nom.", last, nameRegex)) {
		errors.push("last");
	}
	if (!validateField(email.value, 2, "Veuillez entrer un e-mail valide.", email, emailRegex)) {
		errors.push("email");
	}
	if (!validateBirthdate()) {
		errors.push("birthdate");
	}
	if (!validateQuantity()) {
		errors.push("quantity");
	}
	if (!validateLocation()) {
		errors.push("location1");
	}
	if (!validateCheckbox()) {
		errors.push("checkbox1");
	}

	// Afficher tous les messages d'erreur en même temps
	formData.forEach(element => {
		const fieldName = element.querySelector('input, select, textarea').id;
		if (errors.includes(fieldName)) {
			element.setAttribute("data-error-visible", true);
		} else {
			element.setAttribute("data-error-visible", false);
		}
	});

	return errors.length === 0; // Retourne vrai s'il n'y a aucune erreur
}
// Fonction pour valider la date de naissance
function validateBirthdate() {
	let Birthdate = new Date(birthdate.value);
	let YearBirthdate = Birthdate.getFullYear();
	if (YearBirthdate > 1900 && YearBirthdate < 2023) {
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
	tableData();

}
//Crée un tableau avec les données du formulaire
function tableData() {
	const data = {
		First: first.value,
		Last: last.value,
		Email: email.value,
		Birthdate: birthdate.value,
		Quantity: quantity.value,
		Location: document.querySelector('input[name="location"]:checked').value,
		Checkbox: checkbox1.checked,
	};
//les affiches dans la console
	console.table(data);
}
