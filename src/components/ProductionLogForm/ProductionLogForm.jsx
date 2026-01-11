import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

import css from './ProductionLogForm.module.css';
import { createOrder, getTodayOrders } from '../../redux/orders/operations.js';
import { useDispatch } from 'react-redux';

function ProductionLogForm() {
  const dispatch = useDispatch();

  const initialValues = {
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
    const payload = {
      ep: Number(values.ep),
      client: values.client,
      order: {
        total: Number(values.order.total),
        completed: Number(values.order.completed),
        m2: Number(values.order.m2),
      },
      butylLot: String(values.butylLot),
      silicaLot: String(values.silicaLot),
      polysulfideLot: {
        white: String(values.polysulfideLot.white),
        black: String(values.polysulfideLot.black),
      },
      notes: String(values.notes),
    };

    try {
      await dispatch(createOrder(payload)).unwrap();
      toast.success('Pedido adicionado com sucesso!');
      dispatch(
        getTodayOrders({
          page: 1,
          perPage: 10,
          sortBy: 'createdAt',
          sortOrder: 'desc',
        })
      );
      actions.resetForm();
    } catch (error) {
      toast.error('Falha ao adicionar novo pedido: ' + error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      validateOnBlur={true}
      validateOnChange={false}
    >
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
          <ErrorMessage className={css.error} name="client" component="span" />
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

        <button type="submit" className={css.btn}>
          Adicionar
        </button>
      </Form>
    </Formik>
  );
}

export default ProductionLogForm;
