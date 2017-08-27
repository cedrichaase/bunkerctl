const host = '192.168.178.2';

export const environment = {
  production: true,
  endpoints: {
    rgb: `http://${host}:3000`,
    rgbRealtime: `http://${host}:5001`,
    tradfri: undefined
  }
};
