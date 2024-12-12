import { useEffect } from "react"
import { FaEdit } from "react-icons/fa"
import { FaTrash } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { VerseType } from "../utils/types"
import { useDeleteVerse } from "../queries/verses"
import { toast } from "react-toastify"
import { isAxiosError } from "axios"

function SingleVerse({ index, _id, date, prophecy }: VerseType) {
  const { mutate, isSuccess, isError, error } = useDeleteVerse()

  const deleteVerse = () => {
    mutate(_id)
  }

  const responses = () => {
    if (isSuccess) {
      toast.success("verse successfully deleted")
    }
    if (isError) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.msg)
      }
    }
  }

  useEffect(() => {
    responses()
  }, [isSuccess, isError])
  return (
    <div key={_id}>
      <div className='mt-2 text-sm md:text-base font-semibold text-[var(--primaryColor)] flex justify-between items-center'>
        <span>
          {new Intl.DateTimeFormat(undefined, {
            dateStyle: "medium",
          }).format(new Date(date as string))}
        </span>
        <span className='flex justify-center space-x-5'>
          <Link to={`/edit-verse/${_id}`}>
            <FaEdit />
          </Link>
          <button onClick={deleteVerse} disabled>
            <FaTrash />
          </button>
        </span>
      </div>
      <p className='mb-3 text-[var(--primaryText)] text-xs md:text-base whitespace-pre-wrap'>
        {index ? index + 1 : 1}. {prophecy}
      </p>
    </div>
  )
}

export default SingleVerse
