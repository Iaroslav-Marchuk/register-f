import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { UserRound, KeyRound } from 'lucide-react';
import toast from 'react-hot-toast';

import css from './LoginForm.module.css';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsUserLoading } from '../../redux/auth/selectors.js';
import { logIn } from '../../redux/auth/operations.js';
import { PulseLoader } from 'react-spinners';

function LoginForm() {
  const dispatch = useDispatch();
  const isUserLoading = useSelector(selectIsUserLoading);

  const initialValues = {
    email: '',
    password: '',
    local: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required('Campo obrigatório'),
    password: Yup.string().required('Campo obrigatório'),
    local: Yup.string()
      .oneOf(['Linha 1', 'Linha 2', 'Linha 3'])
      .required('Campo obrigatório'),
  });

  const handleSubmit = async (values, actions) => {
    try {
      await dispatch(logIn(values)).unwrap();
      toast.success('Login efetuado com sucesso!');
      actions.resetForm();
    } catch (error) {
      toast.error('Falha ao iniciar sessão. ' + error);
    }
  };

  return (
    <>
      <h2 className={css.title}>Seja bem-vindo!</h2>
      <h3 className={css.subtitle}>Inicie sessão para começar</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
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
              <UserRound
                className={css.inputIcon}
                size={24}
                strokeWidth={1.5}
              />
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
                autoComplete="current-password"
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

          <div className={css.formGroup}>
            <label htmlFor="local" className={css.label}>
              Local do trabalho
            </label>
            <div className={css.inputContainer}>
              <Field
                as="select"
                name="local"
                id="local"
                className={css.input}
                disabled={isUserLoading}
              >
                <option value="">--Escolha--</option>
                <option value="Linha 1">Linha 1</option>
                <option value="Linha 2">Linha 2</option>
                <option value="Linha 3">Linha 3</option>
              </Field>
            </div>
            <ErrorMessage name="local" component="span" className={css.error} />
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
              'Login'
            )}
          </button>
        </Form>
      </Formik>
      <p className={css.text}>
        Ainda não tem conta?{' '}
        <NavLink to="/auth/register" className={css.link}>
          Registe-se
        </NavLink>{' '}
        agora!
      </p>
    </>
  );
}

export default LoginForm;
