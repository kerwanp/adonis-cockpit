import { defineConfig } from 'adonis-cockpit'

export default defineConfig({
  url: '/admin',
  menu: () => import('#cockpit/menu'),
  resources: [
    () => import('#cockpit/resources/user'),
    () => import('#cockpit/resources/brand'),
    () => import('#cockpit/resources/product'),
  ],
  auth: {
    loginUrl: '/login',
    logoutUrl: '/logout',
    user(ctx) {
      const user = ctx.auth.getUserOrFail()
      return {
        email: user.email,
        username: `${user.firstName} ${user.lastName}`,
      }
    },
  },
})
