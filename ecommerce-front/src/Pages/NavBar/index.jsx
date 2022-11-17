import { Link, NavLink } from "react-router-dom";
import { BsController } from 'react-icons/bs';
import { FaRegUserCircle } from 'react-icons/fa';
import { Navbar, Nav, Container } from "react-bootstrap";
import './NavBar.css';

const NavBar = () => {

    return (
        <div>
            <Navbar variant="dark" expand="lg" className="NavBar">
                <Container>
                    <Link to='/' className="text-decoration-none">
                        <div className="NavBarBrand ActiveOption">
                            <BsController className="Logo" />
                            <div className="NavBarTitle">
                                <label>GAMES</label>
                                <label>RODO</label>
                            </div>
                        </div>
                    </Link>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse className="NavBarEnd" id="navbar-nav">
                        <Nav>
                            <Nav.Link as={NavLink} to='/new-product' className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}> Registrar Productos </Nav.Link>
                            <Nav.Link as={NavLink} to='/register' className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}> Crea una cuenta </Nav.Link>
                            <Nav.Link as={NavLink} to='/login' className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}> Login </Nav.Link>
                            <FaRegUserCircle className="Option p-0" />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBar;