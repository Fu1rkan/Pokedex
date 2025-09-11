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

function changeArrow(){
    document.getElementById(`switch-arrow1`).classList.add('filter');
    document.getElementById(`switch-arrow-resp1`).classList.add('filter');
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

function activeLoadscreen(){
    document.getElementById('loading-screen').classList.remove('d_none');
    document.getElementById('my-body').classList.add('o_h');
}

function deactiveLoadscreen(){
    document.getElementById('my-body').classList.remove('o_h');
    document.getElementById('loading-screen').classList.add('d_none');
}

async function loadScreenPokemonOverlay(bleurOverlay, container, pokemonData){
    document.getElementById('loading-bar').classList.add('d_none');
    activeLoadscreen();
    while (overlayLoader) await new Promise(r => setTimeout(r, 60));
    classListChanges(pokemonData);
    if (1 <= container.length) {
        bleurOverlay.innerHTML = "";
    }else{
        bleurOverlay.innerHTML += bleurBg(pokemonData);
    }
    deactiveLoadscreen();
    document.getElementById('loading-bar').classList.remove('d_none');
    document.getElementById('my-body').classList.add('o_h');
}

function loadingBar(pokemons){
    progress += (100 / pokemons.length);
    document.getElementById('progress').innerHTML = "";
    document.getElementById('progress').innerHTML += `${progress}%`;
    document.getElementById('loading-progress').style.width = `${progress}%`;
}

function resetLoadingBar(){
    progress = 0;
    document.getElementById('progress').innerHTML = "";
    document.getElementById('progress').innerHTML += `${progress}%`;
    document.getElementById('loading-progress').style.width = `${progress}%`;
}