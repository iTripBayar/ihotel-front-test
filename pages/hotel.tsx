'use client';
import React from 'react';
import { useRequest } from 'ahooks';
import { fetchDataSearch } from '@/utils';

const hotel = () => {
  const { data } = useRequest(() => {
    return fetchDataSearch();
  });

  console.log(data);

  return <div>hotel</div>;
};

export default hotel;
