"use client"

import { FC, useState } from "react"
import { FieldValues, useForm } from "react-hook-form"

import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface QADocProps {}

const QADoc: FC<QADocProps> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      question: "",
    },
  })

  const [loading, setLoading] = useState(false)
  const [res, setRes] = useState<string>("There are no bad questions")

  const onSubmit = async (data: FieldValues) => {
    setLoading(true)
    console.log("submitting")
    const query = data.question
    const response = await fetch("/api/response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
    const result = await response.json()

    setLoading(false)
    setRes(result.answer)
  }

  return (
    <div className="flex flex-col items my-6">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Q&A from Custom Data
      </h3>
      <p className="text-md text-muted-foreground mb-2">
        Enter Q, get A from data scraped from "the social network" script
      </p>
      {/* Question */}

      <div className="flex  gap-4 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-1/2 items-center gap-2"
        >
          <Input
            placeholder="Was mark paying attention in the board room? or any such Questions"
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

export default QADoc
