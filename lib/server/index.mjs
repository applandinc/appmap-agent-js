import Path from 'path';
import home from '../../home.js';
import logger from './logger.mjs';
import ChildProcess from "child_process";
import Dispatcher from './dispatcher.mjs';
import { getDefaultConfig } from './config.mjs';
import { makeServer } from './response/index.mjs';

export const createServer = (protocol, env, options) =>
  makeServer(
    protocol,
    new Dispatcher(getDefaultConfig().extendWithEnv(env)),
    options,
  );

const makeHook = (options) => {
  if (options.esm) {
    if (options.cjs) {
      return [
        '--experimental-loader',
        Path.join(home, 'lib', 'client', options.ecma, 'node', `index-esm-cjs.js`),
      ];
    }
    return [
      '--experimental-loader',
      Path.join(home, 'lib', 'client', options.ecma, 'node', `index-esm.js`),
    ];
  }
  if (options.cjs) {
    return [
      '--require',
      Path.join(home, 'lib', 'client', options.ecma, 'node', 'index-cjs.js'),
    ];
  }
  logger.warning(
    'Not instrumenting anything because options.cjs and options.esm are both falsy',
  );
  return [];
};

export const hookForkOptions = (forkOptions, options) => {
  forkOptions = {
    __proto__: null,
    execArgv: [],
    env: process.env,
    ...forkOptions,
  };
  options = {
    __proto__: null,
    esm: true,
    cjs: true,
    port: 0,
    env: {},
    protocol: 'messaging',
    ecma: 'es2015',
    ...options,
  };
  forkOptions.env = { ...forkOptions.env };
  Reflect.ownKeys(forkOptions.env).forEach((key) => {
    if (key.startsWith('APPMAP')) {
      delete forkOptions.env[key];
    }
  });
  if (options.ecma !== 'es2015') {
    logger.warning(
      'Only "es2015" is currently supported for options.ecma, got: %s',
      options.ecma,
    );
    options.ecma = 'es2015';
  }
  return {
    ...forkOptions,
    execArgv: [...makeHook(options), ...forkOptions.execArgv],
    env: {
      ...forkOptions.env,
      ...options.env,
      APPMAP_PROTOCOL: options.protocol,
      APPMAP_HOST: 'localhost',
      APPMAP_PORT:
        typeof options.port === 'number' ? String(options.port) : options.port,
    },
  };
};

export const fork = (main, args, forkOptions, options) => {
  return ChildProcess.fork(main, args, hookForkOptions(forkOptions, options));
};

export const spawn = (cmd, args, spawnOptions, options) => {
  spawnOptions = hookForkOptions(spawnOptions, options);
  return ChildProcess.spawn(cmd, [...spawnOptions.execArgv, ...args], spawnOptions);
};

export const spawnSync = (cmd, args, spawnOptions, options) => {
  spawnOptions = hookForkOptions(spawnOptions, options);
  return ChildProcess.spawnSync(cmd, [...spawnOptions.execArgv, ...args], spawnOptions);
};