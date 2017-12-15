import fs from 'fs';

// in development, keep logs in same project. In production put logs outside
// so it doesn't get overwritten/deleted

// const dev = process.env.NODE_ENV === 'development';
// const logPath = dev ? './server' : '../';

function logError(err, description = 'none') {
  console.log(err, description); // eslint-disable-line no-console
  const message =
`
Time: ${new Date().toString()}
Description: ${description}
Error: ${JSON.stringify(err)}

`;

  fs.appendFile(
    'error.log',
    message,
    (err) => { if (err) console.log('error logging', err); } // eslint-disable-line no-console
  );
}

export default logError;
