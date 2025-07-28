<?php
require_once '../clases/consultas.php';
session_start();
$json = new StdClass();
$json->resp = '';
$json->error = '';
if (isset($_POST['cerrar_sesion'])) {
    session_destroy();
    $json->resp = 'Sesion cerrada.';
}else if (isset($_POST['validar'])) {
    if (!empty($_POST['documento'])) {
        if (file_exists('../img/fotos/'.$_POST['documento'].'.png')) {
            $_SESSION['DOCUMENTO_REGISTROS'] = $_POST['documento'];
            $json->resp = 'Valido correctamente.';
        }else {
            $json->error = 'Datos incorrectos.';
        }
    }else {
        $json->error = 'No llego el parametro documento.';
    }
}else if (isset($_POST['validar_lugares'])) {
    $datos = array();
    // foreach (datos::lugares() as $value) {
    //     $datos[] = ['latitud' => $value['id'],'longitud' => $value['id']];
    // }
    $datos[] = ['latitud' => -32.5833472,'longitud' => -56.3630848];
    $datos[] = ['latitud' => -34.5833472,'longitud' => -58.3630848];
    $json->resp = $datos;
}else {
    if (isset($_POST['usuario']) && isset($_POST['clave'])) {
        $datos = datos::administracion()[0];
        if (trim($_POST['usuario']) == $datos['usuario'] && trim($_POST['clave']) == $datos['clave']) {
            $_SESSION['FICHADOR'] = 'Administador';
            $json->resp = 'Inicio sesion correctamente.';
        }else {
            session_destroy();
            $json->error = 'Los datos ingresados no son correctos.';
        }
    }else {
        $json->error = 'Los datos ingresados no son correctos.';
        session_destroy();
    }
}

print json_encode($json);

