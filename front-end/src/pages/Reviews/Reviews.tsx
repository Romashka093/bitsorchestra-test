/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { ReviewList } from '@helpers/index';
import { reviews } from 'mock-tool/reviews';
import { Container, CardGroup, Row } from 'react-bootstrap';
import { Review, ReviewForm } from '../../components/index';
import { reviewsApi } from 'api/api';

const Reviews: React.FC = () => {
  const [defaultReviews, setDefaultReviews] = useState<ReviewList>([]);
  const [reviws, setReviws] = useState<ReviewList>([]);
  const [reviwsData, setReviwsData] = useState<ReviewList>([]);

  const [togglerReadReviews, setTogglerReadReviews] = useState<boolean>(false);

  useEffect(() => {
    setDefaultReviews(reviews);
  }, []);

  useEffect(() => {
    reviewsApi.getReviews().then(response => setReviws(response.data));
  }, []);

  useEffect(() => {
    setReviwsData(defaultReviews.concat(reviws));
  }, [reviws]);

  const handleReadAllReviws = () => {
    setTogglerReadReviews(!togglerReadReviews);
  };

  return (
    <Container>
      <CardGroup className="pt-4" as={'section'}>
        <Row as={'ul'} className="my-0 mx-auto">
          {reviwsData?.length <= 2 ? (
            defaultReviews?.map(elem => (
              <>
                <Review key={elem.id} {...elem} />
              </>
            ))
          ) : togglerReadReviews === false ? (
            <>
              {defaultReviews?.map(elem => (
                <Review key={elem.id} {...elem} />
              ))}
              <Row
                as={'p'}
                style={{ color: 'red', cursor: 'pointer', display: 'contents' }}
                className="p-0 m-0 "
                onClick={handleReadAllReviws}
              >
                Read all reviews
              </Row>
            </>
          ) : (
            <>
              {reviwsData?.map(elem => (
                <Review key={elem.id} {...elem} />
              ))}
              <Row
                as={'p'}
                style={{ color: 'red', cursor: 'pointer', display: 'contents' }}
                className="p-0 m-0 "
                onClick={handleReadAllReviws}
              >
                Сollapse reviews
              </Row>
            </>
          )}
        </Row>
      </CardGroup>
      <Row as={'section'} style={{ margin: '0 auto', maxWidth: '500px' }}>
        <h2 className="text-left  mb-1 p-0">Leave a Review</h2>
        <p className="text-left small p-0">
          Your email address will not be published. Required fields are marked *
        </p>
        <ReviewForm />
      </Row>
    </Container>
  );
};
export default Reviews;
