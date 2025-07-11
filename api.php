<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header('Content-Type: application/json');
require_once 'clases/consultas.php';
// $_SERVER['REQUEST_METHOD'] = 'POST';
// Verificar si la solicitud es POST
   
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $tipo = filter_input(INPUT_POST, 'tipo', FILTER_SANITIZE_STRING);
    if ($tipo == 'INSERTAR REGISTRO') {
        $documento = filter_input(INPUT_POST, 'documento', FILTER_SANITIZE_STRING);
        $agente = filter_input(INPUT_POST, 'agente', FILTER_SANITIZE_STRING);
        $foto = filter_input(INPUT_POST, 'foto', FILTER_SANITIZE_STRING);
        $crucePost = filter_input(INPUT_POST, 'cruce', FILTER_SANITIZE_STRING);
        $lugar = filter_input(INPUT_POST, 'lugar', FILTER_SANITIZE_STRING);
        $fecha = filter_input(INPUT_POST, 'fecha', FILTER_SANITIZE_STRING);
        $observacion = filter_input(INPUT_POST, 'observacion', FILTER_SANITIZE_STRING);
        // Descomentar para dejar log 
        // file_put_contents('img/log/'.date('YmdHis'). '_'. $documento.'.png', base64_decode($foto));
        $agenteData = datos::agente($documento);
        if (empty($agenteData)) {
            if (!file_put_contents('img/fotos/'.$documento.'.png', base64_decode($foto))) {
                echo json_encode(["status" => "error", "message" => "Error al registrar agente."]);
                exit;
            }
            if (!datos::cargar_agente($agente, $documento)) {
                echo json_encode(["status" => "error", "message" => "Error al registrar agente."]);
                exit;
            }
        } elseif (!file_exists('img/fotos/'.$documento.'.png')) {
            if (!file_put_contents('img/fotos/'.$documento.'.png', base64_decode($foto))) {
                echo json_encode(["status" => "error", "message" => "Error al cargar foto de agente."]);
                exit;
            }
        }
        $estado = $crucePost != '' ? 1 : 0;
        
        $cruce = $agenteData[0]['cruce'] == 'ENTRADA' ? 'SALIDA' : 'ENTRADA';
        $cruce = $crucePost != '' ? $crucePost : $cruce;

        if (datos::cargar_fichado($documento, $cruce, $lugar, $fecha, $observacion, $estado)) {
            echo json_encode(["status" => "success", "message" => "Usted ficho $cruce correctamente."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error al registrar"]);
        }
    } elseif ($tipo == 'AGREGAR_DISPOSITIVO') {
        $dispositivo = filter_input(INPUT_POST, 'dispositivo', FILTER_SANITIZE_STRING);
        if (!empty($dispositivo)) {
            $datos = datos::dispositivos($dispositivo);
            if (empty($datos[0])) {
                if (datos::agregar_dispositivo($dispositivo)) {
                    echo json_encode(["status" => "success", "local" => '', "mensaje" => 'Se cargo el dispositivo.']);
                }else {
                    echo json_encode(["status" => "error", "message" => "Ocurrio un error al cargar el dispositivo."]);
                }
            }else {
                echo json_encode(["status" => "success", "local" => $datos[0]['local'], "mensaje" => $datos[0]['mensaje']]);
            }
        }else {
            echo json_encode(["status" => "error", "message" => "Ocurrio un error al cargar el dispositivo."]);
        }
    } elseif ($tipo == 'ADMIN') {
        $usuario = filter_input(INPUT_POST, 'usuario', FILTER_SANITIZE_STRING);
        $clave = filter_input(INPUT_POST, 'clave', FILTER_SANITIZE_STRING);

        $datos = datos::administracion()[0];
        if (trim($usuario) == $datos['usuario'] && trim($clave) == $datos['clave']) {
            echo json_encode(["status" => "success", "message" => "OK"]);
        }else {
            echo json_encode(["status" => "error", "message" => "Los datos ingresados no son correctos."]);
        }
    } elseif ($tipo == 'VALIDAR AGENTE') {
        $documento = filter_input(INPUT_POST, 'documento', FILTER_SANITIZE_STRING);
        $agenteData = datos::agente($documento);
        if (!empty($agenteData)) {
            $ruta_imagen = 'img/fotos/'.$documento.'.png';
            if (file_exists($ruta_imagen)) $base64_imagen = base64_encode(file_get_contents($ruta_imagen));
            else $base64_imagen = '';

            $data[] = ['documento' => $agenteData[0]['documento'],'foto' => $base64_imagen];
            echo json_encode(["status" => "success", "message" => "El agente existe", "data" => $data]);
        } else {
            echo json_encode(["status" => "error", "message" => "El agente no existe"]);
        }
    } elseif ($tipo == 'REGISTROS AGENTE') {
        $documento = filter_input(INPUT_POST, 'documento', FILTER_SANITIZE_STRING);
        $registros = datos::registros_agente($documento);
        if (!empty($registros)) {
            echo json_encode(["status" => "success", "message" => "Registros cargados.", "data" => $registros]);
        } else {
            echo json_encode(["status" => "error", "message" => "El agente no existe"]);
        }
    }else {
        echo json_encode(["status" => "error", "message" => "No llegaron los parametros."]);
    }
}
?>