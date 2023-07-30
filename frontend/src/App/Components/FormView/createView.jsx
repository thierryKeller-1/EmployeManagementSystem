// import './FormView.css'
import React, { Fragment, useState, useEffect } from 'react'
import { useSetTitle } from '../../Utils'
import { Sidebar, Header } from '../Partials'
import { useFormik } from 'formik';
import { json, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useNewEmployeeMutation } from '../../Features/api/employeApiSlice'

const CreateView = ({ title }) => {

  useSetTitle(title)

  const [
    newEmploye,
    {
      isLoading: newEmployeLoading,
      isSuccess: newEmployeSuccess,
      isError: newEmployeError
    }] = useNewEmployeeMutation()

  function handleSave(values) {
    console.log(values)
  }

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

      console.log(values)

      console.log(employe)

      newEmploye(employe).unwrap()
        .then((payload) => {
          console.log(payload)
          toast.success('new employe created!')
          formikCreate.resetForm()
        })
        .catch((error) => {
          console.log(error)
        })
    })
  })

  return (
    <Fragment>
      <Sidebar active={'employee'} />
      <section className='baseview'>
        <Header />
        <div className="contentview">
          <form className='form-container' autoComplete='off' onSubmit={formikCreate.handleSubmit}>
            <div className="form-header">
              <h4 className='form-title'>New Employe</h4>
            </div>
            <div className="row row-space">
              <div className="col-2">
                <div className="input-group">
                  <label className="label" htmlFor='firstname'>First Name</label>
                  <input className="input--style-4" type="text" name="firstname" id="firstname"
                    onChange={formikCreate.handleChange}
                    value={formikCreate.values.firstname} />
                </div>
              </div>
              <div className="col-2">
                <div className="input-group">
                  <label className="label" htmlFor='lastname'>Last Name</label>
                  <input className="input--style-4" type="text" name="lastname" id='lastname'
                    onChange={formikCreate.handleChange}
                    value={formikCreate.values.lastname} />
                </div>
              </div>
            </div>
            <div className="row row-space">
              <div className="col-2">
                <div className="input-group">
                  <label className="label" htmlFor='email'>Email</label>
                  <input className="input--style-4" type="email" name="email" id='email'
                    onChange={formikCreate.handleChange}
                    value={formikCreate.values.email} />
                </div>
              </div>
              <div className="col-2">
                <div className="input-group">
                  <label className="label" htmlFor='post'>Post</label>
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
              </div>
            </div>
            <div className="row row-space">
              <div className="col-2">
                <div className="input-group">
                  <label className="label" htmlFor='salary'>Salaire de base</label>
                  <input className="input--style-4" type="number" id='salary' name="salary" min={0}
                    onChange={formikCreate.handleChange}
                    value={formikCreate.values.salary} />
                </div>
              </div>
              <div className="col-2">
                <div className="input-group">
                  <label className="label" htmlFor='takeon'>Date d'embauche</label>
                  <input className="input--style-4" type="date" name="datejoin" id='datejoin'
                    onChange={formikCreate.handleChange}
                    value={formikCreate.values.datejoin} />
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
                          onChange={formikCreate.handleChange}
                          value={formikCreate.values.transport} />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="select-group">
                      <label className="checkbox-container label"> Cantine
                        <input type="checkbox" id='cantine' name='cantine'
                          onChange={formikCreate.handleChange}
                          value={formikCreate.values.cantine} />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="select-group">
                      <label className="checkbox-container label"> Cnaps
                        <input type="checkbox" id='cnaps' name='cnaps'
                          onChange={formikCreate.handleChange}
                          value={formikCreate.values.cnaps} />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="select-group">
                      <label className="checkbox-container label"> Ostie
                        <input type="checkbox" id='ostie' name='ostie'
                          onChange={formikCreate.handleChange}
                          value={formikCreate.values.ostie} />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <button className="btn-save" type='submit'>Enregistrer</button>
                </div>
              </div>
            </div>
          </form>
          <Toaster position='top-right' toastOptions={{ duration: 2800, style: { background: '#ffffffff', color: 'black', fontWeight: '600', padding: '20px 50px 20px 50px', fontSize: '18px' } }} />
        </div>
      </section>
    </Fragment>
  )
}

export default CreateView