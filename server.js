const app = require('./app');
const { handleSigterm } = require('./sigterm-handler');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

handleSigterm(server);
