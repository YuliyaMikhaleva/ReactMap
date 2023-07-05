import React from 'react';
import {Layer, Source} from "react-map-gl";

const RouteComponent = ({id, color, width, routeData}) => {
    console.log('routeComp', routeData)

    const layerStyle = {
        id: 'route',
        type: 'line',
        source: {
            type: 'geojson',
            data: routeData,
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round',
        },
        paint: {
            'line-color': '#888',
            'line-width': 8,
        },
    };


    return (
        <>
            <Source id={id} type='geojson' data={routeData} />
            <Layer {...layerStyle} />
        </>
    );
};

export default RouteComponent;
