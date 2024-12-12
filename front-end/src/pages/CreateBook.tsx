import { FormEvent, useEffect } from "react"
import { useCreateBook } from "../queries/books"
import { toast } from "react-toastify"
import { isAxiosError } from "axios"

function CreateBook() {
  const { mutate, isSuccess, isError, error } = useCreateBook()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    mutate(data)
  }

  const responses = () => {
    if (isSuccess) {
      toast.success("data created")
      location.reload()
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
    <main className='pb-10'>
      <form
        className='m-auto mt-10 w-[90%] md:w-[40%] border p-5 border-[var(--primaryColor)] rounded-md text-[var(--primaryText)]'
        onSubmit={handleSubmit}
      >
        <h1 className='capitalize mb-2 text-center text-[var(--primaryColor)] font-semibold'>
          Create a new book
        </h1>
        <div className='mb-3'>
          <label className='block capitalize font-semibold'>year</label>
          <input
            type='number'
            name='year'
            maxLength={4}
            min={0}
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
            className='border p-1 w-full border-[var(--primaryColor)] rounded-sm outline-none whitespace-pre-wrap'
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

export default CreateBook
