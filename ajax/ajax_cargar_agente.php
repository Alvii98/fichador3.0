<?php
require_once __DIR__.'/../clases/consultas.php';

$json = new StdClass();

$json->resp = '';
$json->error = '';

if (!empty($_POST['nombre']) && !empty($_POST['apellido']) && !empty($_POST['documento'])) {
    
    $foto = isset($_FILES['foto']) ? file_get_contents($_FILES['foto']['tmp_name']) : '';
    if ($foto != '') {
        $path = '../img/fotos/';
        
        if (!is_dir($path)) mkdir($path, 0777, true);

        if (!file_put_contents($path.$_POST['documento'].'.png', $foto)) {
            $json->error = 'Ocurrio un error inesperado al cargar la foto, vuelva a intentar.'.$foto;
        }
    }
    if ($json->error == '') {
        if (empty(datos::agente_existe($_POST['documento']))) {
            $resp = datos::cargar_agente($_POST['apellido'].' '.$_POST['nombre'],$_POST['documento']);
            if ($resp) {
                $json->resp = 'Registrado correctamente';
            }else {
                $json->error = 'Ocurrio un error inesperado, vuelva a intentar.';
            }
        }else {
            $json->error = 'Ya existe un agente registrado con ese documento.';
        }
    }
}else {
    $json->error = 'Complete todos los campos y vuelva a intentar.';
}

print json_encode($json);

?>