export async function fetchData() {
  const response = await fetch('https://sandbox.api.myhotel.mn:9443/ihotel');
  const result = await response.json();

  return result;
}

export async function fetchDataSearch() {
  const response = await fetch('https://sandbox.api.myhotel.mn:9443/search');
  const result = await response.json();

  return result;
}
