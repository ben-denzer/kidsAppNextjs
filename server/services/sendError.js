function sendError(err, res) {
  console.log(err);
  if (!err || !err.status || !err.error) return res.status(500).send(JSON.stringify({ error: 'Server Error' }));
  res.status(err.status).send(JSON.stringify({ error: err.error }));
}

export default sendError;
