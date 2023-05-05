import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import APIKeyInput from "@/components/APIKeyInput"
import BasicQuestion from "@/components/examples/BasicQuestion"
import PromptTemplate from "@/components/examples/PromptTemplate"
import QADoc from "@/components/examples/QAdoc"

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          There are no bad questions
          <br className="hidden sm:inline" />
        </h1>
        <APIKeyInput />
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <BasicQuestion />
        <PromptTemplate />
        <QADoc />
      </div>
    </section>
  )
}
