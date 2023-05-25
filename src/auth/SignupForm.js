import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";

function SignupForm({ signup }) {
  const navigate = useNavigate();
  const [signupFormData, setSignupFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  /** Handle form submission
   *
   * Calls login function prop and, if successful, redirects back to / homepage
   */
  async function handleSubmit(e) {
    e.preventDefault();
    let res = await signup(signupFormData);
    if (res.success) {
      navigate("/");
    } else {
      console.log(res.errors);
    }
  }

  /** Update form data field */
  function handleChange(e) {
    const { name, value } = e.target;
    setSignupFormData((data) => ({ ...data, [name]: value }));
  }

  return (
    <div className="py-5">
      <Row className="justify-content-center">
        <Col lg={12}>
          <Form className="form-signup">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
              <h2 className="mb-3">Sign Up</h2>
              <p className="welcome-message">
                Meet other movie makers and memorialize your movie experiences.
              </p>

              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  placeholder="Username"
                  type="text"
                  name="username"
                  className="form-control"
                  value={signupFormData.username}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="form-control"
                  value={signupFormData.password}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  placeholder="Enter First Name"
                  name="firstName"
                  type="text"
                  className="form-control"
                  value={signupFormData.firstName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  placeholder="Enter Last Name"
                  name="lastName"
                  className="form-control"
                  value={signupFormData.lastName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button
                variant="outline-success"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default SignupForm;
