function validar_identidad() {
    let documento = document.querySelector('#documento').value
    if (documento.trim().length < 6) return alertify.error('Escriba su documento.')
    validarImagen('img/fotos/'+documento+'.png', existe => {
        if (existe) {
            startVideo()
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

// ----------------------------------------------------------------------------------
const video = document.createElement('video'),
canvas = document.createElement('canvas')
pausar = false
video.autoplay = true
resizeVideo()
function resizeVideo() {
  const screenWidth = window.innerWidth
  if (screenWidth < 600) {
    video.width = 300
    video.height = 400
    canvas.width = 300
    canvas.height = 400
  } else if (screenWidth < 900) {
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

async function apagar_camara(){ pausar = true }

async function startVideo() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} }).catch(err => {
    console.error("Error al acceder a la camara: ", err) })
    video.srcObject = stream
    pausar = false
    // document.querySelector('#reconocimiento_modal').setAttribute('style', 'height:'+window.innerHeight+'px !important')
    detectFaces()
}

function detectFaces() {
    if (pausar == true) {
        document.querySelector('#reconocimiento_modal').style.display = 'none'
        video.pause()
        return false
    }
    video.addEventListener('play', () => {
        setInterval(async () => {
            canvas.getContext('2d').save()
            canvas.getContext('2d').scale(-1, 1)
            canvas.getContext('2d').drawImage(video, -video.width, 0)
            canvas.getContext('2d').restore()
            const detections = await faceapi.detectAllFaces(canvas).withFaceLandmarks().withFaceDescriptors()
            // const displaySize = { width: canvas.width, height: canvas.height }
            // const resizedDetections = faceapi.resizeResults(detections, displaySize)
            detections.forEach(detection => {
                const { x, y, width, height } = detection.detection.box
            })
            // Detectar cara
            // faceapi.draw.drawDetections(canvas, resizedDetections)
            if (document.querySelector('#reconocimiento_modal').style.display == 'none') document.querySelector('#reconocimiento_modal').style.display = 'block'
            detectFaces()
            // Expresiones
            // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        }, 100)
    })
}

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('./js/face-api/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./js/face-api/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('./js/face-api/models'),
    faceapi.nets.tinyFaceDetector.loadFromUri('./js/face-api/models')
    //   faceapi.nets.faceExpressionNet.loadFromUri('./js/face-api/weights'),
]).catch((error) => { console.log(error) })
