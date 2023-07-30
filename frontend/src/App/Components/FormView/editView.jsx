// import './FormView.css'
import React, { Fragment, useState, useEffect } from 'react'
import { useSetTitle } from '../../Utils'
import { Sidebar, Header } from '../Partials'
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useEditEmployeeMutation, useGetEmployeDetailQuery } from '../../Features/api/employeApiSlice'

const EditView = ({ title }) => {

    useSetTitle(title)
    const { id } = useParams()
    const [employe, setEmploye] = useState({})

    const [employeDetail, { isLoading, isError }] = useGetEmployeDetailQuery(id)
    const [editEmploye, editEmployeResponse] = useEditEmployeeMutation()

    useEffect(() => {
        setEmploye(...employeDetail)
    })

    function handleSave(values) {
        console.log(values)
    }

    const formikEdit = useFormik({
        initialValues: employe,
        onSubmit: (values => {
            editEmploye(values)
            toast.success(' Employée mis a jour !')
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
                    <form className='form-container' autoComplete='off' onSubmit={formikEdit.handleSubmit}>
                        <div className="form-header">
                            <h4 className='form-title'>Edit Employe</h4>
                        </div>
                        <input type="hidden" id='id' name='emplyeId'
                            onChange={formikEdit.handleChange}
                            value={formikEdit.values.id} />
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label" htmlFor='firstname'>First Name</label>
                                    <input className="input--style-4" type="text" name="firstname" id="firstname"
                                        onChange={formikEdit.handleChange}
                                        value={formikEdit.values.firstname} />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label" htmlFor='lastname'>Last Name</label>
                                    <input className="input--style-4" type="text" name="lastname" id='lastname'
                                        onChange={formikEdit.handleChange}
                                        value={formikEdit.values.lastname} />
                                </div>
                            </div>
                        </div>
                        <div className="row row-space">
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label" htmlFor='email'>Email</label>
                                    <input className="input--style-4" type="email" name="email" id='email'
                                        onChange={formikEdit.handleChange}
                                        value={formikEdit.values.email} />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label" htmlFor='post'>Post</label>
                                    <select name="post" id="post"
                                        onChange={formikEdit.handleChange} value={formikEdit.values.post}>
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
                                        onChange={formikEdit.handleChange}
                                        value={formikEdit.values.salary} />
                                </div>
                            </div>
                            <div className="col-2">
                                <div className="input-group">
                                    <label className="label" htmlFor='takeon'>Date d'embauche</label>
                                    <input className="input--style-4" type="date" name="takeon" id='takeon'
                                        onChange={formikEdit.handleChange}
                                        value={formikEdit.values.datejoin} />
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
                                                    onChange={formikEdit.handleChange}
                                                    value={formikEdit.values.transport} />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        <div className="form-group">
                                            <label className="checkbox-container label"> Cantine
                                                <input type="checkbox" id='cantine' name='cantine'
                                                    onChange={formikEdit.handleChange}
                                                    value={formikEdit.values.cantine} />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        <div className="select-group">
                                            <label className="checkbox-container label"> Cnaps
                                                <input type="checkbox" id='cnaps' name='cnaps'
                                                    onChange={formikEdit.handleChange}
                                                    value={formikEdit.values.cnaps} />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                        <div className="select-group">
                                            <label className="checkbox-container label"> Ostie
                                                <input type="checkbox" id='ostie' name='ostie'
                                                    onChange={formikEdit.handleChange}
                                                    value={formikEdit.values.ostie} />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <button className="btn-save" type='submit'>Save Update</button>
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

export default EditView