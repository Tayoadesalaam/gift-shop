import { createBrowserRouter } from "react-router"
import { AdminLayout, PublicLayout } from "../components/Layout"

const publicPage = (name: string) => async () => {
  const pages = await import("../pages/PublicPages")
  return { Component: pages[(name as keyof typeof pages)] }
}

const adminPage = (name: string) => async () => {
  const pages = await import("../pages/AdminPages")
  return { Component: pages[(name as keyof typeof pages)] }
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PublicLayout,
    children: [
      { index: true, lazy: publicPage("HomePage") },
      {
        path: "create-gift",
        lazy: async () => {
          const { default: Component } = await import(
            "../features/gift-request/CreateGiftPage"
          )
          return { Component }
        },
      },
      { path: "request-success", lazy: publicPage("RequestSuccessPage") },
      { path: "our-creations", lazy: publicPage("CreationsPage") },
      { path: "about", lazy: publicPage("AboutPage") },
      { path: "faqs", lazy: publicPage("FaqPage") },
      { path: "contact", lazy: publicPage("ContactPage") },
      { path: "privacy", lazy: publicPage("PrivacyPage") },
      { path: "terms", lazy: publicPage("TermsPage") },
      { path: "*", lazy: publicPage("NotFoundPage") },
    ],
  },
  { path: "/admin/login", lazy: adminPage("AdminLoginPage") },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, lazy: adminPage("AdminDashboardPage") },
      { path: "requests", lazy: adminPage("AdminRequestsPage") },
      { path: "requests/:id", lazy: adminPage("AdminRequestDetailPage") },
      { path: "portfolio", lazy: adminPage("AdminPortfolioPage") },
      { path: "faqs", lazy: adminPage("AdminFaqPage") },
      { path: "messages", lazy: adminPage("AdminMessagesPage") },
      { path: "settings", lazy: adminPage("AdminSettingsPage") },
    ],
  },
])
