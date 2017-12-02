const path = require('path');
const fs = require('fs');
// in development, keep logs in same project. In production put logs outside
// so it doesn't get overwritten/deleted
const logPath = process.env.NODE_ENV === 'development' ? '../' : '../../';

function logError(err, description = 'none') {
  console.log(err, description);
  const message =
`
Time: ${new Date().toString()}
Description: ${description}
Error: ${JSON.stringify(err)}

`;

  fs.appendFile(path.join(__dirname, logPath, 'log', 'error.log'), message, () => {});
}

module.exports = logError;
