import { EMIT_PROXY_RESPONSE, EMIT_PROXY_RESPONSE_RESET } from '../ducks/admin';
import { PROXY_URL, PROXY_RESPONSE_RESET_TIMOUT } from '../constants';

const sendEvent = (next, { passcode, proxy, events }) => fetch(proxy, {
  method: 'post',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    id: passcode,
    event: 'BATCH_EVENTS'
  },
  body: JSON.stringify(events)
}).then(({ status }) => {
  const resetResponse = () => setTimeout(() => {
    next({ type: EMIT_PROXY_RESPONSE_RESET });
  }, PROXY_RESPONSE_RESET_TIMOUT);

  try {
    next({
      type: EMIT_PROXY_RESPONSE,
      status
    });

    resetResponse();
  } catch (e) {
    // Response could not be parsed, service is mostly likely down
    next({
      type: EMIT_PROXY_RESPONSE,
      status: 404
    });

    resetResponse();
  }
});

export default sendEvent;
