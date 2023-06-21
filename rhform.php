<?php
ob_start();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require("PHPMailer.php");
require("SMTP.php");
require("Exception.php");
//use PHPMailer;
//use SMTP;
//use Exception;

// an email address that will be in the From field of the email.
//$fromEmail = 'iqncontactform@gmail.com';
//$fromName = 'Formulario de reclutamiento';
$fromName = $_POST["name"];
$fromEmail = $_POST["email"];
$mensaje = $_POST["puesto"];

// an email address that will receive the email with the output of the form
//$sendToEmail = 'oloaiza@gmail.com';
$sendToEmail = 'empleo@iqn.cr';
$sendToName = 'Formulario de reclutamiento';

// subject of the email
$subject = 'Nuevo mensaje desde el Formulario de reclutamiento desde el sitio web';

// smtp credentials and server
$smtpHost = 'smtp.gmail.com';
$smtpUsername = 'empleo@iqn.cr';
$smtpPassword = 'pfbgxojnmudpvvjj'; //'Olger1980';

// form field names and their translations.
// array variable name => Text to appear in the email
$fields = array('puesto' => 'Puesto solicitado', 'ex-trabajo' => 'Ha laborado anteriormente con nosotros?', 'inmediata' => 'Disponibilidad inmediata?', 'tiempo' => 'Cuánto tiempo requeriría antes?', 'horario' => 'Horario?', 'name' => 'Nombre', 'phone' => 'Teléfono', 'email' => 'Email');

// message that will be displayed when everything is OK :)
$okMessage = 'Contact form successfully submitted. Thank you, I will get back to you soon!';

// If something goes wrong, we will display this message.
$errorMessage = 'There was an error while submitting the form. Please try again later';


// if you are not debugging and don't need error reporting, turn this off by error_reporting(0);
error_reporting(E_ALL & ~E_NOTICE);

try {
    if (count($_POST) == 0) {
        //throw new \Exception('Form is empty');
    }

    $emailTextHtml = "<h1>Tiene un nuevo mensaje desde el Formulario de reclutamiento desde el sitio web:</h1><hr>";
    $emailTextHtml .= "<table>";

    foreach ($_POST as $key => $value) {
        // If the field exists in the $fields array, include it in the email
        if (isset($fields[$key])) {
            $emailTextHtml .= "<tr><th style='text-align: left;'>$fields[$key]</th><td>$value</td></tr>";
        }
    }
    $emailTextHtml .= "</table><hr>";
    $emailTextHtml .= "<p>Saludos</p>";

    $mail = new PHPMailer();

    $mail->setFrom($smtpUsername, $sendToName);
    $mail->setFrom($fromEmail, $fromName);
    $mail->addAddress($sendToEmail, "IQN - Recursos Humanos"); // you can add more addresses by simply adding another line with $mail->addAddress();
    //$mail->addReplyTo($from);

    $mail->isHTML(true);

    $mail->Subject = $subject;
    $mail->Body = $emailTextHtml;
    $mail->msgHTML($emailTextHtml); // this will also create a plain-text version of the HTML email, very handy
    $mail->AltBody = "{$mensaje} \n\n "; // Texto sin formato HTML
    $mail->CharSet = "utf-8";

    $mail->isSMTP();

    //Enable SMTP debugging
    // 0 = off (for production use)
    // 1 = client messages
    // 2 = client and server messages
    $mail->SMTPDebug = 2;
    //$mail->Mailer = "smtp";
    $mail->Debugoutput = 'html';

    //Set the hostname of the mail server
    // use
    // $mail->Host = gethostbyname('smtp.gmail.com');
    // if your network does not support SMTP over IPv6
    $mail->Host = $smtpHost; //gethostbyname($smtpHost);

    //Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
    $mail->Port = 587;
    //$mail->Port = 465;

    //Set the encryption system to use - ssl (deprecated) or tls
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    //$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    //$mail->SMTPAutoTLS = false;

    //Whether to use SMTP authentication
    $mail->SMTPAuth = true;
    $mail->Username = $smtpUsername; //Username to use for SMTP authentication - use full email address for gmail
    $mail->Password = $smtpPassword; //Password to use for SMTP authentication

    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );

    if (array_key_exists('userfile', $_FILES)) {
        // First handle the upload
        // Don't trust provided filename - same goes for MIME types
        // See http://php.net/manual/en/features.file-upload.php#114004 for more thorough upload validation
        // Extract an extension from the provided filename
        $ext = pathinfo($_FILES['userfile']['name'], PATHINFO_EXTENSION);
        // Define a safe location to move the uploaded file to, preserving the extension
        $uploadfile = tempnam(sys_get_temp_dir(), hash('sha256', $_FILES['userfile']['name'])) . '.' . $ext;
        if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)) {
            // Attach the uploaded file
            if (!$mail->addAttachment($uploadfile, $_FILES['userfile']['name'])) {
                $msg .= 'Failed to attach file ' . $_FILES['userfile']['name'];
                throw new \Exception($msg);
            }
        } else {
            $msg .= 'Failed to move file to ' . $uploadfile;
            throw new \Exception($msg);
        }
    }


    if (!$mail->send()) {
        throw new \Exception('I could not send the email.' . $mail->ErrorInfo);
    }

    $responseArray = array('type' => 'success', 'message' => $okMessage);


} catch (\Exception $e) {
    // $responseArray = array('type' => 'danger', 'message' => $errorMessage);
    $responseArray = array('type' => 'danger', 'message' => $e->getMessage());
}


// if requested by AJAX request return JSON response
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $encoded = json_encode($responseArray);

    header('Content-Type: application/json');

    echo $encoded;
} else {
    if ($responseArray['type'] === 'success') {
        header('Location: congrats.html');
        exit();
    } else {
        header('Location: error.html');
        exit();
    }
}

ob_end_flush();
?>