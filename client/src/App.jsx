import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import EditPerfume from './pages/EditPerfume'
import CreatePerfume from './pages/CreatePerfume'
import PerfumeDetails from './pages/PerfumeDetails'
import ViewPerfumes from './pages/ViewPerfumes'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/new',
      element: <CreatePerfume title='PERFUME CUSTOMIZER | Customize' />
    },
    {
      path:'/',
      element: <ViewPerfumes title='PERFUME CUSTOMIZER | Home' />
    },
    {
      path: '/details/:id',
      element: <PerfumeDetails title='PERFUME CUSTOMIZER | View' />
    },
    {
      path: '/edit/:id',
      element: <EditPerfume title='PERFUME CUSTOMIZER | Edit' />
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App