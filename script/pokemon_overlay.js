function toggleRespPokemonOverlay(){
    let overlay = document.getElementById('resp-pokemon-overlay');
    overlay.classList.toggle('d_none');
}

function setActiveOverlay(activeBar, activeOverlay){
    let barId = ['info-about', 'info-stats', 'info-evo-chain', 'info-about-main-overlay', 'info-stats-main-overlay', 'info-evo-chain-main-overlay'];
    let overlayId = ['about-overlay', 'stats-overlay', 'evo-chain-overlay', 'about-main-overlay', 'stats-main-overlay', 'evo-chain-main-overlay'];

    barId.forEach(bar => document.getElementById(bar).classList.remove('pokemon_info_type_border'));
    overlayId.forEach(overlay => document.getElementById(overlay).classList.add('d_none'));

    document.getElementById(activeBar).classList.add('pokemon_info_type_border');
    document.getElementById(activeOverlay).classList.remove('d_none');
}