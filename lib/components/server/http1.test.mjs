import { strict as Assert } from 'assert';
import * as Http from 'http';
import { getInitialConfiguration } from '../../../../../lib/server/configuration/index.mjs';
import { Dispatching } from '../../../../../lib/server/dispatching.mjs';
import {
  createServer,
  attach,
} from '../../../../../lib/server/protocol/http1.mjs';

const server = createServer();
server.listen(0, () => {
  attach(server, new Dispatching(getInitialConfiguration(), () => {}));
  const iterator = [
    ['foo', 400, /^failed to parse as json http1 body/],
    [
      JSON.stringify({
        action: 'initialize',
        session: null,
        data: {
          cwd: '/',
          main: 'main.js',
        },
      }),
      200,
      'null',
    ],
  ][Symbol.iterator]();
  const step = () => {
    const { done, value } = iterator.next();
    if (done) {
      server.close();
    } else {
      const request = Http.request({
        host: 'localhost',
        port: server.address().port,
        method: 'PUT',
        path: '/',
      });
      request.end(value[0], 'utf8');
      request.on('response', (response) => {
        Assert.equal(response.statusCode, value[1]);
        let body = '';
        response.on('data', (data) => {
          body += data;
        });
        response.on('end', () => {
          if (value[2] instanceof RegExp) {
            Assert.match(body, value[2]);
          } else {
            Assert.equal(body, value[2]);
          }
          step();
        });
      });
    }
  };
  step();
});