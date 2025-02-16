import { ConfidentialClientApplication, LogLevel } from '@azure/msal-node';
import config from './config.js';

const msalConfig = {
  auth: {
    clientId: config.azureAD.clientID,
    authority: `${config.azureAD.authority}`,
    clientSecret: config.azureAD.clientSecret
  },
  system: {
    loggerOptions: {
      loggerCallback(logLevel, message) {
        console.log(message);
      },
      logLevel: LogLevel.Verbose
    }
  }
};

const cca = new ConfidentialClientApplication(msalConfig);

export default cca;
