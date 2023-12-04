export async function fetchData() {
  const response = await fetch('https://sandbox.api.myhotel.mn:9443/ihotel',{cache: 'force-cache'});
  const result = await response.json();

  return result;
}

export async function fetchDataSearch() {
  const response = await fetch(
    'https://sandbox.api.myhotel.mn:9443/ihotel/search',
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
