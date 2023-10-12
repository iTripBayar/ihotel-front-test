export async function fetchData() {
  const response = await fetch('http://sandbox.api.myhotel.mn:8000/ihotel');
  const result = await response.json();

  return result;
}

export async function fetchDataSearch() {
  const response = await fetch(
    'http://sandbox.api.myhotel.mn:8000/ihotel/search',
  );
  const result = await response.json();

  return result;
}
