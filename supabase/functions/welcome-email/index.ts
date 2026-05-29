import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const MAILERSEND_API_KEY = Deno.env.get("MAILERSEND_API_KEY")

serve(async (req) => {
  try {
    const payload = await req.json()
    const userEmail = payload.record.email 

    const response = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${MAILERSEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: {
          email: "welcome@basira.top",
          name: "بصيرة | Basira"
        },
        reply_to: {
          email: "basiralearning@gmail.com",
          name: "دعم بصيرة"
        },
        to: [{ email: userEmail }],
        subject: "Welcome to Basira! | أهلاً بك في منصة بصيرة",
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eef2f6; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
            <div style="background: linear-gradient(135deg, #1e293b, #0f172a); padding: 30px; text-align: center; color: #ffffff;">
              <h1 style="margin: 0; font-size: 28px;">بصيرة | Basira</h1>
            </div>
            <div style="padding: 30px; direction: rtl; text-align: right; color: #334155;">
              <h2 style="color: #0f172a;">أهلاً بك في بصيرة! 👋</h2>
              <p>يسعدنا جداً انضمامك إلينا في منصة تبسيط المعرفة.</p>
            </div>
          </div>
        `,
      }),
    })

    // التحقق الحقيقي: إذا فشل MailerSend، استخرج الخطأ واظهره في الـ Logs فوراً
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`MailerSend Failed: Status ${response.status} - ${errorText}`)
    }

    return new Response(JSON.stringify({ message: "Success" }), { status: 200 })

  } catch (error) {
    // طباعة الخطأ الحقيقي في سيرفر سوبابيس
    console.error("CRITICAL ERROR:", error.message)
    return new Response(JSON.stringify({ error: error.message }), { status: 400 })
  }
})