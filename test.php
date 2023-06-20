<?php

/**
 * PHPMailer simple file upload and send example.
 */

//Import the PHPMailer class into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require("PHPMailer.php");
require("SMTP.php");
require("Exception.php");

//require '../vendor/autoload.php';

$msg = '';
if (array_key_exists('userfile', $_FILES)) {
    //First handle the upload
    //Don't trust provided filename - same goes for MIME types
    //See http://php.net/manual/en/features.file-upload.php#114004 for more thorough upload validation
    //Extract an extension from the provided filename
    $ext = PHPMailer::mb_pathinfo($_FILES['userfile']['name'], PATHINFO_EXTENSION);
    //Define a safe location to move the uploaded file to, preserving the extension
    $uploadfile = tempnam(sys_get_temp_dir(), hash('sha256', $_FILES['userfile']['name'])) . '.' . $ext;

    if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)) {
        //Upload handled successfully
        //Now create a message
        $mail = new PHPMailer();
        $mail->setFrom('iqncontactform@gmail.com');
        $mail->addAddress('oloaiza@gmail.com');
        $mail->Subject = 'PHPMailer file sender';
        $mail->Body = 'My message body';
		
		//$mail->isHTML(true);
		//$mail->msgHTML('My message body'); // this will also create a plain-text version of the HTML email, very handy
    	//$mail->AltBody = 'My message body' // Texto sin formato HTML
    	//$mail->CharSet = "utf-8";
		
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
		$mail->Host = 'smtp.gmail.com';

		//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
		$mail->Port = 587;
		//$mail->Port = 465;

		//Set the encryption system to use - ssl (deprecated) or tls
		$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
		//$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
		//$mail->SMTPAutoTLS = false;

		//Whether to use SMTP authentication
		$mail->SMTPAuth = true;    
		$mail->Username = 'iqncontactform@gmail.com';   //Username to use for SMTP authentication - use full email address for gmail
		$mail->Password = 'pfbgxojnmudpvvjj'; //Password to use for SMTP authentication

		$mail->SMTPOptions = array(
			'ssl' => array(
				'verify_peer' => false,
				'verify_peer_name' => false,
				'allow_self_signed' => true
			   )
		);
		
        //Attach the uploaded file
        if (!$mail->addAttachment($uploadfile, $_FILES['userfile']['name'])) {
            $msg .= 'Failed to attach file ' . $_FILES['userfile']['name'];
        }
        if (!$mail->send()) {
            $msg .= 'Mailer Error: ' . $mail->ErrorInfo;
        } else {
            $msg .= 'Message sent!';
        }
    } else {
        $msg .= 'Failed to move file to ' . $uploadfile;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>PHPMailer Upload</title>
</head>
<body>
<?php if (empty($msg)) { ?>
    <form method="post" enctype="multipart/form-data">
        <input type="hidden" name="MAX_FILE_SIZE" value="100000"> Send this file: <input name="userfile" type="file">
        <input type="submit" value="Send File">
    </form>
<?php } else {
    echo htmlspecialchars($msg);
} ?>
</body>
</html>