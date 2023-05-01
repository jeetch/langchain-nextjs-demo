"use client"

import { FC, useState } from "react"
import { promptTemplateCall } from "@/actions/promptTemplateCall"
import { FieldValues, useForm } from "react-hook-form"

import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface PromptTemplateProps {}

const PromptTemplate: FC<PromptTemplateProps> = ({}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      product: "",
    },
  })

  const [loading, setLoading] = useState(false)
  const [res, setRes] = useState<string>("There are no bad questions")

  const onSubmit = async (data: FieldValues) => {
    setLoading(true)
    const response = await promptTemplateCall(
      data.product,
      window.openAI_API_KEY
    )
    setLoading(false)
    setRes(response)
  }

  return (
    <div className="flex flex-col items my-6">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Using Prompt Template
      </h3>
      <p className="text-md text-muted-foreground mb-2">
        Enter your product and AI will suggest a name and a tagline for your
        product using <br /> a prompt template
      </p>

      {/* Get product name */}

      <div className="flex  gap-4 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-1/2 items-center gap-2"
        >
          <Input
            placeholder="Enter your porduct to suggest company names"
            {...register("product", { required: true })}
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

export default PromptTemplate
