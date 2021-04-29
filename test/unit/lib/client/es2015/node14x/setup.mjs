/* globals prefix_GLOBAL_PROCESS_ID, prefix_GLOBAL_RECORD */

import { strict as Assert } from 'assert';
import { EventEmitter } from 'events';
import setup from '../../../../../../lib/client/es2015/node14x/setup.js';

/////////////
// Enabled //
/////////////

{
  const emitter = new EventEmitter();
  const trace = [];

  const protocol = {
    requestSync: (json) => {
      trace.push(['sync', json]);
      if (json.name === 'initialize') {
        return { session: 'session', prefix: 'prefix' };
      }
      return 'qux';
    },
    requestAsync: (json, pending) => {
      trace.push(['async', json]);
      if (pending !== null) {
        pending.resolve('qux');
      }
    },
  };

  const data = {
    env: {
      APPMAP_PROTOCOL: protocol,
    },
    execPath: 'exec-path',
    pid: 'pid',
    ppid: 'ppid',
    execArgv: ['exec-arg0'],
    argv: ['node', 'main.js', 'arg0'],
    platform: 'platform',
    arch: 'arch',
    version: 'version',
  };

  Object.assign(emitter, data);

  const { instrumentScript, instrumentModule } = setup(emitter);

  Assert.equal(prefix_GLOBAL_PROCESS_ID, 'pid');

  Assert.equal(instrumentScript('script.js', 'script;'), 'qux');

  Assert.equal(
    instrumentModule('module.mjs', 'module;', {
      reject: () => Assert.fail(),
      resolve: (...args) => {
        Assert.deepEqual(args, ['qux']);
      },
    }),
    undefined,
  );

  Assert.equal(prefix_GLOBAL_RECORD('event'), undefined);

  emitter.emit('exit', 'code', 'origin');

  emitter.emit('SIGINT');
  emitter.emit('SIGTERM');
  Assert.throws(
    () => emitter.emit('uncaughtException', new Error('BOUM'), 'origin'),
    /^Error: BOUM/,
  );
  Assert.throws(() => emitter.emit('uncaughtException', 'BOUM', 'origin'));

  Assert.deepEqual(trace, [
    [
      'sync',
      {
        name: 'initialize',
        process: data,
        configuration: {},
        // {
        //   'map-name': 'main.js',
        //   'recorder-name': 'TODO',
        //   feature: 'TODO',
        //   'feature-group': 'TODO',
        //   labels: [],
        //   frameworks: [],
        //   'recording-defined-class': 'TODO',
        //   'recording-method-id': 'TODO',
        // },
      },
    ],
    [
      'sync',
      {
        name: 'instrument',
        source: 'script',
        path: 'script.js',
        content: 'script;',
        session: 'session',
      },
    ],
    [
      'async',
      {
        name: 'instrument',
        source: 'module',
        path: 'module.mjs',
        content: 'module;',
        session: 'session',
      },
    ],
    [
      'async',
      {
        name: 'record',
        session: 'session',
        event: 'event',
      },
    ],
    [
      'sync',
      {
        name: 'terminate',
        session: 'session',
        sync: false,
        reason: {
          type: 'exit',
          code: 'code',
          origin: 'origin',
        },
      },
    ],
  ]);
}

//////////////
// Disabled //
//////////////

{
  const { instrumentScript, instrumentModule } = setup({
    env: {
      APPMAP_PROTOCOL: {
        requestSync: (json) => {
          Assert.equal(json.name, 'initialize');
          return { session: null, prefix: null };
        },
        requestAsync: (json, pending) => {
          Assert.fail();
        },
      },
    },
  });

  Assert.equal(instrumentScript('script.js', '123;'), '123;');

  instrumentModule('module.mjs', '123;', {
    resolve: (content) => {
      Assert.equal(content, '123;');
    },
    reject: (error) => {
      Assert.fail();
    },
  });
}