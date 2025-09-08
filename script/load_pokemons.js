let results = 0;

async function loadPokemon() {
    try{
        document.getElementById('loading-screen').classList.remove('d_none');
        document.getElementById('my-body').classList.add('o_h');
        let pokemonsLink = await fetch(`https://pokeapi.co/api/v2/pokemon`);
        let pokemons = await pokemonsLink.json();
        await generatePokemons(pokemons.results);
        pokemonCounter += 20;
        currentNames = names;
        document.getElementById('my-body').classList.remove('o_h');
        document.getElementById('loading-screen').classList.add('d_none')
    }catch (error){
        console.error("Fehler beim Abrufen:", error);
    }
}

async function loadMorePokemons() {
    try{
        document.getElementById('loading-screen').classList.remove('d_none');
        document.getElementById('my-body').classList.add('o_h');
        await getNewPokemonList();
        pokemonCounter += 20;
        currentNames = names;
        document.getElementById('my-body').classList.remove('o_h');
        document.getElementById('loading-screen').classList.add('d_none');
    }catch (error){
        console.error("Fehler beim Abrufen:", error);
    }
}

async function getNewPokemonList(){
    try {
        let pokemonListLink = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${pokemonCounter}&limit=20`);
        let pokemonListData = await pokemonListLink.json();
        let pokemons = pokemonListData.results;
        await generatePokemons(pokemons);
    } catch (error) {
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

async function switchForward(pokemonData){
    let pokemonCards = document.getElementById('pokemon-cards-overlay').querySelectorAll(":scope > div");

    if (pokemonData < pokemonCards.length) {
        togglePokemonOverlay(pokemonData);
        pokemonData += 1;
        togglePokemonOverlay(pokemonData);
    }else{
        await loadMorePokemons();
        document.getElementById('my-body').classList.add('o_h');
    }
}