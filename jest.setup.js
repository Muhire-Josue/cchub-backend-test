require('dotenv').config();

jest.setTimeout(30000);

jest.mock('winston', () => ({
  format: {
    colorize: jest.fn(),
    combine: jest.fn(),
    label: jest.fn(),
    timestamp: jest.fn(),
    printf: jest.fn(),
  },
  createLogger: jest.fn().mockReturnValue({
    debug: jest.fn(),
    log: jest.fn(),
    info: jest.fn(),
    error: jest.fn(),
  }),
  transports: {
    Console: jest.fn(),
    File: jest.fn(),
  },
}));

jest.mock('@slack/web-api', () => ({
  WebClient: jest.fn().mockReturnValue({
    chat: {
      postMessage: jest.fn().mockImplementation(() => Promise.resolve(true)),
    },
  }),
}));
