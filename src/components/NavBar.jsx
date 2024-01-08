import { Link } from "react-router-dom";
import { Container, Nav, Stack, Navbar } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  // console.log(user.name);
  return (
    <>
      <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
        <Container>
          <Link to={"/"} className="link-light text-decoration-none">
            <h2>Chat App</h2>
          </Link>
          {user ? (
            <span className="text-warning">Logged in as {user.name}</span>
          ) : null}

          <Nav>
            <Stack direction="horizontal" gap={3}>
              {!user ? (
                <>
                  <Link
                    to={"/login"}
                    className="link-light text-decoration-none"
                  >
                    Login
                  </Link>
                  <Link
                    to={"/register"}
                    className="link-light text-decoration-none"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <Link
                  onClick={() => logoutUser()}
                  to={"/login"}
                  className="link-light text-decoration-none"
                >
                  Logout
                </Link>
              )}
            </Stack>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
