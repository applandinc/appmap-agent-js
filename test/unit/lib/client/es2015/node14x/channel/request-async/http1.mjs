import { makeRequestAsync } from '../../../../../../../../lib/client/es2015/node14x/channel/request-async/http1.js';
import { test } from './__fixture__.mjs';

makeRequestAsync('localhost', 'tmp/ipc.sock');

test('http1', makeRequestAsync);
