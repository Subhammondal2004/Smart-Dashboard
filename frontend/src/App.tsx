import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';

import ProtectedRoute from './routes/ProtectedRoute';
import MainLayout from './components/layout/MainLayout';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path='/' element={<Dashboard />} />
            <Route path='/leads' element={<Leads />} />
          </Route>

          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>

      <Toaster position='top-right' />
    </QueryClientProvider>
  );
}

export default App;