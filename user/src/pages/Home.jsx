import React from "react";
import { Card, Button, Row, Col, Container, Form, InputGroup, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaStar, FaHeart } from "react-icons/fa";

import poster from "../images/poster.jpg";
import hotel1 from "../images/hotel1.jpg";
import hotel2 from "../images/hotel2.jpg";

const Home = () => {
  const navigate = useNavigate();

  const hotels = [
    {
      id: 1,
      image: hotel1,
      title: "Deluxe Room",
      description: "A luxurious room with all amenities.",
      rating: 4.8,
      price: 150,
    },
    {
      id: 2,
      image: poster,
      title: "Executive Suite",
      description: "A spacious suite for a premium experience.",
      rating: 4.9,
      price: 250,
    },
    {
      id: 3,
      image: hotel2,
      title: "Family Room",
      description: "Perfect for families with children.",
      rating: 4.7,
      price: 200,
    },
  ];

  const promotions = [
    {
      id: 1,
      image: "https://source.unsplash.com/random/1600x900/?hotel-room",
      title: "Summer Special",
      description: "Complimentary Gifts On booking for five people",
    },
    {
      id: 2,
      image: "https://source.unsplash.com/random/1600x900/?luxury-hotel",
      title: "Weekend Getaway",
      description: "Get Free Taxi",
    },
    {
      id: 3,
      image: "https://source.unsplash.com/random/1600x900/?hotel-pool",
      title: "Family Package",
      description: "Get free Breakfast",
    },
  ];

  return (
    <Container fluid className="p-0">
      <div className="hero-section text-white text-center py-5" style={{background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://source.unsplash.com/random/1600x900/?hotel) no-repeat center center / cover"}}>
        <h1 className="display-4 fw-bold mb-4">Welcome to LivinBoston</h1>
        <p className="lead mb-4">Find your perfect stay in the heart of Boston</p>
        <Form className="search-form mx-auto" style={{maxWidth: "600px"}}>
          <InputGroup className="mb-3">
            <Form.Control placeholder="Search" />
            <InputGroup.Text><FaSearch /></InputGroup.Text>
          </InputGroup>
          <Row>
            <Col>
              <Form.Control type="date" placeholder="Check-in" />
            </Col>
            <Col>
              <Form.Control type="date" placeholder="Check-out" />
            </Col>
            <Col md={3}>
              <Button variant="primary" className="w-100" onClick={() => navigate("/search-rooms")}>Search</Button>
            </Col>
          </Row>
        </Form>
      </div>

      <Container className="my-5">
        <h2 className="text-center mb-4">Special Promotions</h2>
        <Carousel className="mb-5">
          {promotions.map((promo) => (
            <Carousel.Item key={promo.id}>
              <img
                className="d-block w-100"
                src={promo.image}
                alt={promo.title}
                style={{ height: "400px", objectFit: "cover" }}
              />
              <Carousel.Caption className="bg-dark bg-opacity-50 rounded">
                <h3>{promo.title}</h3>
                <p>{promo.description}</p>
                {/* <Button variant="primary" onClick={() => navigate("/search-rooms")}>
                  Book Now
                </Button> */}
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>

        <h2 className="text-center mb-4">Explore Our Rooms</h2>
        <Row className="g-4">
          {hotels.map((hotel) => (
            <Col md={4} key={hotel.id}>
              <Card className="h-100 shadow-sm hover-zoom">
                <div className="position-relative">
                  <Card.Img
                    variant="top"
                    src={hotel.image}
                    alt={hotel.title}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <Button variant="light" className="position-absolute top-0 end-0 m-2 rounded-circle p-2">
                    <FaHeart className="text-danger" />
                  </Button>
                </div>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Card.Title className="mb-0">{hotel.title}</Card.Title>
                    <span className="text-warning">
                      <FaStar /> {hotel.rating}
                    </span>
                  </div>
                  <Card.Text>{hotel.description}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">${hotel.price} / night</span>
                    <Button
                      onClick={() => navigate("/search-rooms")}
                      variant="outline-primary"
                    >
                      Book Now
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default Home;