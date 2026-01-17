import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/Container/Container.jsx';
import ReportTable from '../../components/ReportTable/ReportTable.jsx';
import SearchBox from '../../components/SearchBox/SearchBox.jsx';
import Summary from '../../components/Summary/Summary.jsx';

import css from './ReportPage.module.css';
import {
  selectAllOrders,
  selectAllOrdersTotalPages,
} from '../../redux/orders/selectors.js';
import { useEffect, useMemo } from 'react';
import { getAllOrders } from '../../redux/orders/operations.js';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination.jsx';
import { selectUser } from '../../redux/auth/selectors.js';

function ReportPage() {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const allOrders = useSelector(selectAllOrders);

  const totalPages = useSelector(selectAllOrdersTotalPages);

  const hasMoreThan2Pages = totalPages > 1;

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('perPage')) || 10;
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const sortOrder = searchParams.get('sortOrder') || 'desc';
  const filter = useMemo(() => {
    return {
      client: searchParams.get('client') || undefined,
      ep: searchParams.get('ep') || undefined,
      local: searchParams.get('local') || undefined,
      createdAt: searchParams.get('createdAt') || undefined,
    };
  }, [searchParams]);

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

  useEffect(() => {
    dispatch(getAllOrders({ page, perPage, sortBy, sortOrder, filter }));
  }, [page, perPage, sortBy, sortOrder, filter, dispatch]);

  return (
    <section className={css.section}>
      <Container>
        <h1 className={css.title}>Relatório</h1>
        <SearchBox />

        {allOrders.length > 0 ? (
          <>
            <ReportTable
              ordersList={allOrders}
              user={user}
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
          <p className={css.noResults}>Sem resultados!</p>
        )}
      </Container>
    </section>
  );
}
export default ReportPage;
