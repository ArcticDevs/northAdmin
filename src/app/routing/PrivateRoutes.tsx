import React, { Suspense, lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { FallbackView } from '../../_metronic/partials'
import { HomeForm } from '../pages/home/HomeForm'
import AboutForm from '../pages/about/AboutForm.jsx'
import ArchitectureForm from '../pages/architecture/ArchitectureForm.jsx'
import PropertyForm from '../pages/stay/PropertyForm.jsx'
import ExperienceForm from '../pages/experience/ExperienceForm.jsx'
import WorkshopForm from '../pages/workshop/WorkshopForm.jsx'
import LibraryForm from '../pages/library/LibraryForm.jsx'
import PressForm from '../pages/press/PressForm.jsx'
// import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import { MenuTestPage } from '../pages/MenuTestPage'
// import Test from '../pages/test'

export function PrivateRoutes() {
  const BuilderPageWrapper = lazy(() => import('../pages/layout-builder/BuilderPageWrapper'))
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        {/* <Route path='/test' component={Test} /> */}
        <Route path='/home' component={HomeForm} />
        <Route path='/about' component={AboutForm} />
        <Route path='/architecture' component={ArchitectureForm} />
        <Route path='/property' component={PropertyForm} />
        <Route path='/experience' component={ExperienceForm} />
        <Route path='/workshop' component={WorkshopForm} />
        <Route path='/library' component={LibraryForm} />
        <Route path='/press' component={PressForm} />
        {/* <Route path='/dashboard' component={DashboardWrapper} /> */}
        <Route path='/builder' component={BuilderPageWrapper} />
        <Route path='/crafted/pages/profile' component={ProfilePage} />
        <Route path='/crafted/pages/wizards' component={WizardsPage} />
        <Route path='/crafted/widgets' component={WidgetsPage} />
        <Route path='/crafted/account' component={AccountPage} />
        <Route path='/apps/chat' component={ChatPage} />
        <Route path='/menu-test' component={MenuTestPage} />
        <Redirect from='/auth/login' to='/home' />
        <Redirect from='/auth' to='/home' />
        <Redirect exact from='/' to='/home' />
        {/* <Redirect from='/auth' to='/dashboard' />
        <Redirect exact from='/' to='/dashboard' /> */}
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}
