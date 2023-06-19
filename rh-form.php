<?php


require("class.phpmailer.php");
require("class.smtp.php");

/*// Valores enviados desde el formulario
if ( !isset($_POST["nombre"]) || !isset($_POST["email"]) || !isset($_POST["telefono"])  || !isset($_POST["asunto"])  || !isset($_POST["mensaje"]) ) {
    die ("Es necesario completar todos los datos del formulario");
}
*/


//NUEVOS
$puesto = $_POST["puesto"];
$exTrabajo = $_POST["ex-trabajo"];
$inmediata = $_POST["inmediata"];
$tiempo = $_POST["tiempo"];
$telefono = $_POST["phone"];
$fromName = $_POST["name"];
$fromEmail = $_POST["email"];


// Add Static Attachment
$attachment = '/path/to/your/file.pdf';


$sendToEmail = 'oloaiza@gmail.com';
$sendToName = 'Formulario de reclutamiento';

// Datos de la cuenta de correo utilizada para enviar v�a SMTP
$smtpHost = "smtp.gmail.com";  // Dominio alternativo brindado en el email de alta 
$smtpUsuario = "iqncontactform@gmail.com";  // Mi cuenta de correo
$smtpClave = "Olger1980";  // Mi contrase�a


$mail = new PHPMailer();
$mail->IsSMTP();
$mail->SMTPAuth = true;
$mail->Port = 587; 
$mail->IsHTML(true); 
$mail->CharSet = "utf-8";

//Enable SMTP debugging
    // 0 = off (for production use)
    // 1 = client messages
    // 2 = client and server messages
$mail->SMTPDebug = 4;
$mail->Debugoutput = 'html';

$mail->SMTPSecure = 'tls';
//$mail->SMTPAutoTLS = false;

// VALORES A MODIFICAR //
//Set the hostname of the mail serve use
// $mail->Host = gethostbyname('smtp.gmail.com');
// if your network does not support SMTP over IPv6
$mail->Host = gethostbyname($smtpHost);
//$mail->Host = $smtpHost; 
$mail->Username = $smtpUsuario; 
$mail->Password = $smtpClave;

$mail->setFrom($fromEmail, $fromName);
$mail->addAddress($sendToEmail, $sendToName); // you can add more addresses by simply adding another line with $mail->addAddress();
$mail->addReplyTo($fromEmail);


$path = 'curriculum/' . $_FILES["userfile"]["name"];
move_uploaded_file($_FILES["userfile"]["tmp_name"], $path);
$mail->AddAttachment($path);



//$mail->From = $email; // Email desde donde env�o el correo.
//$mail->FromName = $nombre;
//$mail->AddAddress($sendToEmail, $sendToName); // Esta es la direcci�n a donde enviamos los datos del formulario

$mail->Subject = "Formulario de Reclutamiento"; // Este es el titulo del email.
$mail->Body = "
<html> 

<body> 

<h1>Recibiste un nuevo mensaje desde el formulario de contacto</h1>

<p>Informacion enviada por el usuario de la web:</p>

<p>Puesto solicitado: {$puesto}</p>

<p>¿Ha laborado anteriormente con nosotros?: {$exTrabajo}</p>

<p>¿Cuenta con disponibilidad inmediata?: {$inmediata}</p>





</body> 

</html>

<br />"; // Texto del email en formato HTML

// FIN - VALORES A MODIFICAR //


$mail->SMTPOptions = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);

$estadoEnvio = $mail->Send(); 
if($estadoEnvio){
    //echo "El correo fue enviado correctamente.";
    //window.location.replace("/congrats.html");
    header('Location: congrats.html', true, 303);
} else {
    //echo "Ocurri� un error inesperado.";
    //window.location.replace("/error.html");
    header('Location: error.html', true, 303);
}



?>

