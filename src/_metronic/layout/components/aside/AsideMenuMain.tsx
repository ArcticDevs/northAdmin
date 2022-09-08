/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {KTSVG} from '../../../helpers'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
    <AsideMenuItem
        to='/test'
        icon='/media/icons/duotune/general/gen001.svg'
        title='Test Page'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        to='/home'
        icon='/media/icons/duotune/general/gen001.svg'
        title='Home Page'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        to='/about'
        // icon='/media/icons/duotune/general/gen019.svg'
        title='About Page'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        to='/architecture'
        // icon='/media/icons/duotune/general/gen019.svg'
        title='Architecture Page'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        to='/property'
        // icon='/media/icons/duotune/general/gen019.svg'
        title='Stay/Property Page'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        to='/experience'
        // icon='/media/icons/duotune/general/gen019.svg'
        title='Experience Page'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        to='/workshop'
        // icon='/media/icons/duotune/general/gen019.svg'
        title='Workshop Page'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        to='/library'
        icon='/media/icons/duotune/general/gen054.svg'
        title='Library Page'
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        to='/press'
        // icon='/media/icons/duotune/general/gen019.svg'
        title='Press Page'
        fontIcon='bi-layers'
      />
    </>
  )
}
