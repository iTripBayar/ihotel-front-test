'use client';
import { useRequest } from 'ahooks';
import { fetchCheckHotel } from '@/utils';
import { addDays, format } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import ImagesDialog from '@/components/hotelPage/imagesDialog';

export default function TestPage() {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('searchValue');
  const destination = searchParams.get('destination');
  const category = searchParams.get('category');
  const page = searchParams.get('page');
  const min = searchParams.get('min');
  const max = searchParams.get('max');
  const services = searchParams.get('services');

  const newDate = new Date();
  const nextDay = addDays(newDate, 1);
  const hotel =
    searchValue?.split('$')[1] === 'hotel' ? searchValue?.split('$')[2] : '';
  const city =
    searchValue?.split('$')[1] === 'city' ? searchValue?.split('$')[2] : '';
  const place =
    searchValue?.split('$')[1] === 'place' ? searchValue?.split('$')[2] : '';

  const { data, loading, error } = useRequest(
    () => {
      return fetchCheckHotel({
        hotel: hotel,
        place: place,
        city: city,
        checkin: encodeURIComponent(format(newDate, 'MM/dd/yyyy')),
        checkout: encodeURIComponent(format(nextDay, 'MM/dd/yyyy')),
        isClosed: '',
        page: page !== null ? page : '1',
        prices:
          min && max
            ? encodeURIComponent(
                `[["[${min !== '0' ? `${min},` : ''} ${max}]"]]`,
              )
            : '',
        filterstar: '',
        rating1: '',
        rating2: '',
        hotelServices: services ? encodeURI(`[${services}]`) : '',
        roomServices: '',
        categories: category ? encodeURIComponent(`["${category}"]`) : '',
      });
    },
    { refreshDeps: [searchParams] },
  );

  console.log(data);
  return (
    <div className='relative overflow-hidden w-screen h-screen'>
      test
      <ImagesDialog data={[]} />
    </div>
  );
}
