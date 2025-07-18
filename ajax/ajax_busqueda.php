<?php
require_once '../clases/consultas.php';
session_start();
$json = new StdClass();

$json->datos = '';
$json->error = '';

if (!empty($_POST['fecha_inicio']) && !empty($_POST['fecha_final'])) {
    $datos = array();
    foreach (datos::busqueda_registros($_POST['fecha_inicio'],$_POST['fecha_final']) as $value) {
        
        $datos[] = ['id' => $value['id'],
                    'agente' => utf8_encode($value['agente']),
                    'cruce' => $value['cruce'],
                    'fecha' => !empty($value['fecha']) ? date("d/m/Y H:i:s", strtotime($value['fecha'])) : '',
                    'lugar' => utf8_encode($value['lugar'])];
    }
    $json->datos = $datos;
}else {
    $json->error = 'Complete las fechas y vuelva a intentar.';
}


print json_encode($json);

?>