<?php
require_once __DIR__.'/../libs/smarty3.php';
require_once __DIR__.'/clases/consultas.php';

$smarty->assign("LOGIN", false);
$smarty->assign('MODAL', $smarty->fetch('partials/modal.html'));
$smarty->assign('HEADER', $smarty->fetch('partials/header.html'));
$smarty->assign('FOOTER', $smarty->fetch('partials/footer.html'));

if (isset($_SESSION['DOCUMENTO'])) $smarty->display('registros.html');
else $smarty->display('validar.html');
?>
