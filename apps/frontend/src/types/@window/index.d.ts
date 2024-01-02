interface Window {
  /**
   * Google reCaptcha object
   */
  grecaptcha: ReCaptchaInstance;
}
interface ReCaptchaInstance {
  ready: (cb: () => unknown) => void;
  execute: (siteKey: string, options: ReCaptchaExecuteOptions) => Promise<string>;
}

interface ReCaptchaExecuteOptions {
  action: string;
}
