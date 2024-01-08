import { useContext } from "react";
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const {
    loginUser,
    updateLoginInfo,
    loginInfo,
    registerError,
    isRegisterLoading,
  } = useContext(AuthContext);
  return (
    <>
      <Form onSubmit={loginUser}>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "10%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Login</h2>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                onChange={(e) => {
                  updateLoginInfo({ ...loginInfo, email: e.target.value });
                }}
              />
              <Form.Control
                type="password"
                placeholder="Enter your password"
                onChange={(e) => {
                  updateLoginInfo({ ...loginInfo, password: e.target.value });
                }}
              />
              <Button variant="primary" type="submit">
                {isRegisterLoading ? "Getting you in" : "Login"}
              </Button>
              {registerError?.error ? (
                <Alert variant="danger">{registerError?.message}</Alert>
              ) : null}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Login;
