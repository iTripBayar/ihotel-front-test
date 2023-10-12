interface iProps {
  Lang: 'mn' | 'en';
}

export default function testState({ Lang }: iProps) {
  type Lang = 'mn' | 'en';

  return Lang;
}
