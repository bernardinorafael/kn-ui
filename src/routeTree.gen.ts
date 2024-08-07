/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as DashboardImport } from './routes/_dashboard'
import { Route as AuthImport } from './routes/_auth'
import { Route as IndexImport } from './routes/index'
import { Route as DashboardProfileImport } from './routes/_dashboard.profile'
import { Route as AuthRegisterImport } from './routes/_auth.register'
import { Route as AuthLoginImport } from './routes/_auth.login'
import { Route as DashboardTeamsIndexImport } from './routes/_dashboard.teams.index'
import { Route as DashboardProductsIndexImport } from './routes/_dashboard.products.index'
import { Route as AuthOtpIndexImport } from './routes/_auth.otp.index'
import { Route as DashboardProfilePasswordImport } from './routes/_dashboard.profile.password'
import { Route as DashboardProfileEditImport } from './routes/_dashboard.profile.edit'
import { Route as DashboardProfileActivateImport } from './routes/_dashboard.profile.activate'
import { Route as DashboardProductsNewImport } from './routes/_dashboard.products.new'
import { Route as DashboardProductsIdImport } from './routes/_dashboard.products.$id'
import { Route as AuthOtpVerifyImport } from './routes/_auth.otp.verify'

// Create/Update Routes

const DashboardRoute = DashboardImport.update({
  id: '/_dashboard',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const DashboardProfileRoute = DashboardProfileImport.update({
  path: '/profile',
  getParentRoute: () => DashboardRoute,
} as any)

const AuthRegisterRoute = AuthRegisterImport.update({
  path: '/register',
  getParentRoute: () => AuthRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  path: '/login',
  getParentRoute: () => AuthRoute,
} as any)

const DashboardTeamsIndexRoute = DashboardTeamsIndexImport.update({
  path: '/teams/',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardProductsIndexRoute = DashboardProductsIndexImport.update({
  path: '/products/',
  getParentRoute: () => DashboardRoute,
} as any)

const AuthOtpIndexRoute = AuthOtpIndexImport.update({
  path: '/otp/',
  getParentRoute: () => AuthRoute,
} as any)

const DashboardProfilePasswordRoute = DashboardProfilePasswordImport.update({
  path: '/password',
  getParentRoute: () => DashboardProfileRoute,
} as any)

const DashboardProfileEditRoute = DashboardProfileEditImport.update({
  path: '/edit',
  getParentRoute: () => DashboardProfileRoute,
} as any)

const DashboardProfileActivateRoute = DashboardProfileActivateImport.update({
  path: '/activate',
  getParentRoute: () => DashboardProfileRoute,
} as any)

const DashboardProductsNewRoute = DashboardProductsNewImport.update({
  path: '/products/new',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardProductsIdRoute = DashboardProductsIdImport.update({
  path: '/products/$id',
  getParentRoute: () => DashboardRoute,
} as any)

const AuthOtpVerifyRoute = AuthOtpVerifyImport.update({
  path: '/otp/verify',
  getParentRoute: () => AuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_dashboard': {
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/_auth/login': {
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof AuthImport
    }
    '/_auth/register': {
      preLoaderRoute: typeof AuthRegisterImport
      parentRoute: typeof AuthImport
    }
    '/_dashboard/profile': {
      preLoaderRoute: typeof DashboardProfileImport
      parentRoute: typeof DashboardImport
    }
    '/_auth/otp/verify': {
      preLoaderRoute: typeof AuthOtpVerifyImport
      parentRoute: typeof AuthImport
    }
    '/_dashboard/products/$id': {
      preLoaderRoute: typeof DashboardProductsIdImport
      parentRoute: typeof DashboardImport
    }
    '/_dashboard/products/new': {
      preLoaderRoute: typeof DashboardProductsNewImport
      parentRoute: typeof DashboardImport
    }
    '/_dashboard/profile/activate': {
      preLoaderRoute: typeof DashboardProfileActivateImport
      parentRoute: typeof DashboardProfileImport
    }
    '/_dashboard/profile/edit': {
      preLoaderRoute: typeof DashboardProfileEditImport
      parentRoute: typeof DashboardProfileImport
    }
    '/_dashboard/profile/password': {
      preLoaderRoute: typeof DashboardProfilePasswordImport
      parentRoute: typeof DashboardProfileImport
    }
    '/_auth/otp/': {
      preLoaderRoute: typeof AuthOtpIndexImport
      parentRoute: typeof AuthImport
    }
    '/_dashboard/products/': {
      preLoaderRoute: typeof DashboardProductsIndexImport
      parentRoute: typeof DashboardImport
    }
    '/_dashboard/teams/': {
      preLoaderRoute: typeof DashboardTeamsIndexImport
      parentRoute: typeof DashboardImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  AuthRoute.addChildren([
    AuthLoginRoute,
    AuthRegisterRoute,
    AuthOtpVerifyRoute,
    AuthOtpIndexRoute,
  ]),
  DashboardRoute.addChildren([
    DashboardProfileRoute.addChildren([
      DashboardProfileActivateRoute,
      DashboardProfileEditRoute,
      DashboardProfilePasswordRoute,
    ]),
    DashboardProductsIdRoute,
    DashboardProductsNewRoute,
    DashboardProductsIndexRoute,
    DashboardTeamsIndexRoute,
  ]),
])

/* prettier-ignore-end */
