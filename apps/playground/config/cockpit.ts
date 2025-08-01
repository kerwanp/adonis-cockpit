import { defineConfig } from 'adonis-cockpit'

export default defineConfig({
  url: '/admin',
  menu: () => import('#cockpit/menu'),
  resources: {
    autoload: true,
  },
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
