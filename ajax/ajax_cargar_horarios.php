<?php
require_once __DIR__.'/../clases/consultas.php';

$json = new StdClass();

$json->resp = '';
$json->error = '';

if (!empty($_POST['dia']) && !empty($_POST['hora_entrada']) && !empty($_POST['hora_salida'])) {
    $resp = datos::cargar_horarios($_POST['dia'],$_POST['hora_entrada'],$_POST['hora_salida'],$_POST['observacion']);
    if ($resp) {
        $json->resp = 'Aceptado correctamente';
    }else {
        $json->error = 'Ocurrio un error inesperado, vuelva a intentar.';
    }
}else {
    $json->error = 'Cargue los datos obligatorios y vuelva a intentar.';
}

print json_encode($json);

?>