function validar_identidad() {
    let datosPost = new FormData(),
    documento = document.querySelector('#documento').value
    if (documento.length < 5) {
        resp_login.setAttribute('style', 'color:red;')
        resp_login.textContent = 'Ingrese el documento.'
        return
    }else {
        datosPost.append('documento', documento)
    }
    fetch('ajax/ajax_login.php', {
        method: "POST",
        // Set the post data
        body: datosPost
    })
    .then(response => response.json())
    .then(function (json) {
        const resp_login = document.querySelector('#resp_login')

        if (json.resp != '') {
            resp_login.setAttribute('style', 'color:green;')
            resp_login.textContent = json.resp
        }
        if (json.error != '') {
            resp_login.setAttribute('style', 'color:red;')
            resp_login.textContent = json.error
            return
        }
        location.reload()
    })
    .catch(function (error){
        if (cerrar_sesion) {
            console.log(error)
        }else{
            console.log(error)
            // Catch errors
            resp_login.setAttribute('style', 'color:red;')
            resp_login.textContent = 'Ocurrio un error al cargar los datos, vuelva a intentar.'
        }
    })
}
// VER ESTADO DE LA CAMARA CUANDO INICIA 
// navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
//   console.log('La camara esta conectada');
//   // console.clear();
// }).catch(error => {
//   console.log(error)
//   alert('La camara no esta conectada');
// })
// CARGA LOS MODELOS DE FACE-API
Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('./js/face-api/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./js/face-api/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('./js/face-api/models'),
  faceapi.nets.tinyFaceDetector.loadFromUri('./js/face-api/models')
//   faceapi.nets.faceExpressionNet.loadFromUri('./js/face-api/weights'),
]).then(setTimeout(() => {reconocimiento_facial()}, 2000))
.catch((error) => {
    // location.reload()
})

//################# RECONOCIMIENTO FACIAL #######################
let video
let detector
let tiempo_camara
set_width = 0
set_height = 0

function setup() {
  // resizeCanvas()
  set_width = window.innerWidth
  set_height = window.innerHeight

  if (set_width < 768) { // Si es un dispositivo movil
    set_width = parseInt(set_width * 0.75) // Ajusta el ancho 
    set_height = parseInt(set_height * 0.75) // Ajusta la altura
  }else { // Si es una PC
    set_width = parseInt(set_width * 0.75) // Ajusta el ancho 
    set_height = parseInt(set_height * 0.75) // Ajusta la altura
  }
  console.log(set_width, set_height)
  createCanvas(set_width, set_height)
  video = createCapture(VIDEO)
  video.size(set_width, set_height)
  video.hide()
  const detectionOptions = {
    withLandmarks: true,
    withExpressions: true,
    withDescriptors: false,
    maxResults: 2
  }
  detector = ml5.faceApi(video, detectionOptions, () => {
    detectFace()
  })
}

function draw() {
  image(video, 0, 0)
}
// DETECTA LA CARA EN LA CAMARA Y VALIDO SEGUN EL ANCHO DE LA CARA LA DISTANCIA EN LA QUE ESTA
// CUANDO EL ANCHO ES ENTRE 150 Y 170 ENTRA A HACER EL RECONOCIMIENTO
function detectFace() {
  detector.detect((err, detections) => {
    if (err) return console.error(err)
    
    if (detections && detections.length > 0) {
      // caras detectadas!!
      document.querySelector('main').style.display = 'block'
      if (document.querySelector('main').style.display == 'block') {
        if (detections.length > 1) {
          mensajes('Se detectaron mas de una cara en la imagen, vuelva a intentar.')
        }else {
          if (tiempo_camara < 0) {
            tiempo_camara++
          }else {
            for(let i = 0; i < detections.length; i++){
              let detection = detections[i].alignedRect;
                if (detection._box._width > 140) {
                    tiempo_camara = 0
                    //  PARA LA VALIDACION DESCOMENTAR EL DE ARRIBA Y PONER EN EL IF statusGirarCara = 2
                    videoImg = video.get(detection._box._x-100, detection._box._y-100, detection._box._width+200, detection._box._height+200).canvas.toDataURL()
                    reconocimiento_facial()
                }
            }
          }
        }
      }
    }else{
        tiempo_camara = 0
    }
    // llamamos a este método continuamente
    detectFace()
  })
}
// PARA HACER EL RECONOCIMIENTO FACIAL DE LAS IMAGENES GUARDADAS
async function reconocimiento_facial(foto = '',videoImg = '') {
    const image1 = new Image()
    image1.src = videoImg == '' ? 'img/icono.jpg' : videoImg
    const image2 = new Image()
    image2.src = foto == '' ? 'img/icono.jpg' : 'data:image/png;base64,'+foto
    if (foto != '' && videoImg != '') {
        document.querySelector('#reconocimiento_modal').style.display = 'block'
        document.querySelector('main').style.display = 'none'
    }

    // Detectar los rostros en las imagenes
    const detections1 = await faceapi.detectAllFaces(image1).withFaceLandmarks().withFaceDescriptors();
    const detections2 = await faceapi.detectAllFaces(image2).withFaceLandmarks().withFaceDescriptors();
    if (detections1.length == 0 || detections2.length == 0) {
        if (foto == '' && videoImg == '') return document.querySelector('#boton_validar').disabled = false
        document.querySelector('#reconocimiento_modal').style.display = 'none'
        return
    }
    // Comparar los descriptores de los rostros
    const faceMatcher = new faceapi.FaceMatcher(detections1);
    const results = detections2.map(descriptor =>
        faceMatcher.findBestMatch(descriptor.descriptor)
    )
    // Mostrar los resultados
    results.forEach((result, i) => {
        if (foto == '' && videoImg == '') return document.querySelector('#boton_validar').disabled = false
        if (result.label == 'person 1') {
            document.querySelector('#reconocimiento_modal').style.display = 'none'
            validar_identidad(documento)
        }else{
            // SIN COINCIDENCIAS
        }
    })
}

function validateNumber(input) {
    input.value = input.value.replace(/[^0-9]/g, '')
}