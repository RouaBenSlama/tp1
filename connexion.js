/*!!!IMPORTANT!!!
Installer l'extension "Live Server" sur Visual Studio Code,
cliquer sur le bouton "Go Live" en bas à droite pour accéder à la page web
et la page web devrait sur lancer sur votre navigateur d'elle même*/

import { pokemonapiURL } from "./commun.js";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('connexion').addEventListener('click', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const body = { email: email, password: password };

        try {
            // Simuler une requête d'authentification à l'API
            const response = await fetch(pokemonapiURL + '/auth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();
                console.log('Connexion de l\'utilisateur avec succès.');
            if (response.ok) {
                sessionStorage.setItem('accessToken', data.token); // Stocker le jeton d'authentification
                window.location.href = 'favorites.html'; // Rediriger vers la page des favoris
            } else {
                throw new Error('Email ou mot de passe incorrect.');
            }
        } catch (error) {
            console.log(error);
        }
    });

    document.getElementById('annuler').addEventListener('click', () => {
        window.location.href = 'index.html'; // Rediriger vers la page d'accueil
    });
});
