export interface Env {
  appName: string;
  apiKey: string;
  backendUrl: string;
  frontendUrl: string;
  google: {
    clientId: string;
    clientSecret: string;
  };
  azureAD: {
    clientId: string;
    clientSecret: string;
    tenantId: string;
  };
  reCaptcha: {
    siteKey: string;
    secretKey: string;
  };
}
