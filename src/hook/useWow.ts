import { useEffect } from 'react';
import WOW from 'wowjs';

const useWow = () => {
  useEffect(() => {
    const wow = new WOW.WOW({
      live: false,
    });
    wow.init();
  }, []);
};

export default useWow;
