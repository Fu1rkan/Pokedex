function searchPokemon(){
    let input = document.getElementById('search-bar').value.toLowerCase();
    results = 0;
    for (let i = 0; i < currentNames.length; i++) {
        checkInputValueLenght(currentNames[i], input);
    }
}

function checkInputValueLenght(currentNames, input){
    if (input.length >=3) {
        filterPokemonResults(currentNames, input);
        noResultsBySearching(currentNames, input);
        document.getElementById('load-more-button').classList.add('opacity0');
    }else{
        document.getElementById(`${currentNames}`).classList.remove('d_none');
        document.getElementById(`no-results`).classList.add('d_none');
        document.getElementById(`check-letters`).classList.remove('d_none');
        document.getElementById('load-more-button').classList.remove('opacity0');
    }
    infoAboutLetterLength(input);
}

function filterPokemonResults(currentNames, input){
    if (!currentNames.toLowerCase().includes(input)){
        document.getElementById(`${currentNames}`).classList.add('d_none');
    }else {
        document.getElementById(`${currentNames.toLowerCase()}`).classList.remove('d_none');
    }
}

function noResultsBySearching(currentNames, input){
    if (currentNames.includes(input)) {
        results += 1;
    }

    if (!results > 0) {
        document.getElementById(`no-results`).classList.remove('d_none');
    }else{
        document.getElementById(`no-results`).classList.add('d_none');
    }
}

function infoAboutLetterLength(input){
    if (input.length > 2) {
        document.getElementById(`check-letters`).classList.add('d_none');   
    }else if(!input.length > 0){
        document.getElementById(`check-letters`).classList.add('d_none');   
    }else{
        document.getElementById(`check-letters`).classList.remove('d_none');   
    }
}