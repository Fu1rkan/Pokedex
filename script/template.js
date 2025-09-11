function pokemonCardOverlay(pokemonData, type1Data, type2Data){
    return `
        <div class="pokemon_card" onclick="togglePokemonOverlay(${pokemonData.id})" style="background-image: linear-gradient(90deg, ${colorByType[type1Data.name]} 30%, ${colorByType[type2Data.name]} 70%)" id="${pokemonData.name}">
            <div class="name_and_id">
                <h3 id="pokemon-name">${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h3>
                <p>#${pokemonData.id}</p>
            </div>
            <div>
                <img src="${pokemonData.sprites.other['official-artwork'].front_default}" alt="" class="pokemon_img">
            </div>
            <div class="pokemon_type">
                ${type(type1Data, type2Data, pokemonData)}
            </div>
        </div>
    `
}

function type(type1Data, type2Data, pokemonData){
    if (pokemonData.types.length > 1) {
        return `
            <div class="pokemon_type_container">
                <img src="${type1Data.sprites['generation-viii']['sword-shield'].name_icon}" alt="">
            </div>
            <div class="pokemon_type_container">
                <img src="${type2Data.sprites['generation-viii']['sword-shield'].name_icon}" alt="">
            </div>
        `
    }else{
        return `
            <div class="pokemon_type_container">
                <img src="${type1Data.sprites['generation-viii']['sword-shield'].name_icon}" alt="">
            </div>
        `
    }
    
}

function pokemonMainOverlay(pokemonData, type1Data, type2Data){
    return `
        <div id="left-arrow${pokemonData.id}" class="zi2"></div>
        <div class="pokemon_overlay d_none" id="pokemon${pokemonData.id}">
            <div class="name_and_id_overlay">
                <img src="./img/close.png" alt="" onclick="togglePokemonOverlay(${pokemonData.id})" class="close_overlay">
                <h2>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h2>
                <p>#${pokemonData.id}</p>
            </div>
            <div class="pokemon_img_container_overlay" style="background-image: linear-gradient(90deg, ${colorByType[type1Data.name]} 30%, ${colorByType[type2Data.name]} 70%)">
                <img src="${pokemonData.sprites.other['official-artwork'].front_default}" class="pokemon_img_overlay" onclick="playAudio(${pokemonData.id})">
                <img src="./img/pokeball.png" alt="" class="pokeball_bg">
            </div>
            <div class="pokemon_type_overlay">
                ${renderTypes(pokemonData, type1Data, type2Data)}
            </div>
            <div class="pokemon_info_bar">
                <div class="pokemon_info_type pokemon_info_type_border" onclick="setActiveOverlay('info-about${pokemonData.id}', 'about-overlay${pokemonData.id}', ${pokemonData.id})" id="info-about${pokemonData.id}">about</div>
                <div class="pokemon_info_type" onclick="setActiveOverlay('info-stats${pokemonData.id}', 'stats-overlay${pokemonData.id}', ${pokemonData.id})" id="info-stats${pokemonData.id}">stats</div>
                <div class="pokemon_info_type" onclick="setActiveOverlay('info-evo-chain${pokemonData.id}', 'evo-chain-overlay${pokemonData.id}', ${pokemonData.id})" id="info-evo-chain${pokemonData.id}">evo chain</div>
            </div>
            <div class="about_overlay" id="about-overlay${pokemonData.id}"></div>
            <div class="stats_overlay d_none" id="stats-overlay${pokemonData.id}"></div>
            <div class="evo_chain_overlay d_none" id="evo-chain-overlay${pokemonData.id}"></div>
        </div>
        <div id="right-arrow${pokemonData.id}" class="zi2"></div>
        <div class="resp_arrows" id="resp-arrows${pokemonData.id}"></div>
    `
}

function oneTypeTemp(type1Data){
    return `
        <img src="${type1Data.sprites['generation-viii']['sword-shield'].name_icon}" alt="">
    `
}

function twoTypeTemp(type1Data, type2Data){
    return `
        <img src="${type1Data.sprites['generation-viii']['sword-shield'].name_icon}" alt="">
        <img src="${type2Data.sprites['generation-viii']['sword-shield'].name_icon}" alt="">
    `
}

function noEvoChainOverlayTemp(){
    return `
        <h4>has no Evo Chain</h4>
    `
}

function oneEvoChainOverlayTemp(pokemonData1, pokemonData2){
    return `
        <img src="${pokemonData1.sprites.other['official-artwork'].front_default}" class="evo_chain_img">
        <div class="evo_demand">
            <img src="./img/right-arrow.png" alt="">
        </div>
        <img src="${pokemonData2.sprites.other['official-artwork'].front_default}" alt="" class="evo_chain_img">
    `
}

function twoEvoChainOverlayTemp(pokemonData1, pokemonData2, pokemonData3){
    return `
        <img src="${pokemonData1.sprites.other['official-artwork'].front_default}" class="evo_chain_img">
        <div class="evo_demand">
            <img src="./img/right-arrow.png" alt="">
        </div>
        <img src="${pokemonData2.sprites.other['official-artwork'].front_default}" alt="" class="evo_chain_img">
        <div class="evo_demand">
            <img src="./img/right-arrow.png" alt="">
        </div>
        <img src="${pokemonData3.sprites.other['official-artwork'].front_default}" alt="" class="evo_chain_img">
    `
}

function aboutOverlay(pokemonData, species){
    return `
        <table class="table_info">
            <tr>
                <td>Species</td>
                <td class="t_bold">${species.genera[7].genus}</td>
            </tr>
            <tr>
                <td>Height</td>
                <td class="t_bold">${pokemonData.height}m</td>
            </tr>
            <tr>
                <td>Wheight</td>
                <td class="t_bold">${pokemonData.weight}kg</td>
            </tr>
            <tr>
                <td>Base Experience</td>
                <td class="t_bold">${pokemonData.base_experience}</td>
            </tr>
        </table>
    `
}

function statsOverlay(pokemonData){
    return`
        <table class="stats_table">
            <tr>
                <td class="stats">hp</td>
                <td class="stats_percentage">${pokemonData.stats[0].base_stat}</td>
                <td class="stats_bar_td">
                    <div class="stats_bar_container">
                        <div class="stats_bar" style="width: calc(100%*${pokemonData.stats[0].base_stat}/255)"></div>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="stats">attack</td>
                <td class="stats_percentage">${pokemonData.stats[1].base_stat}</td>
                <td class="stats_bar_td">
                    <div class="stats_bar_container">
                        <div class="stats_bar" style="width: calc(100%*${pokemonData.stats[1].base_stat}/190)"></div>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="stats">defense</td>
                <td class="stats_percentage">${pokemonData.stats[2].base_stat}</td>
                <td class="stats_bar_td">
                    <div class="stats_bar_container">
                        <div class="stats_bar" style="width: calc(100%*${pokemonData.stats[2].base_stat}/250)"></div>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="stats">special-attack</td>
                <td class="stats_percentage">${pokemonData.stats[3].base_stat}</td>
                <td class="stats_bar_td">
                    <div class="stats_bar_container">
                        <div class="stats_bar" style="width: calc(100%*${pokemonData.stats[3].base_stat}/194)"></div>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="stats">special-defense</td>
                <td class="stats_percentage">${pokemonData.stats[4].base_stat}</td>
                <td class="stats_bar_td">
                    <div class="stats_bar_container">
                        <div class="stats_bar" style="width: calc(100%*${pokemonData.stats[4].base_stat}/250)"></div>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="stats">speed</td>
                <td class="stats_percentage">${pokemonData.stats[5].base_stat}</td>
                <td class="stats_bar_td">
                    <div class="stats_bar_container">
                        <div class="stats_bar" style="width: calc(100%*${pokemonData.stats[5].base_stat}/200)"></div>
                    </div>
                </td>
            </tr>
        </table>
    `
}

function loadMorePokemonsTemp(){
    return`
        <button class="load_more_button" onclick="loadMorePokemon()">load more</button>
    `
}

function bleurBg(pokemonData){
    return`
        <div class="bleur_bg" onclick="togglePokemonOverlay(${pokemonData})" id="bleur-bg">
        </div>
    `
}

function leftArrow(pokemonData){
    return`
        <img src="./img/left-arrow.png" alt="" class="d_none switch_arrows" id="switch-arrow${pokemonData.id}" onclick="switchBackward(${pokemonData.id})">
    `
}

function rightArrow(pokemonData){
    return`
        <img src="./img/right-arrow.png" alt="" class="d_none switch_arrows" id="switch-arrow-right${pokemonData.id}" onclick="switchForward(${pokemonData.id})">
    `
}

function respArrows(pokemonData){
    return`
        <img src="./img/left-arrow.png" alt="" class="d_none switch_arrows_resp" id="switch-arrow-resp${pokemonData.id}" onclick="switchBackward(${pokemonData.id})">
        <img src="./img/right-arrow.png" alt="" class="d_none switch_arrows_resp" id="switch-arrow-right-resp${pokemonData.id}" onclick="switchForward(${pokemonData.id})">
    `
}