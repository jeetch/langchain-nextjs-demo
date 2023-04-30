"use client"

import { FC, useState } from "react"
import { FieldValues, useForm } from "react-hook-form"

import { Textarea } from "@/components/ui/textarea"

import { basicCall } from "../actions/basicCall"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface BasicQuestionProps {}

const BasicQuestion: FC<BasicQuestionProps> = ({}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      question: "",
    },
  })

  const [loading, setLoading] = useState(false)
  const [res, setRes] = useState<string>("There are no bad questions")

  const onSubmit = async (data: FieldValues) => {
    setLoading(true)
    const response = await basicCall(data.question, window.openAI_API_KEY)
    setLoading(false)
    setRes(response)
  }

  return (
    <div className="flex flex-col items">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Basic Question
      </h3>

      {/* Question */}

      <div className="flex  gap-4 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-1/2 items-center gap-2"
        >
          <Textarea
            placeholder="Enter Prompt"
            {...register("question", { required: true })}
            className=""
          />
          {errors.question && <p>This field is required</p>}
          <Button type="submit" className="h-full" variant={"outline"}>
            Submit
          </Button>
        </form>

        {/* Answer */}
        <div className=" w-1/2 text-center justify-center">
          {loading && <p>Loading...</p>}
          {!loading && res && <p>{res}</p>}
        </div>
      </div>
    </div>
  )
}

export default BasicQuestion
