import { FormEvent, useEffect, useState } from "react"
import { useCreateVerse } from "../queries/verses"
import { toast } from "react-toastify"
import { isAxiosError } from "axios"

function CreateVerse() {
  const [date, setDate] = useState("")
  const [prophecy, setProphecy] = useState("")
  const { mutate, isSuccess, isError, error, isLoading } = useCreateVerse()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData)
    mutate(data)
  }

  const responses = () => {
    if (isSuccess) {
      toast.success("Verse created. Create another verse?")
      setDate("")
      setProphecy("")
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
            value={date}
            required
            className='border p-1 w-full border-[var(--primaryColor)] rounded-sm outline-none'
            onChange={(e) => setDate(e.target.value)}
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
            value={prophecy}
            className='border p-1 w-full border-[var(--primaryColor)] rounded-sm outline-none whitespace-pre-wrap'
            onChange={(e) => setProphecy(e.target.value)}
          ></textarea>
        </div>

        <button
          type='submit'
          className={`border p-1 w-full bg-[var(--primaryColor)] rounded-sm text-white capitalize ${
            isLoading && "cursor-wait"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "submitting" : "submit"}
        </button>
      </form>
    </main>
  )
}

export default CreateVerse
