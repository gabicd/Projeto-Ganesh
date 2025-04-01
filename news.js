import { ganeshData, loadData, bandeira, idioma } from "./global.js";
const limite = 5    //limite de noticias por pagina
let lastIndex       //guarda o index da ultima noticia carregada
const backButton =  document.getElementById('back-button')
const forwardButton = document.getElementById('forward-button')

async function initializeNews() {
    await loadData()
    const idiomaSalvo = localStorage.getItem('idioma')
    if(!idiomaSalvo){
        setNews('pt-br', 1)    
    }
    setNews(idiomaSalvo, 1) 
}

function setNews(language, page){
    document.getElementById("aba-noticias").textContent = ganeshData.informacoes[language].aba
    
    document.getElementById('lang').textContent = ganeshData.informacoes[language].idioma
    document.getElementById("bandeira").src = ganeshData.informacoes[language].imagem
    document.getElementById('titulo-n').textContent = ganeshData.informacoes[language].aba

    const lastLanguage = document.getElementById('lang').textContent.toLowerCase()
    localStorage.setItem('idioma', lastLanguage)

    const divCards = document.getElementById('div-cards');
    divCards.innerHTML = '';    //limpar a div antes de fazer qualquer modificação
    
    if(page == 1){                                                       //adição de noticias para a primeira pagina
           ganeshData.noticias[language].forEach((noticia, index) => {
        if(index < limite){

            createCards(noticia, divCards)

            lastIndex = index
        }
    });  
    }

    else{                                                                                        //adição de noticias caso a pagina nao seja a inicial
        let count = 0
        for(let i = lastIndex + 1; i < ganeshData.noticias[language].length && count < 5; i++){
            
            createCards(ganeshData.noticias[language][i], divCards)

            count++
        }
    }

}

[bandeira, idioma].forEach((element) =>{                                        //adicionar a função de trocar o idioma aos elementos da bandeira e nome do idioma
    element.addEventListener('click', async () =>{
        const lang = document.getElementById('lang').textContent.toLowerCase()
        const pageNumber = document.getElementById('page-number').textContent
    
        if(lang === "pt-br"){
            await loadData()
            setNews('en-us', pageNumber)
        }
        else{
            await loadData()
            setNews('pt-br', pageNumber)
        }
    })
})

backButton.addEventListener('click', async () =>{                           //adicionar a função de navegar para a pagina anterior ao respectivo botao de navegaçao
    const pageNumber = document.getElementById('page-number')
    const lang = document.getElementById('lang').textContent.toLowerCase()
    
    let index = pageNumber.textContent
    if(index > 1){
        index--
        pageNumber.textContent = index
        await loadData()
        setNews(lang, index)
        console.log(index)
    }
    else{
        alert(ganeshData.informacoes[lang].alertaVolta)
        console.log(index)
    }
})

forwardButton.addEventListener('click', async () =>{                        //adicionar a função de navegar para a pagina seguinte ao respectivo botao de navegaçao
    const pageNumber = document.getElementById('page-number')
    const lang = document.getElementById('lang').textContent.toLowerCase()
    const maxPage = Math.ceil(ganeshData.noticias[lang].length / limite)    

    let index = pageNumber.textContent
    if(index < maxPage){
        index++
        pageNumber.textContent = index
        await loadData()
        setNews(lang, index)
    }

    else{
        alert(ganeshData.informacoes[lang].alertaIr)
    }
})

function createCards(noticia, divCards){

    const noticiaCard = document.createElement('div');  
    noticiaCard.className = 'noticiaCard';

    const noticiaName = document.createElement('p');   
    noticiaName.textContent = `${noticia.titulo}`;
    noticiaName.className = 'noticiaName'
    noticiaCard.appendChild(noticiaName);

    const noticiaDesc = document.createElement('p');   
    noticiaDesc.textContent = `${noticia.descricao}`;
    noticiaDesc.className = 'noticiaDesc'
    noticiaCard.appendChild(noticiaDesc);

    divCards.appendChild(noticiaCard)

}


initializeNews()    //função executada ao carregar a pagina