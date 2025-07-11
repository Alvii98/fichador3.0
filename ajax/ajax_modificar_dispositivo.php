<?php
require_once __DIR__.'/../clases/consultas.php';

$json = new StdClass();

$json->resp = '';
$json->error = '';

if (!empty($_POST['id_dispositivo']) && isset($_POST['local']) && isset($_POST['mensaje'])) {
    $resp = datos::modificar_dispositivo($_POST['id_dispositivo'],$_POST['local'],$_POST['mensaje']);
    if ($resp) {
        $json->resp = 'Modificado correctamente';
    }else {
        $json->error = 'Ocurrio un error inesperado, vuelva a intentar.';
    }
}else {
    $json->error = 'No llegaron los parametros, vuelva a intentar.';
}

print json_encode($json);

?>