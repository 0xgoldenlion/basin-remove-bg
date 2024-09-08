const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5555;
require('dotenv').config();

// Set up storage for Multer (handling file uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Create a directory for uploaded files
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// POST route to handle file uploads and ADM add command
app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  const admAddress = "t2lbykc63l33gwy5o2fvk67chdtg2wtd6ywwstkjy";
  const admKey = "image";

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = path.join(__dirname, file.path);

  // Run the ADM add command
  const cmd = `NETWORK=${process.env.NETWORK} PRIVATE_KEY=${process.env.PRIVATE_KEY} adm os add --address ${process.env.ADMADDRESS} --key ${process.env.ADMKEY} ${filePath}`;
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).send('Error uploading file to ADM.');
    }

    console.log(`Output: ${stdout}`);
    res.send(`File uploaded to ADM: ${stdout}`);
  });
});

// GET route to download a file from ADM and send it to the client
app.get('/download', (req, res) => {
  const admAddress = "t2lbykc63l33gwy5o2fvk67chdtg2wtd6ywwstkjy";
  const admKey = "image";

  const cmd = `adm os get --address ${admAddress} ${admKey} `;
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).send('Error downloading file from ADM.');
    }

    console.log('File downloaded from ADM.');

    // Send the file to the client
    const filePath = path.join(__dirname, 'downloaded-file.txt');
    res.download(filePath, 'downloaded-file.txt');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

