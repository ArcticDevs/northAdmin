/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import * as auth from '../redux/AuthRedux'
import {register} from '../redux/AuthCRUD'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {registerUser} from '../../../ApiCalls/UserApiCalls'
import validator from 'validator'
import Swal from 'sweetalert2'
import {useHistory} from 'react-router-dom'

const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  changepassword: '',
  acceptTerms: false,
}

const registrationSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Username is required'),
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  lastname: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Last name is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  changepassword: Yup.string()
    .required('Password confirmation is required')
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
    }),
  acceptTerms: Yup.bool().required('You must accept the terms and conditions'),
})

export function Registration() {
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    },
  })

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')

  let history = useHistory()

  const handleRegister = async () => {
    if (username === '' || password === '' || email === '' || cpassword === '') {
      Swal.fire({
        title: `Please fill all the fields`,
        icon: 'info',
        confirmButtonText: 'Close',
      })
    } else {
      try {
        setLoading(true)

        const res = await registerUser(email, username, password)

        if (res?.status === 200) {
          setLoading(false)

          Swal.fire({
            title: `${res?.data.message}`,
            icon: 'info',
            confirmButtonText: 'Close',
          }).then(() => history.push('/auth/login'))
        } else {
          setLoading(false)
          localStorage.setItem('userDetails', JSON.stringify(res?.data.user))

          Swal.fire({
            title: `Welcome! ${username}`,
            text: 'User Registered Succesfully',
            icon: 'success',
            confirmButtonText: 'Close',
            timer: 2000,
          })
        }
      } catch (error) {
        console.log(error)
        setLoading(false)

        Swal.fire({
          title: 'An error occured , Please try again',
          icon: 'error',
          confirmButtonText: 'Close',
          timer: 2000,
        })
      }
    }
  }

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_signup_form'
      onSubmit={formik.handleSubmit}
    >
      {/* begin::Heading */}
      <div className='mb-10 text-center'>
        {/* begin::Title */}
        <h1 className='text-dark mb-3'>Create an Account</h1>
        {/* end::Title */}

        {/* begin::Link */}
        <div className='text-gray-400 fw-bold fs-4'>
          Already have an account?
          <Link to='/auth/login' className='link-primary fw-bolder' style={{marginLeft: '5px'}}>
            Login?
          </Link>
        </div>
        {/* end::Link */}
      </div>
      {/* end::Heading */}

      {/* begin::Action */}
      {/* <button type='button' className='btn btn-light-primary fw-bolder w-100 mb-10'>
        <img
          alt='Logo'
          src={toAbsoluteUrl('/media/svg/brand-logos/google-icon.svg')}
          className='h-20px me-3'
        />
        Sign in with Google
      </button> */}
      {/* end::Action */}

      {/* <div className='d-flex align-items-center mb-10'>
        <div className='border-bottom border-gray-300 mw-50 w-100'></div>
        <span className='fw-bold text-gray-400 fs-7 mx-2'>OR</span>
        <div className='border-bottom border-gray-300 mw-50 w-100'></div>
      </div> */}

      {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}

      {/* begin::Form group Username */}
      <div className='row fv-row mb-7'>
        <label className='class="form-label fw-bolder text-dark fs-6'>Username</label>
        <input
          placeholder='Username'
          type='text'
          autoComplete='off'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': username && username.length < 3,
            },
            {
              'is-valid': username && username.length >= 3,
            }
          )}
        />
        {username && username.length < 3 && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>Username should be at least 3 characters</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Email */}
      <div className='fv-row mb-7'>
        <label className='form-label fw-bolder text-dark fs-6'>Email</label>
        <input
          placeholder='Email'
          type='email'
          autoComplete='off'
          // {...formik.getFieldProps('email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': email && (!validator.isEmail(email) || email.length < 13)},
            {
              'is-valid': email && (validator.isEmail(email) || email.length > 13),
            }
          )}
        />
        {email && (!validator.isEmail(email) || email.length < 13) && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>Invalid format</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Password */}
      <div className='mb-10 fv-row' data-kt-password-meter='true'>
        <div className='mb-1'>
          <label className='form-label fw-bolder text-dark fs-6'>Password</label>
          <div className='position-relative mb-3'>
            <input
              type='password'
              placeholder='Password'
              autoComplete='off'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': password && password.length < 6,
                },
                {
                  'is-valid': password && password.length >= 6,
                }
              )}
            />
            {password && password.length < 6 && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>Pasword should be at least 6 characters</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* end::Form group */}

      {/* begin::Form group Confirm password */}
      <div className='fv-row mb-5'>
        <label className='form-label fw-bolder text-dark fs-6'>Confirm Password</label>
        <input
          type='password'
          placeholder='Password confirmation'
          autoComplete='off'
          value={cpassword}
          onChange={(e) => setCPassword(e.target.value)}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': cpassword && password !== cpassword,
            },
            {
              'is-valid': cpassword && password === cpassword,
            }
          )}
        />
        {cpassword && password !== cpassword && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>Passwords do not match</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='text-center mt-10'>
        <button
          type='submit'
          id='kt_sign_up_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          onClick={handleRegister}
        >
          {!loading && <span className='indicator-label'>Submit</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Form group */}
    </form>
  )
}
