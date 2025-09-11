async function loadMorePokemons(){
    try{
        activeLoadscreen();
        await getNewPokemonList();
        deactiveLoadscreen();
    }catch (error){
        console.error("Fehler beim Abrufen:", error);
    }finally{
        pokemonCounter += 20;
        currentNames = names;
        await generateMainOverviewData();
    }
    checkLimit();
    document.getElementById('switch-arrow1').classList.add('filter');
}

async function loadMorePokemonsBySwitch(){
    try{
        activeLoadscreen();
        await getNewPokemonList();
        document.getElementById('loading-bar').classList.add('d_none');
        pokemonCounter += 20;
        currentNames = names;
        await generateMainOverviewData();
        deactiveLoadscreen();
        document.getElementById('loading-bar').classList.remove('d_none');
    }catch (error){
        console.error("Fehler beim Abrufen:", error);
    }
}

async function getNewPokemonList(){
    try {
        let pokemonListLink = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${pokemonCounter}&limit=20`);
        let pokemons = await pokemonListLink.json();
        await generatePokemons(pokemons.results);
        resetLoadingBar();
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
        switchOverlay(pokemonData);
    }else{
        await loadMorePokemonsBySwitch();
        document.getElementById('my-body').classList.add('o_h');
        switchOverlay(pokemonData);
        document.getElementById('search-bar').value = "";
        searchPokemon();
    }
}

function switchOverlay(pokemonData){
    togglePokemonOverlay(pokemonData);
    pokemonData += 1;
    togglePokemonOverlay(pokemonData);
}