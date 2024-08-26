const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonInfoBackground = document.getElementById("pokemon-info");

//constants for pokemon info
const pokemonImage = document.getElementById("pokemon-img");
const pokemonName = document.getElementById("pokemon-name");
const pokemonID = document.getElementById("pokemon-id"); 
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonTypes = document.getElementById("types");

//constants for pokemon stats
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

async function fetchData(){

    try {
        let pokemonName = document.getElementById("search-input").value;

        if(isNaN(pokemonName)){
            pokemonName = pokemonName.toLowerCase();
        }

        const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonName}`);

        const data = await response.json();

        assignPokemonInfo(data);
        assignPokemonStats(data);

    } catch(error) {
        alert("Pokémon not found")
        console.log(error);
    }
}


const assignPokemonInfo = (pokemonData) => {
    const pokemonSprite = pokemonData.sprites.front_default;

    // Update the image element
    pokemonImage.src = pokemonSprite;
    pokemonName.textContent = `${pokemonData.name.toUpperCase()}`;
    pokemonID.textContent = `#${pokemonData.id}`;
    pokemonWeight.textContent = `Weight: ${pokemonData.weight}`;
    pokemonHeight.textContent = `Height: ${pokemonData.height}`; 

    pokemonTypes.innerHTML = pokemonData.types.map(obj => 
        `<span>${obj.type.name[0].toUpperCase() + obj.type.name.slice(1)}</span>`
    ).join(" ");

    pokemonInfoBackground.style.visibility = "visible";
}

const assignPokemonStats = (pokemonData) => {
    hp.textContent = pokemonData.stats[0].base_stat;
    attack.textContent = pokemonData.stats[1].base_stat;
    defense.textContent = pokemonData.stats[2].base_stat;
    specialAttack.textContent = pokemonData.stats[3].base_stat;
    specialDefense.textContent = pokemonData.stats[4].base_stat;
    speed.textContent = pokemonData.stats[5].base_stat;
}


searchButton.addEventListener("click", e => {
    e.preventDefault();
    fetchData();
});

searchInput.addEventListener("keydown", e => {
    if (e.key === "Enter"){
        searchButton.click();
    }
});