document.addEventListener('change', function (event) {
    if (event.target.id != 'columna') return

    if(event.target.value == '-'){
        busqueda(event,1)
        event.target.parentElement.querySelector('input').setAttribute('style','display:none;')
        event.target.parentElement.querySelector('input').value = ''
    }else{
        busqueda(event,1)
        event.target.parentElement.querySelector('input').setAttribute('style','')
        event.target.parentElement.querySelector('input').value = ''
    }
})
// function busqueda(event) {
document.addEventListener('keyup', function (event) {

    if (event.target.id == 'buscar') busqueda(event)
})

function busqueda(event,limpiar = 0) {
    var filter, table, tr, td, columna, td_cont, td_none

    filter = event.target.value.toUpperCase() //Parametro pasado a mayuscula
    table = event.target.parentNode.parentNode.parentNode.parentNode
    tr = table.getElementsByTagName("tr") 
    columna = event.target.parentNode.querySelector('select').value //Culumna en cual va a hacer la busqueda
    if(limpiar == 1) {
        for (let i = 0; i < tr.length; i++) {
            tr[i].setAttribute('style','')
            if (tr[i].getElementsByTagName("td").length == 0) {
                event.target.parentNode.parentNode.parentNode.parentNode.querySelector("#no_datos").setAttribute('style','')
            }else{
                event.target.parentNode.parentNode.parentNode.parentNode.querySelector("#no_datos").setAttribute('style','display:none;')
            }
        }
        return false
    }
    td_cont = 0
    td_none = 0
    if(columna == '-'){
        alert('Seleccione la columna en la que quiere buscar.')
        return false
    }
    // recorre todos los tr
    for (let i = 0; i < tr.length; i++) {
        tr[i].setAttribute('style','')

        // Elemento td de la columna seleccionada
        td = tr[i].getElementsByTagName("td")[columna]
        if (td) {
            td_cont++
            //indexOf() retorna el indice donde se encuentra la palaba(filter) o -1 si no esta
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].setAttribute('style','')
                event.target.parentNode.parentNode.parentNode.parentNode.querySelector("#no_datos").setAttribute('style','display:none;')
            } else {
                td_none++
                tr[i].setAttribute('style','display:none;')
            }
        }
    }
    // td_cont va a contar todos los td y td_none va a contar todos los que puso en none
    // si son iguales es porque no encontro ningun dato con los parametros
    console.log(td_cont,td_none)
    if(td_cont == td_none){
        // console.log('no datos')
        event.target.parentNode.parentNode.parentNode.parentNode.querySelector("#no_datos").setAttribute('style','')
    }
}