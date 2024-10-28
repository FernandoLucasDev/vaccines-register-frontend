import React from "react";
import { Navbar, Nav, NavDropdown, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faSyringe, faChartLine, faPlus, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Menu = ({ changeScreen, report, logout, isLoading }) => {

    return (
        <Navbar bg="light" expand="lg" className="px-5">
            <Navbar.Brand className="fw-bold">Vaccines Register</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavDropdown title={<><FontAwesomeIcon icon={faUsers} className="me-2" /> Employees</>} id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={() => changeScreen('dashboard')}>
                            <FontAwesomeIcon icon={faChartLine} className="text-info me-2" />
                            Dashboard
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => changeScreen('registerEmployee')}>
                            <FontAwesomeIcon icon={faPlus} className="text-success me-2" />
                            Add new employee
                        </NavDropdown.Item>
                    </NavDropdown>

                    <NavDropdown title={<><FontAwesomeIcon icon={faSyringe} className="me-2" /> Vaccines</>} id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={() => changeScreen('vaccinesDashboard')}>
                            <FontAwesomeIcon icon={faChartLine} className="text-info me-2" />
                            Dashboard
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={() => changeScreen('registerVaccine')}>
                            <FontAwesomeIcon icon={faPlus} className="text-success me-2" />
                            Add new vaccine
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>

                {
                    isLoading ? (
                        <Button variant="outline-primary" className="me-2" onClick={report} disabled>
                            <Spinner animation="border" size="sm" />
                            <span className="ms-2">Generating report...</span>
                        </Button>
                    ) : (
                        <Button variant="outline-primary" className="me-2" onClick={report}>
                            <FontAwesomeIcon icon={faChartLine} className="me-2" />
                            Generate report
                        </Button>
                    )
                }

                <Button variant="outline-danger" onClick={logout}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                    Logout
                </Button>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Menu;
