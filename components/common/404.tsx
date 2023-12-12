import Header from './header';
import Footer from './footer';

export default function ErrorComponent() {
  return (
    <div className='flex flex-col justify-between w-full h-screen'>
      <Header />
      <div className='flex h-full w-full flex-col items-center justify-center text-[128px] font-medium leading-[128px] text-sub-text'>
        <h1>404</h1>
        <p className='text-[32px] font-normal leading-[32px]'>
          Cannot connect to server
        </p>
      </div>
      <Footer />
    </div>
  );
}
