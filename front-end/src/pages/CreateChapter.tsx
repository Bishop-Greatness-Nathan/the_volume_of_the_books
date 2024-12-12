import { FormEvent, useEffect } from "react"
import { useCreateChapter } from "../queries/chapters"
import { toast } from "react-toastify"
import { isAxiosError } from "axios"

function CreateChapter() {
  const { mutate, isSuccess, isError, error } = useCreateChapter()

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
    <main className='mb-10'>
      <form
        className='m-auto mt-10 w-[90%] md:w-[40%] border p-5 border-[var(--primaryColor)] rounded-md text-[var(--primaryText)]'
        onSubmit={handleSubmit}
      >
        <h1 className='capitalize mb-2 text-center text-[var(--primaryColor)] font-semibold'>
          Create a new chapter
        </h1>
        <div className='mb-3'>
          <label className='block capitalize font-semibold'>
            1st day of the month
          </label>
          <input
            type='date'
            name='date'
            required
            className='border p-1 w-full border-[var(--primaryColor)] rounded-sm outline-none'
          />
        </div>
        <div className='mb-3'>
          <label className='block capitalize font-semibold'>
            word for the month
          </label>
          <input
            type='text'
            name='word'
            required
            className='uppercase border p-1 w-full border-[var(--primaryColor)] rounded-sm outline-none'
          />
        </div>
        <div className='mb-3'>
          <label className='block capitalize font-semibold'>declaration</label>
          <textarea
            name='declaration'
            id=''
            cols={30}
            rows={10}
            required
            className='uppercase border p-1 w-full border-[var(--primaryColor)] rounded-sm outline-none'
          ></textarea>
        </div>

        <button
          type='submit'
          className='border p-1 w-full bg-[var(--primaryColor)] rounded-sm text-white capitalize whitespace-pre-wrap'
        >
          submit
        </button>
      </form>
    </main>
  )
}

export default CreateChapter
