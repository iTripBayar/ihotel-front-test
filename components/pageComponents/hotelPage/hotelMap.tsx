import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef } from "react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

interface Props {
  lat: number;
  lng: number;
}

const HotelMap = ({ lat, lng }: Props) => {
  const mapRef = useRef<any>();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const [viewPort] = useState({
    lng: lng,
    lat: lat,
    zoom: 11,
  });
  // setTimeout(() => {
  //   mapRef?.current?.flyTo({
  //     center: [lng, lat],
  //     zoom: 13,
  //     duration: 1000,
  //     speed: 0.5,
  //     curve: 2,
  //   });
  // }, 1000);
  return (
    <div className="h-[225px] w-full 2xs:h-[265px] sm:h-[300px] md:h-[325px] lg:h-[225px] relative rounded-[12px] overflow-hidden">
      <div className="top-0 left-0 bg-primary-blue/90 px-[18px] py-[6px] absolute text-white w-fit z-[100] font-semibold text-[12px] rounded-br-[16px]">
        {lang === "en" ? "" : "Хот/аймаг, Сум/дүүрэг"}
      </div>
      <ReactMapGL
        ref={mapRef}
        mapboxAccessToken={process.env.MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: viewPort.lng,
          latitude: viewPort.lat,
          zoom: viewPort.zoom,
        }}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 12,
          border: "solid 1px rgb(0,0,0,0.15)",
          overflow: "hidden",
        }}
        id="mapBox"
        mapStyle="mapbox://styles/ihotel-dev/clnwysb8a005b01qx38a9hgh0"
      >
        <Marker
          key={"hotel"}
          latitude={lat}
          longitude={lng}
          style={{
            width: "14px",
            height: "14px",
            backgroundColor: "#3C76FE",
            borderRadius: "100%",
            cursor: "pointer",
          }}
          onClick={() =>
            mapRef?.current?.flyTo({
              center: [lng, lat],
              zoom: 15,
              duration: 1500,
              speed: 0.5,
              curve: 2,
            })
          }
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
