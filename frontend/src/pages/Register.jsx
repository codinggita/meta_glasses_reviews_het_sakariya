import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'
import { registerUser, reset } from '../store/authSlice'

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').required('Required'),
})

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/dashboard')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onSubmit = async (values) => {
    await dispatch(registerUser(values))
  }

  return (
    <div className='min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50'>
      <div className='w-full max-w-md bg-white p-8 rounded-xl shadow-md'>
        <h2 className='text-3xl font-bold mb-6 text-center'>Register</h2>
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={RegisterSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className='space-y-4'>
              <div>
                <label className='block text-sm font-medium mb-1'>Name</label>
                <Field
                  name='name'
                  type='text'
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <ErrorMessage
                  name='name'
                  component='div'
                  className='text-red-500 text-sm mt-1'
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>Email</label>
                <Field
                  name='email'
                  type='email'
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <ErrorMessage
                  name='email'
                  component='div'
                  className='text-red-500 text-sm mt-1'
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>Password</label>
                <Field
                  name='password'
                  type='password'
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <ErrorMessage
                  name='password'
                  component='div'
                  className='text-red-500 text-sm mt-1'
                />
              </div>
              <button
                type='submit'
                disabled={isSubmitting || isLoading}
                className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50'
              >
                {isLoading ? 'Loading...' : 'Register'}
              </button>
            </Form>
          )}
        </Formik>
        <p className='text-center mt-6 text-gray-600'>
          Already have an account?{' '}
          <Link to='/login' className='text-blue-600 hover:underline'>
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
