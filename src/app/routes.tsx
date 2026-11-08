import type { ComponentType } from "react"
import { createBrowserRouter } from "react-router"
import { AdminLayout, PublicLayout } from "../components/Layout"

const lazyPage = async (loadComponent: () => Promise<ComponentType>) => ({
  Component: await loadComponent(),
})

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PublicLayout,
    children: [
      {
        index: true,
        lazy: () =>
          lazyPage(() =>
            import("../pages/public/HomePage").then(({ default: Page }) => Page),
          ),
      },
      {
        path: "create-gift",
        lazy: () =>
          lazyPage(() =>
            import("../features/gift-request/CreateGiftPage").then(
              ({ default: Page }) => Page,
            ),
          ),
      },
      {
        path: "request-success",
        lazy: () =>
          lazyPage(() =>
            import("../pages/public/RequestSuccessPage").then(
              ({ default: Page }) => Page,
            ),
          ),
      },
      {
        path: "our-creations",
        lazy: () =>
          lazyPage(() =>
            import("../pages/public/CreationsPage").then(
              ({ default: Page }) => Page,
            ),
          ),
      },
      {
        path: "about",
        lazy: () =>
          lazyPage(() =>
            import("../pages/public/AboutPage").then(
              ({ default: Page }) => Page,
            ),
          ),
      },
      {
        path: "faqs",
        lazy: () =>
          lazyPage(() =>
            import("../pages/public/FaqPage").then(({ default: Page }) => Page),
          ),
      },
      {
        path: "contact",
        lazy: () =>
          lazyPage(() =>
            import("../pages/public/ContactPage").then(
              ({ default: Page }) => Page,
            ),
          ),
      },
      {
        path: "privacy",
        lazy: () =>
          lazyPage(() =>
            import("../pages/public/LegalPage").then(
              ({ PrivacyPage }) => PrivacyPage,
            ),
          ),
      },
      {
        path: "terms",
        lazy: () =>
          lazyPage(() =>
            import("../pages/public/LegalPage").then(
              ({ TermsPage }) => TermsPage,
            ),
          ),
      },
      {
        path: "*",
        lazy: () =>
          lazyPage(() =>
            import("../pages/public/NotFoundPage").then(
              ({ default: Page }) => Page,
            ),
          ),
      },
    ],
  },
  {
    path: "/admin/login",
    lazy: () =>
      lazyPage(() =>
        import("../pages/admin/AdminLoginPage").then(
          ({ default: Page }) => Page,
        ),
      ),
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      {
        index: true,
        lazy: () =>
          lazyPage(() =>
            import("../pages/admin/AdminDashboardPage").then(
              ({ default: Page }) => Page,
            ),
          ),
      },
      {
        path: "requests",
        lazy: () =>
          lazyPage(() =>
            import("../pages/admin/AdminRequestsPage").then(
              ({ default: Page }) => Page,
            ),
          ),
      },
      {
        path: "requests/:id",
        lazy: () =>
          lazyPage(() =>
            import("../pages/admin/AdminRequestDetailPage").then(
              ({ default: Page }) => Page,
            ),
          ),
      },
      {
        path: "portfolio",
        lazy: () =>
          lazyPage(() =>
            import("../pages/admin/AdminPortfolioPage").then(
              ({ default: Page }) => Page,
            ),
          ),
      },
      {
        path: "faqs",
        lazy: () =>
          lazyPage(() =>
            import("../pages/admin/AdminFaqPage").then(
              ({ default: Page }) => Page,
            ),
          ),
      },
      {
        path: "messages",
        lazy: () =>
          lazyPage(() =>
            import("../pages/admin/AdminMessagesPage").then(
              ({ default: Page }) => Page,
            ),
          ),
      },
      {
        path: "settings",
        lazy: () =>
          lazyPage(() =>
            import("../pages/admin/AdminSettingsPage").then(
              ({ default: Page }) => Page,
            ),
          ),
      },
    ],
  },
])
