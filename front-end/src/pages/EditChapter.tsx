import { FormEvent, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { isAxiosError } from "axios"
import { useEditChapter, useSingleChapter } from "../queries/chapters"

function EditChapter() {
  const navigate = useNavigate()
  const { id } = useParams()

  const { mutate, isSuccess, isError, error } = useEditChapter()

  const { data } = useSingleChapter(id as string)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    mutate({ param: id as string, data })
  }

  const responses = () => {
    if (isSuccess) {
      toast.success("data updated")
      navigate(`/books/${data.book}`)
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
          Edit Chapter
        </h1>
        <div className='mb-3'>
          <label className='block capitalize font-semibold'>
            1st day of the month
          </label>
          <input
            type='date'
            name='date'
            defaultValue={data && data.date}
            required
            readOnly
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
            defaultValue={data && data.word}
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
            defaultValue={data && data.declaration}
            required
            className='uppercase border p-1 w-full border-[var(--primaryColor)] rounded-sm outline-none'
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

export default EditChapter
