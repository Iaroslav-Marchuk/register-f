import { useDispatch } from 'react-redux';
import ConfirmContainer from '../ConfirmContainer/ConfirmContainer.jsx';
import ModalOverlay from '../ModalOverlay/ModalOverlay.jsx';
import css from './ProductionLogTableRow.module.css';

import { Trash2, SquarePen } from 'lucide-react';
import { useState } from 'react';
import { deleteOrder } from '../../redux/orders/operations.js';
import toast from 'react-hot-toast';

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
            <button className={css.btn}>
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
