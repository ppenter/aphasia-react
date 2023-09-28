import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.aphasia.app',
  appName: 'aphasia-react',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
