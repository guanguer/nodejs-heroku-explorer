const request = require('supertest');
const http = require('http');
const app = require('./app');
const { handleSigterm } = require('./sigterm-handler');

describe('Express App', () => {
  let server;
  let agent;

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(() => {
      const { port } = server.address();
      agent = request(`http://localhost:${port}`);
      done();
    });
  });

  afterEach((done) => {
    server.close(done);
  });

  test('GET / should render the index page', async () => {
    const res = await agent.get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch("<title>Node.js Getting Started on Heroku</title>");
    expect(res.text).toMatch("Getting Started on Heroku with Node.js");
  });
});

describe('SIGTERM handling', () => {
  let originalListeners;

  beforeEach(() => {
    originalListeners = process.listeners('SIGTERM');
    process.removeAllListeners('SIGTERM');
  });

  afterEach(() => {
    originalListeners.forEach(listener => process.on('SIGTERM', listener));
  });

  test('should close server gracefully on SIGTERM', () => {
    const closeMock = jest.fn((cb) => cb && cb());
    const mockServer = { close: closeMock };

    handleSigterm(mockServer);
    process.emit('SIGTERM');
    
    expect(closeMock).toHaveBeenCalled();
  });

  it('should not try to close if server does not exist', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    handleSigterm(undefined);
    process.emit('SIGTERM');
    
    expect(consoleSpy).toHaveBeenCalledWith('SIGTERM signal received: gracefully shutting down');
    expect(consoleSpy).toHaveBeenCalledWith('No server instance to close');

    consoleSpy.mockRestore();
  });
});
