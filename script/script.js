let pokemonCounter = 0;

let colorByType = {
    "normal":   "#A8A77A",
    "fire":     "#EE8130",
    "water":    "#6390F0",
    "electric": "#F7D02C",
    "grass":    "#62bc5a",
    "ice":      "#96D9D6",
    "fighting": "#C22E28",
    "poison":   "#A33EA1",
    "ground":   "#E2BF65",
    "flying":   "#A98FF3",
    "psychic":  "#F95587",
    "bug":      "#A6B91A",
    "rock":     "#B6A136",
    "ghost":    "#735797",
    "dragon":   "#6F35FC",
    "dark":     "#705746",
    "steel":    "#B7B7CE",
    "fairy":    "#D685AD"
}

async function loadPokemon() {
    JSON.parse(localStorage.getItem("pokemon"));
    try{
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
        let data = await response.json();
        let pokemon = data.results;
        generatePokemons(pokemon);
        pokemonCounter += 20;

    }catch (error){
        console.error("Fehler beim Abrufen:", error);
    }
}

async function generatePokemons(pokemonList){
    for (let i = 0; i < pokemonList.length; i++) {
        let pokemonStats = await fetch(pokemonList[i].url);
        let pokemonData = await pokemonStats.json();
        await setToHtml(pokemonData);
    }
}

async function setToHtml(pokemonData){
    let typeData = await fetch(pokemonData.types[0].type.url);
    let type = await typeData.json();
    let typeImg = type.sprites['generation-viii']['sword-shield'].name_icon
    let speciesData = await fetch(pokemonData.species.url);
    let species = await speciesData.json();

    checkType(pokemonData, typeImg, species);
    checkEvoChain(pokemonData, species);
}

async function checkType(pokemonData, typeImg, species) {
    if (pokemonData.types.length > 1) {
        let type2Data = await fetch(pokemonData.types[1].type.url);
        let type2 = await type2Data.json();
        let type2Img = type2.sprites['generation-viii']['sword-shield'].name_icon
        document.getElementById('pokemon-cards-overlay').innerHTML += pokemonOverlay2Types(pokemonData, typeImg, type2Img);
        document.getElementById('main-pokemon-overlay').innerHTML += pokemonMainOverlay2Types(pokemonData, species, typeImg, type2Img)
    }else{
        document.getElementById('pokemon-cards-overlay').innerHTML += pokemonOverlay(pokemonData, typeImg);
        document.getElementById('main-pokemon-overlay').innerHTML += pokemonMainOverlay(pokemonData, species, typeImg)
    }
}

async function checkEvoChain(pokemonData, pokemon){
    let response = await fetch(pokemon.evolution_chain.url);
    let data = await response.json();
    let evoChain = data.chain.evolves_to;
    
    if (evoChain.length > 0) {
        if (evoChain[0].evolves_to.length > 0) {
            if (evoChain[0].evolution_details.length > 0) {
                let evoChain1Response = await fetch(data.chain.species.url);
                let evoChain1 = await evoChain1Response.json();
                let pokemonData1Response = await fetch(evoChain1.varieties[0].pokemon.url);
                let pokemonData1 = await pokemonData1Response.json();
    
                let evoChain2Response = await fetch(data.chain.evolves_to[0].species.url);
                let evoChain2 = await evoChain2Response.json();
                let pokemonData2Response = await fetch(evoChain2.varieties[0].pokemon.url);
                let pokemonData2 = await pokemonData2Response.json();
    
                let evoChain3Response = await fetch(data.chain.evolves_to[0].evolves_to[0].species.url);
                let evoChain3 = await evoChain3Response.json();
                let pokemonData3Response = await fetch(evoChain3.varieties[0].pokemon.url);
                let pokemonData3 = await pokemonData3Response.json();

                document.getElementById(`evo-chain-overlay${pokemonData.id}`).innerHTML += twoEvoChainOverlay(pokemonData1, pokemonData2, pokemonData3);
            }else{
                console.log('hat geklappt');
                
            }
        }else{
            let evoChain1Response = await fetch(data.chain.species.url);
            let evoChain1 = await evoChain1Response.json();
            let pokemonData1Response = await fetch(evoChain1.varieties[0].pokemon.url);
            let pokemonData1 = await pokemonData1Response.json();

            let evoChain2Response = await fetch(data.chain.evolves_to[0].species.url);
            let evoChain2 = await evoChain2Response.json();
            let pokemonData2Response = await fetch(evoChain2.varieties[0].pokemon.url);
            let pokemonData2 = await pokemonData2Response.json();

            document.getElementById(`evo-chain-overlay${pokemonData.id}`).innerHTML += oneEvoChainOverlay(pokemonData1, pokemonData2);
        }
        
    }else{
        document.getElementById(`evo-chain-overlay${pokemonData.id}`).innerHTML += noEvoChainOverlay(); 
    }
}

async function loadMorePokemons() {
    try{
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${pokemonCounter}&limit=20`);
        let data = await response.json();
        let pokemon = data.results;
        
        await generatePokemons(pokemon);
        pokemonCounter += 20;
        
    }catch (error){
        console.error("Fehler beim Abrufen:", error);
    }
}

function switchBackward(pokemonData){
    if (pokemonData > 1) {
        toggleRespPokemonOverlay(pokemonData);
        pokemonData -= 1;
        toggleRespPokemonOverlay(pokemonData);
    }
}

function switchForward(pokemonData){
    let pokemonContainer = document.getElementById('pokemon-cards-overlay');
    let pokemons = pokemonContainer.querySelectorAll(":scope > div");

    if (pokemonData < pokemons.length) {
        toggleRespPokemonOverlay(pokemonData);
        pokemonData += 1;
        toggleRespPokemonOverlay(pokemonData);
    }else{
        loadMorePokemons();
    }
}

async function playAudio(pokemon){
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`);
    let data = await response.json();
    new Audio(data.cries.latest).play();
}