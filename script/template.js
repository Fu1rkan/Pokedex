function pokemonOverlay(pokemonData, typeImg){
    return `
        <div class="pokemon_card" onclick="toggleRespPokemonOverlay(${pokemonData.id})" style="background-color: ${colorByType[pokemonData.types[0].type.name]}">
            <div class="name_and_id">
                <h3 id="pokemon-name">${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h3>
                <p>#${pokemonData.id}</p>
            </div>
            <div>
                <img src="${pokemonData.sprites.other['official-artwork'].front_default}" alt="" class="pokemon_img">
            </div>
            <div class="pokemon_type">
                <div class="pokemon_type_container">
                    <img src="${typeImg}" alt="">
                </div>
            </div>
        </div>
    `
}

function pokemonOverlay2Types(pokemonData, typeImg, type2Img){
    return `
        <div class="pokemon_card" onclick="toggleRespPokemonOverlay(${pokemonData.id})" style="background-color: ${colorByType[pokemonData.types[0].type.name]}">
            <div class="name_and_id">
                <h3 id="pokemon-name">${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h3>
                <p>#${pokemonData.id}</p>
            </div>
            <div>
                <img src="${pokemonData.sprites.other['official-artwork'].front_default}" alt="" class="pokemon_img">
            </div>
            <div class="pokemon_type">
                <div class="pokemon_type_container">
                    <img src="${typeImg}" alt="">
                </div>
                <div class="pokemon_type_container">
                    <img src="${type2Img}" alt="">
                </div>
            </div>
        </div>
    `
}


function pokemonMainOverlay(pokemonData, species, typeImg){
    return `
        <div class="resp_pokemon_overlay d_none" id="pokemon${pokemonData.id}">
            <div class="name_and_id_resp_overlay">
                <img src="./img/close.png" alt="" onclick="toggleRespPokemonOverlay(${pokemonData.id})" class="close_resp_overlay">
                <h2>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h2>
                <p>#${pokemonData.id}</p>
            </div>
            <div class="pokemon_img_container_resp_overlay" style="background-color: ${colorByType[pokemonData.types[0].type.name]}">
                <img src="${pokemonData.sprites.other['official-artwork'].front_default}" class="pokemon_img_resp_overlay">
                <img src="./img/pokeball.png" alt="" class="pokeball_bg">
            </div>
            <div class="pokemon_type_resp_overlay">
                <img src="${typeImg}" alt="">
            </div>
            <div class="pokemon_info_bar">
                <div class="pokemon_info_type pokemon_info_type_border" onclick="setActiveOverlay('info-about${pokemonData.id}', 'about-overlay${pokemonData.id}', ${pokemonData.id})" id="info-about${pokemonData.id}">about</div>
                <div class="pokemon_info_type" onclick="setActiveOverlay('info-stats${pokemonData.id}', 'stats-overlay${pokemonData.id}', ${pokemonData.id})" id="info-stats${pokemonData.id}">stats</div>
                <div class="pokemon_info_type" onclick="setActiveOverlay('info-evo-chain${pokemonData.id}', 'evo-chain-overlay${pokemonData.id}', ${pokemonData.id})" id="info-evo-chain${pokemonData.id}">evo chain</div>
            </div>
            <div class="about_overlay" id="about-overlay${pokemonData.id}">
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
            </div>
            <div class="stats_overlay d_none" id="stats-overlay${pokemonData.id}">
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
            </div>
            <div class="evo_chain_overlay d_none" id="evo-chain-overlay${pokemonData.id}">
                <img src="${pokemonData.sprites.other['official-artwork'].front_default}">
                <div class="evo_demand">
                    <p>lvl 16</p>
                    <img src="./img/right-arrow.png" alt="">
                </div>
                <img src="./img/05.png" alt="" class="evo_chain_img">
                <div class="evo_demand">
                    <p>lvl 16</p>
                    <img src="./img/right-arrow.png" alt="">
                </div>
                <img src="./img/glurak.png" alt="" class="evo_chain_img">
            </div>
        </div>
    `
}

function pokemonMainOverlay2Types(pokemonData, species, typeImg, type2Img){
    return `
        <div class="resp_pokemon_overlay d_none" id="pokemon${pokemonData.id}">
            <div class="name_and_id_resp_overlay">
                <img src="./img/close.png" alt="" onclick="toggleRespPokemonOverlay(${pokemonData.id})" class="close_resp_overlay">
                <h2>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h2>
                <p>#${pokemonData.id}</p>
            </div>
            <div class="pokemon_img_container_resp_overlay" style="background-image: linear-gradient(90deg, ${colorByType[pokemonData.types[0].type.name]} 10%, ${colorByType[pokemonData.types[1].type.name]} 70%);">
                <img src="${pokemonData.sprites.other['official-artwork'].front_default}" class="pokemon_img_resp_overlay">
                <img src="./img/pokeball.png" alt="" class="pokeball_bg">
            </div>
            <div class="pokemon_type_resp_overlay">
                <img src="${typeImg}" alt="">
                <img src="${type2Img}" alt="">
            </div>
            <div class="pokemon_info_bar">
                <div class="pokemon_info_type pokemon_info_type_border" onclick="setActiveOverlay('info-about${pokemonData.id}', 'about-overlay${pokemonData.id}' ,${pokemonData.id})" id="info-about${pokemonData.id}">about</div>
                <div class="pokemon_info_type" onclick="setActiveOverlay('info-stats${pokemonData.id}', 'stats-overlay${pokemonData.id}' ,${pokemonData.id})" id="info-stats${pokemonData.id}">stats</div>
                <div class="pokemon_info_type" onclick="setActiveOverlay('info-evo-chain${pokemonData.id}', 'evo-chain-overlay${pokemonData.id}' ,${pokemonData.id})" id="info-evo-chain${pokemonData.id}">evo chain</div>
            </div>
            <div class="about_overlay" id="about-overlay${pokemonData.id}">
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
            </div>
            <div class="stats_overlay d_none" id="stats-overlay${pokemonData.id}">
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
            </div>
            <div class="evo_chain_overlay d_none" id="evo-chain-overlay${pokemonData.id}">
                <img src="${pokemonData.sprites.other['official-artwork'].front_default}">
                <div class="evo_demand">
                    <p>lvl 16</p>
                    <img src="./img/right-arrow.png" alt="">
                </div>
                <img src="./img/05.png" alt="" class="evo_chain_img">
                <div class="evo_demand">
                    <p>lvl 16</p>
                    <img src="./img/right-arrow.png" alt="">
                </div>
                <img src="./img/glurak.png" alt="" class="evo_chain_img">
            </div>
        </div>
    `
}

function loadMorePokemonsTemp(){
    return`
        <button class="load_more_button" onclick="loadMorePokemon()">load more</button>
    `
}