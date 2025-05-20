import fs from 'fs';
import path from 'path';
import registry from '../registry/index';

const outputPath = path.join(process.cwd(), 'registry.json');

// Convert the registry object to a formatted JSON string
const jsonContent = JSON.stringify(registry, null, 2);

// Write the JSON file
fs.writeFileSync(outputPath, jsonContent);

console.log("Registry JSON file generated successfully!"); 