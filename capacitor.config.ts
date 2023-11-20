import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.sermaluc.test',
  appName: 'sermalucApp',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
