import './App.css';
import { MapContainer, TileLayer, Marker,   useMapEvent, Polyline } from 'react-leaflet';
import {useState, useCallback, useEffect} from "react";



function App(type, handler) {



    // const [activePark, setActivePark] = useState(null);
    const handlePopupClose = (e) => {
        console.log(e.popup)
    }
    // const addMarker = () => {
    //     console.log('e')
    // }

    const [map, setMap] = useState(null)
    // const onClick = useCallback(() => {
    //     // map.setView(center, zoom)
    //     console.log('click')
    // }, [map])
    const [coords, setCoords] = useState([58.020434,56.253091]);
    const [markers, setMarkers] = useState([]);
    const handleLocationFound = (e) => {
        setCoords([e.latitude, e.longitude]);
    };

    function Click({onLocationFound}) {
        const handleLocationFound = (e) => {
            setCoords([e.latitude, e.longitude]);
        };
        const [position, setPosition] = useState(null)
        const map = useMapEvent({
            click: (e) => {
                map.locate()
                // console.log('e', `[${e.latlng.lat},${e.latlng.lng}]`)
                if (e.latlng && e.latlng.lat && e.latlng.lng){
                    setMarkers([...markers,[e.latlng.lat, e.latlng.lng]])

                }
            },
        })
        // return null;
    }

    useEffect(() => {
        console.log(markers)
    },[markers])

    const coordinates = markers.map((marker) => marker);

  return (
    <div className="App">
        {/*долгота и широта*/}
        <MapContainer
            center={[58.020434,56.253091]}
            zoom={12}
            scrollWheelZoom={false}
            onPopupClose={handlePopupClose}
            tap={false}
            style={{position:'relative', zIndex:1}}
            onMouseDown={(e) => e.preventDefault()}
            ref={setMap}
        >
            <Click onLocationFound={handleLocationFound} />
            {/*авторство*/}
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {/*маркер с координатами*/}
            {markers.map((marker, index) => (
                <Marker key={index} position={marker}>
                    {/*<Popup>Маркер {marker.id}</Popup>*/}
                </Marker>
            ))}

            {coordinates.length > 1 && <Polyline positions={coordinates} color="blue" smoothFactor={1.5} />}

        </MapContainer>
    </div>
  );
}

export default App;
