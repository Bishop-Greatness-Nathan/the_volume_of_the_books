import { useParams } from "react-router-dom"
import { useGetVerses } from "../queries/verses"
import { VerseType } from "../utils/types"
import { useSingleChapter } from "../queries/chapters"

import SingleVerse from "../components/SingleVerse"
import Loading from "../components/Loading"

function Verses() {
  const { id } = useParams()

  const { data: chapter } = useSingleChapter(id as string)

  const { data, isError, isLoading } = useGetVerses(id as string)

  if (isError) return <h2>There was an error...</h2>

  if (isLoading) return <Loading />

  return (
    <div className='mx-5 mb-10'>
      {chapter && (
        <div>
          <h1 className='uppercase text-center font-bold font-sans italic text-[var(--primaryColor)] md:text-2xl'>
            {chapter.name}, {chapter.book} : Month of {chapter.word}
          </h1>
          <p className='text-center italic font-semibold md:w-[50%] m-auto mt-2 capitalize text-xs md:text-base text-[var(--primaryText)]'>
            "{chapter.declaration}"
          </p>
        </div>
      )}
      {!data.length ? (
        <h1 className='text-center mt-2'>No verses to display</h1>
      ) : (
        <div>
          {data.map((verse: VerseType, index: number) => {
            return <SingleVerse key={verse._id} index={index} {...verse} />
          })}
        </div>
      )}
    </div>
  )
}

export default Verses
