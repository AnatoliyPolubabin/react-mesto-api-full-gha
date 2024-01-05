// eslint-disable-next-line import/no-unresolved
import { transports as _transports, format as _format } from 'winston';
// eslint-disable-next-line import/no-unresolved
import { logger, errorLogger as _errorLogger } from 'express-winston';

const requestLogger = logger({
  transports: [new _transports.File({ filename: 'request.log' })],
  format: _format.json(),
});

const errorLogger = _errorLogger({
  transports: [new _transports.File({ filename: 'error.log' })],
  format: _format.json(),
});

export default {
  requestLogger,
  errorLogger,
};