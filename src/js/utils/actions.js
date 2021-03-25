import { waitPromise } from "./time";

export const ACTION_FORCE_SYNC = "force-sync";
export const ACTION_REQUEST_STATE = "req-state";
export const ACTION_RESPONSE_STATE = "res-state";

/**
 * Create a ack for a given action
 *
 * @param {object} port - chrome runtime port
 * @param {object} action - action to ack
 */
export const postMessageAck = (port, action) => port.postMessage({ type: `ack-${action.type}` });

/**
 * Wait for an action based on a filter
 *
 * @param {object} port - chrome runtime port
 * @param {object} action - initial action to post
 * @param {object} options - options of the response action watcher
 * @param {string} options.actionType - action type to wait
 * @param {function} options.selector - action selector to use (return true if action match)
 * @param {number} options.timeout - max duration to wait
 * @returns {Promise}
 */
export const postMessageAndWaitFor = (port, action, { actionType, selector, timeout = 10000 }) =>
  Promise.race([
    // waitPromise(timeout),
    new Promise(resolve => {
      const messageFilter = actionType ? message => message.type === actionType : selector;
      port.onMessage.addListener(message => {
        messageFilter(message) && resolve(message);
      });
      port.postMessage(action);
    }),
  ]);

/**
 * Wait for an action ack
 *
 * @param {object} port - chrome runtime port
 * @param {object} action - the action to watch
 * @param {number} timeout - max duration to wait
 * @returns {Promise}
 */
export const postMessageAndWaitAck = (port, action, timeout = 10000) =>
  postMessageAndWaitFor(port, action, {
    actionType: `ack-${action.type}`,
    timeout,
  });
