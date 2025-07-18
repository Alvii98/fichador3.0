<?php
/* Smarty version 3.1.34-dev-7, created on 2025-07-18 18:16:05
  from 'C:\xampp\htdocs\fichador3.0\templates\registros.html' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.34-dev-7',
  'unifunc' => 'content_687a7345d3c508_05247031',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '4c7f3220aeff62d6bb802724e799babf785d05ce' => 
    array (
      0 => 'C:\\xampp\\htdocs\\fichador3.0\\templates\\registros.html',
      1 => 1752780571,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_687a7345d3c508_05247031 (Smarty_Internal_Template $_smarty_tpl) {
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Control de asistencia</title>
	<link rel="icon" href="img/logotipo.png?1?1" type="image/x-icon">
    <!-- BOOTSTRAP 4.6 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <!-- ALERTIFY -->
	<link rel="stylesheet" href="../libs/alertifyjs/css/alertify.min.css" />
	<link rel="stylesheet" href="../libs/alertifyjs/css/themes/default.min.css" />
	<?php echo '<script'; ?>
 src="../libs/alertifyjs/alertify.min.js"><?php echo '</script'; ?>
>
	<?php echo '<script'; ?>
 src="../libs/alertifyjs/settings.js"><?php echo '</script'; ?>
>
    <!-- JS -->
   <?php echo '<script'; ?>
 src="js/funciones.js?<?php echo $_smarty_tpl->tpl_vars['NO_CACHE']->value;?>
"><?php echo '</script'; ?>
> 
   <?php echo '<script'; ?>
 src="js/buscador.js?<?php echo $_smarty_tpl->tpl_vars['NO_CACHE']->value;?>
"><?php echo '</script'; ?>
> 
   <?php echo '<script'; ?>
 src="js/login.js?<?php echo $_smarty_tpl->tpl_vars['NO_CACHE']->value;?>
"><?php echo '</script'; ?>
> 
   <?php echo '<script'; ?>
 src="js/excel.js?<?php echo $_smarty_tpl->tpl_vars['NO_CACHE']->value;?>
"><?php echo '</script'; ?>
> 
   <?php echo '<script'; ?>
 src="js/exportar_excel.js?<?php echo $_smarty_tpl->tpl_vars['NO_CACHE']->value;?>
"><?php echo '</script'; ?>
> 
    <!-- ESTILOS -->
    <link rel="stylesheet" href="css/estilo.css?<?php echo $_smarty_tpl->tpl_vars['NO_CACHE']->value;?>
">
</head>
<body>
    <?php echo $_smarty_tpl->tpl_vars['HEADER']->value;?>

    <div class="container mt-3">
        <div class="row">
            <div class="col-md-12">
                <h3>Datos registros</h3>
            </div>
        </div>
    </div>
    <div class="container border border-color rounded mb-4 text-body">
        <div class="row">
            <div class="col-md-12">
                <h5 class="text-center mt-2"><u>Registros de <?php echo $_smarty_tpl->tpl_vars['AGENTE']->value;?>
</u></h5>
                <div class="col-md-12" id="fechas_registros">
                    <i class="bi bi-file-earmark-spreadsheet-fill float-right h2 mr-5 mt-1" onclick="exportarExcel()"></i>
                    <div class="form-group col-md-3 float-left">
                        <label for="fecha">Fecha incio</label>
                        <input type="datetime-local" id="fecha_inicio" class="form-control">
                    </div>
                    <div class="form-group col-md-3 float-left">
                        <label for="fecha">Fecha final</label>
                        <input type="datetime-local" id="fecha_final" class="form-control">
                    </div>
                    <div class="form-group col-md-3 float-left pt-3">
                        <i class="bi bi-search" onclick="busqueda_registros()" style="font-size: 34px;"></i>
                    </div>
                </div>
            </div>
            <div class="col-md-12 mt-2">
                <div class="scroll mb-3">
                    <table class="table table-bordered text-body" id="registros">
                        <thead>
                            <tr>
                                <th colspan="15" class="text-center">
                                    <select name="columna" id="columna" class="mt-1 form-control col-md-2 mr-2 float-left">
                                        <option value="-">-- Buscar por --</option>
                                        <option value="0">Agente</option>
                                        <option value="2">Fecha</option>
                                        <option value="3">Lugar</option>
                                    </select>
                                    <input type="text" id="buscar" autocomplete="off" style="display:none;" placeholder="Buscar en columna" class="mt-1 form-control col-md-2 float-left">
                                </th>
                            </tr>
                            <tr>
                                <th>Agente</th>
                                <th>Cruce</th>
                                <th style="min-width: 134px;">Fecha y hora</th>
                                <th>Lugar</th>
                            </tr>
                        </thead>
                        <tbody id="datos_registros">
                            <th colspan="15" id="no_datos" class="text-center">No encontramos registros disponibles</th>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <?php echo $_smarty_tpl->tpl_vars['FOOTER']->value;?>

</body>
</html><?php }
}
