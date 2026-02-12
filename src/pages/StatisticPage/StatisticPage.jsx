import Container from '../../components/Container/Container.jsx';
import StatsDashboard from '../../components/StatsDashboard/StatsDashboard.jsx';
import css from './StatisticPage.module.css';

function StatisticPage() {
  return (
    <section className={css.section}>
      <Container>
        <h1 className={css.title}>Estatísticas da produção</h1>
        <StatsDashboard />
      </Container>
    </section>
  );
}
export default StatisticPage;
