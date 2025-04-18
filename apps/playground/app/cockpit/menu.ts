/* eslint-disable @typescript-eslint/no-shadow */
import { menu } from 'adonis-cockpit/menu'
import cockpit from 'adonis-cockpit/services/main'

export default menu
  .content((menu) => {
    menu.group((group) => {
      group.item('Dashboard').icon('fa-solid fa-house').route('cockpit.home')
    })

    menu
      .group((group) => {
        for (const resource of Object.values(cockpit.getResources())) {
          group.resource(resource)
        }
      })
      .label('Resources')
  })
  .footer((menu) => {
    menu.group((group) => {
      group
        .item('Give a star!')
        .icon('fas fa-star')
        .href('https://github.com/kerwanp/adonis-cockpit')
        .target('_blank')
      group
        .item('AdonisJS')
        .icon('fas fa-arrow-up-right-from-square')
        .href('https://adonisjs.com')
        .target('_blank')
      group
        .item('FriendsOfAdonis')
        .icon('fas fa-arrow-up-right-from-square')
        .href('https://friendsofadonis.com')
        .target('_blank')
    })
  })
