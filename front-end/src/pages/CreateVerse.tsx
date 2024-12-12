import { FormEvent, useEffect } from "react"
import { useCreateVerse } from "../queries/verses"
import { toast } from "react-toastify"
import { isAxiosError } from "axios"

function CreateVerse() {
  const { mutate, isSuccess, isError, error } = useCreateVerse()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    console.log(data)
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
    <main>
      <form
        className='m-auto mt-10 w-[90%] md:w-[40%] border p-5 border-[var(--primaryColor)] text-[var(--primaryText)] rounded-md'
        onSubmit={handleSubmit}
      >
        <h1 className='capitalize mb-2 text-center text-[var(--primaryColor)] font-semibold'>
          Create a new verse
        </h1>
        <div className='mb-3'>
          <label className='block capitalize font-semibold'>
            Date of Prophecy
          </label>
          <input
            type='date'
            name='date'
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
            required
            className='border p-1 w-full border-[var(--primaryColor)] rounded-sm outline-none whitespace-pre-wrap'
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

export default CreateVerse
