const fs = require('fs');
const path = require('path');

export function getWelcomeTemplate(email: string) {
  const templatePath = path.join(__dirname, 'welcome.html');
  const template = fs.readFileSync(templatePath, 'utf8');
  return template.replace('{{email}}', email);
}

export function getResstPasswordTemplate(resetLink: string) {
  const templatePath = path.join(__dirname, 'reset-password.html');
  let template = fs.readFileSync(templatePath, 'utf8');

  return template.replace('{{resetLink}}', resetLink);
}
