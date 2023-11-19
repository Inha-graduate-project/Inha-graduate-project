import { useEffect, useRef } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { useRecoilValue } from "recoil";
import { usePostRoutesToKaKaoMap } from "../../hooks";
import { pathState } from "../../state";
import { Wrapper } from "./styles";

export default function MapComponent() {
  const locations = [
    {
      title: "쇠소깍",
      latlng: {
        lat: 33.252479,
        lng: 126.623535,
      },
    },
    {
      title: "소원김밥",
      latlng: {
        lat: 33.25097,
        lng: 126.62076,
      },
    },
    {
      title: "용머리해안",
      latlng: {
        lat: 33.232008,
        lng: 126.314855,
      },
    },
    {
      title: "올레마당",
      latlng: {
        lat: 33.233214,
        lng: 126.308798,
      },
    },
    {
      title: "헬로키티아일랜드",
      latlng: {
        lat: 33.290313,
        lng: 126.352014,
      },
    },
    {
      title: "춘심이네 본점",
      latlng: {
        lat: 33.264617,
        lng: 126.370525,
      },
    },
    {
      title: "금능해수욕장",
      latlng: {
        lat: 33.391216,
        lng: 126.23545,
      },
    },
  ];
  const waypoints = locations.map((item) => {
    return {
      x: item.latlng.lng,
      y: item.latlng.lat,
    };
  });
  const origin = waypoints.shift();
  const destination = waypoints.pop();

  const { mutate, isLoading } = usePostRoutesToKaKaoMap(
    origin,
    destination,
    waypoints
  );
  useEffect(() => {
    mutate();
  }, [mutate]);
  const paths = useRef<{ lat: number; lng: number }[]>([]);
  paths.current = useRecoilValue(pathState).path;
  return (
    <>
      {isLoading ? (
        <>로딩 중...</>
      ) : (
        <Wrapper>
          <Map
            center={{ lat: 33.252479, lng: 126.623535 }}
            style={{ width: "100%", height: "100vh" }}
            level={9}
          >
            <Polyline
              path={paths.current}
              strokeWeight={3}
              strokeColor={"#1677ff"}
              strokeOpacity={1}
              strokeStyle={"solid"}
            />
            {locations.map((loc) => (
              <MapMarker
                key={`${loc.title}-${loc.latlng}`}
                position={loc.latlng}
                image={{
                  src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
                  size: { width: 24, height: 35 },
                }}
                title={loc.title}
              />
            ))}
          </Map>
        </Wrapper>
      )}
    </>
  );
}
