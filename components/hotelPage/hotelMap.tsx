import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
  FullscreenControl,
} from 'react-map-gl';
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
    <ReactMapGL
      mapboxAccessToken="pk.eyJ1IjoiaWhvdGVsLWRldiIsImEiOiJjbG53eG4xM2cwOGdqMnFwZWZodmxyYWgwIn0.NKP_FGb_Ad26fu4wSqnJ7Q"
      initialViewState={{
        longitude: viewPort.lng,
        latitude: viewPort.lat,
        zoom: viewPort.zoom,
      }}
      style={{
        width: '100%',
        height: '200px',
        borderRadius: 12,
        border: 'solid 1px rgb(0,0,0,0.25)',
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
          width: '16px',
          height: '16px',
          backgroundColor: '#3C76FE',
          borderRadius: '100%',
        }}
      >
        <div className="h-[16px] w-[16px] animate-ping rounded-full border-[1px] bg-primary-blue "></div>
      </Marker>
    </ReactMapGL>
  );
};

export default HotelMap;
