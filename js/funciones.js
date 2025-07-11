function openNav() { document.getElementById("mySidenav").style.width = "250px" }
function closeNav() { document.getElementById("mySidenav").style.width = "0" }

function cargar_datos(op) {
    const datosPost = new FormData()
    datosPost.append('op', op)
    fetch('ajax/ajax_cargar_datos.php', {
        method: "POST",
        // Set the post data
        body: datosPost,
        contentType: false,
        processData: false
    })
    .then(response => response.json())
    .then(function (json) {
        let datos = ''
        if (json.error != '') return alertify.error(json.error)
        if (op == 'agentes') {
            json.datos.forEach(element => {
                datos += '<tr><td>'+element.agente+'</td><td>'+element.documento+'</td><td><img src="'+element.foto+'" class="foto-navbar"></td>'
                datos += '<th style="padding: 0px;padding-left: 25px;"><i style="font-size: xx-large;" class="bi bi-trash"'
                datos += `onclick="eliminar(this,'`+element.id+`','agente')"></i></th></tr>`
            });            
            if (datos == '') datos = '<tr><td colspan="15" class="text-center">No encontramos agentes disponibles</td></tr>'
            else datos += '<th colspan="15" id="no_datos" style="display: none;" class="text-center">No encontramos agentes disponibles</th>'
            document.querySelector('#datos_agentes').innerHTML = datos

        }else if(op == 'registros') {
            json.datos.forEach(element => {
                datos += '<tr><td>'+element.agente+'</td><td>'+element.cruce+'</td><td>'+element.fecha+'</td>'
                datos += '<td>'+element.lugar+'</td><th style="padding: 0px;padding-left: 25px;">'
                datos += `<i style="font-size: xx-large;" class="bi bi-trash" onclick="eliminar(this,'`+element.id+`','registro')"></i></th></tr>`
                
                if (datos == '') datos = '<tr><td colspan="15" class="text-center">No encontramos registros disponibles</td></tr>'
                else datos += '<th colspan="15" id="no_datos" style="display: none;" class="text-center">No encontramos registros disponibles</th>'
                document.querySelector('#datos_registros').innerHTML = datos
            });
        }else if(op == 'registros_pendientes') {
            json.datos.forEach(element => {
                datos += '<tr><td>'+element.agente+'</td><td>'+element.cruce+'</td><td>'+element.fecha+'</td>'
                datos += '<td>'+element.lugar+'</td><td>'+element.observacion+'</td><th style="padding: 0px;padding-left: 25px;">'
                datos += `<i style="font-size: xx-large;color: green;" onclick="aceptar(this,`+element.id+`,'registro')" class="bi bi-check-circle"></i>
                <i style="font-size: xx-large;color: red;" onclick="eliminar(this,'`+element.id+`','registro')" class="bi bi-x-circle"></i></th></tr>`
            });
            if (datos == '') datos = '<tr><td colspan="15" class="text-center">No encontramos registros disponibles</td></tr>'
            else datos += '<th colspan="15" id="no_datos" style="display: none;" class="text-center">No encontramos registros disponibles</th>'
            document.querySelector('#datos_registros_pendientes').innerHTML = datos
        }else if(op == 'claves_pendientes') {
            json.datos.forEach(element => {
                datos += '<tr><td>'+element.agente+'</td><th style="padding: 0px;padding-left: 25px;">'
                datos += `<i style="font-size: xx-large;color: green;" onclick="aceptar(this,`+element.id+`,'clave')" class="bi bi-check-circle"></i>
                <i style="font-size: xx-large;color: red;" onclick="eliminar(this,'`+element.id+`','clave')" class="bi bi-x-circle"></i></th></tr>`
            });
            if (datos == '') datos = '<tr><td colspan="15" class="text-center">No encontramos registros disponibles</td></tr>'
            else datos += '<th colspan="15" id="no_datos" style="display: none;" class="text-center">No encontramos registros disponibles</th>'
            document.querySelector('#datos_claves_pendientes').innerHTML = datos
        }

    })
    .catch(function (error){
        console.log(error)
        alertify.error('Ocurrio un error inesperado, vuelva a intentar.')
    })
}


function cambiar_datos(event) {
    if (event.id == 'bot-agentes') {        
        cargar_datos('agentes')
        document.querySelector('#agentes').style.display = ''
        document.querySelector('#registros-pendientes').style.display = 'none'
        document.querySelector('#clave-pendientes').style.display = 'none'
        document.querySelector('#registros').style.display = 'none'
        document.querySelector('#fechas_registros').setAttribute('style','display:none !important;')
        document.querySelector('#bot-agentes').style = 'background-color: #464646;'
        document.querySelector('#bot-registros-pendientes').style = 'background-color: #000000;'
        document.querySelector('#bot-registros').style = 'background-color: #000000;'
        document.querySelector('#bot-clave-pendientes').style = 'background-color: #000000;'
    }else if (event.id == 'bot-registros-pendientes') {
        cargar_datos('registros_pendientes')
        document.querySelector('#agentes').style.display = 'none'
        document.querySelector('#registros-pendientes').style.display = ''
        document.querySelector('#clave-pendientes').style.display = 'none'
        document.querySelector('#registros').style.display = 'none'
        document.querySelector('#fechas_registros').setAttribute('style','display:none !important;')
        document.querySelector('#bot-agentes').style = 'background-color: #000000;'
        document.querySelector('#bot-registros-pendientes').style = 'background-color: #464646;'
        document.querySelector('#bot-registros').style = 'background-color: #000000;'
        document.querySelector('#bot-clave-pendientes').style = 'background-color: #000000;'
    }else if (event.id == 'bot-clave-pendientes') {
        cargar_datos('claves_pendientes')
        document.querySelector('#agentes').style.display = 'none'
        document.querySelector('#registros-pendientes').style.display = 'none'
        document.querySelector('#clave-pendientes').style.display = ''
        document.querySelector('#registros').style.display = 'none'
        document.querySelector('#fechas_registros').setAttribute('style','display:none !important;')
        document.querySelector('#bot-agentes').style = 'background-color: #000000;'
        document.querySelector('#bot-registros-pendientes').style = 'background-color: #000000;'
        document.querySelector('#bot-registros').style = 'background-color: #000000;'
        document.querySelector('#bot-clave-pendientes').style = 'background-color: #464646;'
    }else{
        cargar_datos('registros')
        document.querySelector('#agentes').style.display = 'none'
        document.querySelector('#registros-pendientes').style.display = 'none'
        document.querySelector('#clave-pendientes').style.display = 'none'
        document.querySelector('#registros').style.display = ''
        document.querySelector('#fechas_registros').style.display = ''
        document.querySelector('#bot-agentes').style = 'background-color: #000000;'
        document.querySelector('#bot-registros-pendientes').style = 'background-color: #000000;'
        document.querySelector('#bot-registros').style = 'background-color: #464646;'
        document.querySelector('#bot-clave-pendientes').style = 'background-color: #000000;'
    }
}

function cargar_agente(){
    const datosPost = new FormData()
    datosPost.append('nombre', document.querySelector('#nombre').value)
    datosPost.append('apellido', document.querySelector('#apellido').value)
    datosPost.append('documento', document.querySelector('#documento').value)
    datosPost.append('foto', document.querySelector('#foto').files[0])
    fetch('ajax/ajax_cargar_agente.php', {
        method: "POST",
        // Set the post data
        body: datosPost,
        contentType: false,
        processData: false
    })
    .then(response => response.json())
    .then(function (json) {
        if (json.error != '') return alertify.error(json.error)

        document.querySelector('#nombre').value = ''
        document.querySelector('#apellido').value = ''
        document.querySelector('#documento').value = ''
        // document.querySelector('#foto').value = ''
        alertify.success(json.resp)
    })
    .catch(function (error){
        console.log(error)
        alertify.error('Ocurrio un error inesperado, vuelva a intentar.')
    })
}

function carga_diferida(){
    const datosPost = new FormData()
    datosPost.append('documento', document.querySelector('#documento').value)
    datosPost.append('cruce', document.querySelector('#cruce').value)
    datosPost.append('fecha', document.querySelector('#fecha').value)
    
    fetch('ajax/ajax_carga_diferida.php', {
        method: "POST",
        // Set the post data
        body: datosPost
    })
    .then(response => response.json())
    .then(function (json) {
        if (json.error != '') return alertify.error(json.error)

        document.querySelector('#documento').value = ''
        document.querySelector('#cruce').value = ''
        document.querySelector('#fecha').value = ''
        alertify.success(json.resp)
    })
    .catch(function (error){
        console.log(error)
        alertify.error('Ocurrio un error inesperado, vuelva a intentar.')
    })
}

function eliminar(event,id,tipo){
    alertify.confirm('Registros de fichado', '¿Seguro quiere eliminar este '+tipo+'?', function(){
        console.log('id_'+tipo)
        const datosPost = new FormData()
        datosPost.append('id_'+tipo, id)
        fetch('ajax/ajax_eliminar.php', {
            method: "POST",
            // Set the post data
            body: datosPost
        })
        .then(response => response.json())
        .then(function (json) {
            if (json.error != '') return alertify.error(json.error)
                
            event.parentNode.parentNode.remove()
            alertify.error(json.resp)
        })
        .catch(function (error){
            console.log(error)
            alertify.error('Ocurrio un error inesperado, vuelva a intentar.')
        })
    }, function(){ 
        return alertify.error('Cancelado')
    })
}

function aceptar(event,id,tipo){
    let pregunta = tipo == 'clave' ? '¿Seguro quiere darle clave al usuario?' : '¿Seguro quiere aceptar este fichado?',
    titulo = tipo == 'clave' ? 'Claves pendientes' : 'Registros pendientes'
    
    alertify.confirm(titulo, pregunta, function(){
        const datosPost = new FormData()
        datosPost.append('id_'+tipo, id)
        fetch('ajax/ajax_aceptar.php', {
            method: "POST",
            // Set the post data
            body: datosPost
        })
        .then(response => response.json())
        .then(function (json) {
            if (json.error != '') return alertify.error(json.error)
                
            event.parentNode.parentNode.remove()
            alertify.success(json.resp)
        })
        .catch(function (error){
            console.log(error)
            alertify.error('Ocurrio un error inesperado, vuelva a intentar.')
        })
    }, function(){ 
        return alertify.error('Cancelado')
    })
}

function busqueda_registros(){
    let fecha_inicio = document.querySelector('#fecha_inicio').value,
    fecha_final = document.querySelector('#fecha_final').value

    const datosPost = new FormData()
    datosPost.append('fecha_inicio', fecha_inicio)
    datosPost.append('fecha_final', fecha_final)

    fetch('ajax/ajax_busqueda.php', {
        method: "POST",
        // Set the post data
        body: datosPost
    })
    .then(response => response.json())
    .then(function (json) {
        if (json.error != '') return alertify.error(json.error)
        
        let datos = ''
        json.datos.forEach(element => {
            datos += '<tr><td>'+element.agente+'</td><td>'+element.cruce+'</td>'
            datos += '<td>'+element.fecha+'</td><td>'+element.lugar+'</td><th style="padding: 0px;padding-left: 25px;">'
            datos += `<i style="font-size: xx-large;" class="bi bi-trash" onclick="eliminar(this,'+element.id+','registro')"></i></th></tr>`
            datos += '<th colspan="15" id="no_datos" style="display: none;" class="text-center">No encontramos agentes disponibles</th>'
        })
        
        datos = datos == '' ? '<tr><td colspan="15" class="text-center">No encontramos agentes disponibles</td></tr>' : datos
        document.querySelector('#datos_registros').innerHTML = datos
    })
    .catch(function (error){
        console.log(error)
        alertify.error('Ocurrio un error inesperado, vuelva a intentar.')
    })
}


function cargar_horario(){
    const datosPost = new FormData()
    datosPost.append('dia', document.querySelector('#dia').value)
    datosPost.append('hora_entrada', document.querySelector('#hora_entrada').value)
    datosPost.append('hora_salida', document.querySelector('#hora_salida').value)
    datosPost.append('observacion', document.querySelector('#observacion').value)
    fetch('ajax/ajax_cargar_horarios.php', {
        method: "POST",
        // Set the post data
        body: datosPost,
        contentType: false,
        processData: false
    })
    .then(response => response.json())
    .then(function (json) {
        if (json.error != '') return alertify.error(json.error)

        document.querySelector('#dia').value = ''
        document.querySelector('#hora_entrada').value = ''
        document.querySelector('#hora_salida').value = ''
        document.querySelector('#observacion').value = ''
        alertify.success(json.resp)
    })
    .catch(function (error){
        console.log(error)
        alertify.error('Ocurrio un error inesperado, vuelva a intentar.')
    })
}
id_dispositivo = 0
campos = ''
function modificar_dispositivo(event,op,id = ''){
    let local = document.querySelector('#dis_local'),
    mensaje = document.querySelector('#dis_mensaje')
    dispositivo = document.querySelector('#nom_dispositivo')
    if (id != '') id_dispositivo = id
    if (event != '') campos = event.parentNode
    if (op == 'cargar') {
        dispositivo.textContent = 'Dispositivo: '+campos.getElementsByTagName("td")[0].textContent
        local.value = campos.getElementsByTagName("td")[1].textContent
        mensaje.value = campos.getElementsByTagName("td")[2].textContent
        document.querySelector('#dispositivos_modal').style.display = 'block'
        return false
    }
    if (id_dispositivo == 0) return alertify.error('No se encontro el dispositivo, vuelva a seleccionarlo.')
    const datosPost = new FormData()
    datosPost.append('id_dispositivo', id_dispositivo)
    datosPost.append('local', local.value)
    datosPost.append('mensaje', mensaje.value)
    fetch('ajax/ajax_modificar_dispositivo.php', {
        method: "POST",
        // Set the post data
        body: datosPost,
        contentType: false,
        processData: false
    })
    .then(response => response.json())
    .then(function (json) {
        if (json.error != '') return alertify.error(json.error)
        campos.getElementsByTagName("td")[1].textContent = local.value
        campos.getElementsByTagName("td")[2].textContent = mensaje.value
        document.querySelector('#dispositivos_modal').style.display = 'none'
        alertify.success(json.resp)
    })
    .catch(function (error){
        console.log(error)
        alertify.error('Ocurrio un error inesperado, vuelva a intentar.')
    })  
}