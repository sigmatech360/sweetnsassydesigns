import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from './Router/AppRouter'


function App() {

  return (
    <>
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  )
}

export default App
