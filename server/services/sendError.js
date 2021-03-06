function sendError(err, res) {
  if (!err || !err.status || !err.error) { return res.status(500).send(JSON.stringify({ error: 'Server Error' })); }
  res.status(err.status).send(JSON.stringify({ error: err.error }));
}

module.exports = sendError;
