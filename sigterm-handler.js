function handleSigterm(server) {
  process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: gracefully shutting down');
    if (server) {
      server.close(() => {
        console.log('HTTP server closed');
      });
    } else {
      console.log('No server instance to close');
    }
  });
}

module.exports = { handleSigterm };
