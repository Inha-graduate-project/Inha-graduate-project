import React, { useEffect } from "react";
import { Wrapper } from "./styles";

export default function MapComponent() {
  const locations = [
    {
      lat: 33.252479,
      lng: 126.623535,
    },
    {
      lat: 33.25097,
      lng: 126.62076,
    },
    {
      lat: 33.232008,
      lng: 126.314855,
    },
    {
      lat: 33.233214,
      lng: 126.308798,
    },
    {
      lat: 33.290313,
      lng: 126.352014,
    },
    {
      lat: 33.264617,
      lng: 126.370525,
    },
    {
      lat: 33.391216,
      lng: 126.23545,
    },
  ];
  useEffect(() => {
    const initMap = () => {
      const map = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(33.252479, 126.623535),
        zoom: 11,
      });
      locations.map((item) => {
        new naver.maps.Marker({
          position: new naver.maps.LatLng(item.lat, item.lng),
          map,
        });
      });
    };
    initMap();
  }, []);

  return (
    <Wrapper>
      <div id="map" className="map-container"></div>
    </Wrapper>
  );
}
