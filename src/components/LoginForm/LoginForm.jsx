import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { UserRound, KeyRound } from 'lucide-react';
import toast from 'react-hot-toast';

import css from './LoginForm.module.css';

function LoginForm() {
  const initialValues = {
    name: '',
    password: '',
    local: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Campo obrigatório'),
    password: Yup.string().required('Campo obrigatório'),
    local: Yup.string().required('Campo obrigatório'),
  });

  const handleSubmit = async (values, actions) => {
    try {
      toast.success('Login efetuado com sucesso!');
      actions.resetForm();
    } catch (error) {
      toast.error('Falha ao iniciar sessão.' + error);
    }
  };

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Seja bem-vindo!</h2>
      <h3 className={css.subtitle}>Inicie sessão para começar</h3>
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
              <Field as="select" name="local" id="local" className={css.input}>
                <option value="">--</option>
                <option value="LINE_1">Linha 1</option>
                <option value="LINE_2">Linha 2</option>
                <option value="LINE_3">Linha 3</option>
              </Field>
            </div>
            <ErrorMessage name="local" component="span" className={css.error} />
          </div>

          <button type="submit" className={css.btn}>
            Login
          </button>
        </Form>
      </Formik>
      <p className={css.text}>
        Ainda não tem conta? <button className={css.span}>Registe-se</button>{' '}
        agora!
      </p>
    </div>
  );
}

export default LoginForm;
