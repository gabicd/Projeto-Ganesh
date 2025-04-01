//funções e variaveis utilizadas nas duas paginas

export let ganeshData
export const bandeira = document.getElementById('bandeira')
export const idioma = document.getElementById('lang')

export async function loadData() {
    try{
        const response = await fetch('GaneshData.json')
        ganeshData = await response.json()
    }
    
    catch(error){
        console.error(error)
    }
}
