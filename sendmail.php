<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data safely
    $name    = isset($_POST['name']) ? trim($_POST['name']) : '';
    $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $email   = isset($_POST['email']) ? trim($_POST['email']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';

    // Validate required fields
    if (empty($name) || empty($phone) || empty($email)) {
        echo "Please fill all required fields.";
        exit;
    }

    // Email setup
    $to = "ssuryareddy2277@gmail.com"; // 👉 replace with your email
    $subject = "New Contact Form Submission";

    $body = "You have a new message from your website:\n\n";
    $body .= "Name: $name\n";
    $body .= "Phone: $phone\n";
    $body .= "Email: $email\n";
    $body .= "Message:\n$message\n";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo "success"; // You can send JSON or a success message
    } else {
        echo "Something went wrong. Please try again later.";
    }
} else {
    echo "Invalid request.";
}
