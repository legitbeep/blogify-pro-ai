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
import { Route as AuthDashboardPreviewImport } from './routes/_auth/dashboard/preview'
import { Route as AuthDashboardMyDraftsImport } from './routes/_auth/dashboard/my-drafts'
import { Route as AuthDashboardAnalyticsImport } from './routes/_auth/dashboard/analytics'
import { Route as AuthDashboardChatChatIdImport } from './routes/_auth/dashboard/chat/$chatId'
import { Route as AuthDashboardBlogIdEditImport } from './routes/_auth/dashboard/$blogId.edit'

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

const AuthDashboardPreviewRoute = AuthDashboardPreviewImport.update({
  id: '/dashboard/preview',
  path: '/dashboard/preview',
  getParentRoute: () => AuthRoute,
} as any)

const AuthDashboardMyDraftsRoute = AuthDashboardMyDraftsImport.update({
  id: '/dashboard/my-drafts',
  path: '/dashboard/my-drafts',
  getParentRoute: () => AuthRoute,
} as any)

const AuthDashboardAnalyticsRoute = AuthDashboardAnalyticsImport.update({
  id: '/dashboard/analytics',
  path: '/dashboard/analytics',
  getParentRoute: () => AuthRoute,
} as any)

const AuthDashboardChatChatIdRoute = AuthDashboardChatChatIdImport.update({
  id: '/dashboard/chat/$chatId',
  path: '/dashboard/chat/$chatId',
  getParentRoute: () => AuthRoute,
} as any)

const AuthDashboardBlogIdEditRoute = AuthDashboardBlogIdEditImport.update({
  id: '/dashboard/$blogId/edit',
  path: '/dashboard/$blogId/edit',
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
    '/_auth/dashboard/analytics': {
      id: '/_auth/dashboard/analytics'
      path: '/dashboard/analytics'
      fullPath: '/dashboard/analytics'
      preLoaderRoute: typeof AuthDashboardAnalyticsImport
      parentRoute: typeof AuthImport
    }
    '/_auth/dashboard/my-drafts': {
      id: '/_auth/dashboard/my-drafts'
      path: '/dashboard/my-drafts'
      fullPath: '/dashboard/my-drafts'
      preLoaderRoute: typeof AuthDashboardMyDraftsImport
      parentRoute: typeof AuthImport
    }
    '/_auth/dashboard/preview': {
      id: '/_auth/dashboard/preview'
      path: '/dashboard/preview'
      fullPath: '/dashboard/preview'
      preLoaderRoute: typeof AuthDashboardPreviewImport
      parentRoute: typeof AuthImport
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
    '/_auth/dashboard/$blogId/edit': {
      id: '/_auth/dashboard/$blogId/edit'
      path: '/dashboard/$blogId/edit'
      fullPath: '/dashboard/$blogId/edit'
      preLoaderRoute: typeof AuthDashboardBlogIdEditImport
      parentRoute: typeof AuthImport
    }
    '/_auth/dashboard/chat/$chatId': {
      id: '/_auth/dashboard/chat/$chatId'
      path: '/dashboard/chat/$chatId'
      fullPath: '/dashboard/chat/$chatId'
      preLoaderRoute: typeof AuthDashboardChatChatIdImport
      parentRoute: typeof AuthImport
    }
  }
}

// Create and export the route tree

interface AuthRouteChildren {
  AuthDashboardAnalyticsRoute: typeof AuthDashboardAnalyticsRoute
  AuthDashboardMyDraftsRoute: typeof AuthDashboardMyDraftsRoute
  AuthDashboardPreviewRoute: typeof AuthDashboardPreviewRoute
  AuthDashboardProfileRoute: typeof AuthDashboardProfileRoute
  AuthDashboardIndexRoute: typeof AuthDashboardIndexRoute
  AuthDashboardBlogIdEditRoute: typeof AuthDashboardBlogIdEditRoute
  AuthDashboardChatChatIdRoute: typeof AuthDashboardChatChatIdRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthDashboardAnalyticsRoute: AuthDashboardAnalyticsRoute,
  AuthDashboardMyDraftsRoute: AuthDashboardMyDraftsRoute,
  AuthDashboardPreviewRoute: AuthDashboardPreviewRoute,
  AuthDashboardProfileRoute: AuthDashboardProfileRoute,
  AuthDashboardIndexRoute: AuthDashboardIndexRoute,
  AuthDashboardBlogIdEditRoute: AuthDashboardBlogIdEditRoute,
  AuthDashboardChatChatIdRoute: AuthDashboardChatChatIdRoute,
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
  '/dashboard/analytics': typeof AuthDashboardAnalyticsRoute
  '/dashboard/my-drafts': typeof AuthDashboardMyDraftsRoute
  '/dashboard/preview': typeof AuthDashboardPreviewRoute
  '/dashboard/profile': typeof AuthDashboardProfileRoute
  '/dashboard': typeof AuthDashboardIndexRoute
  '/dashboard/$blogId/edit': typeof AuthDashboardBlogIdEditRoute
  '/dashboard/chat/$chatId': typeof AuthDashboardChatChatIdRoute
}

export interface FileRoutesByTo {
  '': typeof AuthRouteWithChildren
  '/pricing': typeof UnauthPricingRoute
  '/': typeof UnauthIndexRoute
  '/dashboard/analytics': typeof AuthDashboardAnalyticsRoute
  '/dashboard/my-drafts': typeof AuthDashboardMyDraftsRoute
  '/dashboard/preview': typeof AuthDashboardPreviewRoute
  '/dashboard/profile': typeof AuthDashboardProfileRoute
  '/dashboard': typeof AuthDashboardIndexRoute
  '/dashboard/$blogId/edit': typeof AuthDashboardBlogIdEditRoute
  '/dashboard/chat/$chatId': typeof AuthDashboardChatChatIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_auth': typeof AuthRouteWithChildren
  '/_unauth': typeof UnauthRouteWithChildren
  '/_unauth/pricing': typeof UnauthPricingRoute
  '/_unauth/': typeof UnauthIndexRoute
  '/_auth/dashboard/analytics': typeof AuthDashboardAnalyticsRoute
  '/_auth/dashboard/my-drafts': typeof AuthDashboardMyDraftsRoute
  '/_auth/dashboard/preview': typeof AuthDashboardPreviewRoute
  '/_auth/dashboard/profile': typeof AuthDashboardProfileRoute
  '/_auth/dashboard/': typeof AuthDashboardIndexRoute
  '/_auth/dashboard/$blogId/edit': typeof AuthDashboardBlogIdEditRoute
  '/_auth/dashboard/chat/$chatId': typeof AuthDashboardChatChatIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/pricing'
    | '/'
    | '/dashboard/analytics'
    | '/dashboard/my-drafts'
    | '/dashboard/preview'
    | '/dashboard/profile'
    | '/dashboard'
    | '/dashboard/$blogId/edit'
    | '/dashboard/chat/$chatId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/pricing'
    | '/'
    | '/dashboard/analytics'
    | '/dashboard/my-drafts'
    | '/dashboard/preview'
    | '/dashboard/profile'
    | '/dashboard'
    | '/dashboard/$blogId/edit'
    | '/dashboard/chat/$chatId'
  id:
    | '__root__'
    | '/_auth'
    | '/_unauth'
    | '/_unauth/pricing'
    | '/_unauth/'
    | '/_auth/dashboard/analytics'
    | '/_auth/dashboard/my-drafts'
    | '/_auth/dashboard/preview'
    | '/_auth/dashboard/profile'
    | '/_auth/dashboard/'
    | '/_auth/dashboard/$blogId/edit'
    | '/_auth/dashboard/chat/$chatId'
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
        "/_auth/dashboard/analytics",
        "/_auth/dashboard/my-drafts",
        "/_auth/dashboard/preview",
        "/_auth/dashboard/profile",
        "/_auth/dashboard/",
        "/_auth/dashboard/$blogId/edit",
        "/_auth/dashboard/chat/$chatId"
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
    "/_auth/dashboard/analytics": {
      "filePath": "_auth/dashboard/analytics.tsx",
      "parent": "/_auth"
    },
    "/_auth/dashboard/my-drafts": {
      "filePath": "_auth/dashboard/my-drafts.tsx",
      "parent": "/_auth"
    },
    "/_auth/dashboard/preview": {
      "filePath": "_auth/dashboard/preview.tsx",
      "parent": "/_auth"
    },
    "/_auth/dashboard/profile": {
      "filePath": "_auth/dashboard/profile.tsx",
      "parent": "/_auth"
    },
    "/_auth/dashboard/": {
      "filePath": "_auth/dashboard/index.tsx",
      "parent": "/_auth"
    },
    "/_auth/dashboard/$blogId/edit": {
      "filePath": "_auth/dashboard/$blogId.edit.tsx",
      "parent": "/_auth"
    },
    "/_auth/dashboard/chat/$chatId": {
      "filePath": "_auth/dashboard/chat/$chatId.tsx",
      "parent": "/_auth"
    }
  }
}
ROUTE_MANIFEST_END */
