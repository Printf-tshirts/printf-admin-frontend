import React, { useRef, useState } from "react";
import { Button, Card, Alert, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Form, Input } from "antd";

export default function Login() {
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  useState(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  async function handleSubmit(values) {
    try {
      setError("");
      setLoading(true);
      await login(values.email, values.password);
    } catch (e) {
      console.log(e);
      setError(e.message);
    }
    setLoading(false);
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <Container className="w-25 m-5">
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Log in</h2>
              <Form onFinish={handleSubmit}>
                <Form.Item name={"email"} label="Email">
                  <Input type={"email"} placeholder="johndoe@gmail.com" />
                </Form.Item>
                <Form.Item name={"password"} label="Password">
                  <Input.Password placeholder="********" />
                </Form.Item>
                {error && <Alert variant="danger">{error}</Alert>}
                <Button
                  disabled={loading}
                  className="w-100"
                  type="primary"
                  htmlType="submit">
                  Log In
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
}
