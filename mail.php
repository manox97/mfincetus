<?php
   ini_set('SMTP', "blucetus.com");
   ini_set('smtp_port', "465");
   ini_set('sendmail_from', "manox21@gmail.com");
   // ini_set( 'display_errors', 1 );
   // error_reporting( E_ALL );
 
   $companyEmail = "contact@blucetus.com";
   $customerEmail = $_POST['email']; // Sender Email Address
 
   function sendToCompany() {
       global $companyEmail, $customerEmail;
       $subject = $_POST['subject'];
       $message = $_POST['message'];
       $headers = "From:" . $customerEmail;
 
       mail($companyEmail, $subject, $message, $headers);
       echo "The email message was sent to company. \n";
   }
 
   function sendToCustomer() {
       global $companyEmail, $customerEmail;
       $subject = "Thank you";
       $message ="Your message has been delivered successfully”;
       $headers = "From:" . $companyEmail;
 
       mail($customerEmail, $subject, $message, $headers);
       echo "The email message was sent to customer.";
   }
 
   sendToCompany();
   sendToCustomer();
?>
