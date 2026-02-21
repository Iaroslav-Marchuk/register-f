import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { UserRound, KeyRound, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

import css from './RegistrationForm.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/auth/operations.js';
import { selectIsUserLoading } from '../../redux/auth/selectors.js';
import { PulseLoader } from 'react-spinners';

function RegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isUserLoading = useSelector(selectIsUserLoading);

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Campo obrigatório'),
    email: Yup.string().email().required('Campo obrigatório'),
    password: Yup.string().required('Campo obrigatório'),
  });

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(register(values)).unwrap();
      toast.success('Registado com sucesso!');
      actions.resetForm();
      navigate('/auth/login');
    } catch (error) {
      toast.error('Falha ao iniciar sessão. ' + error);
    }
  };

  return (
    <>
      <h2 className={css.title}>Criar conta</h2>
      <h3 className={css.subtitle}>para começar agora!</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="name" className={css.label}>
              Name
            </label>
            <div className={css.inputContainer}>
              <Field
                type="text"
                name="name"
                id="name"
                placeholder=" "
                autoComplete="username"
                className={css.input}
                disabled={isUserLoading}
              />
              <UserRound
                className={css.inputIcon}
                size={24}
                strokeWidth={1.5}
              />
            </div>
            <ErrorMessage name="name" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="email" className={css.label}>
              E-mail
            </label>
            <div className={css.inputContainer}>
              <Field
                type="email"
                name="email"
                id="email"
                placeholder=" "
                autoComplete="email"
                className={css.input}
                disabled={isUserLoading}
              />
              <Mail className={css.inputIcon} size={24} strokeWidth={1.5} />
            </div>
            <ErrorMessage name="email" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password" className={css.label}>
              Palavra-passe
            </label>
            <div className={css.inputContainer}>
              <Field
                type="password"
                name="password"
                id="password"
                placeholder=" "
                autoComplete="new-password"
                className={css.input}
                disabled={isUserLoading}
              />
              <KeyRound className={css.inputIcon} size={24} strokeWidth={1.5} />
            </div>
            <ErrorMessage
              name="password"
              component="span"
              className={css.error}
            />
          </div>

          <button type="submit" className={css.btn} disabled={isUserLoading}>
            {isUserLoading ? (
              <PulseLoader
                loading={true}
                aria-label="Loading Spinner"
                data-testid="loader"
                color="#9fb9e2ff"
                size={5}
                className={css.spiner}
              />
            ) : (
              'Registar-se'
            )}
          </button>
        </Form>
      </Formik>
      <p className={css.text}>
        Já tem uma conta? Faça{' '}
        <NavLink to="/auth/login" className={css.link}>
          Login
        </NavLink>{' '}
        agora!
      </p>
    </>
  );
}

export default RegistrationForm;
