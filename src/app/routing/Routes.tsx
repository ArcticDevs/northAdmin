/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React, {FC, useEffect, useState} from 'react'
import {Redirect, Switch, Route} from 'react-router-dom'
import {shallowEqual, useSelector} from 'react-redux'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import {PrivateRoutes} from './PrivateRoutes'
import {Logout, AuthPage} from '../modules/auth'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {RootState} from '../../setup'
import {useHistory} from 'react-router-dom'


const Routes: FC = () => {
  // const isAuthorized = useSelector<RootState>(({auth}) => auth.user, shallowEqual)

  const [isAuthorized, setIsAuthorized] = useState<any>()
  let history = useHistory()


  useEffect(() => {
    if (localStorage.getItem('userDetails')) {
      setIsAuthorized(true)
      history.push('/home')
    } else {
      setIsAuthorized(false)
      history.push('/auth/login')
    }
  }, [localStorage.getItem('userDetails')])

  return (
    <Switch>
      {isAuthorized ? (
        <>
          <Route path='/error' component={ErrorsPage} />
          <Route path='/logout' component={Logout} />

          <MasterLayout>
            <PrivateRoutes />
          </MasterLayout>
        </>
      ) : (
        <Route>
          <AuthPage />
        </Route>
      )}
    </Switch>
  )
}

export {Routes}
