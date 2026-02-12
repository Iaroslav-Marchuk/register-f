import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

import css from './ProductionLogForm.module.css';
import { FadeLoader } from 'react-spinners';
import { useState } from 'react';
import {
  createOrder,
  createRecoveryOrder,
  existOrder,
  updateOrder,
} from '../../redux/orders/operations.js';
import { useDispatch } from 'react-redux';

function ProductionLogForm({ isEdit = false, order = null, onSubmit }) {
  const dispatch = useDispatch();

  const NOTE_CHECKBOXES = {
    Tamanho: [
      { id: 'more2000', text: 'Montra (>2000mm)' },
      { id: 'more3500', text: 'Comprido (>3500mm)' },
      { id: 'amostra', text: 'Amostra' },
    ],

    Formato: [
      { id: 'molde', text: 'Molde' },
      { id: 'sutado', text: 'Sutado' },
      { id: 'redondo', text: 'Redondo' },
      { id: 'triplo', text: 'Triplo' },
      { id: 'furo', text: 'c/furo' },
    ],

    Acabamento: [
      { id: 'decalado', text: 'Decalado' },
      { id: 'rebaixo', text: 'c/rebaixo' },
    ],

    Perfil: [
      { id: 'wePreto', text: 'w/e preto' },
      { id: 'weCinza', text: 'w/e cinza' },
      { id: 'cxPreta', text: 'cx preta' },
      { id: 'superSpacer', text: 'Super Spacer' },
    ],

    Extras: [
      { id: 'quadrícula', text: 'Quadrícula' },
      { id: 'Árgon', text: 'Árgon' },
      { id: 'siliconeEstrutural', text: 'c/silicone estrutural' },
      { id: 'comutavel', text: 'Comutável' },
    ],
  };

  const initialValues = order
    ? {
        ep: order.ep,
        client: order.client,
        totalItems: order.totalItems,
        totalM2: order.totalM2,
        completedItems: order.completedItems,
        completedM2: order.completedM2,
        butylLot: order.butylLot,
        silicaLot: order.silicaLot,
        polysulfideLot: {
          white: order.polysulfideLot.white,
          black: order.polysulfideLot.black,
        },
        checkedNotes: order.checkedNotes,
      }
    : {
        ep: '',
        client: '',
        totalItems: '',
        totalM2: '',
        completedItems: '',
        completedM2: '',
        butylLot: '',
        silicaLot: '',
        polysulfideLot: {
          white: '',
          black: '',
        },
        checkedNotes: [],
      };

  const validationSchema = Yup.object().shape({
    ep: Yup.number()
      .integer('Deve ser um número inteiro')
      .positive('Deve ser um número positivo')
      .required('Campo obrigatório'),
    client: Yup.string().required('Campo obrigatório'),
    totalItems: Yup.number()
      .integer('Deve ser um número inteiro')
      .positive('Deve ser um número positivo')
      .required('Campo obrigatório'),
    totalM2: Yup.number()
      .positive('Deve ser um número positivo')
      .required('Campo obrigatório'),
    completedItems: Yup.number()
      .integer('Deve ser um número inteiro')
      .positive('Deve ser um número positivo')
      .test(
        'max-completed',
        'Feito não pode ser maior que Total',
        function (value) {
          const { totalItems } = this.parent;
          return value <= totalItems;
        }
      )

      .test(
        'max-missed-items',
        'Não pode ser maior que o restante',
        function (value) {
          if (orderMode !== 'continue') return true;
          return value <= activeOrder.missedItems;
        }
      )
      .required('Campo obrigatório'),
    completedM2: Yup.number()
      .positive('Deve ser um número positivo')
      .test(
        'max-completed',
        'Feito não pode ser maior que Total',
        function (value) {
          const { totalM2 } = this.parent;
          return value <= totalM2;
        }
      )
      .test('completed-m2-check', function (value) {
        const { totalItems, completedItems, totalM2 } = this.parent;

        if (activeOrder && activeOrder.isFinal) {
          return true;
        }

        if (completedItems === totalItems && value !== totalM2) {
          return this.createError({
            message: 'Deve ser igual a Total',
          });
        }

        if (completedItems < totalItems && value === totalM2) {
          return this.createError({
            message: 'Não pode ser igual a Total',
          });
        }

        return true;
      })
      .test('continue-consistency', function (value) {
        if (!activeOrder || orderMode !== 'continue') return true;

        const { completedItems } = this.parent;
        const { missedItems, missedM2 } = activeOrder;

        if (completedItems === missedItems && value === missedM2) {
          return true;
        }

        if (completedItems < missedItems && value < missedM2) {
          return true;
        }

        return this.createError({
          message:
            'Itens e m² devem ser concluídos proporcionalmente ao restante',
        });
      })
      .test(
        'max-missed-m2',
        'Não pode ser maior que o restante',
        function (value) {
          if (!activeOrder || orderMode !== 'continue') return true;
          return value <= activeOrder.missedM2;
        }
      )
      .required('Campo obrigatório'),

    butylLot: Yup.string(),
    silicaLot: Yup.string(),
    polysulfideLot: Yup.object().shape({
      white: Yup.string(),
      black: Yup.string(),
    }),
    checkedNotes: Yup.array(),
  });

  const [orderMode, setOrderMode] = useState('new');
  const [activeOrder, setActiveOrder] = useState(null);

  const handleOnBlur = async (ep, formik) => {
    if (!ep) return;

    try {
      const data = await dispatch(existOrder({ ep })).unwrap();

      if (!data.isExist) {
        if (!isEdit) {
          setOrderMode('new');
          setActiveOrder(null);
          formik.setValues({
            ...formik.values,
            ep,
            client: '',
            totalItems: '',
            totalM2: '',
            completedItems: '',
            completedM2: '',
            butylLot: '',
            silicaLot: '',
            polysulfideLot: { white: '', black: '' },
            checkedNotes: [],
          });
          return;
        }
      }

      if (
        data.order &&
        (data.order.type === 'created' || data.order.type === 'continued') &&
        !data.order.isFinal
      ) {
        setOrderMode('continue');
        setActiveOrder(data.order);
        formik.setValues({
          ep,
          client: data.order.client,
          totalItems: data.order.totalItems,
          totalM2: data.order.totalM2,
          completedItems: data.order.missedItems,
          completedM2: data.order.missedM2,
          butylLot: data.order.butylLot,
          silicaLot: data.order.silicaLot,
          polysulfideLot: data.order.polysulfideLot,
          checkedNotes: data.order.checkedNotes,
        });
        return;
      }

      const productionOrder = await dispatch(
        existOrder({ ep, onlyProduction: true })
      ).unwrap();

      if (productionOrder?.order) {
        setOrderMode('recovery');
        setActiveOrder(productionOrder.order);
        formik.setValues({
          ep,
          client: productionOrder.order.client,
          totalItems: productionOrder.order.totalItems,
          totalM2: productionOrder.order.totalM2,
          completedItems: '',
          completedM2: '',
          butylLot: '',
          silicaLot: '',
          polysulfideLot: { white: '', black: '' },
          checkedNotes: [],
        });
      } else {
        setOrderMode('new');
        setActiveOrder(null);
        formik.setValues({ ...initialValues, ep });
      }
    } catch (err) {
      toast.error('Erro ao verificar EP: ' + err.message);
    }
  };

  const handleSubmit = async (values, actions) => {
    try {
      if (isEdit) {
        if (onSubmit) onSubmit(values);
        return;
      }

      if (orderMode === 'new') {
        await dispatch(createOrder(values)).unwrap();
        toast.success('Nova ordem criada com sucesso!');
      } else if (orderMode === 'continue') {
        await dispatch(updateOrder(values)).unwrap();
        toast.success('Ordem atualizada com sucesso!');
      } else if (orderMode === 'recovery') {
        await dispatch(createRecoveryOrder(values)).unwrap();
        toast.success('Ordem de reposição criada!');
      }

      actions.resetForm();
      setOrderMode('new');
      setActiveOrder(null);

      if (onSubmit) onSubmit();
    } catch (error) {
      toast.error('Erro: ' + error);
    }
  };

  const isFieldDisabled = fieldName => {
    if (!isEdit && orderMode === 'new') return false;

    if (isEdit) {
      if (
        order.type !== 'created' &&
        ['ep', 'client', 'totalItems', 'totalM2'].includes(fieldName)
      )
        return true;
      return false;
    }

    if (['continue', 'recovery'].includes(orderMode)) {
      if (['ep', 'client', 'totalItems', 'totalM2'].includes(fieldName))
        return true;
    }

    return false;
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      enableReinitialize={true}
      validateOnBlur={true}
      validateOnChange={isEdit}
    >
      {formik => (
        <Form className={css.form}>
          <div className={css.field}>
            <label htmlFor="ep" className={css.label}>
              EP
            </label>
            <Field
              id="ep"
              name="ep"
              className={css.input}
              type="number"
              onBlur={e => handleOnBlur(e.target.value, formik)}
              disabled={isFieldDisabled('ep')}
            />
            <ErrorMessage className={css.error} name="ep" component="span" />
          </div>
          <div className={css.field}>
            <label htmlFor="client" className={css.label}>
              Cliente
            </label>
            <Field
              id="client"
              name="client"
              className={css.input}
              disabled={isFieldDisabled('client')}
            />
            <ErrorMessage
              className={css.error}
              name="client"
              component="span"
            />
          </div>
          <fieldset className={css.fieldset}>
            <legend className={css.legend}>N de vidros</legend>

            <div className={css.field}>
              <label htmlFor="totalItems" className={css.label}>
                Total, unid.
              </label>
              <Field
                id="totalItems"
                name="totalItems"
                className={css.input}
                type="number"
                disabled={isFieldDisabled('totalItems')}
              />
              <ErrorMessage
                className={css.error}
                name="totalItems"
                component="span"
              />
            </div>

            <div className={css.field}>
              <label htmlFor="totalM2" className={css.label}>
                Total, m<sup>2</sup>
              </label>
              <Field
                id="totalM2"
                name="totalM2"
                className={css.input}
                type="number"
                disabled={isFieldDisabled('totalM2')}
              />
              <ErrorMessage
                className={css.error}
                name="totalM2"
                component="span"
              />
            </div>

            <div className={css.field}>
              <label htmlFor="completedItems" className={css.label}>
                Feito, unid.
              </label>
              <Field
                id="completedItems"
                name="completedItems"
                className={css.input}
                type="number"
              />
              <ErrorMessage
                className={css.error}
                name="completedItems"
                component="span"
              />
            </div>

            <div className={css.field}>
              <label htmlFor="completedM2" className={css.label}>
                Feito, m<sup>2</sup>
              </label>
              <Field
                id="completedM2"
                name="completedM2"
                className={css.input}
                type="number"
              />
              <ErrorMessage
                className={css.error}
                name="completedM2"
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

          <fieldset className={css.fieldset}>
            <legend className={css.legend}>Observações</legend>
            {Object.entries(NOTE_CHECKBOXES).map(([group, items]) => (
              <div key={group} className={css.groupWrapper}>
                <p className={css.checkName}>{group}</p>
                <ul key={group} className={css.checkList}>
                  {items.map(opt => (
                    <li key={opt.id} className={css.checkItem}>
                      <label className={css.checkboxLabel}>
                        <Field
                          type="checkbox"
                          name="checkedNotes"
                          value={opt.text}
                        />
                        <span className={css.checkItemText}>{opt.text}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </fieldset>

          <button
            type="submit"
            className={css.btn}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? (
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
              'Alterar'
            ) : orderMode === 'continue' ? (
              'Atualizar'
            ) : orderMode === 'recovery' ? (
              'Reposição'
            ) : (
              'Adicionar nova encomenda'
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default ProductionLogForm;
