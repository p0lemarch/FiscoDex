const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'i18n', 'locales', 'de.json');
let content = fs.readFileSync(filePath, 'utf8');

// Replace German typographic quotes that break JSON
// \u201E = „ (German opening quote)
// \u201C = " (closing quote)  
content = content.replace(/\u201E/g, "'");
content = content.replace(/\u201C/g, "'");

fs.writeFileSync(filePath, content, 'utf8');

try {
  JSON.parse(content);
  console.log('de.json FIXED and valid');
} catch(e) {
  console.log('de.json still has error:', e.message);
}
