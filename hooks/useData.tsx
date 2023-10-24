import React, { useState } from 'react';
import { useInfiniteScroll, useRequest } from 'ahooks';
import { fetchData } from '@/utils';

interface Result {
  list: string[];
  nextId: string | undefined;
}

const { data } = useRequest(() => {
  return fetchData();
});

let resultData = [...data.hotels, ...data.camps];
// resultData = [...data.hotels, ...data.camps];

function getLoadMoreList(
  nextId: string | undefined,
  limit: number,
  keyword: string,
): Promise<Result> {
  let start = 0;
  if (nextId) {
    start = resultData.findIndex((i) => i === nextId);
  }
  const end = start + limit;
  const list = resultData.slice(start, end);
  const nId = resultData.length >= end ? resultData[end] : undefined;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        list,
        nextId: nId,
      });
    }, 1000);
  });
}

export default getLoadMoreList;
