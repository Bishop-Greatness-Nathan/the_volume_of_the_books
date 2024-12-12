import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Logo from "../components/Logo"

function HomePage() {
  return (
    <main>
      <div className='flex items-center p-1'>
        <Logo />
        <Navbar />
      </div>
      <Outlet />
    </main>
  )
}

export default HomePage
