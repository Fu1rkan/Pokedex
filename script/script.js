async function loadPokemon() {
    try{
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
        let data = await response.json();
        let pokemon = data.results;

        for (let i = 0; i < pokemon.length; i++) {
            let pokemonStats = await fetch(pokemon[i].url);
            let pokemonData = await pokemonStats.json();
            document.getElementById('pokemon-cards-overlay').innerHTML += pokemonOverlay(pokemonData );
        }
        
    }catch (error){
        console.error("Fehler beim Abrufen:", error);
    }
}