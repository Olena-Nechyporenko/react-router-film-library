import { Field, Formik, Form } from 'formik';
import css from './SearchForm.module.css';

const SearchForm = ({ onSubmit }) => {
  const initialValue = { query: '' };

  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values.query.trim());
    resetForm();
  };
  return (
    <Formik initialValues={initialValue} onSubmit={handleSubmit}>
      <Form className={css.form} autoComplete="off">
        <label className={css.label} htmlFor="keyword">
          <Field
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
            name="query"
          />
        </label>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>
      </Form>
    </Formik>
  );
};

export default SearchForm;
