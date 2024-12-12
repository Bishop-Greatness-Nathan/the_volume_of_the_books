import { FormEvent, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { isAxiosError } from "axios"
import { useEditBook, useGetBook } from "../queries/books"

function EditBook() {
  const navigate = useNavigate()
  const { id } = useParams()

  const { mutate, isSuccess, isError, error } = useEditBook()

  const { data } = useGetBook(Number(id))

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)

    mutate({ param: id as string, data })
  }

  const responses = () => {
    if (isSuccess) {
      toast.success("data updated")
      navigate(`/`)
    }
    if (isError) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.msg)
      }
    }
  }

  useEffect(() => {
    responses()
  }, [isError, isSuccess])
  return (
    <main>
      <form
        className='m-auto mt-10 w-[90%] md:w-[40%] border p-5 border-[var(--primaryColor)] text-[var(--primaryText)] rounded-md'
        onSubmit={handleSubmit}
      >
        <h1 className='capitalize mb-2 text-center text-[var(--primaryColor)] font-semibold'>
          Edit Book
        </h1>
        <div className='mb-3'>
          <label className='block capitalize font-semibold'>year</label>
          <input
            type='number'
            name='year'
            maxLength={4}
            min={0}
            defaultValue={data && data.year}
            readOnly
            required
            className='border p-1 w-full border-[var(--primaryColor)] rounded-sm outline-none'
          />
        </div>
        <div className='mb-3'>
          <label className='block capitalize font-semibold'>
            word for the year
          </label>
          <input
            type='text'
            name='word'
            defaultValue={data && data.word}
            required
            className='border p-1 uppercase w-full border-[var(--primaryColor)] rounded-sm outline-none'
          />
        </div>

        <div className='mb-3'>
          <label className='block capitalize font-semibold'>synopsis</label>
          <textarea
            name='synopsis'
            id=''
            cols={30}
            rows={10}
            defaultValue={data && data.synopsis}
            className='border p-1 w-full border-[var(--primaryColor)] rounded-sm outline-none'
            required
          ></textarea>
        </div>

        <button
          type='submit'
          className='border p-1 w-full bg-[var(--primaryColor)] rounded-sm text-white capitalize'
        >
          submit
        </button>
      </form>
    </main>
  )
}

export default EditBook
