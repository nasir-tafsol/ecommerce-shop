"use client";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import classes from "./navbar.module.css";
// import Dropdown from "react-bootstrap/Dropdown";
// import NavItem from "react-bootstrap/NavItem";
// import NavLink from "react-bootstrap/NavLink";

function NavScrollExample() {
  return (
    <Navbar expand="lg" className={classes.navBarBgChange}>
      <Container>
        <Link className={classes.navbarBrand} href={"/"}>
          Shop
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link className={classes.navLinks} href={"/"}>
              Home
            </Link>
            <Link className={classes.navLinks} href={"/addProduct"}>
              Add Product
            </Link>

            {/* <Dropdown as={NavItem}>
              <Dropdown.Toggle as={NavLink}>Products</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link className={classes.dropNavBarLink} href={"/addProduct"}>
                    Add Product
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link
                    className={classes.dropNavBarLink}
                    href={"/allProducts"}
                  >
                    All Products
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
          </Nav>
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
