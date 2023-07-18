declare module 'react-google-recaptcha' {
    const ReCAPTCHA: React.ComponentClass<ReCAPTCHAProps>;
    export default ReCAPTCHA;
  
    interface ReCAPTCHAProps {
      sitekey: string;
      onChange?: (token: string | null) => void;
      onExpired?: () => void;
      onErrored?: () => void;
      size?: 'normal' | 'compact' | 'invisible';
      theme?: 'light' | 'dark';
      tabIndex?: number;
      hl?: string;
      badge?: 'bottomright' | 'bottomleft' | 'inline';
    }
  }
  