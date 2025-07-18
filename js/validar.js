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
