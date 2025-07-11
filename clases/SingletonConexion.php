<?php
class SingletonConexion
{
    private static $instance = null;
    private $conn = null;

    public function __construct()
    {
        if($_SERVER['HTTP_HOST'] == 'estudio6.site'){
            $this->conn = mysqli_connect('localhost', 'c2721191_fichado', 'biseziDI17', 'c2721191_fichado');
        }else{
            $this->conn = mysqli_connect('localhost', 'root', '', 'fichados');
        }

    }

    public static function getInstance()
    {
        if (!self::$instance) {
            self::$instance = new SingletonConexion;
        }
        return self::$instance;
    }
    public function getConnection()
    {
        return $this->conn;
    }
}
?>