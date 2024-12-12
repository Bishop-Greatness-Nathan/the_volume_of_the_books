import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Books from "./pages/Books"
import CreateBook from "./pages/CreateBook"
import Chapters from "./pages/Chapters"
import CreateChapter from "./pages/CreateChapter"
import Verses from "./pages/Verses"
import CreateVerse from "./pages/CreateVerse"
import EditVerse from "./pages/EditVerse"
import EditChapter from "./pages/EditChapter"
import EditBook from "./pages/EditBook"
import Error from "./pages/Error"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Books />,
      },
      {
        path: "create-book",
        element: <CreateBook />,
      },
      {
        path: "books/:year",
        element: <Chapters />,
      },
      {
        path: "edit-book/:id",
        element: <EditBook />,
      },
      {
        path: "create-chapter",
        element: <CreateChapter />,
      },
      {
        path: "edit-chapter/:id",
        element: <EditChapter />,
      },
      {
        path: "verses/:id",
        element: <Verses />,
      },
      {
        path: "create-verse",
        element: <CreateVerse />,
      },
      {
        path: "edit-verse/:id",
        element: <EditVerse />,
      },
    ],
  },
])
function App() {
  return <RouterProvider router={router} />
}

export default App
