import dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI,
  sessionSecret: process.env.SESSION_SECRET,
  azureAD: {
    clientID: process.env.AZURE_AD_CLIENT_ID,
    clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
    tenantID: process.env.AZURE_AD_TENANT_ID,
    redirectURI: process.env.AZURE_AD_REDIRECT_URI,
    authority: `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}`
  },
  log: {
    level: process.env.LOG_LEVEL,
    directory: process.env.LOG_DIRECTORY
  },
  jwtSecret: process.env.JWT_SECRET || 'sdfasdf348fj5586',
  jwtExpireTime: process.env.JWT_EXPIRE_TIME_ADMIN || '24h'
};

export default config;
