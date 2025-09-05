let pokemonCounter = 0;

let names = [];

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

async function loadPokemon() {
    try{
        let pokemonsLink = await fetch(`https://pokeapi.co/api/v2/pokemon`);
        let pokemons = await pokemonsLink.json();
        pokemons = pokemons.results;
        generatePokemons(pokemons);
        pokemonCounter += 20;
    }catch (error){
        console.error("Fehler beim Abrufen:", error);
    }
}

async function generatePokemons(pokemons){
    for (let i = 0; i < pokemons.length; i++) {
        try {
            let pokemonLink = await fetch(pokemons[i].url);
            let pokemonData = await pokemonLink.json();
            await setToHtml(pokemonData);
            names.push(pokemonData.name);
        } catch (error) {
            console.error("Fehler beim Abrufen:", error);
        }
    } 
}

async function setToHtml(pokemonData){
    try {
        let type1Link = await fetch(pokemonData.types[0].type.url);
        let type1Data = await type1Link.json();
        let speciesLink = await fetch(pokemonData.species.url);
        let speciesData = await speciesLink.json();
        checkType(pokemonData, type1Data, speciesData);
        checkEvoChain(pokemonData, speciesData);
    } catch (error) {
        console.error("Fehler beim Überschreiben in HTML:", error);
    }
}

async function checkType(pokemonData, type1Data, speciesData) {
    if (pokemonData.types.length > 1) {
        getSecondTypeImg(pokemonData, type1Data, speciesData);
    }else{
        let type2Data = type1Data;
        document.getElementById('pokemon-cards-overlay').innerHTML += pokemonCardOverlay(pokemonData, type1Data, type2Data);
        document.getElementById('main-pokemon-overlay').innerHTML += pokemonMainOverlay(pokemonData, speciesData, type1Data, type2Data);
    }
}

async function getSecondTypeImg(pokemonData, type1Data, speciesData){
    try {
        let type2Link = await fetch(pokemonData.types[1].type.url);
        let type2Data = await type2Link.json();
        document.getElementById('pokemon-cards-overlay').innerHTML += pokemonCardOverlay(pokemonData, type1Data, type2Data);
        document.getElementById('main-pokemon-overlay').innerHTML += pokemonMainOverlay(pokemonData, speciesData, type1Data, type2Data);
    } catch (error) {
        console.error("Fehler beim Abrufen:", error);
    }
}

async function checkEvoChain(pokemonData, pokemon){
    let evoLink = await fetch(pokemon.evolution_chain.url);
    let evoData = await evoLink.json();
    
    checkFirstEvoChain(pokemonData, evoData);
}

async function checkFirstEvoChain(pokemonData, evoData){
    if (evoData.chain.evolves_to.length > 0) {
        getfirstPokemonData(pokemonData, evoData);
    }else{
        document.getElementById(`evo-chain-overlay${pokemonData.id}`).innerHTML += noEvoChainOverlay(); 
    }
}

async function getfirstPokemonData(pokemonData, evoData){
    try {
        let evoChain1Link = await fetch(evoData.chain.species.url);
        let evoChain1Data = await evoChain1Link.json();
        let pokemonData1Link = await fetch(evoChain1Data.varieties[0].pokemon.url);
        let pokemonData1 = await pokemonData1Link.json();
        getSecondPokemonData(pokemonData, evoData, pokemonData1);
    } catch (error) {
        console.error("Fehler beim Abrufen:", error); 
    }
}

async function getSecondPokemonData(pokemonData, evoData, pokemonData1){
    try {
        let evoChain2Link = await fetch(evoData.chain.evolves_to[0].species.url);
        let evoChain2Data = await evoChain2Link.json();
        let pokemonData2Link = await fetch(evoChain2Data.varieties[0].pokemon.url);
        let pokemonData2 = await pokemonData2Link.json();
        checkSecondEvoChain(pokemonData, evoData, pokemonData1, pokemonData2);
    } catch (error) {
        console.error("Fehler beim Abrufen:", error); 
    }
}

async function checkSecondEvoChain(pokemonData, evoData, pokemonData1, pokemonData2){
    if (evoData.chain.evolves_to[0].evolves_to.length > 0) {
        if (evoData.chain.evolves_to[0].evolution_details.length > 0) {
            getThirdPokemonData(pokemonData, evoData, pokemonData1, pokemonData2);
        }
    }else{
        document.getElementById(`evo-chain-overlay${pokemonData.id}`).innerHTML += oneEvoChainOverlay(pokemonData1, pokemonData2);
    }
}

async function getThirdPokemonData(pokemonData, evoData, pokemonData1, pokemonData2){
    try {
        let evoChain3Link = await fetch(evoData.chain.evolves_to[0].evolves_to[0].species.url);
        let evoChain3Data = await evoChain3Link.json();
        let pokemonData3Link = await fetch(evoChain3Data.varieties[0].pokemon.url);
        let pokemonData3 = await pokemonData3Link.json();
        document.getElementById(`evo-chain-overlay${pokemonData.id}`).innerHTML += twoEvoChainOverlay(pokemonData1, pokemonData2, pokemonData3);
    } catch (error) {
        console.error("Fehler beim Abrufen:", error); 
    }
}

async function loadMorePokemons() {
    try{
        let pokemonListLink = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${pokemonCounter}&limit=20`);  // Link zur nächsten Liste
        let pokemonListData = await pokemonListLink.json();
        let pokemons = pokemonListData.results;
        
        await generatePokemons(pokemons);
        pokemonCounter += 20;
        
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

async function playAudio(pokemon){
    let pokemonLink = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
    let pokemonData = await pokemonLink.json();
    new Audio(pokemonData.cries.latest).play();
}

function searchPokemon(){
    let input = document.getElementById('search-bar').value.toLowerCase();
    for (let i = 0; i < names.length; i++) {
        if (input.length >=3) {
            if (!names[i].toLowerCase().includes(input)) {
                document.getElementById(`${names[i]}`).classList.add('d_none');
            }else {
                document.getElementById(`${names[i]}`).classList.remove('d_none');
            }
        }else{
            document.getElementById(`${names[i]}`).classList.remove('d_none');
        }
    }
}
