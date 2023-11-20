import HeaderVariants from '@/components/common/headerVariants';

const ReservationPage = async ({
  searchParams,
}: {
  searchParams: { name: string; slug: string; lang: string };
}) => {
  //   const res = await fetch(
  //     `https://sandbox.api.myhotel.mn:9443/ihotel/hotel/${searchParams.slug}`,
  //     { cache: 'no-store' },
  //     // {next: {revalidate: 10}}
  //   );
  //   const data = await res.json();

  return (
    <div>
      <HeaderVariants
        ver={'reservation'}
        hotelData={[]}
        placesData={[]}
        campsData={[]}
        destData={[]}
      />
    </div>
  );
};

export default ReservationPage;
