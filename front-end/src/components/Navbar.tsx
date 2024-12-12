import { Link } from "react-router-dom"

function Navbar() {
  return (
    <main className='w-full'>
      <div className='text-center capitalize text-[var(--primaryColor)] font-semibold text-xs md:text-base'>
        <Link to='/'>Books</Link> | <Link to='/create-book'>new book</Link> |{" "}
        <Link to='/create-chapter'>new chapter</Link> |{" "}
        <Link to='/create-verse'>new verse</Link>
      </div>
    </main>
  )
}

export default Navbar
