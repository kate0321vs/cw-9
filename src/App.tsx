import { Box } from '@mui/material';
import Layout from './components/Layout/Layout.tsx';
import { Route, Routes } from 'react-router-dom';
import Categories from './containers/Categories/Categories.tsx';
import Transactions from './containers/Transactions/Transactions.tsx';

const App = () => {
  return (
    <Box sx={{backgroundColor: '#f5f5f5', minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      <Layout>
        <Routes>
          <Route path="/" element={(<Transactions/>)}/>
          <Route path="/categories" element={(<Categories/>)}/>
          <Route path="*" element={(<h1>Not page found</h1>)}/>
        </Routes>
      </Layout>
    </Box>
  );
};

export default App;