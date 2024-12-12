import { createRoot } from "react-dom/client"
import "./index.css"
import "react-toastify/dist/ReactToastify.css"
import App from "./App"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ToastContainer } from "react-toastify"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})

createRoot(document.getElementById("root")!).render(
  <>
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer position='top-center' />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </>
)
