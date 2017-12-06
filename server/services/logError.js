import path from 'path';
import fs from 'fs';
// in development, keep logs in same project. In production put logs outside
// so it doesn't get overwritten/deleted
const logPath = process.env.NODE_ENV === 'development' ? './server' : '../';

function logError(err, description = 'none') {
  console.log(err, description);
  const message =
`
Time: ${new Date().toString()}
Description: ${description}
Error: ${JSON.stringify(err)}

`;

  fs.appendFile(
    path.join(logPath, 'log', 'error.log'),
    message,
    (err) => { if (err) console.log('error logging', err) }
  );
}

export default logError;
