function toggleRespPokemonOverlay(pokemonData){
    document.getElementById('main-pokemon-overlay').classList.toggle('d_none');
    document.getElementById(`pokemon${pokemonData}`).classList.toggle('d_none');
    document.getElementById(`switch-arrow-right${pokemonData}`).classList.toggle('d_none');
    document.getElementById(`switch-arrow${pokemonData}`).classList.toggle('d_none');
}

function setActiveOverlay(activeBar, activeOverlay, pokemonId){
    let barId = [`info-about${pokemonId}`, `info-stats${pokemonId}`, `info-evo-chain${pokemonId}`];
    let overlayId = [`about-overlay${pokemonId}`, `stats-overlay${pokemonId}`, `evo-chain-overlay${pokemonId}`];

    barId.forEach(bar => document.getElementById(bar).classList.remove('pokemon_info_type_border'));
    overlayId.forEach(overlay => document.getElementById(overlay).classList.add('d_none'));

    document.getElementById(activeBar).classList.add('pokemon_info_type_border');
    document.getElementById(activeOverlay).classList.remove('d_none');
}