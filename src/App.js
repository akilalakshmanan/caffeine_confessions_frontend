import { React, useContext, useState, useEffect } from 'react';
import logo from './logo.jpeg';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import Badge from 'react-bootstrap/Badge';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
import { toast, ToastContainer } from 'react-toastify';
import { getError } from './utils';
import { Store } from './Store';
import SearchBox from './components/SearchBox';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductCreateScreen from './screens/ProductCreateScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import UserListScreen from './screens/UserListScreen';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import QualityInfo from './components/QualityInfo';
import AboutScreen from './screens/AboutScreen';
import ControlledCarousel from './components/ControlledCarousel';
import { Card } from 'react-bootstrap';
import MenuScreen from './screens/MenuScreen';
import ShopScreen from './screens/ShopScreen';
import OrderListScreen from './screens/OrderListScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { fullBox, cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const updateOrderStatus = async () => {
      try {
        const instance = axios.create({ baseURL: 'http://172.17.0.2:5000' });
        const { data } = await instance.get('/api/orders/updateOrder', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        console.log('data', data);
      } catch (err) {
        console.log(err);
      }
    };
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
      ctxDispatch({
        type: 'CART_CLEAR',
      });
      localStorage.removeItem('cartItems');
      updateOrderStatus();
    }
    if (query.get('cancelled')) {
      console.log(
        "Order cancelled -- continue to shop around and checkout when you're ready."
      );
    }
    const fetchCategories = async () => {
      try {
        const instance = axios.create({ baseURL: 'http://172.17.0.2:5000' });
        const { data } = await instance.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);

  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? fullBox
              ? 'site-container active-cont d-flex flex-column full-box'
              : 'site-container active-cont d-flex flex-column'
            : fullBox
            ? 'site-container d-flex flex-column full-box'
            : 'site-container d-flex flex-column'
        }
      >
        <header>
          <Navbar bg="dark" variant="dark" expand="sm" fixed="top">
            <Container>
              <Button
                variant="dark"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>

              <LinkContainer to="/">
                <Navbar.Brand>Caffeine Confessions</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                {/* <SearchBox /> */}
                <Nav
                  className="me-auto w-100 justify-content-end my-lg-4"
                  as="ul"
                >
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                  {/* <Nav.Link xs lg="2" href="/">
                    Home
                  </Nav.Link> */}
                  <Link to="/menu" className="nav-link">
                    Menu
                  </Link>
                  {/* <Nav.Link href="/menu">Menu</Nav.Link> */}
                  <Link to="/about" className="nav-link">
                    About
                  </Link>
                  {/* <Nav.Link href="/about">About</Nav.Link> */}
                  <Link to="/shop" className="nav-link">
                    Shop
                  </Link>
                  {/* <Nav.Link href="/shop">Shop</Nav.Link> */}
                  <Link to="/cart" className="nav-link">
                    Cart
                    {cart.cartItems.length > 0 && cart.cartItems[0] !== null && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <main
          style={{
            backgroundImage: 'url(' + '/images/bg_4.jpg' + ')',
            height: '100%',
            width: '100%',
          }}
        >
          <ControlledCarousel />
          {/* <Container className="mt-3"> */}
          <Routes>
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/menu" element={<MenuScreen />} />
            <Route path="/shop" element={<ShopScreen />} />
            <Route path="/signin" element={<SigninScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/about" element={<AboutScreen />}></Route>
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfileScreen />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orderhistory"
              element={
                <ProtectedRoute>
                  <OrderHistoryScreen />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <DashboardScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/orders"
              element={
                <AdminRoute>
                  <OrderListScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <UserListScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <ProductListScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/product/:id"
              element={
                <AdminRoute>
                  <ProductEditScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/product/create"
              element={
                <AdminRoute>
                  <ProductCreateScreen />
                </AdminRoute>
              }
            ></Route>
            <Route
              path="/admin/user/:id"
              element={
                <AdminRoute>
                  <UserEditScreen />
                </AdminRoute>
              }
            ></Route>
            <Route path="/" element={<HomeScreen />} />
          </Routes>
          {/* </Container> */}
        </main>
        <footer style={{ background: '#120f0f' }}>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

function Header() {
  return <img src={logo} width="220px" height="180px" alt="Logo" />;
}
export default App;
