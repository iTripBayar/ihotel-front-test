import {
  ChakraProvider,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  time: string;
  handleTimeOut: () => void;
}

export default function Timer({ time, handleTimeOut }: Props) {
  const router = useRouter();
  const [progressValue, setProgressValue] = useState(100);

  const targetTime = new Date(time);
  targetTime.setMinutes(targetTime.getMinutes() + 10); // Setting time to 10mins after (when changing the minute value make sure to adjust the values bellow accordingly)

  const initialCountdown = Math.floor(
    (targetTime.getTime() - new Date().getTime()) / 1000,
  );

  const [countdown, setCountdown] = useState(initialCountdown);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 0) {
          handleTimeOut();
          clearInterval(interval);
          return 0;
        }
        setProgressValue(prevCountdown / 6);
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [router, initialCountdown]);

  return (
    <div>
      <ChakraProvider>
        <CircularProgress
          value={progressValue}
          color='#3C76FE'
          size='90px'
          thickness='4px'
          capIsRound={true}
        >
          <CircularProgressLabel>
            {`${Math.floor(countdown / 60)
              .toString()
              .padStart(2, '0')}:${(countdown % 60)
              .toString()
              .padStart(2, '0')}`}
          </CircularProgressLabel>
        </CircularProgress>
      </ChakraProvider>
    </div>
  );
}
