import './App.css';
import { MapContainer, TileLayer } from 'react-leaflet';

function App() {
  return (
    <div className="App">
        <MapContainer center={[45.4, -75.7]} zoom={12}scrollWheelZoom={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
        </MapContainer>
    </div>
  );
}

export default App;