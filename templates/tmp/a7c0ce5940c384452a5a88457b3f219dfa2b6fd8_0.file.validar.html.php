<?php
/* Smarty version 3.1.34-dev-7, created on 2025-07-30 19:16:24
  from 'C:\xampp\htdocs\fichador3.0\templates\validar.html' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.34-dev-7',
  'unifunc' => 'content_688a5368c81f55_39280833',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'a7c0ce5940c384452a5a88457b3f219dfa2b6fd8' => 
    array (
      0 => 'C:\\xampp\\htdocs\\fichador3.0\\templates\\validar.html',
      1 => 1752495348,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_688a5368c81f55_39280833 (Smarty_Internal_Template $_smarty_tpl) {
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Validar identidad</title>
	<link rel="icon" href="img/logotipo.png" type="image/x-icon">
    <!-- BOOTSTRAP 4.6 -->
    <!-- <link rel="stylesheet" href="libs/bootstrap-4.6.1/css/bootstrap.min.css"> -->
    <!-- <link rel="stylesheet" href="libs/bootstrap-icons/font/bootstrap-icons.css"> -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <!-- JQUERY -->
    <?php echo '<script'; ?>
 src="../libs/jquery-3.5.1.min.js"><?php echo '</script'; ?>
>
    <!-- ALERTIFY -->
	<link rel="stylesheet" href="../libs/alertifyjs/css/alertify.min.css" />
	<link rel="stylesheet" href="../libs/alertifyjs/css/themes/default.min.css" />
	<?php echo '<script'; ?>
 src="../libs/alertifyjs/alertify.min.js"><?php echo '</script'; ?>
>
	<?php echo '<script'; ?>
 src="../libs/alertifyjs/settings.js"><?php echo '</script'; ?>
>
    <!-- Face Api -->
    <?php echo '<script'; ?>
 src="js/face-api/face-api.min.js"><?php echo '</script'; ?>
>
    <!-- p5 -->
    <!-- <?php echo '<script'; ?>
 src="js/p5-ml5/p5.min.js"><?php echo '</script'; ?>
> -->
    <!-- ml5 -->
    <!-- <?php echo '<script'; ?>
 src="js/p5-ml5/ml5.min.js"><?php echo '</script'; ?>
> -->
    <!-- JS -->
    <?php echo '<script'; ?>
 src="js/validar.js?<?php echo $_smarty_tpl->tpl_vars['NO_CACHE']->value;?>
"><?php echo '</script'; ?>
> 
    <!-- ESTILOS -->
    <link rel="stylesheet" href="css/estilo.css?<?php echo $_smarty_tpl->tpl_vars['NO_CACHE']->value;?>
">
</head>
<body>
    <?php echo $_smarty_tpl->tpl_vars['HEADER']->value;?>

    <?php echo $_smarty_tpl->tpl_vars['MODAL']->value;?>

    <div class="container">
        <div class="row d-flex justify-content-center mt-3 mb-3">
            <div class="col-md-6 border border-color rounded pb-3" style="margin: 10px;box-shadow: 2px 3px 12px black;" id="validar_agente">
                <div class="form-group d-flex flex-column align-items-center">
                    <i class="bi bi-person-circle" style="font-size:80px;"></i>
                    <h4>Validar identidad</h4>
                </div>
                <div class="form-group d-flex flex-column align-items-center">
                    <input type="text" class="form-control" id="documento" oninput="validateNumber(this)" placeholder="Ingresa tu documento">
                </div>
                <p class="text-center" id="resp_login"></p>
                <div class="form-group d-flex justify-content-center">
                    <button onclick="validar_identidad()" class="btn btn-dark rounded-pill col-md-5" id="boton_validar">Validar</button>
                </div>
            </div>
        </div>
    </div>
    <?php echo $_smarty_tpl->tpl_vars['FOOTER']->value;?>

</body>
</html><?php }
}
