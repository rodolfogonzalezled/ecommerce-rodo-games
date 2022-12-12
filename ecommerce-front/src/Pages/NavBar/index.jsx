import { Link, NavLink } from "react-router-dom";
import { BsController } from 'react-icons/bs';
import { MdLogout } from 'react-icons/md';
import { FaRegUserCircle } from 'react-icons/fa';
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { options } from "../../Utils/routes.js";
import './NavBar.css';
import { useContext } from "react";
import UserContext from "../../context/UserContext.js";
import CartWidget from "../Cart/CartWidget/index.jsx";

const NavBar = () => {
    const { logOut, user } = useContext(UserContext);

    const elements = options.filter(option => {
        if (option.showWhen === true) return true;
        if (user) {

            return option.showWhen === user.role;
        } else {
            if (option.showWhen === false) return true;
        }
    })
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
                            {user && <>
                                {user.avatar ? 
                                <img src={user.avatar} className="Avatar" alt={user.userName} /> :
                                <FaRegUserCircle className="Avatar" /> }

                                <NavDropdown title={user.userName} id="user">
                                    {user.role === 'user' && <>
                                        <NavDropdown.Item as={Link} to={`/orders`}> Mis compras </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                    </>}

                                    <NavDropdown.Item className="Logout" as={Link} to='/' onClick={() => logOut()}> Cerrar Sesión
                                        <MdLogout className="align-self-center ms-3" />
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </>
                            }

                            {elements.map(element => <Nav.Link as={NavLink} key={element.path} to={element.path}>{element.label}</Nav.Link>)}
                            <CartWidget />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBar;