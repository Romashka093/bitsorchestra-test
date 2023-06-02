import { Card } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={{ width: '100%', marginTop: '40px' }}>
      <Card className="text-center">
        <Card.Footer className="text-muted">
          Ganna's test task | June 2023
        </Card.Footer>
      </Card>
    </footer>
  );
};
export default Footer;
