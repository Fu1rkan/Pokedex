async function loadPokemon() {
    try{
        document.getElementById('loading-screen').classList.remove('d_none')
        let pokemonsLink = await fetch(`https://pokeapi.co/api/v2/pokemon`);
        let pokemons = await pokemonsLink.json();
        pokemons = pokemons.results;
        await generatePokemons(pokemons);
        pokemonCounter += 20;
        currentNames = names;
        document.getElementById('loading-screen').classList.add('d_none')
    }catch (error){
        console.error("Fehler beim Abrufen:", error);
    }
}

async function loadMorePokemons() {
    try{
        document.getElementById('loading-screen').classList.remove('d_none')
        let pokemonListLink = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${pokemonCounter}&limit=20`);  // Link zur nächsten Liste
        let pokemonListData = await pokemonListLink.json();
        let pokemons = pokemonListData.results;
        await generatePokemons(pokemons);
        pokemonCounter += 20;
        currentNames = names;
        document.getElementById('loading-screen').classList.add('d_none');
    }catch (error){
        console.error("Fehler beim Abrufen:", error);
    }
}

function switchBackward(pokemonData){
    if (pokemonData > 1) {
        togglePokemonOverlay(pokemonData);
        pokemonData -= 1;
        togglePokemonOverlay(pokemonData);
    }
}

function switchForward(pokemonData){
    let pokemonCards = document.getElementById('pokemon-cards-overlay').querySelectorAll(":scope > div");

    if (pokemonData < pokemonCards.length) {
        togglePokemonOverlay(pokemonData);
        pokemonData += 1;
        togglePokemonOverlay(pokemonData);
    }else{
        loadMorePokemons();
    }
}

function searchPokemon(){
    let input = document.getElementById('search-bar').value.toLowerCase();
    for (let i = 0; i < currentNames.length; i++) {
        if (input.length >=3) {
            if (!currentNames[i].toLowerCase().includes(input)) {
                document.getElementById(`${currentNames[i]}`).classList.add('d_none');
            }else {
                document.getElementById(`${currentNames[i]}`).classList.remove('d_none');
            }
        }else{
            document.getElementById(`${currentNames[i]}`).classList.remove('d_none');
        }
    }
}