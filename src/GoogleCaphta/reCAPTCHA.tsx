import React, { useContext } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface CaptchaProps {
  sitekey: string;
  onChange: (value: string | null) => void;
}

const Captcha: React.FC<CaptchaProps> = ({ sitekey, onChange }) => {
  const recaptchaRef = React.useRef<any>(null);

  const handleCaptchaChange = (value: string | null) => {
    onChange(value);
  };

  return (
    <div>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={sitekey}
        onChange={handleCaptchaChange}
      />
    </div>
  );
};

export default Captcha;

