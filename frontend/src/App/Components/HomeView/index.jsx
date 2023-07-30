import './HomeView.css'
import React, { Fragment } from 'react'
import { useSetTitle } from '../../Utils'
import { Sidebar, Header } from '../Partials'


const HomeView = () => {

  useSetTitle('Homepage')

  return (
    <Fragment>
      <Sidebar active={'dashboard'} />
      <section className='baseview'>
        <Header />
        <div className="contentview">
          <h4 className='welcome-text'>Welcome back</h4>
        </div>
      </section>
    </Fragment>
  )
}

export default HomeView