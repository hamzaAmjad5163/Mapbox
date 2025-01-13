import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import uniMarkerUrl from "../assets/uni.gif";
import resMarkerUrl from "../assets/res.gif";
import other from "../assets/other.gif";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken =
    "your-access-token";

const MapComponent = () => {
    const mapContainerRef = useRef(null);
    const [map, setMap] = useState(null);
    const [markers, setMarkers] = useState([]);

    const schools = [
        { title: "Air University, Kamra", coordinates: [72.42677672537589, 33.8253267176968], type: "schools" },
        { title: "Super Nova School, F-8/1, Islamabad", coordinates: [72.35289089653958, 33.78321255286441], type: "schools" },
        { title: "The Educators Capital Campus, Islamabad", coordinates: [72.99427665420541, 33.658220138765515], type: "schools" },
        { title: "Beaconhouse School System, Islamabad", coordinates: [73.17362573025687, 33.71914501788217], type: "schools" },
        { title: "Roots School System, Islamabad", coordinates: [73.10039826549135, 33.541621693938225], type: "schools" },
    ];

    const restaurants = [
        { title: "Pizza Base", coordinates: [72.36074912537511, 33.80225630922281], type: "Restaurant" },
        { title: "Madina Hotel", coordinates: [72.35912935423721, 33.791579209316644], type: "Restaurant" },
        { title: "NFC", coordinates: [72.35990381627299, 33.79270020141697], type: "Restaurant" },
        { title: "Shinwari Tikka Hut", coordinates: [72.36005776517584, 33.79324651948874], type: "Restaurant" },
        { title: "Mian G, Birayani", coordinates: [72.4345444118819, 33.868354907258734], type: "Restaurant" },
        { title: "Attock, Bus Stand", coordinates: [72.35903445348498, 33.77442128198384], type: "Restaurant" },
        { title: "Chai Club", coordinates: [72.36631601429137, 33.81523514800607], type: "Restaurant" },
    ];

    const others = [
        { title: "Other 1", coordinates: [73.0679, 33.683], type: "Other" },
        { title: "Other 2", coordinates: [73.0679, 33.6825], type: "Other" },
    ];

    useEffect(() => {
        const initializeMap = ({ setMap, mapContainerRef }) => {
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: "mapbox://styles/mapbox/streets-v11",
                center: [72.4267874362914, 33.82526425869961],
                zoom: 12,
            });

            map.on("load", () => {
                setMap(map);
                map.resize();
                // Add other layers and controls here as needed
            });

            map.addControl(new mapboxgl.NavigationControl(), "top-right");
            map.addControl(new mapboxgl.GeolocateControl({ positionOptions: { enableHighAccuracy: true }, trackUserLocation: true }));
            map.addControl(new mapboxgl.FullscreenControl());
        };

        if (!map) initializeMap({ setMap, mapContainerRef });
    }, [map]);

    const addMarkers = (places, iconUrl) => {
        markers.forEach((marker) => marker.remove());

        const newMarkers = places.map((place) => {
            const el = document.createElement("div");
            el.className = "marker";
            el.style.width = "60px";
            el.style.height = "60px";
            el.style.backgroundImage = `url(${iconUrl})`; 
            el.style.backgroundSize = "contain";
            el.style.borderRadius = "50%";

            return new mapboxgl.Marker(el)
                .setLngLat(place.coordinates)
                .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`
                    <h3>${place.title}</h3>
                    <p>Type: ${place.type}</p>
                `))
                .addTo(map);
        });

        setMarkers(newMarkers);
    };

    const changeMapStyle = (style) => {
        map.setStyle(`mapbox://styles/mapbox/${style}`);
    };

    useEffect(() => {
        if (map) {
            const geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
                marker: false,
                placeholder: 'Search for places',
            });

            map.addControl(geocoder, 'top-left');
        }
    }, [map]);

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginBottom: "10px",
                }}
            >
                <button className="btn my-btn" onClick={() => addMarkers(schools, uniMarkerUrl)}>
                    <i className="fas fa-university me-2"></i> University
                </button>

                <button className="btn my-btn" onClick={() => addMarkers(restaurants, resMarkerUrl)}>
                    <i className="fas fa-utensils me-2"></i> Restaurants
                </button>

                <button className="btn my-btn" onClick={() => addMarkers(others, other)}>
                    <i className="fas fa-map-marker-alt me-2"></i> Others
                </button>

                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <i className="fas fa-filter me-2"></i> Filter
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => changeMapStyle("streets-v11")}>Streets</Dropdown.Item>
                        <Dropdown.Item onClick={() => changeMapStyle("light-v10")}>Light</Dropdown.Item>
                        <Dropdown.Item onClick={() => changeMapStyle("dark-v10")}>Dark</Dropdown.Item>
                        <Dropdown.Item onClick={() => changeMapStyle("outdoors-v11")}>Outdoors</Dropdown.Item>
                        <Dropdown.Item onClick={() => changeMapStyle("satellite-v9")}>Satellite</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div ref={mapContainerRef} style={{ width: "100%", height: "600px" }} />
        </div>
    );
};

export default MapComponent;
