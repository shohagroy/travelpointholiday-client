"use client";
import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="contact-us-container">
      <h1>Contact Us</h1>
      <div className="contact-options">
        <div className="contact-card">
          <h2>Email Us</h2>
          <p>
            Send us an email at{" "}
            <a href="mailto:contact@example.com">contact@example.com</a>
          </p>
        </div>
        <div className="contact-card">
          <h2>Call Us</h2>
          <p>
            Call our support team at <a href="tel:+123456789">+123-456-789</a>
          </p>
        </div>
      </div>

      <div className="contact-form">
        <h2>Or Use the Form Below</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Message:</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
