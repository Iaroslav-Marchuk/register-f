import * as Yup from 'yup';
import { PulseLoader } from 'react-spinners';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

import { changePassword } from '../../redux/auth/operations.js';

import css from './ChangePassForm.module.css';

function ChangePassForm({ onClose }) {
  const dispatch = useDispatch();

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Campo obrigatório'),
    newPassword: Yup.string().required('Campo obrigatório'),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'As palavras-passe não coincidem.')
      .required('Campo obrigatório'),
  });

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(changePassword(values)).unwrap();
      toast.success('Palavra-passe alterada com sucesso!');
      actions.resetForm();

      if (onClose) onClose();
    } catch (error) {
      toast.error('Não foi possível alterar a palavra-passe.' + error);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <Field
              type="email"
              name="email"
              id="email"
              placeholder=" "
              autoComplete="email"
              style={{ display: 'none' }}
              tabIndex="-1"
              aria-hidden="true"
            />

            <div className={css.formGroup}>
              <label htmlFor="oldPassword" className={css.label}>
                Palavra-passe atual
              </label>
              <Field
                type="password"
                name="oldPassword"
                id="oldPassword"
                placeholder=" "
                autoComplete="current-password"
                className={css.input}
              />
              <ErrorMessage
                name="oldPassword"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="newPassword" className={css.label}>
                Palavra-passe nova
              </label>
              <Field
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder=" "
                autoComplete="new-password"
                className={css.input}
              />
              <ErrorMessage
                name="newPassword"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="confirmNewPassword" className={css.label}>
                Repita a palavra-passe nova
              </label>
              <Field
                type="password"
                name="confirmNewPassword"
                id="confirmNewPassword"
                placeholder=" "
                autoComplete="new-password"
                className={css.input}
              />
              <ErrorMessage
                name="confirmNewPassword"
                component="span"
                className={css.error}
              />
            </div>

            <button type="submit" className={css.btn} disabled={isSubmitting}>
              {isSubmitting ? (
                <PulseLoader
                  loading={true}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                  color="#9fb9e2ff"
                  size={5}
                  className={css.spiner}
                />
              ) : (
                'Alterar'
              )}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ChangePassForm;
