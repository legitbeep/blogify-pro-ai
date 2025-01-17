import AppLayout from '@/components/layout/app-layout'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/_unauth')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <React.Fragment>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </React.Fragment>
  )
}
