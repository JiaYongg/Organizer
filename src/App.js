import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './views/LandingPage';
import AboutUsPage from './views/AboutUsPage';
import SignUpPage from './views/SignUpPage';
import LoginPage from './views/LoginPage';
import ContactUsPage from './views/ContactUsPage';

const router  = createBrowserRouter([
  {
    path:'/',
    element: <LandingPage />
  },
  {
    path:'/about',
    element: <AboutUsPage />
  },
  {
    path:'/contact',
    element: <ContactUsPage />
  },
  {
    path:'/login',
    element: <LoginPage />
  },
  {
    path:'/signup',
    element: <SignUpPage />
  }
])
function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
