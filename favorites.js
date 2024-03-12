/*!!!IMPORTANT!!!
Installer l'extension "Live Server" sur Visual Studio Code,
cliquer sur le bouton "Go Live" en bas à droite pour accéder à la page web
et la page web devrait sur lancer sur votre navigateur d'elle même*/

import { pokemonapiURL, afficherPokemons, deconnexion, affichageBtnAuth } from "./commun.js";

console.log(pokemonapiURL);

document.addEventListener("DOMContentLoaded", async () => {
    // Appeler la fonction deconnexion pour déconnecter l'utilisateur de la page
    deconnexion();

    // Appeler la fonction affichageBtnAuth pour gérer l'affichage des boutons d'authentification
    affichageBtnAuth();

    // Vérifier si l'utilisateur est connecté
    const accessToken = sessionStorage.getItem('accessToken');
    if (!accessToken) {
        // Rediriger l'utilisateur vers la page de connexion s'il n'est pas connecté
        window.location.href = 'connexion.html';
        return;
    }

    try {
        // Récupérer les Pokémons favoris de l'utilisateur
        const response = await fetch(`${pokemonapiURL}/favorites`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des favoris');
        }

        const favorisData = await response.json();

        // Afficher les Pokémons favoris
        const pokemonsHtml = await afficherPokemons(favorisData);

        // Insérer les cartes des Pokémons favoris dans la section appropriée de la page
        const pokemonsContainer = document.getElementById('pokemons');
        pokemonsContainer.innerHTML = pokemonsHtml;
    } catch (error) {
        console.error('Erreur:', error.message);
    }
});

