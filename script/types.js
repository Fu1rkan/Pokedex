async function checkType(pokemonData, type1Data) {
    if (pokemonData.types.length > 1) {
        getSecondTypeImg(pokemonData, type1Data);
    }else{
        let type2Data = type1Data;
        document.getElementById('pokemon-cards-overlay').innerHTML += pokemonCardOverlay(pokemonData, type1Data, type2Data);
        document.getElementById('main-pokemon-overlay').innerHTML += pokemonMainOverlay(pokemonData, type1Data, type2Data);
    }
}

async function getSecondTypeImg(pokemonData, type1Data){
    try {
        let type2Link = await fetch(pokemonData.types[1].type.url);
        let type2Data = await type2Link.json();
        document.getElementById('pokemon-cards-overlay').innerHTML += pokemonCardOverlay(pokemonData, type1Data, type2Data);
        document.getElementById('main-pokemon-overlay').innerHTML += pokemonMainOverlay(pokemonData, type1Data, type2Data);
    } catch (error) {
        console.error("Fehler beim Abrufen:", error);
    }
}