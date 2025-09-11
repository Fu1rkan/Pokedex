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