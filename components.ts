const pages: Record<string, () => any> = {
  'home': () => import('@foadonis/cockpit/inertia/pages/home.vue'),
  'resources/edit': () => import('@foadonis/cockpit/inertia/pages/resources/edit.vue'),
  'resources/create': () => import('@foadonis/cockpit/inertia/pages/resources/create.vue'),
  'resources/index': () => import('@foadonis/cockpit/inertia/pages/resources/index.vue'),
}

export function resolveSSRPage(name: string) {
  if (name.startsWith('admin:')) {
    const strippedName = name.replace('admin:', '')
    return pages[strippedName]()
  }
}

export function resolvePage(name: string) {
  if (name.startsWith('admin:')) {
    const strippedName = name.replace('admin:', '')
    return pages[strippedName]()
  }
}
