import { Link } from "react-router-dom"
import { useDeleteBook, useGetBooks } from "../queries/books"
import { BookType } from "../utils/types"
import { FaEdit } from "react-icons/fa"
import { FaTrash } from "react-icons/fa6"
import Loading from "../components/Loading"

function Books() {
  const { data, isLoading, isError } = useGetBooks()

  const { mutate } = useDeleteBook()

  if (isError) return <h2 className='text-center'>There was an error</h2>

  return (
    <div>
      <h1 className='text-center uppercase text-[var(--primaryColor)] font-serif'>
        The volume of the books
      </h1>
      <p className='text-center italic text-[var(--primaryColor)] mb-1 text-sm md:text-base'>
        {"("}The things that belong to our peace{")"}
      </p>
      <p className='text-center md:w-[50%] m-auto italic text-[var(--primaryText)] px-1 text-xs md:text-base'>
        "Timothy, my child, I entrust to you this command, which is in
        accordance with the words of prophecy spoken in the past about you. Use
        those words as weapons in order to fight well"
      </p>
      <p className='text-right md:w-[50%] m-auto italic text-[var(--primaryText)] px-1 mb-2 font-semibold text-xs md:text-base'>
        -1 Timothy 1:18 (GNT)
      </p>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {data.map((book: BookType) => {
            return (
              <div
                key={book._id}
                className='mb-2 bg-[var(--primaryColor)] text-center text-white p-2 font-bold flex justify-between items-center text-xs md:text-base'
              >
                <Link to={`/edit-book/${book.year}`}>
                  <FaEdit />
                </Link>
                <Link
                  to={`/books/${book.year}`}
                  className='uppercase text-xs md:text-base hover:text-[var(--hoverColor)]'
                >
                  {book.year} "{book.word}"
                </Link>
                <button
                  onClick={() => mutate(Number(book.year))}
                  className='text-xs md:text-base'
                  disabled
                >
                  <FaTrash />
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Books
