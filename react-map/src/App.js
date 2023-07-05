import './App.css';
// import Map, {Marker} from 'react-map-gl';
import Map, {
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl
} from 'react-map-gl';
import MapGl from 'react-map-gl';
// import ReactMapGL, { Marker, NavigationControl, GeolocateControl, Popup } from 'react-map-gl';
import {useState, useEffect, useMemo} from "react";
import React from "react";
import THEATRES from './theatres.json';
import Pin from "./Pin";

function App(){
    const [popupInfo, setPopupInfo] = useState(null);
    const TOKEN = 'pk.eyJ1IjoiY2hlY2h1cm92IiwiYSI6ImNsYmxiMXp1ZDA1a28zdnFxNGJnbHR3Z2QifQ.7tfOUn-31oHBDA7_GPN2ow'; // Set your mapbox token here

    const pins = useMemo(
        () =>
            THEATRES.map((city, index) => (
                <Marker
                    key={`marker-${index}`}
                    longitude={city.longitude}
                    latitude={city.latitude}
                    anchor="bottom"
                    onClick={e => {
                        // If we let the click event propagates to the map, it will immediately close the popup
                        // with `closeOnClick: true`
                        e.originalEvent.stopPropagation();
                        setPopupInfo(city);
                    }}
                >
                    <Pin />
                </Marker>
            )),
        []
    );

  return (
    <div className="App">
        <div id="map">
            <Map
                mapboxAccessToken={TOKEN}
                initialViewState={{
                    latitude: 58.009209,
                    longitude: 56.221997,
                    zoom: 13,
                    bearing: 0,
                    pitch: 0
                }}
                mapStyle="mapbox://styles/chechurov/cldj0qx1b002h01o65uimgmsm"
            >
                <GeolocateControl position="top-left" />
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />
                <ScaleControl />
                {pins}
                {popupInfo && (
                    <Popup
                        anchor="top"
                        longitude={Number(popupInfo.longitude)}
                        latitude={Number(popupInfo.latitude)}
                        onClose={() => setPopupInfo(null)}
                    >
                        <div>
                            {popupInfo.city}, {popupInfo.state} |{' '}
                            <a
                                target="_new"
                                href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
                            >
                                Wikipedia
                            </a>
                        </div>
                        <img width="100%" src={popupInfo.image} />
                    </Popup>
                )}
            </Map>
        </div>

    </div>
  );
}

export default App;
