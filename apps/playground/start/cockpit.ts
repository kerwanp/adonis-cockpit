import cockpit from 'adonis-cockpit/services/main'
import BrandResource from '../app/cockpit/resources/brand.js'
import UserResource from '../app/cockpit/resources/user.js'
import ProductResource from '../app/cockpit/resources/product.js'

cockpit.resources(BrandResource, UserResource, ProductResource)

cockpit.sidebar
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
