import React from 'react'
import './index.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Browse from './components/Browse'
import Login from './components/Login'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import Layout from './components/Layout'



const appRouter=createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[

      {
        path:'',
        element:<Login/>
      },
      {
        path:'/browse',
        element:<Browse/>
      }

    ]
  }
])


const App = () => {



  
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
  <RouterProvider router={appRouter}>
    <App />
  </RouterProvider>
  </Provider>
)

export default App





