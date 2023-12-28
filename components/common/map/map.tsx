import { useState, useRef } from 'react';
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
import { useAppCtx } from '@/contexts/app';

interface iProps {
  data: HotelData.Hotel[];
  lat: number | undefined;
  lng: number | undefined;
  zoom: number;
  dollarRate: string;
}

const MapContainer = ({ data, lat, lng, zoom, dollarRate }: iProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const router = useRouter();
  const { appState, dispatch } = useAppCtx();

  const createQueryString = (name: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value !== null) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    return params.toString();
  };

  const [selectedHotel, setSelectedHotel] = useState<{
    lat: number | null;
    lng: number | null;
  }>({
    lat: null,
    lng: null,
  });

  const cardData = [...data].filter(
    (index) =>
      selectedHotel.lat &&
      selectedHotel.lng &&
      index.lat === selectedHotel.lat &&
      index.lng === selectedHotel.lng,
  );

  const [viewPort, setViewPort] = useState({
    lng: lng ? lng : 106.91744615540313,
    lat: lat ? lat : 47.91768064540636,
    zoom: zoom,
  });
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>();
  const samplePrice = 70000;

  let points = [
    ...data.map((data) => ({
      type: 'Feature',
      properties: {
        cluster: false,
        pointId: data.id,
        price:
          data.roomTypes &&
          data.roomTypes.sort((a, b) => b.priceDayUse - a.priceDayUse)[0]
            .priceDayUse,
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
      className={`relative h-full w-full bg-white ${
        appState.map !== '' ? 'flex' : 'hidden'
      } flex-col-reverse items-center justify-start gap-[24px] px-[16px] pb-[24px] pt-[0px] sm:px-[42px] md:px-[72px] lg:col-span-2 lg:px-0 lg:pt-[16px]`}
    >
      {/* buttons */}
      <div className='flex w-full items-center justify-between gap-[24px] lg:justify-between '>
        <div
          className='flex h-[40px] max-w-[220px] cursor-pointer items-center justify-center gap-[4px] rounded-full bg-primary-blue px-[16px] font-medium text-white'
          onClick={() => {
            dispatch({
              type: 'CHANGE_APP_STATE',
              payload: { map: '' },
            });
          }}
        >
          {lang === 'en' ? 'Close map' : 'Газрын зураг хаах'}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2.5}
            stroke='currentColor'
            className=' h-[18px] w-[18px]'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3'
            />
          </svg>
        </div>
        {appState.map === 'open' ? (
          <div
            onClick={() => {
              const nextLang = lang === 'en' ? 'mn' : 'en';
              router.push(
                `${pathname}?${createQueryString('lang', nextLang)}`,
                {
                  scroll: false,
                },
              );
            }}
            className='flex h-[40px] w-[40px] items-center justify-center rounded-full border-2 border-white bg-primary-blue '
          >
            <Image
              src={
                lang === 'en'
                  ? '/images/mongolian-flag.png'
                  : '/images/uk-flag.png'
              }
              alt='/lang'
              width={28}
              height={28}
              sizes='10vw'
              className='h-[30px] w-[30px] cursor-pointer object-cover'
            />
          </div>
        ) : null}
      </div>
      {data ? (
        <ReactMapGL
          mapboxAccessToken='pk.eyJ1IjoiaWhvdGVsLWRldiIsImEiOiJjbG53eG4xM2cwOGdqMnFwZWZodmxyYWgwIn0.NKP_FGb_Ad26fu4wSqnJ7Q'
          initialViewState={{
            longitude: viewPort.lng,
            latitude: viewPort.lat,
            zoom: viewPort.zoom,
          }}
          ref={mapRef}
          onRender={(map) => {
            map.target.resize();
          }}
          onLoad={(map) => {
            map.target.flyTo({
              center: [viewPort.lng, viewPort.lat],
              zoom: viewPort.zoom,
              duration: 500,
              speed: 0.5,
              curve: 2,
            });
          }}
          style={{
            borderRadius: 20,
            border: 'solid 1px rgb(0,0,0,0.25)',
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
          id='mapBox'
          mapStyle='mapbox://styles/ihotel-dev/clnwysb8a005b01qx38a9hgh0'
          onMove={(e) => {
            setViewPort({
              lng: e.viewState.longitude,
              lat: e.viewState.latitude,
              zoom: e.viewState.zoom,
            });
          }}
        >
          {clusters.length > 0 &&
            clusters.map((cluster) => {
              const [longitude, latitude] = cluster.geometry.coordinates;
              const { cluster: isCluster, point_count: pointCount } =
                cluster.properties;
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
                        zoom: 11,
                        duration: 1500,
                        speed: 0.5,
                        curve: 2,
                      })
                    }
                  >
                    <div className='relative flex min-h-[36px] min-w-[36px] items-center justify-center rounded-full bg-primary-blue text-[14px] font-medium text-white ring-2 ring-white '>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.75}
                        stroke='currentColor'
                        className='max-h-[22px] min-h-[22px] min-w-[22px] max-w-[22px]'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z'
                        />
                      </svg>

                      <div className='absolute right-0 top-0 z-[0] flex h-[22px] w-[22px] translate-x-[50%]  translate-y-[-35%] items-center justify-center rounded-full bg-primary-blue text-[12px] ring-[1.5px] ring-white'>
                        x{pointCount}
                      </div>
                    </div>
                  </Marker>
                );
              }
              return (
                <Marker
                  key={`crime-${cluster.properties.pointId}`}
                  latitude={latitude}
                  longitude={longitude}
                >
                  <button
                    className='min-h-[30px] items-center justify-center rounded-full bg-primary-blue px-[8px] text-[14px] font-medium tracking-wider text-white ring-2 ring-white'
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
                    }${lang === 'en' ? '$' : '₮'}`}
                    {}
                  </button>
                </Marker>
              );
            })}
          {cardData.length > 0 ? (
            <Marker
              key={cardData[0].id}
              // latitude={parseInt(cardData[0].lat)}
              latitude={cardData[0].lat}
              longitude={cardData[0].lng}
              style={{
                zIndex: 998,
                // position: 'relative',
                width: 'auto',
                // paddingLeft: '24px'
                // marginLeft: '-24px',
              }}
            >
              <div className='relative ml-[2px] w-full min-w-[250px] max-w-[280px] 2xs:min-w-[300px] 2xs:max-w-[340px] lg:min-w-[270px] lg:max-w-[280px] xl:min-w-[320px] xl:max-w-[350px]'>
                <div
                  className='absolute left-0 top-0 z-[999] flex h-[30px] w-[30px] translate-x-[-50%] translate-y-[-50%] items-center justify-center rounded-full bg-primary-blue text-white ring-2 ring-white'
                  onClick={() => {
                    setSelectedHotel({ lng: null, lat: null });
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={2}
                    stroke='currentColor'
                    className='max-h-[24px] min-h-[24px] min-w-[24px] max-w-[24px]'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </div>
                <HotelCard
                  ver='map'
                  data={cardData[0]}
                  fromMap={true}
                  dollarRate={dollarRate}
                />
              </div>
            </Marker>
          ) : null}
          <FullscreenControl />
          <NavigationControl showCompass={false} />
          <GeolocateControl />
        </ReactMapGL>
      ) : null}
    </div>
  );
};

export default MapContainer;
