import './DetailView.css'
import React, { Fragment, useState, useEffect } from 'react'
import { Header, Sidebar } from '../Partials'
import { useSetTitle } from '../../Utils'
import { FaCheckSquare, FaSquareFull } from 'react-icons/fa'
import { useGetEmployeDetailQuery } from '../../Features/api/employeApiSlice'
import { useParams } from 'react-router-dom'

const DetailView = ({ title }) => {

  useSetTitle(title)

  const [employee, setEmployeDetail] = useState({})
  const { id } = useParams()

  // const { data, isLoading, isError } = useGetEmployeDetailQuery(id)

  const getEmployeById = async (id) => {
    const data = await fetch(`http://127.0.0.1:8000/api/employe/detail/${id}/`).then(response => response.json())
    setEmployeDetail(data)
  }

  useEffect(() => {
    getEmployeById(id)
  }, [])

  return (
    <Fragment>
      <Sidebar active={'employee'} />
      <section className='baseview'>
        <Header />
        <div className="contentview">
          <div className='table-container'>
            <div className="table-title-container">
              <h4 className='table-title'>Employee detail</h4>
            </div>
            <div className="data-container">
              <div className="panel-left">
                <div className="data-row">
                  <div className="data-label">First name </div>
                  <div className="data-value">{employee.firstname ? employee.firstname : 'Non defini'}</div>
                </div>
                <div className="data-row">
                  <div className="data-label">Email</div>
                  <div className="data-value">{employee.email ? employee.email : 'Non defini'}</div>
                </div>
                <div className="data-row">
                  <div className="data-label">Salaire de base</div>
                  <div className="data-value">{employee.salary ? employee.salary : 'Non defini'}</div>
                </div>
              </div>
              <div className="panel-right">
                <div className="data-row">
                  <div className="data-label">Last name</div>
                  <div className="data-value">{employee.lastname ? employee.lastname : 'Non defini'}</div>
                </div>
                <div className="data-row">
                  <div className="data-label">Post</div>
                  <div className="data-value">{employee.post ? employee.post : 'Non defini'}</div>
                </div>
                <div className="data-row">
                  <div className="data-label">Date d'embauche</div>
                  <div className="data-value">{employee.datejoin ? employee.datejoin : 'Non defini'}</div>
                </div>
              </div>
            </div>
            <div className="data-row-max">
              <div className="data-row">
                <div className="data-label">Avantages</div>
                {employee.advantages ?
                  <div className="avantages">
                    <div className="av-item">
                      {employee.advantages.cnaps ? <FaCheckSquare className='checked' /> : <FaSquareFull className='unchecked' />}
                      <div className="data-value">Cnaps</div>
                    </div>
                    <div className="av-item">
                      {employee.advantages.transport ? <FaCheckSquare className='checked' /> : <FaSquareFull className='unchecked' />}
                      <div className="data-value">Transpor</div>
                    </div>
                    <div className="av-item">
                      {employee.advantages.cantine ? <FaCheckSquare className='checked' /> : <FaSquareFull className='unchecked' />}
                      <div className="data-value">Cantine</div>
                    </div>
                    <div className="av-item">
                      {employee.advantages.ostie ? <FaCheckSquare className='checked' /> : <FaSquareFull className='unchecked' />}
                      <div className="data-value">Ostie</div>
                    </div>
                  </div> : <div> No advantages </div>}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default DetailView