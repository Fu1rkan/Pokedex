let pokemonCounter = 0;

let names = [];

let currentNames = [];

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

let progress = 0;

async function generatePokemons(pokemons){
    for (let i = 0; i < pokemons.length; i++) {
        try {
            loadingBar(pokemons);
            let pokemonLink = await fetch(pokemons[i].url);
            let pokemonData = await pokemonLink.json();
            await getPokemonInfos(pokemonData);
            names.push(pokemonData.name);
        } catch (error) {
            console.error("Fehler beim Abrufen:", error);
        }
    }
    resetLoadingBar();
}

async function getPokemonInfos(pokemonData){
    try {
        let type1Link = await fetch(pokemonData.types[0].type.url);
        let type1Data = await type1Link.json();
        let speciesLink = await fetch(pokemonData.species.url);
        let speciesData = await speciesLink.json();
        await checkType(pokemonData, type1Data, speciesData);
        await checkEvoChain(pokemonData, speciesData);
    } catch (error) {
        console.error("Fehler beim Überschreiben in HTML:", error);
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

async function playAudio(pokemon){
    let pokemonLink = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
    let pokemonData = await pokemonLink.json();
    new Audio(pokemonData.cries.latest).play();
}