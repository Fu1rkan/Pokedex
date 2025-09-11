function renderPokemonCard(pokemonData, type1Data, type2Data){
    document.getElementById('pokemon-cards-overlay').innerHTML += pokemonCardOverlay(pokemonData, type1Data, type2Data);
    document.getElementById('main-pokemon-overlay').innerHTML += pokemonMainOverlay(pokemonData, type1Data, type2Data);
}

function renderPokemonOverlay(pokemonIndex, fetchedPokemons, speciesData){
    document.getElementById(`about-overlay${pokemonIndex}`).innerHTML = "";
    document.getElementById(`about-overlay${pokemonIndex}`).innerHTML += aboutOverlay(fetchedPokemons[pokemonIndex], speciesData);
    document.getElementById(`stats-overlay${pokemonIndex}`).innerHTML = "";      
    document.getElementById(`stats-overlay${pokemonIndex}`).innerHTML += statsOverlay(fetchedPokemons[pokemonIndex]);        
    document.getElementById(`right-arrow${pokemonIndex}`).innerHTML = "";
    document.getElementById(`right-arrow${pokemonIndex}`).innerHTML += rightArrow(fetchedPokemons[pokemonIndex]);
    document.getElementById(`left-arrow${pokemonIndex}`).innerHTML = "";
    document.getElementById(`left-arrow${pokemonIndex}`).innerHTML += leftArrow(fetchedPokemons[pokemonIndex]);
    document.getElementById(`resp-arrows${pokemonIndex}`).innerHTML = "";
    document.getElementById(`resp-arrows${pokemonIndex}`).innerHTML += respArrows(fetchedPokemons[pokemonIndex]);
}

function renderTypes(pokemonData, type1Data, type2Data){
    if (pokemonData.types.length > 1) {
        return twoTypeTemp(type1Data, type2Data);
    }else{
        return oneTypeTemp(type1Data);
    }
}

function renderAboutOverlay(){

}

function renderStatsOverlay(){

}

function renderEvoChain(pokemonData, pokemonData1, pokemonData2, pokemonData3){
    document.getElementById(`evo-chain-overlay${pokemonData.id}`).innerHTML = "";
    if (pokemonData3) {
        document.getElementById(`evo-chain-overlay${pokemonData.id}`).innerHTML += twoEvoChainOverlayTemp(pokemonData1, pokemonData2, pokemonData3);
    } else if(pokemonData2){
        document.getElementById(`evo-chain-overlay${pokemonData.id}`).innerHTML += oneEvoChainOverlayTemp(pokemonData1, pokemonData2);
    }else{
        document.getElementById(`evo-chain-overlay${pokemonData.id}`).innerHTML += noEvoChainOverlayTemp();
    }
}
