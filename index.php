<?php

require __DIR__ . '/vendor/autoload.php';

use Dotenv\Dotenv;

// Load .env
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Get env values (correct mapping)
$host = $_ENV['POSTGRES_HOST'] ?? '';
$port = $_ENV['POSTGRES_PORT'] ?? 6543;
$dbname = $_ENV['POSTGRES_DATABASE'] ?? '';
$user = $_ENV['POSTGRES_USER'] ?? '';
$password = $_ENV['POSTGRES_PASSWORD'] ?? '';

$status = "❌ Not Connected";
$error = "";

try {
    // Supabase requires SSL
    $dsn = "pgsql:host=$host;port=$port;dbname=$dbname;sslmode=require";

    $pdo = new PDO($dsn, $user, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_TIMEOUT => 5
    ]);

    // Test query
    $stmt = $pdo->query("SELECT 1");

    if ($stmt) {
        $status = "✅ Connected to Supabase successfully!";
    }

} catch (PDOException $e) {
    $error = $e->getMessage();
    $status = "❌ Connection Failed";
}

?>

<!DOCTYPE html>
<html>
<head>
    <title>Supabase Connection Test</title>
</head>
<body style="font-family: Arial; text-align:center; margin-top:50px;">

    <h1>Supabase Connection Status</h1>

    <h2><?php echo $status; ?></h2>

    <?php if (!empty($error)): ?>
        <p style="color:red;">
            <?php echo $error; ?>
        </p>
    <?php endif; ?>

</body>
</html>