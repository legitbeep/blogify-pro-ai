import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/dashboard/$blogId/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/dashboard/$blogId/edit"!</div>
}
