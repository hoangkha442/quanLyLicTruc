import { useEffect } from 'react';

const useWow = () => {
  useEffect(() => {
    // Use dynamic import
    import('wowjs').then(({ WOW }) => {
      const wow = new WOW({
        live: false,
      });
      wow.init();
    });
  }, []);
};

export default useWow;
