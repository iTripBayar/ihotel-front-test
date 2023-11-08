export async function fetchData() {
  const response = await fetch('https://sandbox.api.myhotel.mn:9443/ihotel');
  const result = await response.json();

  return result;
}

export async function fetchDataSearch() {
  const response = await fetch(
    'https://sandbox.api.myhotel.mn:9443/ihotel/search',
  );
  const result = await response.json();

  return result;
}

export async function fetchDataHotel(slug: string) {
  const response = await fetch(
    `https://sandbox.api.myhotel.mn:9443/ihotel/hotel/${slug}`,
  );
  const result = await response.json();

  return result;
}

// `https://sandbox.api.myhotel.mn:9443/ihotel/hotel/${searchParams.slug}`;
