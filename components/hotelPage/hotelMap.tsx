import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useState } from 'react';
interface Props {
  lat: number;
  lng: number;
}

const HotelMap = ({ lat, lng }: Props) => {
  const [viewPort, setViewPort] = useState({
    lng: 106.91744615540313,
    lat: 47.91768064540636,
    zoom: 13,
  });
  return (
    <div className="h-[225px] w-full sm:h-[300px] lg:h-[225px]">
      <ReactMapGL
        mapboxAccessToken="pk.eyJ1IjoiaWhvdGVsLWRldiIsImEiOiJjbG53eG4xM2cwOGdqMnFwZWZodmxyYWgwIn0.NKP_FGb_Ad26fu4wSqnJ7Q"
        initialViewState={{
          longitude: viewPort.lng,
          latitude: viewPort.lat,
          zoom: viewPort.zoom,
        }}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 12,
          border: 'solid 1px rgb(0,0,0,0.15)',
          overflow: 'hidden',
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
      >
        <Marker
          key={'hotel'}
          latitude={lat}
          longitude={lng}
          style={{
            width: '14px',
            height: '14px',
            backgroundColor: '#3C76FE',
            borderRadius: '100%',
          }}
        >
          <div className="flex h-[14px] w-[14px] animate-ping items-center justify-center rounded-full border-[1px] bg-primary-blue">
            <div className="h-[4px] w-[4px] rounded-full bg-white/75"></div>
          </div>
        </Marker>
      </ReactMapGL>
    </div>
  );
};

export default HotelMap;
