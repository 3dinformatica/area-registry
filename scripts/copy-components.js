const fs = require('fs');
const path = require('path');

// Source directory containing the components
const sourceDir = path.join(__dirname, '../registry/new-york');

// Destination directory in public
const destDir = path.join(__dirname, '../public/registry/new-york');

// Ensure the destination directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Function to copy a file
function copyFile(source, destination) {
  const destDir = path.dirname(destination);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.copyFileSync(source, destination);
}

// Function to recursively copy files
function copyDirectory(source, destination) {
  const entries = fs.readdirSync(source, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const destPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(sourcePath, destPath);
    } else {
      copyFile(sourcePath, destPath);
    }
  }
}

// Copy the components
copyDirectory(sourceDir, destDir);

console.log('Components copied to public directory successfully!'); 