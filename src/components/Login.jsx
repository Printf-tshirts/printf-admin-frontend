import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Base } from "../common/Base";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  useState(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
    setLoading(false);
  }

  return (
    <>
      <Base>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Log in</h2>
            <hr />
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} type="submit" className="w-100">
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Base>
    </>
  );
}
