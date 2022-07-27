import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'


const EditContact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')


  const { id } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const contacts = useSelector((state) => state)
  const currentContact = contacts.find(contact => contact.id === parseInt(id))


  useEffect(() => {
    if (currentContact) {
      setName(currentContact.name)
      setEmail(currentContact.email)
      setNumber(currentContact.number)
    }
  }, [currentContact])

  const editSubmit = (e) => {
    e.preventDefault()
    const checkEmail = contacts.find((contact) => contact.id !== parseInt(id) && contact.email === email)
    const checkNumber = contacts.find((contact) => contact.id !== parseInt(id) && contact.number === parseInt(number))
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
        id: parseInt(id),
        name,
        email,
        number

    }
    dispatch({type:'UPDATE_CONTACT', payload: data})
    toast.success('Student added  successfully')
    navigate('/')
}

  return (
    <div className="container">
      {currentContact ? (
        <>
          <div className="row">
            <h1 className="display-3 text-center">
              Edit Contact {parseFloat(id) + 1}
            </h1>
            <div className='col-md-6 shadow mx-auto p-5'>
              <form onChange={editSubmit} >
                <div className='input-group'>
                  <input
                    type='text'
                    placeholder='Name'
                    className='form-control' 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className='input-group'>
                  <input
                    type='email'
                    placeholder='Email'
                    className='form-control my-3' 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className='input-group'>
                  <input
                    type='number'
                    placeholder='Number'
                    className='form-control' 
                    value={number}
                    onChange={e => setNumber(e.target.value)}
                    />
                </div>
                <div className='input-group'>
                  <input
                    type='submit'
                    value='Update Student'
                    className='btn btn-block btn-dark mt-3' 
                    />
                  <Link to='/' className='btn btn-block mt-3 mx-3 btn-danger'>
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <h1 className='display-3 my-5 text-center'>Student Contact with id {id} not exists</h1>
      )}
    </div>
  )
}

export default EditContact