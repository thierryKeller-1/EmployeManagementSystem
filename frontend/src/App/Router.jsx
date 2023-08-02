import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {
  HomeView, ListView, ErrorPage
} from './Components'

const Routers = () => {

  return (
    <Routes>
      <Route path='/' element={<HomeView />} />
      <Route path='/employee'>
        <Route index element={<ListView title={'Employe List'} />} />
        {/* <Route path='new' element={<CreateView title={'New Employe'} />} />
        <Route path='edit/:id' element={<EditView title={'Edit Employe'} />} />
        <Route path='detail/:id' element={<DetailView title={'Employe detail'} />} /> */}
      </Route>
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  )

}

export default Routers