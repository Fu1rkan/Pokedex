async function loadPokemon() {
    try{
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
        let data = await response.json();
        let pokemon = data.results;

        for (let i = 0; i < pokemon.length; i++) {
            let pokemonStats = await fetch(pokemon[i].url);
            let pokemonData = await pokemonStats.json();
            setToHtml(pokemonData);
        }
        
    }catch (error){
        console.error("Fehler beim Abrufen:", error);
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