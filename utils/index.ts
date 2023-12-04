export async function fetchData(): Promise<HomeData.Home> {
  const response = await fetch('https://sandbox.api.myhotel.mn:9443/ihotel',{cache: 'force-cache'});
  const result = await response.json();

  return result;
}

export async function fetchDataSearch():Promise<SearchData.Data> {
  const response = await fetch(
    'https://sandbox.api.myhotel.mn:9443/ihotel/search',
    { cache: 'force-cache' },
  );
  const result = await response.json();

  return result;
}

export async function fetchHotelsData(): Promise<CheckHotels.Data> {
  const response = await fetch(
    'https://sandbox.api.myhotel.mn:9443/ihotel/checkhotels',
    { cache: 'force-cache' },
  );
  const result = await response.json();

  return result;
}

export async function fetchDataHotel(slug: string): Promise<HotelData.full> {
  const response = await fetch(
    `https://sandbox.api.myhotel.mn:9443/ihotel/hotel/${slug}`,
    { cache: 'force-cache' },
  );
  const result : HotelData.full = await response.json();

  return result;
}

// `https://sandbox.api.myhotel.mn:9443/ihotel/hotel/${searchParams.slug}`;
