
let ganeshData
const bandeiraBR = "assets/BR.svg"
const bandeiraUS = "assets/US.svg"
const lupa = `<img id="lupa" src="assets/lupa.png" alt="lupa">`
let indexNoticia

async function initializeSite() {
    await loadData()
    setPage('pt-br') //idioma default
}

async function loadData() {
    try{
        const response = await fetch('GaneshData.json')
        ganeshData = await response.json()
    }
    
    catch(error){
        console.error(error)
    }
}

function setPage(language){
    document.getElementById("resumo-grupo").textContent = ganeshData.informacoes[language].subtitulo
    document.getElementById("sobre-texto1").textContent = ganeshData.informacoes[language].sobre[0]
    document.getElementById("sobre-texto2").textContent = ganeshData.informacoes[language].sobre[1]
    document.getElementById("aba-noticias").textContent = ganeshData.informacoes[language].aba
}


async function switchLanguage(){
    const lang = document.getElementById('lang').textContent.toLowerCase()
    if(lang === "pt-br"){
        await loadData()
        setPage('en-us')
        document.getElementById('lang').textContent = "en-US"
        document.getElementById("bandeira").src = bandeiraUS
        document.getElementById('titulo').innerHTML = 'About <span id="highlight">Ganesh</span>'
        document.getElementById('more').innerHTML = `${lupa}Learn More`
    }
    else{
        await loadData()
        setPage('pt-br')
        document.getElementById('lang').textContent = "pt-BR"
        document.getElementById("bandeira").src = bandeiraBR
        document.getElementById('titulo').innerHTML = 'Sobre o <span id="highlight">Ganesh</span>'
        document.getElementById('more').innerHTML = `${lupa}Saiba Mais`
    }

}

initializeSite()
