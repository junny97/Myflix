import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { windowWidthState } from '../atom';

const DELAY_MS = 250;

function debounce(cb: () => void, delay: number) {
  let timeout: ReturnType<typeof setTimeout>;

  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb();
    }, delay);
  };
}

function useDebouncedResize() {
  const [windowWidth, setWindowWidth] = useRecoilState(windowWidthState);

  useEffect(() => {
    const handleResizeDebounced = debounce(() => {
      setWindowWidth(window.innerWidth);
    }, DELAY_MS);

    window.addEventListener('resize', handleResizeDebounced);
    return () => window.removeEventListener('resize', handleResizeDebounced);
  }, []);

  return windowWidth;
}

export default useDebouncedResize;
