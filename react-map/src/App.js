import './App.css';
import Map, {
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl, Source, Layer
} from 'react-map-gl';
import {useState, useEffect, useMemo} from "react";
import React from "react";
import THEATRES from './theatres.json';
import Pin from "./Pin";
import mapboxgl from 'mapbox-gl';
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions"

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
                        e.originalEvent.stopPropagation();
                        setPopupInfo(city);
                    }}
                >
                    <Pin />
                </Marker>
            )),
        []
    );

    const route = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: [
                        [56.216951,58.008297 ],
                        [56.246873, 58.01117],
                    ],
                },
            },
        ],
    };

    const layerStyle = {
        id: 'route',
        type: 'line',
        source: {
            type: 'geojson',
            data: route,
        },
        layout: {
            'line-join': 'round',
            'line-cap': 'round',
        },
        paint: {
            'line-color': 'red',
            'line-width': 8,
        },
    };

    // Вызываем функцию mapDirections с помощью useEffect
    useEffect(() => {
        mapboxgl.accessToken = TOKEN;
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/chechurov/cldj0qx1b002h01o65uimgmsm',
            center: [56.221997, 58.009209],
            zoom: 13
        });

        // // Устанавливаем русский язык
        // const directions =             new MapboxDirections({
        //     accessToken: mapboxgl.accessToken,
        //     language: 'ru-RU',
        //     unit: 'metric',
        //     placeholderOrigin: 'Выберите место отправления',
        //     placeholderDestination: 'Выберите место назначения',
        //     instructions: false,
        //     controls: {
        //         inputs: {
        //             instructions: 'Инструкции',
        //             inputPlaceholder: 'Введите место',
        //             // Текст для режима driving
        //             drivingSideOfRoad: 'Сторона дороги',
        //             drivingStyle: 'Стиль вождения',
        //             drivingTraffic: 'Учитывать пробки',
        //             // Текст для режима walking
        //             walkingSymbol: '🚶',
        //             walkingTitle: 'Пешеход',
        //             walkingDistance: 'Расстояние пешком',
        //             walkingTime: 'Время пешком',
        //             // Текст для режима cycling
        //             cyclingTitle: 'Велосипедист',
        //             cyclingSymbol: '🚴',
        //             cyclingDistance: 'Расстояние на велосипеде',
        //             cyclingTime: 'Время на велосипеде',
        //             // Текст для режима transit
        //             transitTitle: 'Транзит',
        //             transitSymbol: '🚍',
        //             transitDepartureTime: 'Время отправления',
        //             transitArrivalTime: 'Время прибытия',
        //             transitNumberOfStops: 'Количество остановок',
        //             transitPrice: 'Стоимость',
        //         },
        //         settings:false
        //         // settings: {
        //         //     settingsTitle: 'Настройки',
        //         //     avoidTitle: 'Избегать',
        //         //     avoidFerries: 'Паромы',
        //         //     avoidTolls: 'Платные дороги',
        //         //     profileTitle: 'Профиль',
        //         //     profileWalking: 'Пешком',
        //         //     profileCycling: 'На велосипеде',
        //         //     profileDriving: 'На машине',
        //         //     profileTransit: 'Общественный транспорт',
        //         //     unitTitle: 'Единицы измерения',
        //         //     unitMetric: 'Метрические',
        //         //     unitImperial: 'Английские',
        //         //     languageTitle: 'Язык',
        //         //     languagePlaceholder: 'Выберите язык',
        //         //     languageOptionLabel: '{language} ({nativeLanguage})',
        //         // },
        //     },
        // })

        map.addControl(
            new MapboxDirections({
                accessToken: mapboxgl.accessToken,
                language: 'ru-RU',
                unit: 'metric',
                placeholderOrigin: 'Выберите место отправления',
                placeholderDestination: 'Выберите место назначения',
                instructions: false,
                controls: {
                    inputs: {
                        instructions: 'Инструкции',
                        inputPlaceholder: 'Введите место',
                        // Текст для режима driving
                        drivingSideOfRoad: 'Сторона дороги',
                        drivingStyle: 'Стиль вождения',
                        drivingTraffic: 'Учитывать пробки',
                        // Текст для режима walking
                        walkingSymbol: '🚶',
                        walkingTitle: 'Пешеход',
                        walkingDistance: 'Расстояние пешком',
                        walkingTime: 'Время пешком',
                        // Текст для режима cycling
                        cyclingTitle: 'Велосипедист',
                        cyclingSymbol: '🚴',
                        cyclingDistance: 'Расстояние на велосипеде',
                        cyclingTime: 'Время на велосипеде',
                        // Текст для режима transit
                        transitTitle: 'Транзит',
                        transitSymbol: '🚍',
                        transitDepartureTime: 'Время отправления',
                        transitArrivalTime: 'Время прибытия',
                        transitNumberOfStops: 'Количество остановок',
                        transitPrice: 'Стоимость',
                    },
                    settings: {
                        settingsTitle: 'Настройки',
                        avoidTitle: 'Избегать',
                        avoidFerries: 'Паромы',
                        avoidTolls: 'Платные дороги',
                        profileTitle: 'Профиль',
                        profileWalking: 'Пешком',
                        profileCycling: 'На велосипеде',
                        profileDriving: 'На машине',
                        profileTransit: 'Общественный транспорт',
                        unitTitle: 'Единицы измерения',
                        unitMetric: 'Метрические',
                        unitImperial: 'Английские',
                        languageTitle: 'Язык',
                        languagePlaceholder: 'Выберите язык',
                        languageOptionLabel: '{language} ({nativeLanguage})',
                    },
                },
            }),
            'top-left'
        );
    }, []);

  return (
    <div className="App">
        <div id="map">
        </div>
    </div>
  );
}

export default App;
