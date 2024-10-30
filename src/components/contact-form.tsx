'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { submitForm } from '../actions/actions'

export function ContactFormComponent() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  async function handleSubmit(formData: FormData) {
    const result = await submitForm(formData)
    if (result.success) {
      setIsSubmitted(true)
    } else {
      // エラー処理をここに追加
      console.error(result.error)
    }
  }

  function handleReset() {
    setIsSubmitted(false)
  }

  if (isSubmitted) {
    return (
      <div className="text-center space-y-4 mt-20" role="alert" aria-live="polite">
        <h2 className="text-2xl font-bold">ありがとうございました</h2>
        <p>お問い合わせを受け付けました。内容を確認次第、ご連絡いたします。</p>
        <Button onClick={handleReset}>新しい問い合わせをする</Button>
      </div>
    )
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-md mx-auto mt-10">
      <div className="space-y-2">
        <Label htmlFor="name">お名前</Label>
        <Input id="name" name="name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">メールアドレス</Label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">お問い合わせ内容</Label>
        <Textarea id="message" name="message" required />
      </div>
      <Button type="submit" className="w-full">送信</Button>
    </form>
  )
}