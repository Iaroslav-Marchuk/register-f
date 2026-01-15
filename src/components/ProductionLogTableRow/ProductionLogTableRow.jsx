import { useDispatch } from 'react-redux';
import ConfirmContainer from '../ConfirmContainer/ConfirmContainer.jsx';
import ModalOverlay from '../ModalOverlay/ModalOverlay.jsx';
import css from './ProductionLogTableRow.module.css';

import { Trash2, SquarePen } from 'lucide-react';
import { useState } from 'react';
import { deleteOrder, updateOrder } from '../../redux/orders/operations.js';
import toast from 'react-hot-toast';
import ProductionLogForm from '../ProductionLogForm/ProductionLogForm.jsx';

function ProductionLogTableRow({ order }) {
  const dispatch = useDispatch();
  const {
    ep,
    client,
    order: { total, completed, m2 } = {},
    butylLot,
    silicaLot,
    polysulfideLot: { white, black } = {},
    notes,
  } = order;

  const [editIsOpen, setEditisOpen] = useState(false);
  const openEdit = async () => {
    try {
      setEditisOpen(true);
    } catch (error) {
      toast.error(error);
    }
  };

  const closeEdit = () => setEditisOpen(false);

  const handleEdit = async values => {
    if (
      order.ep === values.ep &&
      order.client === values.client &&
      order.order.total === Number(values.order.total) &&
      order.order.completed === Number(values.order.completed) &&
      order.order.m2 === Number(values.order.m2) &&
      order.butylLot === values.butylLot &&
      order.silicaLot === values.silicaLot &&
      order.polysulfideLot.white === values.polysulfideLot.white &&
      order.polysulfideLot.black === values.polysulfideLot.black &&
      order.notes === values.notes
    ) {
      toast.error('A encomenda não foi alterada.');
      return;
    }

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
      await dispatch(
        updateOrder({ orderId: order._id, values: payload })
      ).unwrap();
      toast.success('Encomenda atualizada com sucesso!');
      closeEdit();
    } catch (error) {
      toast.error('Falha ao atualizar a encomenda: ' + error);
    }
  };

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const openConfirm = () => setIsConfirmOpen(true);
  const closeConfirm = () => setIsConfirmOpen(false);

  const handleDelete = () => {
    dispatch(deleteOrder(order._id))
      .unwrap()
      .then(() => {
        toast.success('Encomenda eliminada com sucesso!');
      })

      .catch(() => {
        toast.error('Falha ao eliminar a encomenda.');
      })
      .finally(() => {
        closeConfirm();
      });
  };

  return (
    <>
      <tr>
        <td>{String(ep).padStart(5, '0')}</td>
        <td className={css.textLeft}>{client}</td>
        <td>{total}</td>
        <td>{completed}</td>
        <td>{m2}</td>
        <td>{butylLot}</td>
        <td>{silicaLot}</td>
        <td>{white}</td>
        <td>{black}</td>
        <td className={css.textLeft}>{notes}</td>
        <td>
          <div className={css.btns}>
            <button className={css.btn} onClick={openEdit}>
              <SquarePen className={css.icon} size={20} strokeWidth={1.5} />
            </button>
            <button className={css.btn} onClick={openConfirm}>
              <Trash2
                className={`${css.icon} ${css.delete}`}
                size={20}
                strokeWidth={1.5}
              />
            </button>
          </div>
        </td>
      </tr>

      <ModalOverlay isOpen={editIsOpen} onClose={closeEdit}>
        <ProductionLogForm isEdit={true} order={order} onSubmit={handleEdit} />
      </ModalOverlay>

      <ModalOverlay isOpen={isConfirmOpen} onClose={closeConfirm}>
        <ConfirmContainer
          text={'Tem a certeza que quer eliminar este artigo?'}
          onConfirm={handleDelete}
          onClose={closeConfirm}
        />
      </ModalOverlay>
    </>
  );
}

export default ProductionLogTableRow;
