/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as UnauthImport } from './routes/_unauth'
import { Route as AuthImport } from './routes/_auth'
import { Route as UnauthIndexImport } from './routes/_unauth/index'
import { Route as UnauthPricingImport } from './routes/_unauth/pricing'
import { Route as AuthDashboardIndexImport } from './routes/_auth/dashboard/index'
import { Route as AuthDashboardProfileImport } from './routes/_auth/dashboard/profile'

// Create/Update Routes

const UnauthRoute = UnauthImport.update({
  id: '/_unauth',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const UnauthIndexRoute = UnauthIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => UnauthRoute,
} as any)

const UnauthPricingRoute = UnauthPricingImport.update({
  id: '/pricing',
  path: '/pricing',
  getParentRoute: () => UnauthRoute,
} as any)

const AuthDashboardIndexRoute = AuthDashboardIndexImport.update({
  id: '/dashboard/',
  path: '/dashboard/',
  getParentRoute: () => AuthRoute,
} as any)

const AuthDashboardProfileRoute = AuthDashboardProfileImport.update({
  id: '/dashboard/profile',
  path: '/dashboard/profile',
  getParentRoute: () => AuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_unauth': {
      id: '/_unauth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof UnauthImport
      parentRoute: typeof rootRoute
    }
    '/_unauth/pricing': {
      id: '/_unauth/pricing'
      path: '/pricing'
      fullPath: '/pricing'
      preLoaderRoute: typeof UnauthPricingImport
      parentRoute: typeof UnauthImport
    }
    '/_unauth/': {
      id: '/_unauth/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof UnauthIndexImport
      parentRoute: typeof UnauthImport
    }
    '/_auth/dashboard/profile': {
      id: '/_auth/dashboard/profile'
      path: '/dashboard/profile'
      fullPath: '/dashboard/profile'
      preLoaderRoute: typeof AuthDashboardProfileImport
      parentRoute: typeof AuthImport
    }
    '/_auth/dashboard/': {
      id: '/_auth/dashboard/'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AuthDashboardIndexImport
      parentRoute: typeof AuthImport
    }
  }
}

// Create and export the route tree

interface AuthRouteChildren {
  AuthDashboardProfileRoute: typeof AuthDashboardProfileRoute
  AuthDashboardIndexRoute: typeof AuthDashboardIndexRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthDashboardProfileRoute: AuthDashboardProfileRoute,
  AuthDashboardIndexRoute: AuthDashboardIndexRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

interface UnauthRouteChildren {
  UnauthPricingRoute: typeof UnauthPricingRoute
  UnauthIndexRoute: typeof UnauthIndexRoute
}

const UnauthRouteChildren: UnauthRouteChildren = {
  UnauthPricingRoute: UnauthPricingRoute,
  UnauthIndexRoute: UnauthIndexRoute,
}

const UnauthRouteWithChildren =
  UnauthRoute._addFileChildren(UnauthRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof UnauthRouteWithChildren
  '/pricing': typeof UnauthPricingRoute
  '/': typeof UnauthIndexRoute
  '/dashboard/profile': typeof AuthDashboardProfileRoute
  '/dashboard': typeof AuthDashboardIndexRoute
}

export interface FileRoutesByTo {
  '': typeof AuthRouteWithChildren
  '/pricing': typeof UnauthPricingRoute
  '/': typeof UnauthIndexRoute
  '/dashboard/profile': typeof AuthDashboardProfileRoute
  '/dashboard': typeof AuthDashboardIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_auth': typeof AuthRouteWithChildren
  '/_unauth': typeof UnauthRouteWithChildren
  '/_unauth/pricing': typeof UnauthPricingRoute
  '/_unauth/': typeof UnauthIndexRoute
  '/_auth/dashboard/profile': typeof AuthDashboardProfileRoute
  '/_auth/dashboard/': typeof AuthDashboardIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '' | '/pricing' | '/' | '/dashboard/profile' | '/dashboard'
  fileRoutesByTo: FileRoutesByTo
  to: '' | '/pricing' | '/' | '/dashboard/profile' | '/dashboard'
  id:
    | '__root__'
    | '/_auth'
    | '/_unauth'
    | '/_unauth/pricing'
    | '/_unauth/'
    | '/_auth/dashboard/profile'
    | '/_auth/dashboard/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthRoute: typeof AuthRouteWithChildren
  UnauthRoute: typeof UnauthRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  AuthRoute: AuthRouteWithChildren,
  UnauthRoute: UnauthRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_auth",
        "/_unauth"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/dashboard/profile",
        "/_auth/dashboard/"
      ]
    },
    "/_unauth": {
      "filePath": "_unauth.tsx",
      "children": [
        "/_unauth/pricing",
        "/_unauth/"
      ]
    },
    "/_unauth/pricing": {
      "filePath": "_unauth/pricing.tsx",
      "parent": "/_unauth"
    },
    "/_unauth/": {
      "filePath": "_unauth/index.tsx",
      "parent": "/_unauth"
    },
    "/_auth/dashboard/profile": {
      "filePath": "_auth/dashboard/profile.tsx",
      "parent": "/_auth"
    },
    "/_auth/dashboard/": {
      "filePath": "_auth/dashboard/index.tsx",
      "parent": "/_auth"
    }
  }
}
ROUTE_MANIFEST_END */
