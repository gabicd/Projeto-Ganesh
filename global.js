//funções e variaveis utilizadas nas duas paginas

export let ganeshData
export const bandeiraBR = "assets/BR.svg"
export const bandeiraUS = "assets/US.svg"
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