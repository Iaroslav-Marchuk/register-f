import SearchBox from '../../components/SearchBox/SearchBox.jsx';
import Table from '../../components/Table/Table.jsx';
import TableHeader from '../../components/TableHeader/TableHeader.jsx';

function MainPage() {
  return (
    <div>
      <h1>Main Page</h1>
      <SearchBox />
      <TableHeader />
      <Table />
    </div>
  );
}
export default MainPage;
