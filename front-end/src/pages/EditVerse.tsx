import { FormEvent, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useEditVerse, useGetVerse } from "../queries/verses"
import { toast } from "react-toastify"
import { isAxiosError } from "axios"

function EditVerse() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { mutate, isSuccess, isError, error } = useEditVerse()
  const { data } = useGetVerse(id as string)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    mutate({ param: id as string, data })
  }

  const responses = () => {
    if (isSuccess) {
      toast.success("data updated")
      navigate(`/verses/${data.book.toString()}-${data.chapter}`)
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
          Edit Verse
        </h1>
        <div className='mb-3'>
          <label className='block capitalize font-semibold'>
            Date of Prophecy
          </label>
          <input
            type='date'
            name='date'
            defaultValue={data && data.date}
            required
            className='border p-1 w-full border-[var(--primaryColor)] rounded-sm outline-none'
          />
        </div>

        <div className='mb-3'>
          <label className='block capitalize font-semibold'>prophecy</label>
          <textarea
            name='prophecy'
            id=''
            cols={30}
            rows={10}
            defaultValue={data && data.prophecy}
            required
            className='border p-1 w-full border-[var(--primaryColor)] rounded-sm outline-none whitespace-pre'
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

export default EditVerse
