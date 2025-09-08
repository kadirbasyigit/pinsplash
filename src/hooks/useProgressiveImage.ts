import { useState, useEffect, useRef } from 'react';

interface UseProgressiveImageProps {
  thumb: string;
  small: string;
  regular: string;
  alt: string;
}

interface UseProgressiveImageReturn {
  src: string;
  isLoading: boolean;
  isInView: boolean;
  ref: React.RefObject<HTMLDivElement | null>;
}

export const useProgressiveImage = ({
  thumb,
  small,
  regular,
  alt,
}: UseProgressiveImageProps): UseProgressiveImageReturn => {
  const [src, setSrc] = useState<string>(thumb);
  const [isLoading, setIsLoading] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Progressive loading when in view
  useEffect(() => {
    if (!isInView) return;

    let isMounted = true;

    const loadImage = (imageSrc: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = imageSrc;
        img.alt = alt;
      });
    };

    const loadProgressive = async () => {
      try {
        // Step 1: Load thumb (already set as initial src)
        setIsLoading(true);
        
        // Step 2: Load small
        await loadImage(small);
        if (isMounted) {
          setSrc(small);
        }

        // Step 3: Load regular
        await loadImage(regular);
        if (isMounted) {
          setSrc(regular);
          setIsLoading(false);
        }
      } catch (error) {
        console.warn('Failed to load image:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProgressive();

    return () => {
      isMounted = false;
    };
  }, [isInView, small, regular, alt]);

  return {
    src,
    isLoading,
    isInView,
    ref,
  };
};