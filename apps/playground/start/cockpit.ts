import cockpit from 'adonis-cockpit/services/main'
import BrandResource from '../app/cockpit/resources/brand.js'
import UserResource from '../app/cockpit/resources/user.js'

cockpit.resources(BrandResource, UserResource)
