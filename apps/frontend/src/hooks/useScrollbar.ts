import throttle from 'lodash.throttle';
import { useEffect, useState } from 'react';

export default function useScrollbar(waitMilliseconds = 100) {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollTop(document.documentElement.scrollTop);
      setScrollPercentage(
        ((window.innerHeight + document.documentElement.scrollTop) * 100) /
          document.documentElement.offsetHeight,
      );
    };

    window.addEventListener('scroll', throttle(updatePosition, waitMilliseconds), {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', updatePosition);
    };
  }, [setScrollTop, setScrollPercentage, waitMilliseconds]);

  return { scrollTop, scrollPercentage };
}
