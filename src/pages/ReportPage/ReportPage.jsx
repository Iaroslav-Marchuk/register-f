import Container from '../../components/Container/Container.jsx';
import ReportTable from '../../components/ReportTable/ReportTable.jsx';
import SearchBox from '../../components/SearchBox/SearchBox.jsx';
import Summary from '../../components/Summary/Summary.jsx';

import css from './ReportPage.module.css';

function ReportPage() {
  //  const changeSearchQuery = event => {
  //    const newQuery = event.target.value;
  //    const nextSearchParams = new URLSearchParams(searchParams);

  //    if (newQuery !== '') {
  //      nextSearchParams.set('query', newQuery);
  //    } else {
  //      nextSearchParams.delete('query');
  //    }

  //    setSearchParams(nextSearchParams);
  // };

  return (
    <section className={css.section}>
      <Container>
        <h1 className={css.title}>Relatório</h1>
        <SearchBox />
        <ReportTable />
        <Summary />
      </Container>
    </section>
  );
}
export default ReportPage;
