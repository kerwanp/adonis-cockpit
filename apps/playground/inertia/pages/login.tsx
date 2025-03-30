import { Button } from '@adonis-cockpit/react/components/ui/button'
import { Input } from '@adonis-cockpit/react/components/ui/input'
import { Label } from '@adonis-cockpit/react/components/ui/label'
import { router } from '@inertiajs/react'
import { useForm } from '@tanstack/react-form'

export default function Page() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit({ value }) {
      router.post('/login', value)
    },
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    e.stopPropagation()
    form.handleSubmit()
  }

  return (
    <div className="h-screen w-screen flex flex-col gap-4 justify-center items-center bg-muted">
      <div className="p-4">
        <img className="h-16" src="https://adonis-cockpit.com/logo-horizontal.png" />
      </div>
      <div className="bg-card text-card-foreground rounded-lg max-w-[400px]">
        <div className="flex flex-col space-y-1.5 p-6 text-center">
          <div className="font-semibold tracking-tight text-xl">Welcome back</div>
          <div className="text-sm text-muted-foreground">
            You can authenticate with{' '}
            <span className="font-semibold text-nowrap">demo@adonis-cockpit.com/password</span>
          </div>
        </div>
        <div className="p-6">
          <form className="grid gap-6" onSubmit={handleSubmit}>
            <form.Field name="email">
              {(field) => (
                <div className="grid gap-2">
                  <Label htmlFor={field.name}>Email</Label>
                  <Input
                    autoFocus
                    id={field.name}
                    name={field.name}
                    type="email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="demo@adonis-cockpit.com"
                  />
                </div>
              )}
            </form.Field>
            <form.Field name="password">
              {(field) => (
                <div className="grid gap-2">
                  <Label htmlFor={field.name}>Password</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="password"
                  />
                </div>
              )}
            </form.Field>
            <Button type="submit">Login</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
