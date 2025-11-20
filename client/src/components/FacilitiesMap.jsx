import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { getFacilities } from "../services/api";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// fix default icon issue in some builds
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function FacilitiesMap({ center = [ -1.286389, 36.817223 ], zoom = 11 }) {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    getFacilities()
      .then((res) => setFacilities(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="h-[600px] rounded-xl overflow-hidden shadow">
      <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {facilities.map((f) => {
          const lat = f.location?.lat ?? 0;
          const lng = f.location?.lng ?? 0;
          return (
            <Marker key={f._id} position={[lat, lng]}>
              <Popup>
                <div className="font-semibold">{f.name}</div>
                <div>{f.address}</div>
                {f.phone && <div>📞 {f.phone}</div>}
                <div className="text-sm text-gray-600">{f.type}</div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
