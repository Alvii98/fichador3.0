<?php
$json = new StdClass();

$json->datos = '';
$json->error = '';
try {
    $imagenes = glob("../img/fotos/*.png");
    $datos = array();
    foreach ($imagenes as $imagen) {
        $datos[] = ['path' => './img/fotos/',
        'nombre' => pathinfo($imagen, PATHINFO_FILENAME),
        'extension' => '.png'];
    }
    $json->datos = $datos;
} catch (\Throwable $th) {
    $json->error = 'Ocurrio un error al cargar las imagenes.';
}

print json_encode($json);
?>