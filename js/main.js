document.addEventListener('DOMContentLoaded', () => {
    const random = getRandomInt(1, 151)
    fecthData( random )
})

// Escuchar el evento Enter y ejecutar la funcion fetchData
document.addEventListener('keypress', (e) => {

    const flex      = document.querySelector('.flex')
    const flex_card = document.querySelector('.card')
    const img = document.createElement('img')
     
    if(e.key === 'Enter') {
        flex.appendChild(img)
        const name = e.target.value

        if(flex_card) {
            flex_card.remove()
            fecthData(name.trim())

        } else {
            fecthData(name.trim())
        } 
        
    }
   
})


// Generar un numero aleatoria entre min y max
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const fecthData = async(name) => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const data = await res.json()

        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            name: data.name,
            hp: data.stats[0].base_stat
        }
        setPokemonCard(pokemon)
    } catch(error) {
        console.log(error)
        alert('Ese pokemon no existe')
    }
}


    
    


const setPokemonCard = (pokemon) => {
    console.log(pokemon)
    const template = document.getElementById('template-card').content
    const cloneTemplate = template.cloneNode(true)
    const flex = document.querySelector('.flex')
    const fragment = document.createDocumentFragment()

    // Inserción de los datos
    cloneTemplate.querySelector('.card-body-img').setAttribute('src', pokemon.img )
    cloneTemplate.querySelector('.card-body-title').innerHTML = `${pokemon.name.toUpperCase()}<span>${ pokemon.hp }</span>`

    fragment.appendChild(cloneTemplate)
    flex.appendChild(fragment)

    
}