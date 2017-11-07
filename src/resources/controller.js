import axios from 'axios';
import config from '../../config';

const CONTROLLER = config.dev.servers.controller;

function auth() {
  if (CONTROLLER.token) {
    return Promise.resolve(CONTROLLER.token);
  }
  return axios.post(`${CONTROLLER.host}/auth`, {
    service: 'backoffice',
    passphrase: CONTROLLER.passphrase,
  }).then((response) => {
    CONTROLLER.token = response.data.token;
    return Promise.resolve(CONTROLLER.token);
  });
}

export default {
  get(path) {
    return auth().then(token => axios.get(
      `${CONTROLLER.host}/api/v1${path}`,
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
      `${CONTROLLER.host}/api/v1${path}`,
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
