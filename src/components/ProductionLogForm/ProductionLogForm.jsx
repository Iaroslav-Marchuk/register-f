import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

import css from './ProductionLogForm.module.css';
import { FadeLoader } from 'react-spinners';

function ProductionLogForm({ isEdit = false, order = null, onSubmit }) {
  const initialValues = order
    ? {
        ep: order.ep,
        client: order.client,
        order: {
          total: order.order.total,
          completed: order.order.completed,
          m2: order.order.m2,
        },
        butylLot: order.butylLot,
        silicaLot: order.silicaLot,
        polysulfideLot: {
          white: order.polysulfideLot.white,
          black: order.polysulfideLot.black,
        },
        notes: order.notes,
      }
    : {
        ep: '',
        client: '',
        order: {
          total: '',
          completed: '',
          m2: '',
        },
        butylLot: '',
        silicaLot: '',
        polysulfideLot: {
          white: '',
          black: '',
        },
        notes: '',
      };

  const validationSchema = Yup.object().shape({
    ep: Yup.number()
      .integer('Deve ser um número inteiro')
      .positive('Deve ser um número positivo')
      .required('Campo obrigatório'),
    client: Yup.string().required('Campo obrigatório'),
    order: Yup.object().shape({
      total: Yup.number()
        .integer('Deve ser um número inteiro')
        .positive('Deve ser um número positivo')
        .required('Campo obrigatório'),
      completed: Yup.number()
        .integer('Deve ser um número inteiro')
        .positive('Deve ser um número positivo')
        .test(
          'max-completed',
          'Feito não pode ser maior que Total',
          function (value) {
            const { total } = this.parent;
            return value <= total;
          }
        )
        .required('Campo obrigatório'),
      m2: Yup.number()
        .positive('Deve ser um número positivo')
        .required('Campo obrigatório'),
    }),
    butylLot: Yup.string(),
    silicaLot: Yup.string(),
    polysulfideLot: Yup.object().shape({
      white: Yup.string(),
      black: Yup.string(),
    }),
    notes: Yup.string()
      .min(3, 'Mínimo 3 caracteres')
      .max(40, 'Máximo de 40 caracteres'),
  });

  const handleSubmit = async (values, actions) => {
    try {
      await onSubmit(values, actions);
      actions.resetForm();
    } catch (error) {
      toast.error('Erro: ' + error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      enableReinitialize={true}
      validateOnBlur={true}
      validateOnChange={false}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.field}>
            <label htmlFor="ep" className={css.label}>
              EP
            </label>
            <Field id="ep" name="ep" className={css.input} type="number" />
            <ErrorMessage className={css.error} name="ep" component="span" />
          </div>
          <div className={css.field}>
            <label htmlFor="client" className={css.label}>
              Cliente
            </label>
            <Field id="client" name="client" className={css.input} />
            <ErrorMessage
              className={css.error}
              name="client"
              component="span"
            />
          </div>
          <fieldset className={css.fieldset}>
            <legend className={css.legend}>N de vidros</legend>

            <div className={css.field}>
              <label htmlFor="total" className={css.label}>
                Total
              </label>
              <Field
                id="total"
                name="order.total"
                className={css.input}
                type="number"
              />
              <ErrorMessage
                className={css.error}
                name="order.total"
                component="span"
              />
            </div>

            <div className={css.field}>
              <label htmlFor="completed" className={css.label}>
                Feito
              </label>
              <Field
                id="completed"
                name="order.completed"
                className={css.input}
                type="number"
              />
              <ErrorMessage
                className={css.error}
                name="order.completed"
                component="span"
              />
            </div>

            <div className={css.field}>
              <label htmlFor="m2" className={css.label}>
                M2
              </label>
              <Field
                id="m2"
                name="order.m2"
                className={css.input}
                type="number"
              />
              <ErrorMessage
                className={css.error}
                name="order.m2"
                component="span"
              />
            </div>
          </fieldset>
          <div className={css.field}>
            <label htmlFor="butylLot" className={css.label}>
              Lote butyl
            </label>
            <Field id="butylLot" name="butylLot" className={css.input} />
            <ErrorMessage
              className={css.error}
              name="butylLot"
              component="span"
            />
          </div>
          <div className={css.field}>
            <label htmlFor="silicaLot" className={css.label}>
              Lote sílica
            </label>
            <Field id="silicaLot" name="silicaLot" className={css.input} />
            <ErrorMessage
              className={css.error}
              name="silicaLot"
              component="span"
            />
          </div>
          <fieldset className={css.fieldset}>
            <legend className={css.legend}>Lote polissufuro</legend>

            <div className={css.field}>
              <label htmlFor="white" className={css.label}>
                Branco
              </label>
              <Field
                id="white"
                name="polysulfideLot.white"
                className={css.input}
              />
              <ErrorMessage
                className={css.error}
                name="polysulfideLot.white"
                component="span"
              />
            </div>

            <div className={css.field}>
              <label htmlFor="black" className={css.label}>
                Preto
              </label>
              <Field
                id="black"
                name="polysulfideLot.black"
                className={css.input}
              />
              <ErrorMessage
                className={css.error}
                name="polysulfideLot.black"
                component="span"
              />
            </div>
          </fieldset>
          <div className={css.field}>
            <label htmlFor="notes" className={css.label}>
              Observações
            </label>
            <Field id="notes" name="notes" className={css.input} />
            <ErrorMessage className={css.error} name="notes" component="span" />
          </div>

          <button type="submit" className={css.btn} disabled={isSubmitting}>
            {isSubmitting ? (
              <div className={css.loaderWrapper}>
                <FadeLoader
                  className={css.loader}
                  loading={true}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                  color="#9fb9e2ff"
                />
              </div>
            ) : isEdit ? (
              'Atualizar'
            ) : (
              'Adicionar'
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default ProductionLogForm;
