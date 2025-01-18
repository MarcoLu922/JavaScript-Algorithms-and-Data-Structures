// Listen for click event to trigger the search operation
document.querySelector('#search-button').addEventListener('click', function () {
    const searchInput = document.querySelector('#search-input').value.trim(); // Get the input value from the search field
    const pokemonNameElement = document.querySelector('#pokemon-name');
    const pokemonIdElement = document.querySelector('#pokemon-id');
    const weightElement = document.querySelector('#weight');
    const heightElement = document.querySelector('#height');
    const hpElement = document.querySelector('#hp');
    const attackElement = document.querySelector('#attack');
    const defenseElement = document.querySelector('#defense');
    const specialAttackElement = document.querySelector('#special-attack');
    const specialDefenseElement = document.querySelector('#special-defense');
    const speedElement = document.querySelector('#speed');
    const typesElement = document.querySelector('#types');
    const spriteElement = document.querySelector('#sprite');

    // Clear the types and sprite display before each search
    typesElement.innerHTML = '';
    if (spriteElement) spriteElement.remove();

    // Check if the search input is empty or invalid
    if (!searchInput) {
        alert('Please enter a valid Pokémon name or ID.');
        return;
    }

    // Construct API URL based on the search input (name or ID)
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}`;

    // Make API request to fetch Pokémon data
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon not found'); // Handle error if Pokémon is not found
            }
            return response.json();
        })
        .then(data => {
            // Update the page with the Pokémon data
            const pokemon = data;

            // Set the Pokémon's name, ID, weight, height, and stats
            pokemonNameElement.textContent = pokemon.name.toUpperCase();
            pokemonIdElement.textContent = `#${pokemon.id}`;
            weightElement.textContent = `Weight: ${pokemon.weight}`;
            heightElement.textContent = `Height: ${pokemon.height}`;
            hpElement.textContent = pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat;
            attackElement.textContent = pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat;
            defenseElement.textContent = pokemon.stats.find(stat => stat.stat.name === 'defense').base_stat;
            specialAttackElement.textContent = pokemon.stats.find(stat => stat.stat.name === 'special-attack').base_stat;
            specialDefenseElement.textContent = pokemon.stats.find(stat => stat.stat.name === 'special-defense').base_stat;
            speedElement.textContent = pokemon.stats.find(stat => stat.stat.name === 'speed').base_stat;

            // Update the Pokémon types on the page
            pokemon.types.forEach(type => {
                const typeElement = document.createElement('div');
                typeElement.textContent = type.type.name.toUpperCase();
                typesElement.appendChild(typeElement);
            });

            // Add the Pokémon sprite (image) to the page
            const spriteImg = document.createElement('img');
            spriteImg.id = 'sprite';
            spriteImg.src = pokemon.sprites.front_default; // Set sprite image source
            document.body.appendChild(spriteImg); // Append the sprite image to the body
        })
        .catch(error => {
            // Handle invalid Pokémon name or ID by showing an error message
            alert('Pokémon not found');
        });
});
