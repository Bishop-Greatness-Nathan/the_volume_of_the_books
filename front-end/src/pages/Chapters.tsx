import { useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useDeleteChapter, useGetChapters } from "../queries/chapters"
import { ChapterType } from "../utils/types"
import { useGetBook } from "../queries/books"
import { FaEdit } from "react-icons/fa"
import { FaTrash } from "react-icons/fa6"
import Loading from "../components/Loading"

function Chapters() {
  const navigate = useNavigate()

  const { year } = useParams()

  const { data: book } = useGetBook(Number(year))

  const { data, isError, isLoading } = useGetChapters(Number(year))

  const { mutate, isSuccess, isError: deleteError, error } = useDeleteChapter()

  const responses = () => {
    if (isSuccess) {
      navigate(`/books/${year}`)
    }
    if (deleteError) {
      console.log(error)
    }
  }

  useEffect(() => {
    responses()
  }, [isSuccess, deleteError])

  if (isError) return <h2>There was an error</h2>

  if (isLoading) return <Loading />
  return (
    <div>
      {book && (
        <div key={book._id}>
          <h1 className='uppercase text-center font-bold font-sans italic text-[var(--primaryColor)] md:text-2xl'>
            {book.year} - {book.word}
          </h1>
          <p className='text-center italic font-semibold md:w-[50%] m-auto mt-2 mb-2 capitalize text-sm md:text-base px-2 text-[var(--primaryText)]'>
            "{book.synopsis}"
          </p>
        </div>
      )}
      {!data.length ? (
        <h2 className='text-center'>No chapters in this book</h2>
      ) : (
        <div>
          {data.map((chapter: ChapterType) => {
            return (
              <div
                key={chapter._id}
                className='mb-2 bg-[var(--primaryColor)] text-center text-white p-2  font-bold flex justify-between items-center text-sm md:text-base'
              >
                <Link
                  to={`/edit-chapter/${chapter.book}-${chapter.name}`}
                  className='text-sm md:text-base hover:text-[var(--hoverColor)]'
                >
                  <FaEdit />
                </Link>
                <Link
                  to={`/verses/${year}-${chapter.name}`}
                  className='hover:text-[var(--hoverColor)] capitalize'
                >
                  {chapter.name} "{chapter.word}"
                </Link>
                <button
                  onClick={() => mutate(`${chapter.book}-${chapter.name}`)}
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

export default Chapters
