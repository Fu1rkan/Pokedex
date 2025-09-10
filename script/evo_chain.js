async function checkEvoChain(pokemonData, pokemonSpecies){
    let evoLink = await fetch(pokemonSpecies.evolution_chain.url);
    let evoData = await evoLink.json();
    
    checkFirstEvoChain(pokemonData, evoData);
}

async function checkFirstEvoChain(pokemonData, evoData){
    if (evoData.chain.evolves_to.length > 0) {
        await getfirstPokemonData(pokemonData, evoData);
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
        await getSecondPokemonData(pokemonData, evoData, pokemonData1);
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
        await checkSecondEvoChain(pokemonData, evoData, pokemonData1, pokemonData2);
    } catch (error) {
        console.error("Fehler beim Abrufen:", error); 
    }
}

async function checkSecondEvoChain(pokemonData, evoData, pokemonData1, pokemonData2){
    if (evoData.chain.evolves_to[0].evolves_to.length > 0) {
        if (evoData.chain.evolves_to[0].evolution_details.length > 0) {
            await getThirdPokemonData(pokemonData, evoData, pokemonData1, pokemonData2);
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