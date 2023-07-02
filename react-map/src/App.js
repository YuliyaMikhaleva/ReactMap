import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import {useState} from "react";

function App() {

    const [activePark, setActivePark] = useState(null);
    const handlePopupClose = (e) => {
        console.log(e.popup)
    }
  return (
    <div className="App">
        {/*долгота и широта*/}
        <MapContainer center={[58.020434,56.253091]} zoom={12} scrollWheelZoom={false} onPopupClose={handlePopupClose}>
            {/*авторство*/}
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {/*маркер с координатами*/}
            <Marker
                position={[58.020434, 56.253091]}
                eventHandlers={{
                    click: (e) => {
                        if (activePark){
                            setActivePark(true)
                        } else if (activePark === null) {
                            setActivePark(true)
                        } else {
                            setActivePark(true)
                        }
                    },
                }}
            />

            {activePark && (
                <>
                <div>1111</div>
                    <Popup
                        interactive
                        position={
                            [ 58.020434,56.253091]
                        }
                        onClose={(e) => {
                            console.log('close')
                            setActivePark(!activePark);
                        }}
                    >
                        <div>
                            <h2>Попап</h2>
                        </div>
                    </Popup>
                </>

            )}
        </MapContainer>
    </div>
  );
}

export default App;
