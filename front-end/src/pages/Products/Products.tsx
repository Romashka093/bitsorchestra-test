import { useState, useEffect } from 'react';
import { ProductList } from '@helpers/index';
// import { products } from '../../mock-tool/products';
import { ProductCard } from '../../components/index';
import { Container, Row, Col } from 'react-bootstrap';
import { productsApi } from 'api/api';

const Products: React.FC = () => {
  const [productList, setProductList] = useState<ProductList>([]);

  // useEffect(() => {
  //   setProductList(products);
  // }, []);

  useEffect(() => {
    productsApi.getProducts().then(response => setProductList(response.data));
  }, []);

  return (
    <Container fluid="md" className="mt-4">
      <p className="text-center text-uppercase">
        the innovation leader in luxury vinyl plank
      </p>
      <h1 className="text-center text-capitalize mb-4">let's get started</h1>
      <Row as={'ul'}>
        {productList?.map(product => (
          <Col
            key={product.id}
            xs={12}
            sm={6}
            md={3}
            lg={3}
            as={'li'}
            className="mb-4"
          >
            <ProductCard {...product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
