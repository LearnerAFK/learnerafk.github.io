if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    // Validate and sanitize form data
    $title = isset($_POST['title']) ? $_POST['title'] : '';
    $description = isset($_POST['description']) ? $_POST['description'] : '';
    $category = isset($_POST['category']) ? $_POST['category'] : '';

     // Validate and process links
    $links = array();
    for ($i = 1; $i <= 3; $i++) {
        if (!empty($_POST['link' . $i])) {
            $links[] = $_POST['link' . $i];
        }
    }

     // Validate and process image upload
    if (!isset($_FILES['image']['error']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        die('Error uploading image.');
    }
     $targetDir = "uploads/posters/";
    $targetFile = $targetDir . basename($_FILES['image']['name']);
    $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
    $allowedExtensions = array("jpg", "jpeg", "png", "gif");
     if (!in_array($imageFileType, $allowedExtensions)) {
        die('Invalid image format. Only JPG, JPEG, PNG, and GIF are allowed.');
    }
     if (!move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
        die('Error uploading image.');
    }

     // Connect to MongoDB
    $mongoHost = 'localhost';
    $mongoPort = '27017';
    $mongoUser = 'username';
    $mongoPass = 'password';
    $mongoDB = 'database_name';
     try {
        $mongoClient = new MongoDB\Client("mongodb://$mongoUser:$mongoPass@$mongoHost:$mongoPort");
        $db = $mongoClient->$mongoDB;
        $collection = $db->movies;

         // Prepare movie document
        $movie = array(
            'title' => $title,
            'description' => $description,
            'poster_path' => $targetFile,
            'category' => $category,
            'links' => $links
        );

         // Insert movie document into collection
        $result = $collection->insertOne($movie);
        if ($result->getInsertedCount() > 0) {
            echo "Movie uploaded successfully!";
        } else {
            echo "Error uploading movie.";
        }
    } catch (MongoDB\Driver\Exception\Exception $e) {
        die('Error connecting to MongoDB: ' . $e->getMessage());
    }
}
?>