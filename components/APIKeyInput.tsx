"use client"

import { FC, useState } from "react"

import { Icons } from "./icons"
import { Input } from "./ui/input"

interface APIKeyInputProps {}

const APIKeyInput: FC<APIKeyInputProps> = () => {
  const [apiKey, setApiKey] = useState("")
  const handleInputChange = (e) => {
    const apiKey = e.target.value
    setApiKey(apiKey)
    window.openAI_API_KEY = apiKey
  }

  return (
    <div>
      <p className="mt-4 flex  max-w-[700px] text-lg text-muted-foreground sm:text-xl">
        <Icons.key className="h-5 w-5 mr-2" /> Enter your OpenAI API key here
      </p>

      <Input type="password" onChange={handleInputChange} />
    </div>
  )
}

export default APIKeyInput
