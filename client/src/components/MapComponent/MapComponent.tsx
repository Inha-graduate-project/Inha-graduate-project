import { GoogleMap, LoadScriptNext } from "@react-google-maps/api";
import { useMemo } from "react";
import { DirectionComponent } from "../DirectionComponent";
import { Wrapper } from "./styles";

export default function MapComponent() {
  const center = useMemo(() => ({ lat: 33.499648, lng: 126.531275 }), []);
  return (
    <Wrapper>
      <LoadScriptNext
        googleMapsApiKey={`${import.meta.env.VITE_GOOGLE_API_KEY}`}
      >
        <GoogleMap
          zoom={13}
          center={center}
          mapContainerClassName="map-container"
        >
          <DirectionComponent />
        </GoogleMap>
      </LoadScriptNext>
    </Wrapper>
  );
}
