import './ListView.css'
import React, { Fragment, useState, useRef, useEffect, useMemo } from 'react'
import { useSetTitle } from '../../Utils'
import { Header, Sidebar } from '../Partials'
import { Link, useNavigate } from 'react-router-dom'
import Swall from 'sweetalert2'
import { FaTrashAlt, FaEdit, FaListAlt, FaPlusCircle } from 'react-icons/fa'
import { useGetEmployeListQuery, useDeleteEmployeeMutation, useNewEmployeeMutation } from '../../Features/api/employeApiSlice'
import toast, { Toaster } from 'react-hot-toast';
import MaterialReactTable from 'material-react-table';
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik';
import { BiRefresh } from 'react-icons/bi'


const ListView = ({ title }) => {

  useSetTitle(title)

  const {
    data: employes,
    isLoading: isFetchingAllEmployeLoading,
    isSuccess: isFetchingAllEmployeSuccess,
    isError: isFetchingAllEmployeError,
    refetch: refetchAllEmployes
  } = useGetEmployeListQuery()

  const [
    deleteEmploye,
    {
      isLoading: isDeleteEmployeLoading,
      isSuccess: isDeleteEmployeSuccess,
      isError: isDleteEmployeError
    }
  ] = useDeleteEmployeeMutation()

  const [
    newEmploye,
    {
      isLoading: newEmployeLoading,
      isSuccess: newEmployeSuccess,
      isError: newEmployeError
    }
  ] = useNewEmployeeMutation()

  const [rowSelection, setRowSelection] = useState({});

  const formikCreate = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      post: '',
      salary: '',
      datejoin: '',
      transport: false,
      cantine: false,
      cnaps: false,
      ostie: false,
    },
    onSubmit: (values => {
      const empAdvantages = {
        transport: values.transport,
        cantine: values.cantine,
        cnaps: values.cnaps,
        ostie: values.ostie
      }

      const employe = {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        post: values.post,
        salary: values.salary,
        datejoin: values.datejoin,
        advantages: empAdvantages
      }

      newEmploye(employe).unwrap()
        .then((payload) => {
          toast.success('new employe created!')
          formikCreate.resetForm()
          refetchAllEmployes()
        })
        .catch((error) => {
          console.log(error)
        })
    })
  })

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
        deleteEmploye(id).unwrap()
          .then((payload) => {
            refetchAllEmployes()
            toast.success('delete successfully !')
          })
          .catch((error) => {
            toast.error('error has occured !')
          })
      }
    })
  }

  useEffect(() => {
    refetchAllEmployes()
  }, [employes, refetchAllEmployes])

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'firstname',
        header: 'Firstname',
      },
      {
        accessorKey: 'lastname',
        header: 'Lastname',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'post',
        header: 'Post',
      },
      {
        accessorKey: 'salary',
        header: 'Salary',
      },
    ],
    [],
  );

  const handlers = {
    handleDelete
  }

  const modalRef = useRef()

  const dispalyModal = () => {
    modalRef.current.classList.add("show-modal")
  }

  const hideModal = () => {
    modalRef.current.classList.remove('show-modal')
  }

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
            {isFetchingAllEmployeLoading && <div> loading...</div>}
            {isFetchingAllEmployeError && <div> Failed to fetch data !</div>}
            {isFetchingAllEmployeSuccess && <MaterialReactTable columns={columns} data={employes ? employes : []}
              enableColumnActions
              enableRowActions
              positionActionsColumn="last"
              enableRowSelection
              getRowId={(row) => row.id}
              onRowSelectionChange={setRowSelection}
              state={{ rowSelection }}
              renderTopToolbarCustomActions={() => (
                <button className="addnewEmploye" onClick={() => dispalyModal()}><FaPlusCircle /></button>
              )}
              muiTableBodyRowProps={({ row }) => ({
                onClick: row.getToggleSelectedHandler(),
                sx: { cursor: 'pointer' },
              })}
              renderRowActions={({ row }) => (
                <div className='btnOptions'>
                  <button className='green' onClick={() => handlers.handleDetail(row.getValue('id'))}><FaListAlt /></button>
                  <button className='orange' onClick={() => handlers.handleEdit(row.getValue('id'))}><FaEdit /></button>
                  <button className='red' onClick={() => handlers.handleDelete(row.getValue('id'))}><FaTrashAlt /></button>
                </div>
              )} />}
            {isFetchingAllEmployeError && <div style={{ textAlign: 'center' }}>Error has occured</div>}
            <Toaster position='top-right' toastOptions={{ duration: 2800, style: { background: '#ffffffff', color: 'black', fontWeight: '600', padding: '20px 50px 20px 50px', fontSize: '18px' } }} />
          </div>
        </div>
        <div className="modal" ref={modalRef}>
          <form className="modal-content" autoComplete='off' onSubmit={formikCreate.handleSubmit}>
            <span className="close-button" onClick={() => hideModal()}>&times;</span>
            <br />
            <div className="modal-header">
              <h2 className='form-h1'>New Employee</h2>
            </div>
            <div className="form-content">
              <div className="form-group">
                <span className='clear-form' onClick={() => formikCreate.resetForm()}>
                  <small>reset</small>
                  <BiRefresh />
                </span>
              </div>
              <div className="form-group">
                <label className='label' htmlFor="firstname">Firstname</label>
                <input type="text" className='input--style-4' placeholder='Firstname'
                  name='firstname' id='firstname'
                  onChange={formikCreate.handleChange}
                  value={formikCreate.values.firstname} />
              </div>
              <div className="form-group">
                <label className='label' htmlFor="lastname">Lastname</label>
                <input type="text" className='input--style-4' placeholder='Lastname'
                  id='lastname' name='lastname'
                  onChange={formikCreate.handleChange}
                  value={formikCreate.values.lastname} />
              </div>
              <div className="form-group">
                <label className='label' htmlFor="lastname">Email</label>
                <input type="email" className='input--style-4' placeholder='Email'
                  id='email' name='email'
                  onChange={formikCreate.handleChange}
                  value={formikCreate.values.email} />
              </div>
              <div className="form-group">
                <label className='label' htmlFor="lastname">Post</label>
                <select name="post" id="post"
                  onChange={formikCreate.handleChange}
                  value={formikCreate.values.post}>
                  <option disabled={true} value={""}>Select post</option>
                  <option value="Directeur">Directeur</option>
                  <option value="administration">Administration</option>
                  <option value="RH">Ressource Humaine</option>
                  <option value="RF">Responsable Financier</option>
                </select>
              </div>
              <div className="form-group">
                <label className='label' htmlFor="datejoin">Date joined</label>
                <input type="date" className='input--style-4' 
                placeholder='Date join' 
                id='datejoin' 
                onChange={formikCreate.handleChange} value={formikCreate.datejoin} />
              </div>
              <div className="form-group">
                <label className='label' htmlFor="salary">Salary</label>
                <input type="number" 
                className='input--style-4' 
                placeholder='Salary' id='salary'
                onChange={formikCreate.handleChange} value={formikCreate.salary} />
              </div>
              <div className="form-group">
                <label className='label' htmlFor="lastname">Advantages</label>
                <div className="option-group">
                  <div className="select-group">
                    <label className="checkbox-container label-checkbox"> transport
                      <input type="checkbox" id='transport' name='transport'
                      onChange={formikCreate.handleChange} value={formikCreate.transport} />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="select-group">
                    <label className="checkbox-container label-checkbox"> cantine
                      <input type="checkbox" id='cantine' name='cantine'
                      onChange={formikCreate.handleChange} value={formikCreate.cantine} />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="select-group">
                    <label className="checkbox-container label-checkbox"> ostie
                      <input type="checkbox" id='ostie' name='ostie'
                      onChange={formikCreate.handleChange} value={formikCreate.ostie} />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="select-group">
                    <label className="checkbox-container label-checkbox"> cnaps
                      <input type="checkbox" id='cnaps' name='cnaps'
                      onChange={formikCreate.handleChange} value={formikCreate.cnaps} />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-footer">
                <button className="btn-save" type='submit'>Enregistrer</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </Fragment>
  )
}

export default React.memo(ListView)