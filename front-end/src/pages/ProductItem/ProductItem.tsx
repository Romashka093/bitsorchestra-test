import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ProductList } from '@helpers/index';
import { productsApi } from 'api/api';
import { CardGroup, Container, Row } from 'react-bootstrap';
import { ProductCard } from '../../components/index';

const ProductItem: React.FC = () => {
  let { id } = useParams();
  const [productList, setProductList] = useState<ProductList>([]);
  useEffect(() => {
    productsApi.getProducts().then(response => setProductList(response.data));
  }, []);

  const currentElement = productList.filter(elem => String(elem.id) === id);

  return (
    <Container>
      <CardGroup className="pt-4 ">
        <Row as={'ul'} className="my-0 mx-auto">
          {currentElement &&
            currentElement?.map(elem => (
              <ProductCard key={elem.id} {...elem} />
            ))}
        </Row>
      </CardGroup>
    </Container>
  );
};
export default ProductItem;
