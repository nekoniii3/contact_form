'use server'

import nodemailer from 'nodemailer'

export async function submitForm(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string

  // Nodemailerのトランスポーターを設定
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    // メールを送信
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      subject: '新しい問い合わせ',
      text: `
        名前: ${name}
        メールアドレス: ${email}
        メッセージ: ${message}
      `,
    })
    return { success: true }
  } catch (error) {
    console.error('メール送信エラー:', error)
    return { success: false, error: 'メールの送信に失敗しました' }
  }
}