/*!!!IMPORTANT!!!
Installer l'extension "Live Server" sur Visual Studio Code, 
cliquer sur le bouton "Go Live" en bas à droite pour accéder à la page web
et la page web devrait sur lancer sur votre navigateur d'elle même*/

const pokemonapiURL = "https://pokemonsapi.herokuapp.com";

async function afficherPokemons(data) {
  // Initialisation de la chaîne HTML de sortie
  let pokemonCard = '';

  // Parcourir chaque objet Pokémon dans le tableau d'entrée
  for (let i = 0; i < data.length; i += 1) {
    // Construire la carte HTML pour chaque Pokémon
    pokemonCard += `
    <div class="column is-3-desktop is-4-tablet is-12-mobile">
              <a href="details.html?pokemonId=${data[i].pokemonId}">
                  <div class="card has-text-black" style="background-color:${data[i].color}">
                      <div class="card-image">
                          <figure class="image is-square">
                              <img src="${data[i].imgURL}" alt="${data[i].name}">
                          </figure>
                      </div>
                      <div class="card-content">
                          <div class="content">
                              <p class="title is-3 has-text-centered" style="color:black">${data[i].name}</p>
                              <div class="mb-0" style="color:black">
                                  <span class="has-text-weight-bold">Species :</span>
                                  <span>${data[i].species.name}</span>
                              </div>
                              <div class="mb-0">
                                  <span class="has-text-weight-bold">Habitat : </span>
                                  <span>${data[i].habitat.name}</span>
                              </div>
                              <div class="mb-0">
                                  <span class="has-text-weight-bold">PokeTypes : </span>
                                  <span>${data[i].poketypes.map(type => type.name).join(', ')}</span>
                              </div>
                          </div>
                      </div>
                  </div>
              </a>
          </div>
    `;
  }

  // Retourner la chaîne HTML générée
  return pokemonCard;
}

async function deconnexion() {
    const boutonLogout = document.querySelector('.btnLogout');

    boutonLogout.addEventListener('click', () => {
        // Supprimer le jeton d'authentification de sessionStorage
        sessionStorage.removeItem('accessToken');
        // Rediriger l'utilisateur vers la page d'accueil
        window.location.href = 'index.html';
    });
}

async function affichageBtnAuth() {
    const btnLogin = document.getElementById('btnLogin');
    const btnLogout = document.getElementById('btnLogout');
    const pokeFavoris = document.getElementById('nav-link-favoris');

    // Vérifier si le jeton d'authentification est présent dans sessionStorage
    if (sessionStorage.getItem('accessToken')) {
        btnLogin.style.display = 'none'; // Cacher le bouton Connexion
        pokeFavoris.style.display = 'block'; // Afficher le bouton Pokémon Favoris
        btnLogout.style.display = 'block'; // Afficher le bouton Déconnexion
    } else {
        btnLogin.style.display = 'block'; // Afficher le bouton Connexion
        pokeFavoris.style.display = 'none'; // Cacher le bouton Pokémon Favoris
        btnLogout.style.display = 'none'; // Cacher le bouton Déconnexion
    }
}


export { pokemonapiURL, afficherPokemons, deconnexion, affichageBtnAuth };
