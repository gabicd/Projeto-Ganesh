import { ganeshData, loadData, bandeiraBR, bandeiraUS, bandeira, idioma } from "./global.js";
const limite = 5    //limite de noticias por pagina
let lastIndex       //guarda o index da ultima noticia carregada
const backButton =  document.getElementById('back-button')
const forwardButton = document.getElementById('forward-button')

async function initializeNews() {
    await loadData()
    setNews('pt-br', 1) //idioma e pagina default
}

function setNews(language, page){
    document.getElementById("aba-noticias").textContent = ganeshData.informacoes[language].aba
    
    const divCards = document.getElementById('div-cards');
    divCards.innerHTML = '';    //limpar a div antes de fazer qualquer modificação
    
    if(page == 1){                                                       //adição de noticias para a primeira pagina
           ganeshData.noticias[language].forEach((noticia, index) => {
        if(index < limite){
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
            lastIndex = index
        }
    });  
    }

    else{                                                                                        //adição de noticias caso a pagina nao seja a inicial
        let count = 0
        for(let i = lastIndex + 1; i < ganeshData.noticias[language].length && count < 5; i++){
            const noticiaCard = document.createElement('div');  
            noticiaCard.className = 'noticiaCard';
    
            const noticiaName = document.createElement('p');   
            noticiaName.textContent = `${ganeshData.noticias[language][i].titulo}`;
            noticiaName.className = 'noticiaName'
            noticiaCard.appendChild(noticiaName);
    
            const noticiaDesc = document.createElement('p');   
            noticiaDesc.textContent = `${ganeshData.noticias[language][i].descricao}`;
            noticiaDesc.className = 'noticiaDesc'
            noticiaCard.appendChild(noticiaDesc);
    
            divCards.appendChild(noticiaCard)

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
            document.getElementById('lang').textContent = "en-US"
            document.getElementById("bandeira").src = bandeiraUS
            document.getElementById('titulo').textContent = "News"
        }
        else{
            await loadData()
            setNews('pt-br', pageNumber)
            document.getElementById('lang').textContent = "pt-BR"
            document.getElementById("bandeira").src = bandeiraBR
            document.getElementById('titulo').innerHTML = 'Notícias'
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


initializeNews()    //função executada ao carregar a pagina