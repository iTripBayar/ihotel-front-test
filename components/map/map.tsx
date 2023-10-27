'use client';
import React, { useState, useRef, useEffect } from 'react';
// import { Map } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, {
  GeolocateControl,
  Map,
  Marker,
  Source,
  Layer,
  NavigationControl,
  FullscreenControl,
} from 'react-map-gl';
import { useAppState } from '@/contexts/appStateContext';
import Image from 'next/image';
import useSupercluster from 'use-supercluster';

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
  const divRef = useRef<HTMLDivElement>(null);

  const defaultMarkers = [
    {
      key: 0,
      lng: 106.91758135480454,
      lat: 47.91882489533373,
      name: 'Сүхбаатарын талбай',
      price: 10000,
    },
    {
      key: 1,
      lng: 106.92172595198987,
      lat: 47.909895527948485,
      name: 'Парк',
      price: 20000,
    },
    {
      key: 2,
      lng: 106.90632030754686,
      lat: 47.916690111044325,
      name: 'Их дэлгүүр',
      price: 30000,
    },
    {
      key: 3,
      lng: 106.89472667140045,
      lat: 47.915225456973545,
      name: 'Баруун 4',
      price: 40000,
    },
    {
      key: 4,
      lng: 106.94322683511892,
      lat: 47.91900670820435,
      name: 'Зүүн 4',
      price: 50000,
    },
    {
      key: 5,
      lng: 106.92597437999615,
      lat: 47.918424478982985,
      name: 'Багшийн дээд',
      price: 60000,
    },
    {
      key: 6,
      lng: 106.89952081975947,
      lat: 47.9166500269689,
      name: 'Computer land',
      price: 70000,
    },
    {
      key: 7,
      lng: 106.86706559965062,
      lat: 47.914420094972705,
      name: '10-р хороолол',
      price: 80000,
    },
    {
      key: 8,
      lng: 106.88062748835173,
      lat: 47.91493906662716,
      name: '25-р эмийн сан',
      price: 90000,
    },
  ];

  //   [
  //   {
  //     "type": "Feature",
  //     "properties": {
  //       "cluster": false,
  //       "crimeId": 78212911,
  //       "category": "anti-social-behaviour"
  //     },
  //     "geometry": { "type": "Point", "coordinates": [-1.135171, 52.6376] }
  //   }
  // ]

  // const { appState, dispatch } = useAppCtx();
  const { state, dispatch } = useAppState();
  const [viewPort, setViewPort] = useState({
    lng: 106.91744615540313,
    lat: 47.91768064540636,
    zoom: 12,
  });
  const mapRef = useRef<any>();

  // const points = defaultMarkers.map((point) => ({
  //   type: 'Feature',
  //   properties: {
  //     cluster: false,
  //     crimeId: point.key,
  //     name: point.name,
  //     price: point.price,
  //   },
  //   geometry: { type: 'Point', coordinates: [point.lng, point.lat] },
  // }));

  const points = defaultMarkers.map((data) => ({
    type: 'Feature',
    properties: { cluster: false, pointId: data.key, price: data.price },
    geometry: {
      type: 'Point',
      coordinates: [data.lng, data.lat],
    },
  }));
  const bounds = mapRef.current
    ? mapRef.current.getMap().getBounds().toArray().flat()
    : null;

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewPort.zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  const handleDay = () => {
    const newLanguage = state.language === 'mn' ? 'en' : 'mn';
    dispatch({ type: 'SET_LANGUAGE', payload: newLanguage });
  };

  console.log(clusters);
  console.log(supercluster);

  return (
    <div
      className={`sticky h-full w-full flex-col items-center justify-start gap-[24px] bg-white px-[16px] pb-[24px]  sm:px-[42px] md:px-[72px] lg:h-[calc(100vh-60px)] lg:px-0 lg:pb-[24px]  lg:pt-[16px] ${
        map === '' ? 'hidden' : 'flex lg:col-span-2'
      }`}
      ref={divRef}
    >
      <ReactMapGL
        mapboxAccessToken="pk.eyJ1IjoiaWhvdGVsLWRldiIsImEiOiJjbG53eG4xM2cwOGdqMnFwZWZodmxyYWgwIn0.NKP_FGb_Ad26fu4wSqnJ7Q"
        initialViewState={{
          longitude: viewPort.lng,
          latitude: viewPort.lat,
          zoom: viewPort.zoom,
        }}
        ref={mapRef}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 20,
          border: 'solid 1px rgb(0,0,0,0.25)',
        }}
        id="mapBox"
        mapStyle="mapbox://styles/ihotel-dev/clnwysb8a005b01qx38a9hgh0"
        onMove={(e) => {
          setViewPort({
            lng: e.viewState.longitude,
            lat: e.viewState.latitude,
            zoom: e.viewState.zoom,
          });
        }}

        // onViewportChange={(newViewport) => {
        //   setViewport({ ...newViewport });
        // }}
      >
        {clusters.map((cluster) => {
          // every cluster point has coordinates
          const [longitude, latitude] = cluster.geometry.coordinates;
          // the point may be either a cluster or a crime point
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;

          // we have a cluster to render
          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                latitude={latitude}
                longitude={longitude}
              >
                <div
                  className="flex min-h-[36px] min-w-[36px] items-center justify-center rounded-full bg-primary-blue text-[14px] font-bold text-white ring-2 ring-white"
                  // style={{
                  //   width: `${10 + (pointCount / points.length) * 20}px`,
                  //   height: `${10 + (pointCount / points.length) * 20}px`,
                  // }}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }

          // we have a single point (crime) to render
          return (
            <Marker
              key={`crime-${cluster.properties.pointId}`}
              latitude={latitude}
              longitude={longitude}
            >
              <button className="min-h-[36px] items-center justify-center rounded-full bg-white px-[12px] text-[14px] font-bold text-primary-blue ring-2 ring-primary-blue">
                {cluster.properties.price.toLocaleString()}
              </button>
            </Marker>
          );
        })}
        <FullscreenControl />
        <NavigationControl showCompass={false} />
        <GeolocateControl />
      </ReactMapGL>

      <div className="flex w-full items-center justify-center gap-[24px] lg:justify-between ">
        <div
          className="flex h-[40px] max-w-[220px] cursor-pointer items-center justify-center gap-[4px] rounded-full bg-primary-blue px-[16px] font-medium text-white"
          onClick={() => changeMap('')}
        >
          {state.language === 'mn' ? 'Газрын зураг хаах' : 'Close map'}
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
            className="flex h-[40px] w-[40px] items-center justify-center rounded-full border-2 border-white bg-primary-blue "
            onClick={() => {
              handleDay();
            }}
          >
            <Image
              src={
                state.language === 'mn'
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
