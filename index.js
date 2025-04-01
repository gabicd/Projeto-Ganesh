import { ganeshData, loadData, bandeira, idioma } from "./global.js"

async function initializeSite() {   //carregar dados do .JSON e inicializar a pagina
    await loadData()
    const idiomaSalvo = localStorage.getItem('idioma')
    if(!idiomaSalvo){
        setPage('pt-br')    //idioma default
    }
    setPage(idiomaSalvo) 
    
}

function setPage(language){                                                                            //definir os elementos no idioma selecionado
    document.getElementById("resumo-grupo").textContent = ganeshData.informacoes[language].subtitulo
    document.getElementById("sobre-texto1").textContent = ganeshData.informacoes[language].sobre[0]
    document.getElementById("sobre-texto2").textContent = ganeshData.informacoes[language].sobre[1]
    document.getElementById("aba-noticias").textContent = ganeshData.informacoes[language].aba
    document.getElementById('lang').textContent = ganeshData.informacoes[language].idioma
    document.getElementById("bandeira").src = ganeshData.informacoes[language].imagem
    document.getElementById('titulo').innerHTML = ganeshData.informacoes[language].sobreTitulo
    document.getElementById('more').innerHTML = ganeshData.informacoes[language].lupa

    const lastLanguage = document.getElementById('lang').textContent.toLowerCase()
    localStorage.setItem('idioma', lastLanguage)
}

[bandeira, idioma].forEach((element) =>{                                        //adicionar a função de trocar o idioma aos elementos da bandeira e nome do idioma
    element.addEventListener('click', async () =>{
        const lang = document.getElementById('lang').textContent.toLowerCase()
        if(lang === "pt-br"){
            await loadData()
            setPage('en-us')

        }
        else{
            await loadData()
            setPage('pt-br')

        }
    })
})


initializeSite()    //função executada ao carregar a pagina
