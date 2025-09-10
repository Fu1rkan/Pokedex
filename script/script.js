let pokemonCounter = 0;

let pokemonOverlayCounter = 0;

let progress = 0;

let names = [];

let currentNames = [];

let fetchedPokemons = ['placeholder'];

let results = 0;

let overlayLoader = false;

let colorByType = {
    "normal":   "#919aa2",
    "fire":     "#fe9d55",
    "water":    "#6390F0",
    "electric": "#F7D02C",
    "grass":    "#63BB59",
    "ice":      "#96D9D6",
    "fighting": "#C22E28",
    "poison":   "#A33EA1",
    "ground":   "#d97845",
    "flying":   "#8fa9de",
    "psychic":  "#F95587",
    "bug":      "#91c12e",
    "rock":     "#B6A136",
    "ghost":    "#735797",
    "dragon":   "#6F35FC",
    "dark":     "#705746",
    "steel":    "#5a8ea2",
    "fairy":    "#D685AD"
}

async function generatePokemons(pokemons){
    for (let pokemonIndex = 0; pokemonIndex < pokemons.length; pokemonIndex++) {
        try {
            loadingBar(pokemons);
            let pokemonLink = await fetch(pokemons[pokemonIndex].url);
            let pokemonData = await pokemonLink.json();
            fetchedPokemons.push(pokemonData)
            await getPokemonInfos(pokemonData);
            names.push(pokemonData.name);
        } catch (error) {
            console.error("Fehler beim Abrufen:", error);
        }
    }
}

async function generateMainOverviewData() {
    overlayLoader = true;
    for (let pokemonIndex = 1 + pokemonOverlayCounter; pokemonIndex < fetchedPokemons.length; pokemonIndex++) {
        let speciesLink = await fetch(fetchedPokemons[pokemonIndex].species.url);
        let speciesData = await speciesLink.json();
        await checkEvoChain(fetchedPokemons[pokemonIndex], speciesData);
        renderPokemonOverlay(pokemonIndex, fetchedPokemons, speciesData);
    }
    overlayLoader = false;
    pokemonOverlayCounter += 20;
}

function renderPokemonOverlay(pokemonIndex, fetchedPokemons, speciesData){
    document.getElementById(`about-overlay${pokemonIndex}`).innerHTML += aboutOverlay(fetchedPokemons[pokemonIndex], speciesData);
    document.getElementById(`stats-overlay${pokemonIndex}`).innerHTML += statsOverlay(fetchedPokemons[pokemonIndex]);        
    document.getElementById(`right-arrow${pokemonIndex}`).innerHTML += rightArrow(fetchedPokemons[pokemonIndex]);
    document.getElementById(`left-arrow${pokemonIndex}`).innerHTML += leftArrow(fetchedPokemons[pokemonIndex]);
    document.getElementById(`resp-arrows${pokemonIndex}`).innerHTML += respArrows(fetchedPokemons[pokemonIndex]);
}

async function getPokemonInfos(pokemonData){
    try {
        let type1Link = await fetch(pokemonData.types[0].type.url);
        let type1Data = await type1Link.json();
        await checkType(pokemonData, type1Data);
    } catch (error) {
        console.error("Fehler beim Überschreiben in HTML:", error);
    }
}

async function playAudio(pokemon){
    try {
        let pokemonLink = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
        let pokemonData = await pokemonLink.json();
        new Audio(pokemonData.cries.latest).play();
    } catch (error) {
        console.error("Fehler beim Abrufen:", error);
    }
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