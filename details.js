/*!!!IMPORTANT!!!
Installer l'extension "Live Server" sur Visual Studio Code,
cliquer sur le bouton "Go Live" en bas à droite pour accéder à la page web
et la page web devrait sur lancer sur votre navigateur d'elle même*/

import { pokemonapiURL, deconnexion, affichageBtnAuth } from "./commun.js";

console.log(pokemonapiURL);

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('pokemonId');

    const response = await fetch(`${pokemonapiURL}/pokemon?pokemonId=${pokemonId}`);
    const pokemonData = await response.json()

    // Remplir les informations de l'évolution
    const fillEvolutionDetails = (evolutionData, prefix) => {
        if (evolutionData) {
            document.getElementById(`${prefix}Name`).textContent = evolutionData.name;
            document.getElementById(`${prefix}ImgURL`).src = evolutionData.imgURL;

            console.log(prefix);

            // Vérifier si l'évolution de l'évolution existe
            if (evolutionData.evolution) {
                document.getElementById(`${prefix}EvolutionName`).textContent = evolutionData.evolution.name;
                document.getElementById(`${prefix}EvolutionImgURL`).src = evolutionData.evolution.imgURL;
            }

            fillEvolutionDetails(evolutionData.evolution, `${prefix}Evolution`);
        }
    };

    // Remplir les informations du Pokémon et ses évolutions
    const fillPokemonDetails = (pokemonData) => {
        // Remplir les informations du Pokémon
        document.getElementById('name').textContent = pokemonData.name;
        document.getElementById('hp').textContent = pokemonData.hp;
        document.getElementById('attack').textContent = pokemonData.attack;
        document.getElementById('defense').textContent = pokemonData.defense;
        document.getElementById('height').textContent = pokemonData.height;
        document.getElementById('specialattack').textContent = pokemonData.specialattack;
        document.getElementById('specialdefense').textContent = pokemonData.specialdefense;
        document.getElementById('speed').textContent = pokemonData.speed;
        document.getElementById('weight').textContent = pokemonData.weight;
        document.getElementById('imgURL').src = pokemonData.imgURL;

        document.getElementById('cryURL').src = pokemonData.cryURL;
        // Rechargez la balise audio après avoir défini la source
        const cryAudio = document.getElementById('cryAudio');
        cryAudio.load();

        document.getElementById('habitatName').textContent = pokemonData.habitat.name;
        document.getElementById('speciesName').textContent = pokemonData.species.name;

        // Remplir les informations des évolutions
        fillEvolutionDetails(pokemonData.evolution, 'evolution');
    };

    // Appeler la fonction pour remplir les détails du Pokémon
    fillPokemonDetails(pokemonData);

    // Récupérer l'accessToken depuis le sessionStorage
    const accessToken = sessionStorage.getItem('accessToken');

    // Vérifier si le Pokémon est déjà dans les favoris de l'utilisateur
    const checkFavoriteResponse = await fetch(`${pokemonapiURL}/favorite?pokemonId=${pokemonId}`, {
        method: 'GET', // Utiliser la méthode GET pour vérifier
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const favorisRes = await checkFavoriteResponse.json();

    if (favorisRes.isFavorite == true) {
            // Le Pokémon est déjà dans les favoris de l'utilisateur, afficher le bouton "Supprimer des favoris"
            document.getElementById('ajouterFavoris').classList.add('is-hidden');
            document.getElementById('supprimerFavoris').classList.remove('is-hidden');
        } else {
            // Le Pokémon n'est pas dans les favoris de l'utilisateur, afficher le bouton "Ajouter aux favoris"
            document.getElementById('supprimerFavoris').classList.add('is-hidden');
            document.getElementById('ajouterFavoris').classList.remove('is-hidden');
        }

    // Ajouter un gestionnaire d'événements pour le bouton "Ajouter aux favoris"
    document.getElementById('ajouterFavoris').addEventListener('click', async () => {
        // Ajouter le Pokémon aux favoris de l'utilisateur en utilisant la méthode POST
        const addFavoriteResponse = await fetch(`${pokemonapiURL}/favorite?pokemonId=${pokemonId}`, {
            method: 'POST', // Utiliser la méthode POST pour ajouter
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (addFavoriteResponse.ok) {
            // Masquer le bouton "Ajouter aux favoris" et afficher le bouton "Supprimer des favoris"
            document.getElementById('ajouterFavoris').classList.add('is-hidden');
            document.getElementById('supprimerFavoris').classList.remove('is-hidden');
        }
    });

    // Ajouter un gestionnaire d'événements pour le bouton "Supprimer des favoris"
    document.getElementById('supprimerFavoris').addEventListener('click', async () => {
        // Supprimer le Pokémon des favoris de l'utilisateur en utilisant la méthode DELETE
        const deleteFavoriteResponse = await fetch(`${pokemonapiURL}/favorite?pokemonId=${pokemonId}`, {
            method: 'DELETE', // Utiliser la méthode DELETE pour supprimer
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (deleteFavoriteResponse.ok) {
            // Masquer le bouton "Supprimer des favoris" et afficher le bouton "Ajouter aux favoris"
            document.getElementById('supprimerFavoris').classList.add('is-hidden');
            document.getElementById('ajouterFavoris').classList.remove('is-hidden');
        }
    });

});

// Appeler la fonction deconnexion pour déconnecter l'utilisateur de la page
deconnexion();

// Appeler la fonction affichageBtnAuth pour gérer l'affichage des boutons d'authentification
affichageBtnAuth();
