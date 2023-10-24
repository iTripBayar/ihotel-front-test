import { useEffect, useState } from 'react';

function useSwitchSuggestion(e: number) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const suggestion = [
    {
      id: 'Тэрэлж',
      mn: 'Тэрэлж',
      en: 'Terelj',
    },
    {
      id: 'Улаанбаатар',
      mn: 'Улаанбаатар',
      en: 'Ulaanbaatar',
    },
    {
      id: 'Хөвсгөл',
      mn: 'Хөвсгөл',
      en: 'Khuvsgul',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % suggestion.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return suggestion[currentIndex];
}

export default useSwitchSuggestion;

// useEffect(() => {
//   if (ver !== 'search' || 'headerSearch') {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % suggestion.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }
// }, []);
