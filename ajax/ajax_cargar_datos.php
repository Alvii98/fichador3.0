<?php
require_once '../clases/consultas.php';

$json = new StdClass();

$json->datos = '';
$json->error = '';
$datos = array();
if (isset($_POST['op'])) {
    if ($_POST['op'] == 'agentes') {
        foreach (datos::agente() as $value) {
            if (!file_exists('../'.$value['foto'])) $value['foto'] = 'img/icono.jpg';
            $datos[] = ['id' => $value['id'],
                        'agente' => utf8_encode($value['agente']),
                        'documento' => $value['documento'],
                        'foto' => $value['foto'],
                        'fecha' => !empty($value['fecha']) ? date("d/m/Y H:i:s", strtotime($value['fecha'])) : ''];
        }
    }elseif ($_POST['op'] == 'registros') {
        foreach (datos::registros() as $value) {
            $datos[] = ['id' => $value['id'],
                        'agente' => utf8_encode($value['agente']),
                        'cruce' => $value['cruce'],
                        'fecha' => !empty($value['fecha']) ? date("d/m/Y H:i:s", strtotime($value['fecha'])) : '',
                        'lugar' => utf8_encode($value['lugar'])];
        }
    }elseif ($_POST['op'] == 'registros_pendientes') {
        foreach (datos::registros_pendientes() as $value) {
            $datos[] = ['id' => $value['id'],
                        'agente' => utf8_encode($value['agente']),
                        'cruce' => $value['cruce'],
                        'fecha' => !empty($value['fecha']) ? date("d/m/Y H:i:s", strtotime($value['fecha'])) : '',
                        'observacion' => utf8_encode($value['observacion']),
                        'lugar' => utf8_encode($value['lugar'])];
        }
    }elseif ($_POST['op'] == 'claves_pendientes') {
        foreach (datos::agente() as $value) {
            if (empty($value['pide_clave'])) continue;
            $datos[] = ['id' => $value['id'],
                        'agente' => utf8_encode($value['agente'])];
        }        
    }
}else {
    $json->error = 'No llegaron los parametros.';
}

$json->datos = $datos;

print json_encode($json);

?>