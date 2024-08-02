import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Menu from './pages/Menu';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  const rotas = createBrowserRouter([
    {
      path : "/",
      element : <Menu></Menu>
    }
  ])
  return (
    <ChakraProvider>
      <RouterProvider router={rotas}></RouterProvider>
    </ChakraProvider>
  );
}

export default App;
