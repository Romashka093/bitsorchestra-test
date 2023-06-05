import { ProductItem } from '@helpers/index';
import { Card } from 'react-bootstrap';

const ProductCard: React.FC<ProductItem> = ({ name, cost, details, image }) => {
  const shortDetails = details.length > 30 ? details.slice(0, 30) : details;
  return (
    <Card style={{ width: '100%' }}>
      <Card.Img
        variant="top"
        src={image}
        width={200}
        height={300}
        alt={`photo of ${name} product`}
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>Price: {cost}</Card.Subtitle>
        <Card.Text>
          {shortDetails}
          {details.length > 30 ? <>...</> : null}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
