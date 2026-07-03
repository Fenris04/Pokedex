function pokemonCardTemplate(pokemon) {
    const type = pokemon.types[0].type.name;

    return `
        <button class="pokemonCard ${type}Type" data-id="card" data-pokemon-id="${pokemon.id}">
            <span class="pokemonNumber">#${formatPokemonId(pokemon.id)}</span>
            <img class="pokemonImage" data-id="card-image" src="${getPokemonImage(pokemon)}" alt="${pokemon.name}">
            <h2 class="pokemonName">${pokemon.name}</h2>
            <div class="pokemonTypes">${pokemonTypesTemplate(pokemon)}</div>
        </button>
    `;
}

function dialogTemplate(pokemon, text) {
    return `
        <div class="dialogContent" data-id="overlay-pokemon-name">
            ${closeButtonTemplate()}

            <section class="dialogLeft">
                <span class="dialogNumber">#${formatPokemonId(pokemon.id)}</span>
                <h2 class="dialogName">${pokemon.name}</h2>
                <div class="pokemonTypes">${pokemonTypesTemplate(pokemon)}</div>
                <img class="dialogImage" data-id="dialog-image" src="${getPokemonImage(pokemon)}" alt="${pokemon.name}">
                <p class="dialogText">${text}</p>
            </section>

            <section class="dialogRight">
                <h3>Base Stats</h3>
                ${radarStatsTemplate(pokemon)}
                ${pokemonInfoTemplate(pokemon)}
                ${dialogNavigationTemplate()}
            </section>
        </div>
    `;
}

function pokemonTypesTemplate(pokemon) {
    return pokemon.types.map(({ type }) => {
        return `<span class="pokemonType ${type.name}Type">${type.name}</span>`;
    }).join("");
}

function radarStatsTemplate(pokemon) {
    const stats = getRadarStats(pokemon);
    const points = getRadarPoints(stats);

    return `
        <div class="radarBox">
            <svg class="radarChart" viewBox="0 0 300 300">
                ${radarGridTemplate()}
                <polygon class="radarFill" points="${points}"></polygon>
                <polyline class="radarLine" points="${points} ${points.split(" ")[0]}"></polyline>
                ${radarDotsTemplate(stats)}
            </svg>
            ${radarLabelsTemplate(stats)}
        </div>
    `;
}


function radarGridTemplate() {
    return `
        <polygon class="radarGrid" points="150,45 241,97.5 241,202.5 150,255 59,202.5 59,97.5"></polygon>
        <polygon class="radarGrid" points="150,80 211,115 211,185 150,220 89,185 89,115"></polygon>
        <polygon class="radarGrid" points="150,115 180,132.5 180,167.5 150,185 120,167.5 120,132.5"></polygon>
        <line class="radarAxis" x1="150" y1="150" x2="150" y2="45"></line>
        <line class="radarAxis" x1="150" y1="150" x2="241" y2="97.5"></line>
        <line class="radarAxis" x1="150" y1="150" x2="241" y2="202.5"></line>
        <line class="radarAxis" x1="150" y1="150" x2="150" y2="255"></line>
        <line class="radarAxis" x1="150" y1="150" x2="59" y2="202.5"></line>
        <line class="radarAxis" x1="150" y1="150" x2="59" y2="97.5"></line>
    `;
}

function radarDotsTemplate(stats) {
    return stats.map((stat, index) => {
        const point = getRadarPoint(stat.value, index, stats.length);
        return `<circle class="radarDot" cx="${point.x}" cy="${point.y}" r="4"></circle>`;
    }).join("");
}

function radarLabelsTemplate(stats) {
    return stats.map((stat, index) => {
        return radarLabelTemplate(stat, index);
    }).join("");
}

function radarLabelTemplate(stat, index) {
    const classes = ["top", "rightTop", "rightBottom", "bottom", "leftBottom", "leftTop"];

    return `
        <div class="radarLabel ${classes[index]}">
            <span>${stat.name}</span>
            <strong>${stat.value}</strong>
        </div>
    `;
}

function pokemonInfoTemplate(pokemon) {
    return `
        <div class="pokemonInfoGrid">
            <div>
                <span>Height</span>
                <strong>${pokemon.height / 10} m</strong>
            </div>
            <div>
                <span>Weight</span>
                <strong>${pokemon.weight / 10} kg</strong>
            </div>
            <div>
                <span>Abilities</span>
                <strong>${getAbilities(pokemon)}</strong>
            </div>
        </div>
    `;
}

function closeButtonTemplate() {
    return `<button class="closeDialogButton" data-id="close-dialog-button">×</button>`;
}

function dialogNavigationTemplate() {
    return `
        <div class="dialogNavigation">
            <button data-id="prev-button">Previous</button>
            <button data-id="next-button">Next</button>
        </div>
    `;
}