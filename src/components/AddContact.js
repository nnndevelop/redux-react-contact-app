import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom';











const AddContact = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const dispatch = useDispatch()
    const contacts = useSelector((state) => state)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const checkEmail = contacts.find((contact) => contact.email === email && contact)
        const checkNumber = contacts.find((contact) => contact.number === parseInt(number))
        const checkName = contacts.find((contact) => contact.name === name && contact)
        if (!name || !email || !number) {
            return toast.warning('Please fill in all fields')
        }
        if (checkEmail) {
            return toast.error('This is email already Exist !')
        }
        if (checkNumber) {
            return toast.error('This is number already Exist !')
        }
        if (checkName) {
            return toast.error('This is Name already Exist !')
        }
        const data = {
            id: contacts[contacts.length - 1 ].id +1,
            name,
            email,
            number

        }
        dispatch({type:'ADD_CONTACT', payload: data})
        toast.success('Student added  successfully')
        navigate('/')
    }
    return (
        <div className="container">
            <div className="row">
                <h1 className="display-3 text-center">
                    Add Contact
                </h1>
                <div className='col-md-6 shadow mx-auto p-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='input-group'>
                            <input
                                type='text'
                                placeholder='Name'
                                value={name}
                                className='form-control'
                                onChange={e => setName(e.target.value)} />
                        </div>
                        <div className='input-group'>
                            <input
                                type='email'
                                value={email}
                                placeholder='Email'
                                className='form-control my-3'
                                onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className='input-group'>
                            <input
                                type='number'
                                placeholder='Number'
                                value={number}
                                className='form-control'
                                onChange={e => setNumber(e.target.value)} />
                        </div>
                        <div className='input-group'>
                            <input
                                type='submit'
                                value='Add Student'
                                className='btn btn-block btn-dark mt-3' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddContact