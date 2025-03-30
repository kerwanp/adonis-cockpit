/* eslint-disable @typescript-eslint/no-shadow */
import { menu } from 'adonis-cockpit/menu'
import UserResource from './resources/user.js'
import BrandResource from './resources/brand.js'
import ProductResource from './resources/product.js'

export default menu
  .content((menu) => {
    menu.group((group) => {
      group.item('Dashboard').icon('fa-solid fa-house').href('/admin')
    })

    menu
      .group((group) => {
        group.resource(UserResource)
        group.resource(BrandResource)
        group.resource(ProductResource)
        group
          .item('Orders')
          .icon('fas fa-cart-shopping')
          .submenu((submenu) => {
            submenu.item('Products').icon('fas fa-warehouse')
            submenu.item('Categories').icon('fas fa-list')
            submenu.item('Tags').icon('fas fa-tag')
          })
          .collapsible()
      })
      .label('Resources')
  })
  .footer((menu) => {
    menu
      .group((group) => {
        group.item('Billing').icon('fas fa-wallet')
        group.item('Preferences').icon('fas fa-gears')
      })
      .label('Settings')
  })
