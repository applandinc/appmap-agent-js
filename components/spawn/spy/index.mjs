/* globals GLOBAL_SPY_SPAWN */

export default (dependencies) => {
  return {
    spawn: (exec, argv, options) => GLOBAL_SPY_SPAWN(exec, argv, options),
  };
};
