import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Spinner, Image } from "react-bootstrap";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_preset"); // Replace with your preset
    formData.append("cloud_name", "dqunb6sn2"); // Replace with your cloud name

    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", // Replace with your cloud name
        formData
      );
      setImageUrl(response.data.secure_url);
      setLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Upload Your Profile Picture</h2>
      <Form>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Select an Image</Form.Label>
          <Form.Control type="file" onChange={handleImageUpload} />
        </Form.Group>
        {loading && <Spinner animation="border" />}
        {imageUrl && (
          <div className="mt-3">
            <p>Uploaded Image:</p>
            <Image src={imageUrl} alt="Uploaded" thumbnail />
          </div>
        )}
      </Form>
    </div>
  );
};

export default ImageUpload;