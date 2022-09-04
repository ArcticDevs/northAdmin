/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import * as auth from '../redux/AuthRedux'
import {login} from '../redux/AuthCRUD'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {loginUser} from '../../../ApiCalls/UserApiCalls'
import validator from 'validator'
import Swal from 'sweetalert2'
import {useHistory} from 'react-router-dom'

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const initialValues = {
  email: '',
  password: '',
}

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      setTimeout(() => {
        // login(values.email, values.password)
        //   .then(({data: {accessToken}}) => {
        //     setLoading(false)
        //     dispatch(auth.actions.login(accessToken))
        //   })
        //   .catch(() => {
        //     setLoading(false)
        //     setSubmitting(false)
        //     setStatus('The login detail is incorrect')
        //   })
      }, 1000)
    },
  })

  let history = useHistory()

  const handleLogin = async () => {
    try {
      setLoading(true)

      const res = await loginUser(email, password)

      if (res && res.status === 201) {
        setLoading(false)

        localStorage.setItem('userDetails', JSON.stringify(res.data.user))

        Swal.fire({
          title: `User Logged In Succesfully`,
          icon: 'success',
          confirmButtonText: 'Close',
          timer: 2000,
        }).then(() => {
          window.location.reload()
          history.push('/home')
        })
      } else {
        setLoading(false)

        Swal.fire({
          title: 'An error occured , Please try again',
          icon: 'error',
          confirmButtonText: 'Close',
          timer: 2000,
        })
      }
    } catch (error) {
      setLoading(false)

      Swal.fire({
        title: 'An error occured , Please try again',
        icon: 'error',
        confirmButtonText: 'Close',
        timer: 2000,
      })
    }
  }

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}
      <div className='text-center mb-10'>
        <h1 className='text-dark mb-3'>Sign In to North Admin Panel</h1>
        <div className='text-gray-400 fw-bold fs-4'>
          New Here?{' '}
          <Link to='/auth/registration' className='link-primary fw-bolder'>
            Create an Account
          </Link>
        </div>
      </div>
      {/* begin::Heading */}

      {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <label className='form-label fs-6 fw-bolder text-dark'>Email</label>
        <input
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': email && (!validator.isEmail(email) || email.length < 13)},
            {
              'is-valid': email && (validator.isEmail(email) || email.length > 13),
            }
          )}
          type='email'
          name='email'
          autoComplete='off'
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

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <div className='d-flex justify-content-between mt-n5'>
          <div className='d-flex flex-stack mb-2'>
            {/* begin::Label */}
            <label className='form-label fw-bolder text-dark fs-6 mb-0'>Password</label>
            {/* end::Label */}
            {/* begin::Link */}
            {/* <Link
              to='/auth/forgot-password'
              className='link-primary fs-6 fw-bolder'
              style={{marginLeft: '5px'}}
            >
              Forgot Password ?
            </Link> */}
            {/* end::Link */}
          </div>
        </div>
        <input
          type='password'
          autoComplete='off'
          placeholder='Password'
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
      {/* end::Form group */}

      {/* begin::Action */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          onClick={handleLogin}
        >
          {!loading && <span className='indicator-label'>Login</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>

        {/* begin::Separator */}
        {/* <div className='text-center text-muted text-uppercase fw-bolder mb-5'>or</div> */}
        {/* end::Separator */}

        {/* begin::Google link */}
        {/* <a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100 mb-5'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/svg/brand-logos/google-icon.svg')}
            className='h-20px me-3'
          />
          Continue with Google
        </a> */}
        {/* end::Google link */}

        {/* begin::Google link */}
        {/* <a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100 mb-5'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/svg/brand-logos/facebook-4.svg')}
            className='h-20px me-3'
          />
          Continue with Facebook
        </a> */}
        {/* end::Google link */}

        {/* begin::Google link */}
        {/* <a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/svg/brand-logos/apple-black.svg')}
            className='h-20px me-3'
          />
          Continue with Apple
        </a> */}
        {/* end::Google link */}
      </div>
      {/* end::Action */}
    </form>
  )
}
