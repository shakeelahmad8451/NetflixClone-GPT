import React from 'react'
import './index.css'
import Body from './components/Body'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Browse from './components/Browse'
import Login from './components/Login'
import ReactDOM from 'react-dom/client'

const appRouter=createBrowserRouter([
  {
    path:'/',
    element:<Login/>
  },
  {
    path:'/browse',
    element:<Browse/>
  }
])


const App = () => {



  return (
   <Body/>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={appRouter}>
    <App />
  </RouterProvider>
 
)

export default App