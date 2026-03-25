import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';

export const ScrollToTop = () => {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      // If lenis is available, use it for an immediate scroll reset
      lenis.scrollTo(0, { immediate: true });
    } else {
      // Fallback to native scroll
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
};
