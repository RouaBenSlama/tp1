/*!!!IMPORTANT!!!
Installer l'extension "Live Server" sur Visual Studio Code,
cliquer sur le bouton "Go Live" en bas à droite pour accéder à la page web
et la page web devrait sur lancer sur votre navigateur d'elle même*/

import { pokemonapiURL, afficherPokemons, deconnexion, affichageBtnAuth } from "./commun.js";

console.log(pokemonapiURL);

document.addEventListener("DOMContentLoaded", () => {

    // Fonction pour récupérer les images des Pokémons à partir de l'API
    async function fetchPokemonImages() {
        try {
            // Faire une requête GET à l'API pour obtenir les données des Pokémons
            const response = await fetch(pokemonapiURL + '/pokemons');

            // Vérifier si la requête a réussi
            if (!response.ok) {
                throw new Error('La requête a échoué.');
            }

            // Convertir la réponse en format JSON
            const data = await response.json();

            // Récupérer toutes les valeurs uniques pour les habitats, types et espèces
            const habitats = [...new Set(data.map(pokemon => pokemon.habitat.name.toLowerCase()))];
            const types = [...new Set(data.flatMap(pokemon => pokemon.poketypes.map(type => type.name.toLowerCase())))];
            const species = [...new Set(data.map(pokemon => pokemon.species.name.toLowerCase()))];

            // Ajouter l'option "Tous" à chaque filtre
            habitats.unshift('all');
            types.unshift('all');
            species.unshift('all');

            // Mettre à jour les options des filtres
            updateFilterOptions('habitats', habitats);
            updateFilterOptions('poketypes', types);
            updateFilterOptions('species', species);

            // Appeler la fonction pour filtrer et afficher les images des Pokémons
            filterPokemons();

        } catch (error) {
            // Gérer les erreurs
            console.error('Une erreur s\'est produite lors de la récupération des images des Pokémons :', error);
        }
    }

    // Fonction pour mettre à jour les options d'un sélecteur déroulant
    function updateFilterOptions(selectId, options) {
        const selectElement = document.getElementById(selectId);
        selectElement.innerHTML = '';
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option.charAt(0).toUpperCase() + option.slice(1); // Mettre la première lettre en majuscule
            selectElement.appendChild(optionElement);
        });
    }


    // Fonction pour filtrer les Pokémon en fonction des critères sélectionnés
    async function filterPokemons() {
        try {
            // Récupérer les valeurs sélectionnées dans les filtres
            const habitat = document.getElementById('habitats').value;
            const type = document.getElementById('poketypes').value;
            const species = document.getElementById('species').value;

            // Faire une requête GET à l'API pour obtenir les données des Pokémons
            const response = await fetch(pokemonapiURL + '/pokemons');

            // Vérifier si la requête a réussi
            if (!response.ok) {
                throw new Error('La requête a échoué.');
            }

            // Convertir la réponse en format JSON
            const data = await response.json();

            // Filtrer les Pokémons en fonction des valeurs sélectionnées
            const filteredPokemons = data.filter(pokemon => {
                if (habitat !== 'all' && pokemon.habitat.name.toLowerCase() !== habitat) {
                    return false;
                }
                if (type !== 'all' && !pokemon.poketypes.map(type => type.name.toLowerCase()).includes(type)) {
                    return false;
                }
                if (species !== 'all' && pokemon.species.name.toLowerCase() !== species) {
                    return false;
                }
                return true;
            });

            // Appeler la fonction pour afficher les Pokémons filtrés
            const pokemonsHtml = await afficherPokemons(filteredPokemons);

            // Insérer les cartes des Pokémons filtrés dans la section appropriée de la page
            const pokemonsContainer = document.getElementById('pokemons');
            pokemonsContainer.innerHTML = pokemonsHtml;

        } catch (error) {
            // Gérer les erreurs
            console.error('Une erreur s\'est produite lors de la récupération et de l\'affichage des images des Pokémons :', error);
        }
    }

    // Appeler la fonction pour récupérer les images des Pokémons
    fetchPokemonImages();

    // Gestionnaire d'événements pour le bouton "Filtrer"
    const filterButton = document.getElementById('btnFiltrer');
    filterButton.addEventListener('click', filterPokemons);

    // Appeler la fonction fetchPokemonImages pour récupérer les données et mettre à jour les filtres lors du chargement de la page
    fetchPokemonImages();

    // Appeler la fonction deconnexion pour déconnecter l'utilisateur de la page
    deconnexion();

    // Appeler la fonction affichageBtnAuth pour gérer l'affichage des boutons d'authentification
    affichageBtnAuth();

});