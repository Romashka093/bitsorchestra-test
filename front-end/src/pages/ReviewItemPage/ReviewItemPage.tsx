import { useState, useEffect } from 'react';
import { ReviewList } from '@helpers/index';
import { reviews } from 'mock-tool/reviews';
import { Container, CardGroup, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Review } from '../../components/index';
import { reviewsApi } from 'api/api';

const ReviewItemPage: React.FC = () => {
  let { id } = useParams();
  const [defaultReviews, setDefaultReviews] = useState<ReviewList>([]);
  const [reviws, setReviws] = useState<ReviewList>([]);
  const [reviwsData, setReviwsData] = useState<ReviewList>([]);

  useEffect(() => {
    setDefaultReviews(reviews);
  }, []);

  useEffect(() => {
    reviewsApi.getReviews().then(response => setReviws(response.data));
  }, []);

  useEffect(() => {
    const data = defaultReviews.concat(reviws);
    setReviwsData(data);
  }, [defaultReviews, reviws]);

  const currentElement = reviwsData.filter(elem => String(elem.id) === id);

  return (
    <Container>
      <CardGroup className="pt-4 ">
        <Row as={'ul'} className="my-0 mx-auto">
          {currentElement &&
            currentElement?.map(elem => <Review key={elem.id} {...elem} />)}
        </Row>
      </CardGroup>
    </Container>
  );
};

export default ReviewItemPage;
