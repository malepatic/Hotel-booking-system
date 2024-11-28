import React, { useState, useEffect } from "react";
import { Form, Row, Col, Card, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchRooms = () => {
  const [rooms, setRooms] = useState([]); // Original room data
  const [filteredRooms, setFilteredRooms] = useState([]); // Filtered data based on dates
  const [startDate, setStartDate] = useState(null); // Start date for travel
  const [endDate, setEndDate] = useState(null); // End date for travel

  // Fetch rooms from API
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/rooms"); // Replace with your API
        const data = await response.json();
        setRooms(data);
        setFilteredRooms(data); // Initialize filtered rooms
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  // Handle date filter
  const handleDateFilter = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    // Filter rooms based on availability (adjust logic to match API data structure)
    const filtered = rooms.filter((room) => {
      const roomStartDate = new Date(room.availableFrom);
      const roomEndDate = new Date(room.availableUntil);
      return startDate >= roomStartDate && endDate <= roomEndDate;
    });

    setFilteredRooms(filtered);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Available Rooms</h1>
      <Form>
        <Row className="mb-4">
          <Col md={4}>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Select Start Date"
              className="form-control"
            />
          </Col>
          <Col md={4}>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="Select End Date"
              className="form-control"
            />
          </Col>
          <Col md={4}>
            <Button onClick={handleDateFilter} variant="primary" className="w-100">
              Filter Rooms
            </Button>
          </Col>
        </Row>
      </Form>
      <div className="row">
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <div className="col-md-4 mb-4" key={room._id}>
              <Card>
                <Card.Img
                  variant="top"
                  src={room.image || "https://via.placeholder.com/300x200"}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{room.name}</Card.Title>
                  <Card.Text>{room.description}</Card.Text>
                  <Button variant="primary">Book Now</Button>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <div className="text-center w-100">
            <p>No rooms available for the selected dates.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchRooms;