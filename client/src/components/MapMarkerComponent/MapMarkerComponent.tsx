import { useState } from "react";
import { CustomOverlayMap, MapMarker } from "react-kakao-maps-sdk";
import {
  StyledAddress,
  StyledChildren,
  StyledInfo,
  StyledLabel,
} from "./styles";

interface MapMarkerComponentProps {
  address: string;
  children: string;
  latitude: number;
  longitude: number;
  idx: number;
}
export default function MapMarkerComponent({
  address,
  children,
  latitude,
  longitude,
  idx,
}: MapMarkerComponentProps) {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      {isHover && (
        <CustomOverlayMap
          position={{
            lat: latitude,
            lng: longitude,
          }}
          zIndex={1}
        >
          <StyledInfo>
            <StyledChildren>{children}</StyledChildren>
            <StyledAddress>{address}</StyledAddress>
          </StyledInfo>
        </CustomOverlayMap>
      )}
      <CustomOverlayMap
        position={{
          lat: latitude,
          lng: longitude,
        }}
        zIndex={1}
      >
        <StyledLabel>{idx + 1}</StyledLabel>
      </CustomOverlayMap>
      <MapMarker
        key={`${children}`}
        position={{
          lat: latitude,
          lng: longitude,
        }}
        image={{
          src: "./img/marker.png",
          size: { width: 24, height: 35 },
        }}
      />
    </div>
  );
}
