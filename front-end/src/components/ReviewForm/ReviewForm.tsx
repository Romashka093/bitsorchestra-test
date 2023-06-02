import { useState, ChangeEvent } from 'react';
import { reviewsApi } from 'api/api';
import { Rating } from 'react-simple-star-rating';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { currentDate } from '../../helpers/formatting';
import shortid from 'shortid';

const ReviewForm: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isSavedUsername, setIsSavedUsername] = useState<boolean>(false);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target as HTMLInputElement;
    switch (name) {
      case 'userName':
        setUserName(value);
        break;
      case 'comment':
        setComment(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'isSavedUsername':
        setIsSavedUsername(!isSavedUsername);
        break;
      default:
        break;
    }
  };
  const formReset = () => {
    setUserName('');
    setComment('');
    setRating(0);
    setEmail('');
    setPhone('');
    setIsSavedUsername(false);
  };
  const handleSubmit = async () => {
    // event.preventDefault();
    try {
      await reviewsApi.postReviews({
        id: shortid.generate(),
        userName,
        date: currentDate,
        comment,
        rating,
        email,
        phone,
        isSavedUsername,
      });
    } catch (error) {
      console.log('post reviews error: ', error);
    } finally {
      formReset();
    }
  };

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  return (
    <Form onSubmit={handleSubmit} className="p-0 ">
      <Form.Group className="mb-4">
        <Rating
          onClick={handleRating}
          initialValue={rating}
          emptyColor="transparent"
          fillColor="#f79604"
          SVGstorkeWidth={1}
          SVGstrokeColor="#f79604"
          size={20}
          className="mb-2"
        />
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Comment *"
          name="comment"
          required
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-4">
        <Row>
          <Col>
            <Form.Control
              type="text"
              placeholder="Name *"
              name="userName"
              required
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              type="email"
              name="email"
              placeholder="Email *"
              required
              onChange={handleChange}
            />
          </Col>
        </Row>
      </Form.Group>

      <Form.Control
        className="mb-4"
        type="tel"
        placeholder="Phone (optional)"
        name="phone"
        onChange={handleChange}
      />

      <Form.Check
        onChange={handleChange}
        className="mb-4 small"
        type="checkbox"
        label="Save my name, and email in this browser for the next time I comment"
        name="isSavedUsername"
      />
      <Button type="submit">Post Review</Button>
    </Form>
  );
};

export default ReviewForm;
