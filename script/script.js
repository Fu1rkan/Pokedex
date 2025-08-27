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
    try{
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
        let data = await response.json();
        let pokemon = data.results;
        
        generatePokemons(pokemon);

    }catch (error){
        console.error("Fehler beim Abrufen:", error);
    }
}

async function generatePokemons(pokemonList){
    for (let i = 0; i < pokemonList.length; i++) {
        let pokemonStats = await fetch(pokemonList[i].url);
        let pokemonData = await pokemonStats.json();
        setToHtml(pokemonData);
    }
}

async function setToHtml(pokemonData){
    let typeData = await fetch(pokemonData.types[0].type.url);
    let type = await typeData.json();
    let typeImg = type.sprites['generation-viii']['sword-shield'].name_icon
    let speciesData = await fetch(pokemonData.species.url);
    let species = await speciesData.json();

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

async function loadMorePokemon() {
    try{
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
        let data = await response.json();
        let pokemon = data.results;
        
        generatePokemons(pokemon);

    }catch (error){
        console.error("Fehler beim Abrufen:", error);
    }
}