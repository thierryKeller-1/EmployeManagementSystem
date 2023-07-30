import './FormView.css'
import React, { Fragment, useState, useEffect } from 'react'
import { useSetTitle } from '../../Utils'
import { Sidebar, Header } from '../Partials'
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useNewEmployeeMutation, useEditEmployeeMutation, useGetEmployeDetailQuery } from '../../Features/api/employeApiSlice'

const FormView = ({ title }) => {

  useSetTitle(title)
  const { id } = useParams()
  const [employe, setEmploye] = useState({})

  const [getEmployeDetail, getDetailresponse] = useGetEmployeDetailQuery()
  const [newEmploye, newEmployeResponse] = useNewEmployeeMutation()
  const [editEmploye, editEmployeResponse] = useEditEmployeeMutation()


  // const getEmploye = async (id) => {
  //   await fetch(`http://localhost:5058/api/Employer/${id}`).then(response => response.json()).then(data => setEmploye(data))
  // }

  if(id){
    try {
      setEmploye(getEmployeDetail(id))
    } catch (error) {
      console.log(error)
    }
  }

  console.log(employe)

  function handleEdit(values){
    console.log(values)
  }

  function handleSave(values){
    console.log(values)
  }

  const formikCreate = useFormik({
    initialValues: {
      nom : '',
      prenom: '',
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
      console.log(values);
      if(values.id){
        editEmploye(values)
        toast.success(' Employée mis a jour !')
      }
      else{
        newEmploye(values)
        toast.success('Employée enregistrer !')
      }
    })
  })

  const formikEdit = useFormik({
    initialValues: {
      id: employe.id,
      nom : employe.nom,
      prenom: employe.prenom,
      email: employe.email,
      post: employe.post,
      salary: employe.salary,
      datejoin: employe.datejoin,
      transport: employe.transport,
      cantine: employe.cantine,
      cnaps: employe.cnaps,
      ostie: employe.ostie,
    },
    onSubmit: (values => {
      console.log(values);
      if(values.id){
        editEmploye(values)
        toast.success(' Employée mis a jour !')
      }
      else{
        newEmploye(values)
        toast.success('Employée enregistrer !')
      }
    })
  })

  // useEffect(() => {
  //   if(id){
  //     setEmploye(getEmployeDetail(id))
  //     console.log(employe)
  //   }
  // }, [])

  return (
    <Fragment>
      <Sidebar active={'employee'} />
      <section className='baseview'>
        <Header />
        <div className="contentview">
          <form className='form-container' autoComplete='off' onSubmit={id ? formikEdit.handleSubmit : formikCreate.handleSubmit}>
            <div className="form-header">
              {id ? <h4 className='form-title'>Edit Employe</h4> : <h4 className='form-title'>New Employe</h4>}
            </div>
            <input type="hidden" id='id' name='emplyeId' 
            onChange={id ? formikEdit.handleChange : formikCreate.handleChange} 
            value={id ? formikEdit.values.id : ''} />
            <div className="row row-space">
              <div className="col-2">
                <div className="input-group">
                  <label className="label" htmlFor='firstname'>First Name</label>
                  <input className="input--style-4" type="text" name="firstname" id="firstname" 
                    onChange={id ? formikEdit.handleChange : formikCreate.handleChange } 
                    value={id ? formikEdit.values.firstname : formikCreate.values.firstname } />
                </div>
              </div>
              <div className="col-2">
                <div className="input-group">
                  <label className="label" htmlFor='lastname'>Last Name</label>
                  <input className="input--style-4" type="text" name="lastname" id='lastname' 
                    onChange={id ? formikEdit.handleChange : formikCreate.handleChange } 
                    value={ id ? formikEdit.values.lastname : formikCreate.values.lastname } />
                </div>
              </div>
            </div>
            <div className="row row-space">
              <div className="col-2">
                <div className="input-group">
                  <label className="label" htmlFor='email'>Email</label>
                  <input className="input--style-4" type="email" name="email" id='email' 
                    onChange={id ? formikEdit.handleChange : formikCreate.handleChange } 
                    value={id ? formikEdit.values.email : formikCreate.values.email } />
                </div>
              </div>
              <div className="col-2">
                <div className="input-group">
                  <label className="label" htmlFor='post'>Post</label>
                  <select name="post" id="post" 
                    onChange={id ? formikEdit.handleChange : formikCreate.handleChange} value={ id ? formikEdit.values.post : formikCreate.values.post}>
                    <option value="Directeur">Directeur</option>
                    <option value="administration">Administration</option>
                    <option value="RH">Ressource Humaine</option>
                    <option value="RF">Responsable Financier</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row row-space">
              <div className="col-2">
                <div className="input-group">
                  <label className="label" htmlFor='salary'>Salaire de base</label>
                  <input className="input--style-4" type="number" id='salary' name="salary" min={0} 
                    onChange={ id ? formikEdit.handleChange : formikCreate.handleChange } 
                    value={ id ? formikEdit.values.salary : formikCreate.values.salary } />
                </div>
              </div>
              <div className="col-2">
                <div className="input-group">
                  <label className="label" htmlFor='takeon'>Date d'embauche</label>
                  <input className="input--style-4" type="date" name="takeon" id='takeon' 
                    onChange={ id ? formikEdit.handleChange : formikCreate.handleChange } 
                    value={ id ? formikEdit.values.datejoin : formikCreate.values.datejoin } />
                </div>
              </div>
            </div>
            <div className="rowbig">
              <div className="col-max">
                <div className="input-group">
                  <label className="label" htmlFor='advantages'>Avantages</label>
                  <div className="form-group">
                    <div className="select-group">
                      <label className="checkbox-container label"> Transport
                        <input type="checkbox" name='transport' id='transport' 
                        onChange={ id ? formikEdit.handleChange : formikCreate.handleChange } 
                        value={id ? formikEdit.values.transport : formikCreate.values.transport } />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="form-group">
                      <label className="checkbox-container label"> Cantine
                        <input type="checkbox" id='cantine' name='cantine' 
                        onChange={id ? formikEdit.handleChange : formikCreate.handleChange } 
                        value={id ? formikEdit.values.cantine : formikCreate.values.cantine } />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="select-group">
                      <label className="checkbox-container label"> Cnaps
                        <input type="checkbox" id='cnaps' name='cnaps' 
                          onChange={id ? formikEdit.handleChange : formikCreate.handleChange }
                          value={id ? formikEdit.values.cnaps : formikCreate.values.cnaps} />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="select-group">
                      <label className="checkbox-container label"> Ostie
                        <input type="checkbox" id='ostie' name='ostie' 
                          onChange={id ? formikEdit.handleChange : formikCreate.handleChange }
                          value={id ? formikEdit.values.ostie : formikCreate.values.ostie} />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <button className="btn-save" type='submit'>{ id ? 'Modifier' : 'Enregistrer'}</button>
                </div>
              </div>
            </div>
          </form>
          <Toaster position='top-right' toastOptions={{ duration: 2800, style: { background: '#ffffffff', color: 'black', fontWeight:'600', padding: '20px 50px 20px 50px', fontSize: '18px'}}} />
        </div>
      </section>
    </Fragment>
  )
}

export default FormView