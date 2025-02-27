import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function BasicExample() {
  let style = {
    
    // position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    backgroundColor: "black",
    color:"white",
    zIndex: 1050, // Ensures navbar stays above other elements
  };

  let st={
    color:"gray",
  }
  let im={
    height:"40px",
    width:"40px",
    borderRadius:"5px"

  }
  return (
    <Navbar expand="lg" style={style} variant="dark">
      <Container>
        <Navbar.Brand href="#home" className="me-auto" style={st}>
          StudySync
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home" style={st}>Home</Nav.Link>
            <Nav.Link href="#about" style={st}>About Us</Nav.Link>
            <Nav.Link href="#study" style={st}>Study</Nav.Link>
            <Nav.Link href="#contact" style={st}>Contact Us</Nav.Link>
            <img src="./1743561-200.png" style={im}></img>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
