import { formattingDate } from '../../helpers/formatting';
import { ReviewItem } from '@helpers/index';
import { Card } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';
import { Link } from 'react-router-dom';
import { routes } from 'routes/routes';

const Review: React.FC<ReviewItem> = ({
  id,
  userName,
  date,
  comment,
  rating,
  // email,
  // phone,
  // isSavedUsername,
}) => {
  return (
    <Card style={{ width: '100%' }} as="li" className="mb-4 ">
      <Card.Body>
        <Card.Title>{userName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {formattingDate(date)}
        </Card.Subtitle>
        <Rating
          initialValue={rating}
          emptyColor="transparent"
          fillColor="#2953c5"
          SVGstorkeWidth={1}
          SVGstrokeColor="#2953c5"
          size={15}
        />
        <Card.Text>{comment}</Card.Text>
        <Link to={`${routes.reviews}/${id}`}>
          <Card.Subtitle className="text-uppercase small">
            Read more ...
          </Card.Subtitle>
        </Link>
      </Card.Body>
    </Card>
  );
};
export default Review;
