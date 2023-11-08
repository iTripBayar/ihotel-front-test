'use client';
import React from 'react';
import { fetchDataSearch } from '@/utils';
import { useRequest } from 'ahooks';

const page = () => {
  const { data } = useRequest(() => {
    return fetchDataSearch();
  });
  console.log(data);
  return <div>test</div>;
};

export default page;
