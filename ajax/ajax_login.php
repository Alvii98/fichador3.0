<?php
require_once '../clases/consultas.php';
session_start();
$json = new StdClass();
$json->resp = '';
$json->error = '';
if (isset($_POST['cerrar_sesion'])) {
    session_destroy();
    $json->resp = 'Sesion cerrada.';
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

