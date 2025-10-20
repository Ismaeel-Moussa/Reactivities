import { MapContainer, Popup, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type Props = {
  position: [number, number];
  venue: string;
};

export default function MapComponent({ position, venue }: Props) {
  return (
    // The MapContainer needs a defined size to be visible.
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>{venue}</Popup>
      </Marker>
    </MapContainer>
  );
}
