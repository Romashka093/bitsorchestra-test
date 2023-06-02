import { useState } from 'react';
import { reviewsApi } from 'api/api';
import { Rating } from 'react-simple-star-rating';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { currentDate } from '../../helpers/formatting';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import shortid from 'shortid';
import { ReviewItem } from '@helpers/index';

const ReviewForm: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isSavedUsername, setIsSavedUsername] = useState<boolean>(false);

  const formReset = () => {
    setUserName('');
    setComment('');
    setRating(0);
    setEmail('');
    setPhone('');
    setIsSavedUsername(false);
  };

  const handlerSubmit = (data: ReviewItem) => {
    try {
      reviewsApi.postReviews(data);
    } catch (error) {
      console.log('post reviews error: ', error);
    } finally {
      formReset();
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userName,
      comment,
      rating,
      email,
      phone,
      isSavedUsername,
    },

    validationSchema: Yup.object({
      userName: Yup.string()
        .min(1, 'Name is too short')
        .max(60, 'Name is too long')
        .required('Name is required'),

      comment: Yup.string()
        .min(10, 'Comment is too short')
        .max(600, 'Comment is too long')
        .required('Comment is required'),

      email: Yup.string()
        .email('Please, enter a valid email')
        .required('Email address is required')
        .max(100, 'Email is too long'),

      rating: Yup.number(),

      phone: Yup.string(),

      isSavedUsername: Yup.boolean(),
    }),

    onSubmit: (values, { setSubmitting, resetForm }) => {
      const { userName, comment, rating, email, phone, isSavedUsername } =
        values;

      handlerSubmit({
        id: shortid.generate(),
        userName,
        date: currentDate,
        comment,
        rating,
        email,
        phone,
        isSavedUsername,
      });
      resetForm();
      setSubmitting(true);
    },
  });

  const { handleSubmit, handleChange, handleBlur, errors, touched } = formik;

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
          onBlur={handleBlur}
        />
        {errors.comment && touched.comment ? <>{errors.comment}</> : ''}
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
              onBlur={handleBlur}
            />
            {errors.userName && touched.userName ? <>{errors.userName}</> : ''}
          </Col>
          <Col>
            <Form.Control
              type="email"
              name="email"
              placeholder="Email *"
              required
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email ? <>{errors.email}</> : ''}
          </Col>
        </Row>
      </Form.Group>

      <Form.Control
        className="mb-4"
        type="tel"
        placeholder="Phone (optional)"
        name="phone"
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <Form.Check
        onChange={handleChange}
        className="mb-4 small"
        type="checkbox"
        label="Save my name, and email in this browser for the next time I comment"
        name="isSavedUsername"
        onBlur={handleBlur}
      />

      <Button type="submit">Post Review</Button>
    </Form>
  );
};

export default ReviewForm;
