function validar_identidad() {
    let documento = document.querySelector('#documento').value
    if (documento.trim().length < 6) return alertify.error('Escriba su documento.')
    validarImagen('img/fotos/'+documento+'.png', existe => {
        if (existe) {
            DOCUMENTO = documento
            iniciarVideo()
        } else {
            return alertify.error('No encontramos ningun agente con ese documento.')
        }
    })   
}

function validarImagen(ruta, callback) {
  const img = new Image()
  img.onload = () => callback(true)
  img.onerror = () => callback(false)
  img.src = ruta 
}

function validateNumber(input) {
    input.value = input.value.replace(/[^0-9]/g, '')
}

function validacion() {
    const datosPost = new FormData()
    datosPost.append('validar', true)
    datosPost.append('documento', DOCUMENTO)

    fetch('ajax/ajax_login.php', {
        method: "POST",
        body: datosPost
    })
    .then(response => response.json())
    .then(function (json) {
        if (json.error != '') return alertify.error(json.error)
        alertify.success(json.resp)
        location.reload()
    })
    .catch(function (error){
        return alertify.error('Ocurrio un error inesperado, vuelva a intentar.')
    })
}

// ----------------------------------------------------------------------------------
const video = document.createElement('video'),
canvas = document.createElement('canvas')
detener = false
stream = null
DOCUMENTO = ''
video.autoplay = true
resizeVideo()
function resizeVideo() {
  if (window.innerWidth < 600) {
    video.width = 300
    video.height = 400
    canvas.width = 300
    canvas.height = 400
  } else if (window.innerWidth < 900) {
    video.width = 400
    video.height = 500
    canvas.width = 400
    canvas.height = 500
  } else {
    video.width = 600
    video.height = 500
    canvas.width = 600
    canvas.height = 500
  }
}
window.addEventListener('resize', resizeVideo)
window.addEventListener('load', () => { 
    document.querySelector('#traer_video').appendChild(video) 
    document.querySelector('#traer_canvas').appendChild(canvas) 
})

async function apagar_camara(){ detener = true }

async function iniciarVideo() {
    console.log('Iniciar video')
    try {
        detener = false
        stream = await navigator.mediaDevices.getUserMedia({ video: true })
        video.srcObject = stream
        video.play()
        detectFaces()
    } catch (err) {
        console.error('Error al acceder a la cámara: ', err)
    }
}

async function eliminarVideo() {
    document.querySelector('#reconocimiento_modal').style.display = 'none'
    if (stream) {
        console.log('Eliminar video')
        let tracks = stream.getTracks()
        tracks.forEach(track => track.stop())
        video.srcObject = null
        stream = null
    }
    return false
}

async function detectFaces() {
    console.log('Detectando video')
    if (detener == true) return eliminarVideo()
    // video.addEventListener('play', () => {
        setInterval(async () => {
            if (detener == true) return eliminarVideo()
            canvas.getContext('2d').save()
            canvas.getContext('2d').scale(-1, 1)
            canvas.getContext('2d').drawImage(video, -video.width, 0)
            canvas.getContext('2d').restore()
            const detections = await faceapi.detectAllFaces(canvas).withFaceLandmarks().withFaceDescriptors()
            // const displaySize = { width: canvas.width, height: canvas.height }
            // const resizedDetections = faceapi.resizeResults(detections, displaySize)
            detections.forEach(detection => {
                if (detener == true) return eliminarVideo()
                const { x, y, width, height } = detection.detection.box
                if (window.innerWidth < 600) {
                    // celular
                    if ((height > 210 && height < 290) && (width > 160 && width < 220)) {
                        
                    }
                } else if (window.innerWidth < 900) {
                    // tablet, compu chica 
                    if ((height > 210 && height < 290) && (width > 160 && width < 220)) {
                        
                    }
                } else {
                    // pc
                    if ((height > 210 && height < 240) && (width > 160 && width < 190) && (x > 200 && x < 230) && (y > 70 && y < 100)) {
                        console.log(x, y, width, height)
                        detener = true
                        // return reconocimiento_facial(canvas.toDataURL('image/png'))
                        return reconocimiento_facial(canvas.toDataURL('image/png'))
                    }
                }
            })
            // Detectar cara
            // faceapi.draw.drawDetections(canvas, resizedDetections)
            if (document.querySelector('#reconocimiento_modal').style.display == 'none' && detener == false) document.querySelector('#reconocimiento_modal').style.display = 'block'
            // detectFaces()
            // Expresiones
            // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        }, 100)
    // })
}

// PARA HACER EL RECONOCIMIENTO FACIAL DE LAS IMAGENES GUARDADAS
async function reconocimiento_facial(videoImg = '') {
    const image1 = new Image()
    image1.src = 'img/fotos/'+DOCUMENTO+'.png'
    const image2 = new Image()
    image2.src = videoImg == '' ? 'img/icono.jpg' : videoImg

    // Detectar los rostros en las imagenes
    const detections1 = await faceapi.detectAllFaces(image1).withFaceLandmarks().withFaceDescriptors();
    const detections2 = await faceapi.detectAllFaces(image2).withFaceLandmarks().withFaceDescriptors();
    if (detections1.length == 0 || detections2.length == 0) {
        return alertify.error('Error de coincidencia.')
    }
    // Comparar los descriptores de los rostros
    const faceMatcher = new faceapi.FaceMatcher(detections1);
    const results = detections2.map(descriptor =>
        faceMatcher.findBestMatch(descriptor.descriptor)
    )
    // Mostrar los resultados
    results.forEach((result, i) => {
        if (result.label == 'person 1') {
            eliminarVideo()
            return validacion()
        }else{
            // SIN COINCIDENCIAS
            return alertify.error('Error de coincidencia.')
        }
    })
}

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('./js/face-api/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./js/face-api/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('./js/face-api/models'),
    faceapi.nets.tinyFaceDetector.loadFromUri('./js/face-api/models')
    //   faceapi.nets.faceExpressionNet.loadFromUri('./js/face-api/weights'),
]).catch((error) => { console.log(error) })

setTimeout(comparar_face('img/fotos/40756445.png'), 2000);

async function comparar_face(videoImg) {
    fetch('ajax/cargar_imagenes.php')
    .then(response => response.json())
    .then(async function (json) {
        if (json.error != '') return alertify.error(json.error)
        // const referenceImage = './img/fotos/40756445.png'
        const referenceImage = new Image()
        referenceImage.src = videoImg == '' ? 'img/icono.jpg' : videoImg
        // image2.src = videoImg == '' ? 'img/icono.jpg' : videoImg
        const imagePaths = json.datos
        const descriptor = await getReferenceDescriptor(referenceImage)
        let { match, resp } = await findMatchingImage(descriptor, imagePaths);
        if (match) {
            console.log(`Imagen coincidente: ${resp}`);
        } else {
            console.log('No se encontró coincidencia.'+resp);
        }
    })
    .catch(function (error){
        return alertify.error('Ocurrio un error inesperado, vuelva a intentar.')
    })
}

async function getReferenceDescriptor(referenceImage) {
    // const img = await faceapi.fetchImage(referenceImage) // para pasarle ruta directa
    const detection = await faceapi.detectSingleFace(referenceImage).withFaceLandmarks().withFaceDescriptor()
    return detection.descriptor
}

async function findMatchingImage(referenceDescriptor, imagePaths) {
    const faceMatcher = new faceapi.FaceMatcher(referenceDescriptor)
    let imagen = '',match = false,resp = ''
    for (const element of imagePaths) {
        try {
            imagen = element.path+element.nombre+element.extension
            const img = await faceapi.fetchImage(imagen)
            const detection = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
            const bestMatch = faceMatcher.findBestMatch(detection.descriptor)
            if (bestMatch.label !== 'unknown' && bestMatch.distance < 0.6) {
                match = true
                resp = element.nombre
                break;
            }
        } catch (error) {
            console.error(`Error procesando ${imagen}:`, error)
        }
    }
    if (match) return { match: true, resp: resp}
    else return { match: false, resp: 'No pudimos reconocer el rostro detectado.'}
}





// OBTENER UBICACION DEL USUARIO
ubicacionUsuario = 'No permitida'
// Inicia la ubicacion actual
const obtenerUbicacion = () => {
	if (!"geolocation" in navigator) {
		console.log("Tu navegador no soporta el acceso a la ubicación. Intenta con otro")
	}
	idWatcher = navigator.geolocation.watchPosition(onUbicacionConcedida, onErrorDeUbicacion, opcionesDeSolicitud)
}
const onUbicacionConcedida = ubicacion => {
	const coordenadas = ubicacion.coords
	// console.log(coordenadas)
	ubicacion = {latitud : coordenadas.latitude, longitud : coordenadas.longitude}
	// console.log(ubicacion)
    ubicacionUsuario = ubicacion
    validar_lugares(ubicacion)
    // Detengo la busqueda de la ubicacion
	navigator.geolocation.clearWatch(idWatcher);
}
const onErrorDeUbicacion = err => {
	console.log("Error obteniendo ubicación: ", err)
}
// Parametros para la geolocation
const opcionesDeSolicitud = {
	enableHighAccuracy: true, // Alta precision
	maximumAge: 0, // No queremos cache
	timeout: 10000 // Esperar solo 5 segundos
}
// DESCOMENTAR PARA HABILITAR UBICACION
obtenerUbicacion()

function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371000; // Radio de la Tierra en metros
    const rad = Math.PI / 180;
    const dLat = (lat2 - lat1) * rad;
    const dLon = (lon2 - lon1) * rad;

    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(lat1 * rad) * Math.cos(lat2 * rad) *
              Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distancia en metros
}

function validar_lugares(ubi) {
    console.log(ubi)
    const datosPost = new FormData()
    datosPost.append('validar_lugares', true)

    fetch('ajax/ajax_login.php', {
        method: "POST",
        body: datosPost
    })
    .then(response => response.json())
    .then(function (json) {
        json.resp.forEach(element => {
            if (calcularDistancia(element.latitud, element.longitud, ubi.latitud, ubi.longitud) <= 100){
                console.log('Ubicacion permitida')
            }else{
                console.log('Ubicacion no permitida')
            }
        })
    })
    .catch(function (error){
        return alertify.error('Ocurrio un error inesperado, vuelva a intentar.')
    })
}