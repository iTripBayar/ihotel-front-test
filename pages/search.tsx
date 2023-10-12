'use client';
import '../app/globals.css';
import { fetchDataSearch } from '@/utils';
import { useEffect, useState } from 'react';
// import { useRequest } from 'ahooks';

export default function Search() {
  const [data, setData] = useState(null);
  // const { data } = useRequest(() => {
  //   return fetchDataSearch();
  // });
  useEffect(() => {
    // Fetch data when the component mounts
    fetch('http://sandbox.api.myhotel.mn:8000/ihotel/search')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  console.log(data);

  return <div>search</div>;
}
