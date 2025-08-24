function pokemonOverlay(pokemonData){
    return `
        <div class="pokemon_card" onclick="toggleRespPokemonOverlay(${pokemonData})">
            <div class="name_and_id">
                <h3 id="pokemon-name">${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h3>
                <p>#${pokemonData.id}</p>
            </div>
            <div>
                <img src="${pokemonData.sprites.other['official-artwork'].front_default}" alt="" class="pokemon_img">
            </div>
            <div class="pokemon_type">
                <div class="pokemon_type_container">
                    <img src="" alt="">
                </div>
            </div>
        </div>
    `
}

function pokemonOverlay2Types(pokemonId, data, dataType, dataType2){
    return `
        <div class="pokemon_card" onclick="toggleRespPokemonOverlay(${pokemonId})">
            <div class="name_and_id">
                <h3 id="pokemon-name">${data.name}</h3>
                <p>#${data.id}</p>
            </div>
            <div class="ppp">
                <img src="${data.sprites.other['official-artwork'].front_default}" alt="" class="pokemon_img">
            </div>
            <div class="pokemon_type">
                <div class="pokemon_type_container">
                    <img src="${dataType.sprites['generation-viii']['sword-shield'].name_icon}" alt="">
                </div>
                <div class="pokemon_type_container">
                    <img src="${dataType2.sprites['generation-viii']['sword-shield'].name_icon}" alt="">
                </div>
            </div>
        </div>
    `
}

function pokemonMainOverlay(){
    return `
        <div class="resp_pokemon_overlay">
            <div class="name_and_id_resp_overlay">
                <img src="./img/close.png" alt="" onclick="toggleRespPokemonOverlay()" class="close_resp_overlay">
                <h2>Glurak</h2>
                <p>#6</p>
            </div>
            <div class="pokemon_img_container_resp_overlay">
                <img src="./img/glurak.png" alt="" class="pokemon_img_resp_overlay">
                <img src="./img/pokeball.png" alt="" class="pokeball_bg">
            </div>
            <div class="pokemon_type_resp_overlay">
                <img src="./img/fire.png" alt="">
                <img src="./img/flying.png" alt="">
            </div>
            <div class="pokemon_info_bar">
                <div class="pokemon_info_type pokemon_info_type_border" onclick="setActiveOverlay('info-about', 'about-overlay')" id="info-about">about</div>
                <div class="pokemon_info_type" onclick="setActiveOverlay('info-stats', 'stats-overlay')" id="info-stats">stats</div>
                <div class="pokemon_info_type" onclick="setActiveOverlay('info-evo-chain', 'evo-chain-overlay')" id="info-evo-chain">evo chain</div>
            </div>
            <div class="about_overlay" id="about-overlay">
                <table class="table_info">
                    <tr>
                        <td>Species</td>
                        <td class="t_bold">Flame Pokémon</td>
                    </tr>
                    <tr>
                        <td>Shape</td>
                        <td class="t_bold">Bipedal</td>
                    </tr>
                    <tr>
                        <td>Habitat</td>
                        <td class="t_bold">Mountain</td>
                    </tr>
                    <tr>
                        <td>Height</td>
                        <td class="t_bold">1,7m</td>
                    </tr>
                    <tr>
                        <td>Wheight</td>
                        <td class="t_bold">905kg</td>
                    </tr>
                    <tr>
                        <td>Base Experience</td>
                        <td class="t_bold">240</td>
                    </tr>
                    <tr>
                        <td>Capture Rate</td>
                        <td class="t_bold">45</td>
                    </tr>
                </table>
            </div>
            <div class="stats_overlay d_none" id="stats-overlay">
                <table class="stats_table">
                    <tr>
                        <td class="stats">hp</td>
                        <td class="stats_percentage">80</td>
                        <td class="stats_bar_td">
                            <div class="stats_bar_container">
                                <div class="stats_bar"></div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="stats">attack</td>
                        <td class="stats_percentage">80</td>
                        <td class="stats_bar_td">
                            <div class="stats_bar_container">
                                <div class="stats_bar"></div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="stats">defense</td>
                        <td class="stats_percentage">80</td>
                        <td class="stats_bar_td">
                            <div class="stats_bar_container">
                                <div class="stats_bar"></div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="stats">special-attack</td>
                        <td class="stats_percentage">80</td>
                        <td class="stats_bar_td">
                            <div class="stats_bar_container">
                                <div class="stats_bar"></div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="stats">special-defense</td>
                        <td class="stats_percentage">80</td>
                        <td class="stats_bar_td">
                            <div class="stats_bar_container">
                                <div class="stats_bar"></div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="stats">speed</td>
                        <td class="stats_percentage">80</td>
                        <td class="stats_bar_td">
                            <div class="stats_bar_container">
                                <div class="stats_bar"></div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="evo_chain_overlay d_none" id="evo-chain-overlay">
                <img src="./img/04.png" alt="" class="evo_chain_img">
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