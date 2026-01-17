import { CirclePlus } from 'lucide-react';

import Container from '../../components/Container/Container.jsx';
import ModalOverlay from '../../components/ModalOverlay/ModalOverlay.jsx';
import Summary from '../../components/Summary/Summary.jsx';
import ProductionLogForm from '../../components/ProductionLogForm/ProductionLogForm.jsx';
import ProductionLogTable from '../../components/ProductionLogTable/ProductionLogTable.jsx';

import { useEffect, useState } from 'react';

import css from './MainPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors.js';
import { useSearchParams } from 'react-router-dom';
import { createOrder, getTodayOrders } from '../../redux/orders/operations.js';
import {
  selectTodayOrders,
  selectTodayOrdersTotalPages,
} from '../../redux/orders/selectors.js';
import Pagination from '../../components/Pagination/Pagination.jsx';
import toast from 'react-hot-toast';

function MainPage() {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const todayOrders = useSelector(selectTodayOrders);
  const totalPages = useSelector(selectTodayOrdersTotalPages);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || 10;
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const sortOrder = searchParams.get('sortOrder') || 'desc';

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      params.set('sortBy', newSortBy);
      params.set('sortOrder', newSortOrder);
      params.set('page', 1);

      return params;
    });
  };

  const handlePageChange = newPage => {
    searchParams.set('page', newPage);
    setSearchParams(searchParams);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const date = new Date().toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });

  const hasMoreThan2Pages = totalPages > 1;

  const handleCreateOrder = async (values, actions) => {
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

  useEffect(() => {
    dispatch(getTodayOrders({ page, perPage, sortBy, sortOrder }));
  }, [page, perPage, sortBy, sortOrder, dispatch]);

  return (
    <section className={css.section}>
      <Container>
        <h1 className={css.title}>Controlo de produção vidro duplo</h1>
        <div className={css.wrapper}>
          <button type="button" className={css.btn} onClick={openModal}>
            <CirclePlus className={css.icon} size={20} strokeWidth={1.5} />
            Adicionar encomenda
          </button>

          <div className={css.info}>
            <span className={css.span}>{user.local}</span>
            <span className={css.span}>Responsavel: {user.name}</span>
            <span className={css.span}>{`Data: ${date}`}</span>
          </div>
        </div>

        {todayOrders.length > 0 ? (
          <>
            <ProductionLogTable
              ordersList={todayOrders}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
            />
            <Summary />

            {hasMoreThan2Pages && (
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <p className={css.noResults}>
            Hoje ainda não foi feito nenhum pedido!
          </p>
        )}
      </Container>

      <ModalOverlay isOpen={isModalOpen} onClose={closeModal}>
        <ProductionLogForm isEdit={false} onSubmit={handleCreateOrder} />
      </ModalOverlay>
    </section>
  );
}
export default MainPage;
