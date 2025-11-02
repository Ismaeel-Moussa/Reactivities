import { MapContainer, Popup, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// import {Icon} from 'leaflet';
// import markerIconPng from 'leaflet/dist/images/marker-icon.png';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

type Props = {
    position: [number, number];
    venue: string;
};

export default function MapComponent({ position, venue }: Props) {
    return (
        <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: '400px', width: '100%' }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {/* icon={new Icon({iconUrl:markerIconPng})} */}
            <Marker position={position}>
                <Popup>{venue}</Popup>
            </Marker>
        </MapContainer>
    );
}
