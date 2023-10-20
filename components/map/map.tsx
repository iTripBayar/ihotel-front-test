import React, { useState, useRef, useEffect } from 'react';
// import { Map } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {
  GeolocateControl,
  Map,
  Marker,
  NavigationControl,
  FullscreenControl,
} from 'react-map-gl';
import { useAppCtx } from '@/utils/app';
import useWindowSize from '@/hooks/windowSize';
import Image from 'next/image';
import { Lang } from '@/utils/app';

interface iProps {
  closeMap: () => void;
  changeMap: (e: string) => void;
  sizeHeight: number;
  sizeWidth: number;
  map: string;
}

const MapContainer = ({
  closeMap,
  changeMap,
  sizeHeight,
  map,
  sizeWidth,
}: iProps) => {
  const size = useWindowSize();
  const divRef = useRef<HTMLDivElement>(null);

  const { appState, dispatch } = useAppCtx();
  const [viewPort, setViewPort] = useState({
    lng: 106.91744615540313,
    lan: 47.91768064540636,
    zoom: 12,
  });

  const handleDay = (type: Lang) => {
    dispatch({
      type: 'CHANGE_APP_STATE',
      payload: {
        lang: type,
      },
    });
  };
  return (
    <div
      className={`sticky h-full w-full flex-col items-center justify-start gap-[24px] px-[16px] pb-[24px] sm:px-[42px]  md:px-[72px] lg:h-[calc(100vh-82px)] lg:px-0 lg:pb-0 lg:pt-[8px] ${
        map === '' ? 'hidden' : 'flex lg:col-span-2'
      }`}
      ref={divRef}
    >
      <Map
        // mapLib={import('mapbox-gl')}
        mapboxAccessToken="pk.eyJ1IjoiaWhvdGVsLWRldiIsImEiOiJjbG53eG4xM2cwOGdqMnFwZWZodmxyYWgwIn0.NKP_FGb_Ad26fu4wSqnJ7Q"
        initialViewState={{
          longitude: viewPort.lng,
          latitude: viewPort.lan,
          zoom: viewPort.zoom,
        }}
        style={{
          width: '100%',
          //   maxWidth: '100vw',
          //   sizeWidth >= 1024 ? sizeHeight - 82 - 64 - 32 : 550
          height: '100%',
          borderRadius: 20,
          border: 'solid 1px rgb(0,0,0,0.25)',
          //   objectFit: 'cover',
        }}
        id="mapBox"
        mapStyle="mapbox://styles/ihotel-dev/clnwysb8a005b01qx38a9hgh0"
      >
        <FullscreenControl />
        <NavigationControl showCompass={false} />
        <GeolocateControl />
      </Map>
      {/* <div className="h-full w-full rounded-[20px] border border-black/[.15] bg-white">
        a
      </div> */}
      <div className="flex w-full items-center justify-center gap-[24px] lg:justify-start ">
        <div
          className="flex h-[40px] max-w-[220px] cursor-pointer items-center justify-center gap-[4px] rounded-full bg-primary-blue px-[16px] font-medium text-white"
          onClick={() => changeMap('')}

          //   onClick={() => changeMap('open')}
        >
          {appState.lang === 'mn' ? 'Газрын зураг хаах' : 'Close map'}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className=" h-[18px] w-[18px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
        {map === 'open' ? (
          <div
            className="flex h-[40px] w-[40px] items-center justify-center rounded-full border-2 border-white bg-primary-blue lg:hidden"
            onClick={() => {
              if (appState.lang === 'mn') {
                handleDay('en');
              } else {
                handleDay('mn');
              }
              console.log(appState);
            }}
          >
            <Image
              src={
                appState.lang === 'mn'
                  ? '/images/uk-flag.png'
                  : '/images/mongolian-flag.png'
              }
              alt="/lang"
              width={28}
              height={28}
              priority
              quality={100}
              sizes="20vw"
              className="h-[30px] w-[30px] cursor-pointer object-cover"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MapContainer;
