import axios from 'axios';
import config from '../../config';

const SCHEDULER = config.dev.env.scheduler;

function auth() {
  if (SCHEDULER.token) {
    return Promise.resolve(SCHEDULER.token);
  }
  return axios.post(`${SCHEDULER.host}/auth`, {
    service: 'backoffice',
    passphrase: SCHEDULER.passphrase,
  }).then((response) => {
    SCHEDULER.token = response.data.token;
    return Promise.resolve(SCHEDULER.token);
  });
}

export default {
  get(path) {
    return auth().then(token => axios.get(
      `${SCHEDULER.host}/api/v1${path}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      },
    ).then(r => r.data));
  },
  query(path, params) {
    return auth().then(token => axios.get(
      `${SCHEDULER.host}/api/v1${path}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        params,
      },
    ).then(r => r.data));
  },
};
