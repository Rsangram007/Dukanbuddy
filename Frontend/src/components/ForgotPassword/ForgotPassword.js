import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, ModalFooter } from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";
// import "./ForgotPassword.css"; // Import the CSS file
import '../AuthFrom/AuthForm.css'
const ForgotPassword = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5050/forgot-password",
        { email }
      );
      setSuccessMessage(response.data.message);
      toast.success("OTP sent to email", { autoClose: 2000 });
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Failed to send OTP");
      }
    }
  };

  return (
    <Form className="forgot-password-form" onSubmit={handleFormSubmit}>
      <h2>Forgot Password</h2>
      <FormGroup className="form-group">
        <Label for="email" className="form-label">
          Email
        </Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          required
        />
      </FormGroup>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <ModalFooter className="modal-footer">
        <Button color="primary" type="submit" className="btn-primary">
          Submit
        </Button>{" "}
        <Button
          color="secondary"
          onClick={closeModal}
          className="btn-secondary"
        >
          Cancel
        </Button>
      </ModalFooter>
    </Form>
  );
};

export default ForgotPassword;
