const host = 'monolith';

export const environment = {
  production: false,
  endpoints: {
    rgb: `http://${host}:3000`,
    rgbRealtime: `http://raspberrypi:5000`,
    tradfri: `http://raspberrypi:5000`
  }
};
