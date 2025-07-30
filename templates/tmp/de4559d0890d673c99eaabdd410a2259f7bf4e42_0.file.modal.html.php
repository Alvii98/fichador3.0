<?php
/* Smarty version 3.1.34-dev-7, created on 2025-07-30 19:16:24
  from 'C:\xampp\htdocs\fichador3.0\templates\partials\modal.html' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '3.1.34-dev-7',
  'unifunc' => 'content_688a5368b443e9_57276491',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'de4559d0890d673c99eaabdd410a2259f7bf4e42' => 
    array (
      0 => 'C:\\xampp\\htdocs\\fichador3.0\\templates\\partials\\modal.html',
      1 => 1752508779,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_688a5368b443e9_57276491 (Smarty_Internal_Template $_smarty_tpl) {
?>
<div id="datos_actividad" class="modal-login" style="display: none;">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <i class="bi bi-x exit-card" onclick="document.querySelector('#datos_actividad').style.display = 'none'"></i>
            <div class="modal-header d-flex justify-content-center">
                <h4>Datos de actividad </h4>
                <i class="bi bi-file-earmark-spreadsheet-fill float-right h2" onclick="exportarExcelActividad('alumnos_actividad')" id="exportar_excel"
                style="position:absolute;top:4%;right:13%;"></i>
            </div>
            <div class="col-md-12 p-3">
                <h5 align="center" id="nom_actividad"></h5>
                <div class="scroll-modal mb-3">
                    <table class="table table-bordered text-body" id="alumnos_actividad">
                        <thead align="center">
                            <tr>
                                <th>Alumnos</th>
                            </tr>
                        </thead>
                        <tbody align="center" id="mostrar_datos_actividad">
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer"></div>
        </div>
    </div>
</div>


<div id="dispositivos_modal" class="modal-login" style="display: none;">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <i class="bi bi-x exit-card" onclick="document.querySelector('#dispositivos_modal').style.display = 'none'"></i>
            <div class="modal-header d-flex justify-content-center">
                <h5>Editar dispositivo</h5>
            </div>
            <div class="col-md-12">
                <div class="scroll-modal">
                    <div class="col-md-12">
                        <div class="col-md-12 text-center pt-2">
                            <label class="alert alert-success" id="nom_dispositivo"></label>
                        </div>
                        <div class="form-group col-md-12">
                            <label>Local</label>
                            <input type="text" id="dis_local" class="form-control">
                        </div>
                        <div class="form-group col-md-12">
                            <label>Mensaje</label>
                            <textarea class="form-control" id="dis_mensaje"></textarea>
                        </div>
                    </div>
                </div>
                <div class="form-group col-md-12">
                    <button class="btn btn-dark rounded-pill float-right mb-2" onclick="modificar_dispositivo('','modificar')">Guardar datos</button>
                </div>
            </div>
            <div class="modal-footer"></div>
        </div>
    </div>
</div>


<div id="reconocimiento_modal" class="modal-login-r" style="display: none;">
    <div class="container">
        <div class="row">
            <div class="col-md-12 d-flex justify-content-center">
                <div class="col-md-8 mt-3"style="border: solid 3px #a7a7a7;border-radius: 10px;padding:10px;">
                    <i class="bi bi-x exit-card" onclick="apagar_camara()"></i>
                    <div class="col-md-12 text-center">
                        <h5 style="color: #a7a7a7;text-decoration: underline;">Validando identidad</h5>
                    </div>
                    <div class="col-md-12 d-flex justify-content-center" id="traer_canvas">
                        <img src="img/face.png" style="width: 300px;height: 300px;position: absolute;top: 10%;">
                    </div>
                    <div class="col-md-12" style="display: none;" id="traer_video">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div><?php }
}
