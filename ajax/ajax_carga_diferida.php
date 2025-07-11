<?php
require_once __DIR__.'/../clases/consultas.php';

$json = new StdClass();

$json->resp = '';
$json->error = '';

if (!empty($_POST['documento']) && !empty($_POST['cruce']) && !empty($_POST['fecha'])) {
    $agente = datos::agente($_POST['documento']);
    if (!empty($agente)) {
        $resp = datos::cargar_fichado($_POST['documento'],$_POST['cruce'],'CARGA DIFERIDA',$_POST['fecha']);
        if ($resp) {
            $json->resp = 'Registrado correctamente';
        }else {
            $json->error = 'Ocurrio un error inesperado, vuelva a intentar.';
        }
    }else {
        $json->error = 'El agente no existe en la base de datos.';
    }
}else {
    $json->error = 'Complete todos los campos y vuelva a intentar.';
}

print json_encode($json);

?>