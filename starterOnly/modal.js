
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
// crée un Event.listener sur l'évènement clic et lance la fonction launchModal pour ouvrir la modale
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
// crée un Event.listener sur l'évènement clic et lance la fonction closeModal pour fermer la modale
closeBtn.addEventListener("click", closeModal);
// crée un Event.listener sur l'évènement clic et lance la fonction SubmitForm pour soumettre le formulaire
submitBouton.addEventListener("click", SubmitForm);

/* Fonction pour basculer la topnav en topnav responsive
elle ajoute la chaine de caractère " responsive" à la classe topnav pour crée une classe topnav responsive */
function editNav() {
    let x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// Fonction pour lancer la modale
// Elle fait passer le display de la modale à block et appel la fonction displayElements
function launchModal() {
    // Affiche la modal
    modalbg.style.display = "block";
    displayElements();
}

//fonction qui sert à afficher les elements du formulaire
// fait passer le display les elements du groupe formData du formulaire à block
function displayElements() {
    formData.forEach(element => {
        element.style.display = "block";
    });
}

// Fonction pour fermer la modale
// Elle fait passer le display de la modale à none et appel la fonction resetForm
function closeModal() {
    // Ferme la modal
    modalbg.style.display = "none";
    // Reset le formulaire
    resetForm();
}

// Fonction pour soumettre le formulaire au clic du bouton
function SubmitForm(event) {
    event.preventDefault(); // Empêche le rechargement de la page au submit
    if (submitBouton.value === "Fermer") { // si la submitBouton.value est égale à "Fermer" elle ferme la modale et reset le formulaire
        closeModal();
        resetForm();
    } else { // sinon elle lance la fonction validate (qui verifies les champs du formulaire)
        if (validate()) {
            ValidationModal();
        }
    }
}

// Fonction pour réinitialiser le formulaire
function resetForm() {
    // Réinitialisation des valeurs des champs à ""
    first.value = "";
    last.value = "";
    email.value = "";
    birthdate.value = "";
    quantity.value = "";
    displayElements(); // Appelle la fonction pour afficher les éléments du formulaire

    // Réinitialisation du texte de remerciement et du bouton de soumission
    texteRemerciement.textContent = "À quel tournoi souhaitez-vous participer cette année ?";
    texteRemerciement.style.padding = "0";
    texteRemerciement.style.fontSize = "17px";
    texteRemerciement.style.textAlign = "justify";
    submitBouton.value = "C'est parti";
}

// Fonction pour valider le champ du formulaire avec regex (plein de paramètres)
function validateField(value, minLength, errorMessage, element, regex) {
    // si la valeur du champ est inférieur à la longueur minimum ou si la valeur du champ ne correspond pas à la regex
    if (value.length < minLength || !regex.test(value)) {
        // Alors affiche le message d'erreur
        element.closest("div").setAttribute("data-error-visible", true);
        element.closest("div").setAttribute("data-error", errorMessage);
        return false;
    } else {
        // sinon efface le message d'erreur
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

    const errors = []; // Création d'un tableau pour stocker les champs avec erreur

    // Si le champ du prénom ne passe pas la validation (longueur inférieure à 2 ou ne correspondant pas à la regex),
    // alors ajoute l'identifiant du champ du prénom au tableau des erreurs.
    if (!validateField(first.value, 2, "Veuillez entrer 2 caractères ou plus pour le champ du prénom.", first, nameRegex)) {
        errors.push("first");
    }
    // Si le champ du nom ne passe pas la validation (longueur inférieure à 2 ou ne correspondant pas à la regex),
    // alors ajoute l'identifiant du champ du nom au tableau des erreurs.
    if (!validateField(last.value, 2, "Veuillez entrer 2 caractères ou plus pour le champ du nom.", last, nameRegex)) {
        errors.push("last");
    }
    // Si le champ de l'e-mail ne passe pas la validation (longueur inférieure à 2 ou ne correspondant pas à la regex),
    // alors ajoute l'identifiant du champ de l'e-mail au tableau des erreurs.
    if (!validateField(email.value, "Veuillez entrer un e-mail valide.", email, emailRegex)) {
        errors.push("email");
    }
    // Si le champ de la date de naissance ne passe pas la validation (ne correspondant pas à la fonction validateBirthdate),
    // alors ajoute l'identifiant du champ de la date de naissance au tableau des erreurs.
    if (!validateBirthdate()) {
        errors.push("birthdate");
    }
    // Si le champ du nombre de tournois ne passe pas la validation (ne correspondant pas à la fonction validateQuantity),
    // alors ajoute l'identifiant du champ du nombre de tournois au tableau des erreurs.
    if (!validateQuantity()) {
        errors.push("quantity");
    }
    // Si le champ du radio bouton ne passe pas la validation (ne correspondant pas à la fonction validateLocation),
    // alors ajoute l'identifiant du champ du radio bouton au tableau des erreurs.
    if (!validateLocation()) {
		errors.push("location1");
    }
    // Si le champ des conditions d'utilisation ne passe pas la validation (ne correspondant pas à la fonction validateCheckbox),
    // alors ajoute l'identifiant du champ des conditions d'utilisation au tableau des erreurs.
    if (!validateCheckbox()) {
        errors.push("checkbox1");
    }

    // Afficher tous les messages d'erreur en même temps
    formData.forEach(element => {
        // selection de l'identifiant du champ (input, select ou textarea) et crée la constante fieldName
        const fieldName = element.querySelector('input, select, textarea').id;
        // Si le tableau des erreurs contient l'identifiant du champ
        if (errors.includes(fieldName)) {
            // alors affiche le message d'erreur
            element.setAttribute("data-error-visible", true);
        } else {
            // sinon efface le message d'erreur
            element.setAttribute("data-error-visible", false);
        }
    });

    return errors.length === 0; // Retourne vrai s'il n'y a aucune erreur
}

// Fonction pour valider la date de naissance
function validateBirthdate() {
    //crée une date avec la valeur du champ de la date de naissance
    let Birthdate = new Date(birthdate.value);
    // récupère l'année de la date de naissance
    let YearBirthdate = Birthdate.getFullYear();
    // Si l'année de la date de naissance est supérieure à 1900 et inférieure à 2023
    if (YearBirthdate > 1900 && YearBirthdate < 2023) {
        // Alors efface le message d'erreur
        birthdate.closest("div").setAttribute("data-error-visible", false);
        return true;
    } else {
        // sinon affiche le message d'erreur
        birthdate.closest("div").setAttribute("data-error-visible", true);
        birthdate.closest("div").setAttribute("data-error", "Vous devez entrer votre date de naissance.");
        return false;
    }
}

// Fonction pour valider le nombre de tournois
function validateQuantity() {
    // Si la valeur du champ du nombre de tournois est un chiffre entre 0 et 99 (regex)
    let quantityvalid = /^[0-9]{1,2}$/;
    // Alors efface le message d'erreur
    if (quantityvalid.test(quantity.value)) {
        quantity.closest("div").setAttribute("data-error-visible", false);
        return true;
    } else {
        // sinon affiche le message d'erreur
        quantity.closest("div").setAttribute("data-error-visible", true);
        quantity.closest("div").setAttribute("data-error", "Veuillez entrer un chiffre valide.");
        return false;
    }
}

// Fonction pour valider le radio bouton
function validateLocation() {
    let AllLocations = document.querySelectorAll('input[name="location"]');
    // Vérifie si au moins un radio bouton est coché depuis le tableau AllLocations
    let OneLocation =  AllLocations.filter(location => location.checked).length > 0;
    // Si aucun radio bouton n'est coché, affiche un message d'erreur
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
    texteRemerciement.style.padding = "80% 25px";
    texteRemerciement.style.fontSize = "30px";
    texteRemerciement.style.textAlign = "center";
    submitBouton.value = "Fermer";
    submitBouton.style.backgroundColor = "#EA0126";
    tableData(); // Appelle la fonction pour créer le tableau dans la console
}

//Crée un tableau avec les données du formulaire recueillies dans la const data
function tableData() {
    const data = {
        "Prénom": first.value,
        "Nom": last.value,
        "Email": email.value,
        "Date d'anniversaire": birthdate.value,
        "Quantité de tournois": quantity.value,
        "Localisation": document.querySelector('input[name="location"]:checked').value,
        "Conditions d'utilisation": checkbox1.checked ? 'Checked' : 'Not Checked',
    };
    // Afficher dans la console
    console.table(data);
}