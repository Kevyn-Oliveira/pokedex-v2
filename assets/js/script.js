const backColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
}

loopCardCreation()

function createCard(id, name, type, types, sprite) {
    const container = document.getElementById("contentContainer")
    const backgroudColor = returnColorByType(types)
    container.innerHTML += `
        <div id="pokemonCard" style="
        background: linear-gradient(to bottom right, ${backgroudColor[0]} 20%,${backgroudColor[1]} 75%)">
        <div id="pokemonSection">
            <div id="nameSection"><p>#${id.toString().padStart(3, 0)}</p><p>${name.charAt(0).toUpperCase() + name.slice(1)}</p></div>
            <div id="typeSection">${type}</div>
        </div>
        <div id="spriteSection"><img src="${sprite}" alt=""></div>
        </div>
    `
}

function correctSize(height) {
    var altura = height.toString()
    altura = altura.slice(0, altura.length - 1) + "," + altura.slice(-1)
    altura = altura.padStart(3, 0) + "m"
    return altura
}

function correctWeight(weight) {
    var peso = weight.toString()
    peso = peso.slice(0, peso.length - 1) + "," + peso.slice(-1)
    peso = peso.padStart(3, 0) + "kg"
    return peso
}

function returnTypeArray(type) {
    if (type[1] == null) {
        return `<p class="monoType">${type[0].type.name}<p/>`
    }
    return `<p class="duoType">${type[0].type.name}<p/><p class="duoType">${type[1].type.name}<p/>`
}

function returnColorByType(types) {
    if (types[1] == null) {
        return [backColors[types[0].type.name], backColors[types[0].type.name]]
    }
    return [backColors[types[0].type.name], backColors[types[1].type.name]]
}

async function loopCardCreation() {
    for (let i = 1; i <= 151; i++) {
        await returnBasicInfo(i)
            .then(pokemon => {
                const typeHtml = returnTypeArray(pokemon.types)
                createCard(pokemon.id, pokemon.species.name, typeHtml, pokemon.types, pokemon.sprites.front_default);
            })
            .catch(error => {
                console.error(error);
            });
    }
}

async function returnBasicInfo(id) {
    const pokemonData = await fetchInfos('https://pokeapi.co/api/v2/pokemon/' + id);
    return pokemonData;
}

async function fetchInfos(url) {
    const response = await fetch(url);
    const json = await response.json();
    return json;
}