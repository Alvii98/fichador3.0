<?php
require_once __DIR__ . '/SingletonConexion.php';
class datos{
    static public function agente($documento = '') {
        $instancia = SingletonConexion::getInstance();        
        $conn = $instancia->getConnection();
    
        if ($documento == '') {
            $query = "SELECT *,CONCAT('img/fotos/',documento,'.png') as foto FROM agentes ORDER BY agente";
            $stmt = $conn->prepare($query);
        }else {
            $query = "SELECT a.*,r.* FROM agentes a
            LEFT JOIN registros as r ON r.documento = a.documento AND r.estado = 0
            WHERE a.documento = ? ORDER BY r.fecha DESC LIMIT 1";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("s", $documento);
        }
        $stmt->execute();
        $resp = $stmt->get_result();
    
        return $resp->fetch_all(MYSQLI_ASSOC);
    }

    static public function agente_existe($documento) {
        $instancia = SingletonConexion::getInstance();        
        $conn = $instancia->getConnection();
    
        $query = "SELECT * FROM agentes WHERE documento = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $documento);

        $stmt->execute();
        $resp = $stmt->get_result();
    
        return $resp->fetch_all(MYSQLI_ASSOC);
    }

    static public function registros_agente($documento){
        $instancia = SingletonConexion::getInstance();        
        $conn = $instancia->getConnection();

        $query = "SELECT * FROM registros 
        WHERE documento = ? AND fecha >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH) 
        AND estado = 0 ORDER BY fecha DESC";
    
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $documento);

        $stmt->execute();
        $resp = $stmt->get_result();
    
        return $resp->fetch_all(MYSQLI_ASSOC);
    }

    static public function horarios(){
        $instancia = SingletonConexion::getInstance();        
        $conn = $instancia->getConnection();

        $query = "SELECT * FROM horarios ORDER BY 2,3";
    
        $stmt = $conn->prepare($query);

        $stmt->execute();
        $resp = $stmt->get_result();
    
        return $resp->fetch_all(MYSQLI_ASSOC);
    }

    static public function dispositivos($dispositivo = ''){
        $instancia = SingletonConexion::getInstance();        
        $conn = $instancia->getConnection();

        if ($dispositivo == '') {
            $query = "SELECT * FROM dispositivos ORDER BY alta DESC";
            $stmt = $conn->prepare($query);
        }else {
            $query = "SELECT * FROM dispositivos WHERE dispositivo = ? ORDER BY alta DESC LIMIT 1";
            $stmt = $conn->prepare($query);
           
            $stmt->bind_param("s", $dispositivo);
        }    

        $stmt->execute();
        $resp = $stmt->get_result();
    
        return $resp->fetch_all(MYSQLI_ASSOC);
    }

    static public function agregar_dispositivo($dispositivo) {
        try {
            $instancia = SingletonConexion::getInstance();        
            $conn = $instancia->getConnection();

            $query = "INSERT INTO dispositivos(dispositivo, alta) VALUES (?, now())";
            
            $stmt = $conn->prepare($query);
            $stmt->bind_param("s", $dispositivo);
            
            if (!$stmt->execute()) {
                return false;
        }

            $resp = $conn->insert_id;
            $stmt->close();

            return is_int($resp) ? true : false;
        } catch (\Throwable $th) {
            return false;
        }
    }

    static public function modificar_dispositivo($id,$local,$mensaje) {
        try {
            $instancia = SingletonConexion::getInstance();        
            $conn = $instancia->getConnection();
        
            $query = "UPDATE dispositivos SET local = ?,mensaje = ? WHERE id = ?";
        
            $stmt = $conn->prepare($query);

            $stmt->bind_param("ssi", $local,$mensaje,$id);

            if (!$stmt->execute()) return $stmt->error;
        
            $stmt->close();
        
            return true;
        } catch (\Throwable $th) {
            return false;
        }
    }
    static public function administracion(){
        $instancia = SingletonConexion::getInstance();        
        $conn = $instancia->getConnection();

        $query = "SELECT * FROM administracion ORDER BY id DESC LIMIT 1";

        $stmt = $conn->prepare($query);
    
        $stmt->execute();
        $resp = $stmt->get_result();
    
        return $resp->fetch_all(MYSQLI_ASSOC);
    }

    static public function registros(){
        $instancia = SingletonConexion::getInstance();        
        $conn = $instancia->getConnection();

        $query = "SELECT r.id,a.agente,a.documento,r.cruce,r.fecha,r.lugar,r.observacion,r.estado FROM registros r, agentes a 
        WHERE r.documento = a.documento and r.estado = 0 and r.fecha >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH) ORDER BY fecha desc";
    
        $stmt = $conn->prepare($query);
    
        $stmt->execute();
        $resp = $stmt->get_result();
    
        return $resp->fetch_all(MYSQLI_ASSOC);
    }

    static public function busqueda_registros($fecha_inicio,$fecha_final){
        $instancia = SingletonConexion::getInstance();        
        $conn = $instancia->getConnection();

        $query = "SELECT r.id,a.agente,a.documento,r.cruce,r.fecha,r.lugar FROM registros r, agentes a 
        WHERE IF(? = '',r.documento = a.documento, r.documento = ? and a.documento = ?) and 
        r.estado = 0 and r.fecha >= ? and r.fecha <= ? ORDER BY fecha desc";
    
        $stmt = $conn->prepare($query);

        $documento = empty($_SESSION['DOCUMENTO_REGISTROS']) ? $_SESSION['DOCUMENTO_REGISTROS'] : '';
    
        $stmt->bind_param("sss", $documento,$fecha_inicio,$fecha_final);
    
        $stmt->execute();
        $resp = $stmt->get_result();
    
        return $resp->fetch_all(MYSQLI_ASSOC);
    }

    static public function registros_pendientes(){
        $instancia = SingletonConexion::getInstance();        
        $conn = $instancia->getConnection();

        $query = "SELECT r.id,a.agente,a.documento,r.cruce,r.fecha,r.lugar,r.observacion,r.estado
        FROM registros r, agentes a WHERE r.documento = a.documento and r.estado = 1 ORDER BY fecha desc";
    
        $stmt = $conn->prepare($query);
    
        $stmt->execute();
        $resp = $stmt->get_result();
    
        return $resp->fetch_all(MYSQLI_ASSOC);
    }

    static public function aceptar_registro($id_registro) {
        $instancia = SingletonConexion::getInstance();        
        $conn = $instancia->getConnection();
    
        $query = "UPDATE registros SET estado = 0 WHERE id = ?";
    
        $stmt = $conn->prepare($query);

        $stmt->bind_param("i", $id_registro);

        if (!$stmt->execute()) return $stmt->error;
    
        $stmt->close();
    
        return true;
    }

    static public function eliminar_clave($id_clave) {
        $instancia = SingletonConexion::getInstance();        
        $conn = $instancia->getConnection();
    
        $query = "UPDATE agentes SET pide_clave = null WHERE id = ?";
    
        $stmt = $conn->prepare($query);

        $stmt->bind_param("i", $id_clave);

        if (!$stmt->execute()) return $stmt->error;
    
        $stmt->close();
    
        return true;
    }
    
    static public function modificar_clave($id_clave) {
        $instancia = SingletonConexion::getInstance();        
        $conn = $instancia->getConnection();
    
        $query = "UPDATE agentes SET clave = pide_clave, pide_clave = null WHERE id = ?";
    
        $stmt = $conn->prepare($query);

        $stmt->bind_param("i", $id_clave);

        if (!$stmt->execute()) return $stmt->error;
    
        $stmt->close();
    
        return true;
    }

    static public function cargar_agente($agente,$documento) {
        $instancia = SingletonConexion::getInstance();        
        $conn = $instancia->getConnection();
    
        $query = "INSERT INTO agentes(agente,documento,fecha_registro) VALUES (?, ?, now())";
    
        $stmt = $conn->prepare($query);

        $stmt->bind_param("ss", $agente,$documento);
    
        if (!$stmt->execute()) return $stmt->error;
    
        $resp = $conn->insert_id;
        $stmt->close();
    
        return is_int($resp) ? true : false;
    }

    static public function cargar_horarios($dia,$entrada,$salida,$observacion) {
        $instancia = SingletonConexion::getInstance();        
        $conn = $instancia->getConnection();
    
        $query = "INSERT INTO horarios(dia,hora_entrada,hora_salida,observacion) VALUES (?,?,?,?)";
    
        $stmt = $conn->prepare($query);

        $stmt->bind_param("ssss", $dia,$entrada,$salida,$observacion);
    
        if (!$stmt->execute()) return $stmt->error;
    
        $resp = $conn->insert_id;
        $stmt->close();
    
        return is_int($resp) ? true : false;
    }

    static public function cargar_fichado($documento,$cruce,$lugar,$fecha = '',$observacion = '',$estado = 0) {
        $instancia = SingletonConexion::getInstance();        
        $conn = $instancia->getConnection();
    
        $query = "INSERT INTO registros(documento,cruce,fecha,lugar,observacion,estado) VALUES (?, ?, ?, ?, ?, ?)";
    
        $stmt = $conn->prepare($query);

        $fecha = $fecha == '' ? date('Y-m-d H:i:s') : $fecha;
        
        $stmt->bind_param("issssi", $documento,$cruce,$fecha,$lugar,$observacion,$estado);
    
        if (!$stmt->execute()) return $stmt->error;
    
        $resp = $conn->insert_id;
        $stmt->close();
    
        return is_int($resp) ? true : false;
    }
    
    static public function eliminar_dispositivo($id) {
        $instancia = SingletonConexion::getInstance();        
        $conn = $instancia->getConnection();
    
        $query = "DELETE FROM dispositivos WHERE id = ?";
    
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $id);
    
        if (!$stmt->execute()) return $stmt->error;
    
        $stmt->close();
        return true;
    }

    static public function eliminar_horario($id) {
        $instancia = SingletonConexion::getInstance();        
        $conn = $instancia->getConnection();
    
        $query = "DELETE FROM horarios WHERE id = ?";
    
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $id);
    
        if (!$stmt->execute()) return $stmt->error;
    
        $stmt->close();
        return true;
    }

    static public function eliminar_agente($id) {
        $instancia = SingletonConexion::getInstance();        
        $conn = $instancia->getConnection();
    
        $query = "DELETE FROM agentes WHERE id = ?";
    
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $id);
    
        if (!$stmt->execute()) return $stmt->error;
    
        $stmt->close();
        return true;
    }

    static public function eliminar_registro($id) {
        $instancia = SingletonConexion::getInstance();        
        $conn = $instancia->getConnection();
    
        $query = "DELETE FROM registros WHERE id = ?";
    
        $stmt = $conn->prepare($query);
        $stmt->bind_param("i", $id);
    
        if (!$stmt->execute()) return $stmt->error;
    
        $stmt->close();
        return true;
    }
}
// $documento = '40756445';
// $cruce = 'ENTRADA';
// $lugar = 'ACA';
// datos::cargar_fichado($documento,$cruce,$lugar);