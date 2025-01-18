import DashboardLayout from '@/components/layout/dashboard-layout'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <React.Fragment>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </React.Fragment>
  )
}
