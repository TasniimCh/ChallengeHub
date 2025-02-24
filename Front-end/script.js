document.addEventListener("DOMContentLoaded", function() {
    // Fonction de validation de l'inscription (formulaire 2)
    const signUpForm = document.querySelector(".right_page form");
    const signUpButton = document.querySelector(".right_page button");

    if (signUpButton) {
        signUpButton.addEventListener("click", function(event) {
            event.preventDefault();  // Empêche l'envoi du formulaire

            // Récupération des valeurs du formulaire
            const nom = document.querySelector('input[name="nom"]').value;
            const prenom = document.querySelector('input[name="prenom"]').value;
            const username = document.querySelector('input[name="nom d\'utilisateur "]').value;
            const email = document.querySelector('input[name="email"]').value;
            const password = document.querySelector('input[name="password"]').value;
            const password2 = document.querySelector('input[name="password2"]').value;

            // Effacer les messages d'erreur précédents
            clearErrors();

            // Vérification si les champs sont vides
            let valid = true;
            if (!username) {
                showError("nom d'utilisateur", "Le nom d'utilisateur est requis.");
                valid = false;
            }
            if (!email) {
                showError("email", "L'email est requis.");
                valid = false;
            }
            if (!password) {
                showError("password", "Le mot de passe est requis.");
                valid = false;
            }
            if (!password2) {
                showError("password2", "La confirmation du mot de passe est requise.");
                valid = false;
            }

            // Vérification de la correspondance des mots de passe
            if (password !== password2) {
                showError("password2", "Les mots de passe ne correspondent pas.");
                valid = false;
            }

            // Si tout est valide, simulate login and redirect
            if (valid) {
                // Simuler l'enregistrement de l'utilisateur
                alert("Utilisateur inscrit avec succès !");
                window.location.href = "accueil.html"; // Rediriger vers l'accueil après inscription
            }
        });
    }

    // Fonction de validation pour la page de connexion (formulaire 1)
    const signInButton = document.querySelector(".left_pannel .btn1");
    
    if (signInButton) {
        signInButton.addEventListener("click", function(event) {
            event.preventDefault(); // Empêche le rechargement de la page

            // Récupération des valeurs du formulaire de connexion
            const email = document.querySelector('input[name="E-mail"]').value;
            const password = document.querySelector('input[name="password"]').value;

            // Effacer les messages d'erreur précédents
            clearErrors();

            // Vérification si les champs sont vides
            if (!email || !password) {
                if (!email) showError("E-mail", "L'email est requis.");
                if (!password) showError("password", "Le mot de passe est requis.");
                return; // Ne pas procéder à la validation si les champs sont vides
            }

            // Simuler un login avec les bonnes informations (exemple)
            if (email  && password ) {
                window.location.href = "accueil.html"; // Rediriger vers l'accueil si connexion réussie
            } else {
                showError("E-mail", "Les informations de connexion sont incorrectes.");
            }










        
        });
    }

    // Fonction pour afficher un message d'erreur sous un champ
    function showError(_fieldName, message) {
        const inputField = document.querySelector(input[name="${_fieldName}"]);
        const errorMessage = document.createElement("p");
        errorMessage.classList.add("error-message");
        errorMessage.textContent = message;
        inputField.parentElement.appendChild(errorMessage);
    }

    // Fonction pour effacer les messages d'erreur
    function clearErrors() {
        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach(function(error) {
            error.remove();
        });
    }

    // Fonction pour ajouter une animation de transition entre les pages
    function addPageTransition() {
        document.body.classList.add("transition");
        setTimeout(function() {
            document.body.classList.remove("transition");
        }, 500);  // Délai de 0.5s pour la transition
    }
});





document.getElementById("signin-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let response = await fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    let result = await response.json();
    if (response.ok) {
        alert("Connexion réussie !");
        window.location.href = "dashboard.html"; // Rediriger vers la page d'accueil
    } else {
        alert(result.error);
    }
});








document.getElementById("signup-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let password2 = document.getElementById("password2").value;
    
    if (password !== password2) {
        alert("Les mots de passe ne correspondent pas.");
        return;
    }
    
    try {
        let response = await fetch("http://localhost:3000/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nom, prenom, username, email, password })
        });
        
        let result = await response.json();
        alert(result.message);
        if (response.ok) {
            window.location.href = "dashboard.html";
        }
    } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
        alert("Une erreur est survenue. Veuillez réessayer plus tard.");
    }
});