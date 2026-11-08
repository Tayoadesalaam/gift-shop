import { createBrowserRouter } from "react-router"
import { AdminLayout, PublicLayout } from "../components/Layout"

const lazyPage = async (modulePath: string, exportName: string) => {
  const module = await import(modulePath)
  return { Component: module[exportName as keyof typeof module] }
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PublicLayout,
    children: [
      {
        index: true,
        lazy: async () => lazyPage("../pages/public/HomePage", "default"),
      },
      {
        path: "create-gift",
        lazy: async () => {
          const { default: Component } = await import(
            "../features/gift-request/CreateGiftPage"
          )
          return { Component }
        },
      },
      {
        path: "request-success",
        lazy: async () => lazyPage("../pages/public/RequestSuccessPage", "default"),
      },
      {
        path: "our-creations",
        lazy: async () => lazyPage("../pages/public/CreationsPage", "default"),
      },
      {
        path: "about",
        lazy: async () => lazyPage("../pages/public/AboutPage", "default"),
      },
      {
        path: "faqs",
        lazy: async () => lazyPage("../pages/public/FaqPage", "default"),
      },
      {
        path: "contact",
        lazy: async () => lazyPage("../pages/public/ContactPage", "default"),
      },
      {
        path: "privacy",
        lazy: async () => lazyPage("../pages/public/LegalPage", "PrivacyPage"),
      },
      {
        path: "terms",
        lazy: async () => lazyPage("../pages/public/LegalPage", "TermsPage"),
      },
      {
        path: "*",
        lazy: async () => lazyPage("../pages/public/NotFoundPage", "default"),
      },
    ],
  },
  {
    path: "/admin/login",
    lazy: async () => lazyPage("../pages/admin/AdminLoginPage", "default"),
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      {
        index: true,
        lazy: async () => lazyPage("../pages/admin/AdminDashboardPage", "default"),
      },
      {
        path: "requests",
        lazy: async () => lazyPage("../pages/admin/AdminRequestsPage", "default"),
      },
      {
        path: "requests/:id",
        lazy: async () =>
          lazyPage("../pages/admin/AdminRequestDetailPage", "default"),
      },
      {
        path: "portfolio",
        lazy: async () => lazyPage("../pages/admin/AdminPortfolioPage", "default"),
      },
      {
        path: "faqs",
        lazy: async () => lazyPage("../pages/admin/AdminFaqPage", "default"),
      },
      {
        path: "messages",
        lazy: async () => lazyPage("../pages/admin/AdminMessagesPage", "default"),
      },
      {
        path: "settings",
        lazy: async () => lazyPage("../pages/admin/AdminSettingsPage", "default"),
      },
    ],
  },
])
