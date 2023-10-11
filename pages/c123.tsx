import React, { useRef, useEffect } from 'react';
import '../app/globals.css';

const c123 = () => {
  const whiteBoxRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px', // No margin
      threshold: 0, // Trigger when any part of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          // console.log('Over');
        }
      });
    }, options);

    if (whiteBoxRef.current) {
      observer.observe(whiteBoxRef.current);
    }

    return () => {
      if (whiteBoxRef.current) {
        observer.unobserve(whiteBoxRef.current);
      }
    };
  }, []);

  return (
    <div className="flex h-[200vh] w-full justify-center bg-green-500 pt-[100px]">
      <div ref={whiteBoxRef} className="h-[100px] w-[100px] bg-white"></div>
    </div>
  );
};

export default c123;
