const host = 'monolith';

export const environment = {
  production: false,
  endpoints: {
    rgb: `http://${host}:3000`,
    rgbRealtime: `http://${host}:5001`,
    tradfri: `http://raspberrypi:8002`
  }
};
