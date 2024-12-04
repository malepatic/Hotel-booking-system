import React, { useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Container,
  Form,
  InputGroup,
  Carousel,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "@changey/react-leaflet-markercluster";
import { Icon, LatLngBounds } from "leaflet";

import "../Styles/UserHome.scss";
import "leaflet/dist/leaflet.css";
import "@changey/react-leaflet-markercluster/dist/styles.min.css";

import h6 from "../images/h6.jpg";
import h5 from "../images/h5.jpeg";
import h7 from "../images/h7.jpg";
import boston from "../images/boston.avif"; // Import the hero background image

// Custom icons for map markers
const icons = {
  default: new Icon({
    iconUrl: "https://via.placeholder.com/38",
    iconSize: [38, 38],
  }),
  city: new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [38, 38],
  }),
  park: new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/427/427735.png",
    iconSize: [38, 38],
  }),
  history: new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3347/3347485.png",
    iconSize: [38, 38],
  }),
};

// Famous places in Boston
const markers = [
  { geocode: [42.3601, -71.0589], popUp: "Boston City Center", type: "city" },
  { geocode: [42.3554, -71.0656], popUp: "Boston Common", type: "park" },
  { geocode: [42.3467, -71.0972], popUp: "Fenway Park", type: "history" },
];

// Top hotels in Boston
const hotels = [
  { geocode: [42.3519, -71.0775], popUp: "Fairmont Copley Plaza", type: "city" },
  { geocode: [42.3512, -71.0674], popUp: "Boston Marriott Copley", type: "city" },
];

const promotions = [
  {
    id: 1,
    image: h6,
    // title: "Summer Special",
    // description: "Complimentary Gifts On booking for five people",
  },
  {
    id: 2,
    image: h5,
    // title: "Weekend Getaway",
    // description: "Get Free Taxi",
  },
  {
    id: 3,
    image: h7,
  //   title: "Family Package",
  //   description: "Get free Breakfast",
  } 
];

// Combine all map markers
const allMarkers = [...markers, ...hotels];

// Fit map bounds
function FitToBounds({ markers }) {
  const map = useMap();

  useEffect(() => {
    if (markers.length > 0) {
      const bounds = new LatLngBounds(markers.map((marker) => marker.geocode));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [markers, map]);

  return null;
}

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="p-0">
      {/* Hero Section */}
      <div
        className="hero-section text-white text-center py-5"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${boston})`,
        }}
      >
        <h1 className="display-4 fw-bold mb-4">Welcome to LivinBoston</h1>
        <p className="lead mb-4">Find your perfect stay in the heart of Boston</p>
        <Form className="search-form mx-auto" style={{ maxWidth: "600px" }}>
          <InputGroup className="mb-3">
            <Form.Control placeholder="Search" />
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
          </InputGroup>
          <Row>
            <Col>
              <Form.Control type="date" placeholder="Check-in" />
            </Col>
            <Col>
              <Form.Control type="date" placeholder="Check-out" />
            </Col>
            <Col md={3}>
              <Button
                variant="primary"
                className="w-100"
                onClick={() => navigate("/search-rooms")}
              >
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

      {/* Promotions Section */}
      <Container className="my-5">
        <Carousel className="mb-5">
          {promotions.map((promo) => (
            <Carousel.Item key={promo.id}>
              <img
                className="d-block w-100"
                src={promo.image}
                alt={promo.title}
                style={{ height: "400px", objectFit: "cover" }}
              />
              <Carousel.Caption>
                <h3>{promo.title}</h3>
                <p>{promo.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>

      {/* Map Section */}
      <div className="map-section my-5 d-flex justify-content-center">
        <div
          style={{
            width: "90%", // Adjust the width of the map container
            height: "500px", // Adjust the height of the map container
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Add shadow for styling
            border: "1px solid #ccc", // Add border for styling
            borderRadius: "8px", // Add border radius for smooth corners
            overflow: "hidden", // Clip any overflow from the map container
          }}
        >
          <MapContainer
            center={[42.3601, -71.0589]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <FitToBounds markers={allMarkers} />
            <MarkerClusterGroup chunkedLoading>
              {allMarkers.map((marker, index) => (
                <Marker
                  key={index}
                  position={marker.geocode}
                  icon={icons[marker.type] || icons.default}
                >
                  <Popup>
                    <strong>{marker.popUp}</strong>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
        </div>
      </div>
    </Container>
  );
};

export default Home;