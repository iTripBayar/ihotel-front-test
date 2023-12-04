'use client';
import React, { useState, useRef, useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
  FullscreenControl,
} from 'react-map-gl';
import Image from 'next/image';
import useSupercluster from 'use-supercluster';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import HotelCard from '../hotelCard';
import useWindowSize from '@/hooks/windowSize';
import { useAppCtx } from '@/contexts/app';

interface iProps {
  data: HotelData.Hotel[]
  lat: number  | undefined
  lng: number | undefined
}

const MapContainer = ({ data, lat, lng }: iProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const router = useRouter();
  // const map = searchParams.get('map');
  const size = useWindowSize();
  const {appState, dispatch} = useAppCtx()

  const createQueryString =
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams);
      if (value !== null) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    };
  useEffect(() => {
    if (size.width && size.width >= 1024) {
      dispatch({
        type: 'CHANGE_APP_STATE',
        payload: { map: 'open' },
      });
    } else {
      dispatch({
        type: 'CHANGE_APP_STATE',
        payload: { map: '' },
      });
    }
    return;
    
            
  }, [size.width]);

  const divRef = useRef<HTMLDivElement>(null);
  const [selectedHotel, setSelectedHotel] = useState<{
    lat: string;
    lng: string;
  }>({
    lat: '',
    lng: '',
  });

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

  const cardData = [...data].filter(
    (index) =>
      index.lat === selectedHotel.lat &&
      index.lng === selectedHotel.lng,
  );

  const [viewPort, setViewPort] = useState({
    lng: lng ? lng : 106.91744615540313,
    lat: lat ? lat : 47.91768064540636,
    zoom: 12,
  });
  const mapRef = useRef<any>();
  const markerRef = useRef<any>();
  const samplePrice = 70000;

  const points =
    data.length === 0
      ? defaultMarkers.map((data) => ({
          type: 'Sample',
          properties: { cluster: false, pointId: data.key, price: data.price },
          geometry: {
            type: 'samplePoint',
            coordinates: [data.lng, data.lat],
          },
        }))
      : [
          ...data.map((data) => ({
            type: 'Feature',
            properties: {
              cluster: false,
              pointId: data.id,
              price: data.roomTypes.sort((a, b)=> b.priceDayUse - a.priceDayUse)[0].priceDayUse,
            },
            geometry: {
              type: 'Point',
              coordinates: [data.lng, data.lat],
            },
          })),
        ];
  const bounds = mapRef.current
    ? mapRef.current.getMap().getBounds().toArray().flat()
    : null;

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewPort.zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  return (
    <div
      className={`sticky h-[calc(100vh-260px)] w-full flex-col items-center justify-start gap-[24px] bg-white px-[16px] pb-[24px]  sm:px-[42px] md:px-[72px] lg:h-[calc(100vh-60px)] lg:px-0 lg:pb-[24px]  lg:pt-[16px] ${
        appState.map !== '' ? 'flex lg:col-span-2' : ' hidden '
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
                ref={markerRef}
                onClick={() =>
                  mapRef?.current?.flyTo({
                    center: [
                      cluster.geometry.coordinates[0],
                      cluster.geometry.coordinates[1],
                    ],
                    zoom: 13,
                    duration: 1500,
                    speed: 0.5,
                    curve: 2,
                  })
                }
              >
                <div
                  className="relative flex min-h-[36px] min-w-[36px] items-center justify-center rounded-full bg-primary-blue text-[14px] font-medium text-white ring-2 ring-white "
                  // style={{
                  //   width: `${10 + (pointCount / points.length) * 20}px`,
                  //   height: `${10 + (pointCount / points.length) * 20}px`,
                  // }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.75}
                    stroke="currentColor"
                    className="max-h-[22px] min-h-[22px] min-w-[22px] max-w-[22px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                    />
                  </svg>

                  <div className="absolute right-0 top-0 z-[0] flex h-[22px] w-[22px] translate-x-[50%]  translate-y-[-35%] items-center justify-center rounded-full bg-primary-blue text-[12px] ring-[1.5px] ring-white">
                    x{pointCount}
                  </div>
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
              <button
                className="min-h-[30px] items-center justify-center rounded-full bg-primary-blue px-[8px] text-[14px] font-medium tracking-wider text-white ring-2 ring-white"
                onClick={() => {
                  setSelectedHotel(() => {
                    const updatedState = {
                      lat: cluster.geometry.coordinates[1],
                      lng: cluster.geometry.coordinates[0],
                    };
                    return updatedState;
                  });
                  mapRef?.current?.flyTo({
                    center: [
                      cluster.geometry.coordinates[0],
                      cluster.geometry.coordinates[1],
                    ],
                    zoom: 13,
                    duration: 1500,
                    speed: 0.5,
                    curve: 2,
                  });
                }}
              >
                {`${
                  cluster.properties.price >= 0 &&
                  cluster.properties.price !== null
                    ? cluster.properties.price.toLocaleString()
                    : samplePrice.toLocaleString()
                }${
                  // state.language === 'mn' ? '₮' : '$'
                  lang === 'en' ? '$' : '₮'
                }`}
                {}
              </button>
            </Marker>
          );
        })}
        {cardData.length > 0 ? (
          <Marker
            key={cardData[0].id}
            latitude={parseInt(cardData[0].lat)}
            longitude={parseInt(cardData[0].lng)}
            style={{
              zIndex: 998,
              position: 'absolute',
              width: '75%',
              marginLeft: '-20px',
            }}
          >
            <div
              className="absolute left-0 top-0 z-[999] flex h-[30px] w-[30px] translate-x-[-50%] translate-y-[-50%] items-center justify-center rounded-full bg-primary-blue text-white ring-2 ring-white"
              onClick={() => {
                setSelectedHotel({ lng: '', lat: '' });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="max-h-[24px] min-h-[24px] min-w-[24px] max-w-[24px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            <HotelCard data={cardData[0]} fromMap={true} />
          </Marker>
        ) : null}
        <FullscreenControl />
        <NavigationControl showCompass={false} />
        <GeolocateControl />
      </ReactMapGL>
      <div className="flex w-full items-center justify-between gap-[24px] lg:justify-between ">
        <div
          className="flex h-[40px] max-w-[220px] cursor-pointer items-center justify-center gap-[4px] rounded-full bg-primary-blue px-[16px] font-medium text-white"
          onClick={() => {
            // router.replace(`${pathname}?${createQueryString('map', null)}`, {
            //   scroll: false,
            // });
            dispatch({
              type: 'CHANGE_APP_STATE',
              payload: { map: '' },
            });
          }}
        >
          {/* {state.language === 'mn' ? 'Газрын зураг хаах' : 'Close map'} */}
          {lang === 'en' ? 'Close map' : 'Газрын зураг хаах'}
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
        {appState.map === 'open' ? (
          <div
            onClick={() => {
              let nextLang = lang === 'en' ? 'mn' : 'en';
              router.push(
                `${pathname}?${createQueryString('lang', nextLang)}`,
                {
                  scroll: false,
                },
              );
            }}
            className="flex h-[40px] w-[40px] items-center justify-center rounded-full border-2 border-white bg-primary-blue "
          >
            <Image
              src={
                lang === 'en'
                  ? '/images/mongolian-flag.png'
                  : '/images/uk-flag.png'
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
