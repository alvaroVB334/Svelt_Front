import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../Stylesheets/Map.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet-providers/leaflet-providers";
import { useEffect } from "react";

let iconsMarkers = new L.icon({
  iconUrl: icon,
  iconShadow: iconShadow,
  iconSize: [20, 30],
  iconAnchor: [12, 45],
  shadowAnchor: [12, 45],
  popupAnchor: [-3, 76],
});
const Map = ({ markerArray, center, zoom, handleLocationNavigate }) => {
  useEffect(() => {
    console.log(markerArray);
  }, []);
  return (
    <div>
      <MapContainer
        center={center ? center : [36.600595, -6.2329094]}
        zoom={zoom ? zoom : 13}
        scrollWheelZoom={false}
        onClick={(e) => {
          console.log(e);
        }}
        style={{
          width: "60vw",
          height: "450px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
        />
        {markerArray.map((marker) => (
          <Marker
            position={[marker.latitud, marker.longitud]}
            icon={iconsMarkers}
            eventHandlers={
              handleLocationNavigate
                ? {
                    click: (e) => {
                      handleLocationNavigate(
                        marker.latitud,
                        marker.longitud,
                        marker.calle,
                        marker.referencia
                      );
                    },
                  }
                : {}
            }
          >
            <Popup>{marker.calle}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
export default Map;
