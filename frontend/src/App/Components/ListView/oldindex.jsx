import './ListView.css'
import "react-tabulator/lib/styles.css"
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css"
import React, { Fragment, useState, useRef, useEffect, useMemo } from 'react'
import { useSetTitle } from '../../Utils'
import { Header, Sidebar } from '../Partials'
import { Link, useNavigate } from 'react-router-dom'
import Swall from 'sweetalert2'
import { ReactTabulator, reactFormatter } from "react-tabulator";
import { FaTrashAlt, FaEdit, FaListAlt, FaPlusCircle } from 'react-icons/fa'
import { useGetEmployeListQuery } from '../../Features/api/employeApiSlice'
import toast, { Toaster } from 'react-hot-toast';

function SimpleOptions(props) {
  const rowData = props.cell._cell.row.data;

  return (
    <div className='btnOptions'>
      <button className='green' onClick={() => props.handlers.handleDetail(rowData.id)}><FaListAlt /></button>
      <button className='orange' onClick={() => props.handlers.handleEdit(rowData.id)}><FaEdit /></button>
      <button className='red' onClick={() => props.handlers.handleDelete(rowData.id)}><FaTrashAlt /></button>
    </div>
  )
}

const ListView = ({ title }) => {

  const searchRef = useRef()
  useSetTitle(title)

  // const { data: employes, isLoading, isSuccess, isError } = useGetEmployeListQuery()

  const navigate = useNavigate()

  const handleEdit = (id) => {
    navigate(`/employee/edit/${id}`)
  }

  const handleDetail = (id) => {
    navigate(`/employee/detail/${id}`)
  }

  const handleDelete = (id) => {
    Swall.fire({
      icon: 'warning',
      title: 'Are you sure to delete it ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
    }).then((result) => {
      if (result.isConfirmed) {
        const response = fetch(`http://127.0.0.1:8000/api/employe/delete/${id}/`, { method: 'DELETE' })
          .then(response => response.json())
        if (response.status === 200) {
          getEmployes()
          toast.success(response.message)
        } else if (response.status === 404) {
          Swall.fire({
            icon: 'error',
            title: 'error has occurred !',
            showCancelButton: true,
          })
        }
      }
    })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const searchRefValue = searchRef.current.value
    if (searchRefValue !== '') {
      const filteredData = tableData.filter(data => {
        return data.first_name.toLowerCase() === searchRefValue.toLowerCase() ||
          data.last_name.toLowerCase() === searchRefValue.toLowerCase() ||
          data.email.toLowerCase() === searchRefValue.toLowerCase() ||
          data.post.toLowerCase() === searchRefValue.toLowerCase() ||
          data.date_join.toLowerCase() === searchRefValue.toLowerCase() ||
          data.salary.toLowerCase() === searchRefValue.toLowerCase()
      })
      filteredData ? setTableData(filteredData) : setTableData([])
    } else {
      getEmployes()
    }
  }

  const [tableData, setTableData] = useState([])

  const handlers = {
    handleEdit,
    handleDetail,
    handleDelete
  }

  const columms = [
    { title: 'First Name', field: 'firstname' },
    { title: 'Last Name', field: 'lastname' },
    { title: 'Post', field: 'post' },
    { title: 'Email', field: 'email' },
    { title: 'Salairy', field: 'salary' },
    { title: 'Date Join', field: 'datejoin' },
    { title: 'Options', field: 'id', formatter: reactFormatter(<SimpleOptions handlers={handlers} />) }
  ]

  const getEmployes = async () => {
    await fetch(`http://127.0.0.1:8000/api/employe/all/`)
      .then(response => response.json())
      .then(data => setTableData([...data]))
  }

  useEffect(() => {
    getEmployes()
  }, [])

  const loadingComponent = <div> loading...</div>

  const errorComponent = <div> Failed to fetch data !</div>

  return (
    <Fragment>
      <Sidebar active={'employee'} />
      <section className='baseview'>
        <Header />
        <div className="contentview">
          <div className='table-container'>
            <div className="table-title-container">
              <h4 className='table-title'>Employe List</h4>
            </div>
            <div className="table-header">
              <Link to={'/employee/new'}>
                <button className="addnewEmploye"><FaPlusCircle /></button>
              </Link>
              <input type="search" name="search" placeholder='search...' className='search' ref={searchRef} />
            </div>
            {/* {isLoading && loadingComponent}
            {isError && errorComponent} */}
            {/* {isSuccess && <ReactTabulator data={tableData} columns={columms} options={{pagination: 'local', paginationSize: 10, paginationSizeSelector: [25, 50, 100]}} />} */}
            <ReactTabulator data={tableData} columns={columms} options={{ pagination: 'local', paginationSize: 10, paginationSizeSelector: [25, 50, 100] }} />
            <Toaster position='top-right' toastOptions={{ duration: 2800, style: { background: '#ffffffff', color: 'black', fontWeight: '600', padding: '20px 50px 20px 50px', fontSize: '18px' } }} />
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default ListView