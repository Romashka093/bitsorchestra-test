import { ListGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { routes } from 'routes/routes';

const { products, reviews } = routes;

const Header = () => {
  return (
    <header
      style={{
        marginTop: '40px',
      }}
    >
      <nav>
        <ListGroup as="ul" horizontal={true}>
          <ListGroup.Item as="li">
            <NavLink
              to={products}
              style={({ isActive }) => {
                return {
                  color: isActive ? 'red' : 'black',
                };
              }}
            >
              Products
            </NavLink>
          </ListGroup.Item>
          <ListGroup.Item as="li">
            {' '}
            <NavLink
              to={reviews}
              style={({ isActive }) => {
                return {
                  color: isActive ? 'red' : 'black',
                };
              }}
            >
              Reviews
            </NavLink>
          </ListGroup.Item>
        </ListGroup>
      </nav>
    </header>
  );
};
export default Header;
