import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const MAILERSEND_API_KEY = Deno.env.get("MAILERSEND_API_KEY")

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!MAILERSEND_API_KEY) {
      throw new Error("MAILERSEND_API_KEY is not set")
    }

    const payload = await req.json()
    const userEmail = payload.record?.email

    if (!userEmail) {
      throw new Error("No email found in payload")
    }

    const emailData = {
      from: {
        email: "noreply@basira.top",
        name: "بصيرة | Basira"
      },
      reply_to: {
        email: "basiralearning@gmail.com",
        name: "دعم بصيرة"
      },
      to: [{ email: userEmail }],
      subject: "أهلاً بك في منصة بصيرة 🎉",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eef2f6; border-radius: 8px; overflow: hidden;">
          
          <!-- Header -->
          <div style="background: #0f172a; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; color: #ffffff;">بصيرة | Basira</h1>
          </div>

          <!-- Logo -->
<div style="text-align: center; padding: 20px; background-color: #1a1a2e;">
  <img src="https://basira.top/favicon.png" alt="بصيرة" style="height: 60px;" />
</div>

          <!-- Body -->
          <div style="padding: 30px; direction: rtl; text-align: right; color: #334155; background: #ffffff;">
            <h2 style="color: #0f172a;">أهلاً بك في بصيرة! 👋</h2>
            <p style="font-size: 16px; line-height: 1.8;">
              يسعدنا جداً انضمامك إلينا في منصة تبسيط المعرفة.
            </p>
            <p style="font-size: 16px; line-height: 1.8;">
              ستصلك مقالاتنا وتحديثاتنا الدورية قريباً إن شاء الله.
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://basira.top" 
                 style="background: #0f172a; color: #ffffff; padding: 14px 32px; border-radius: 6px; text-decoration: none; font-size: 16px;">
                زيارة المنصة
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #f8fafc; padding: 20px; text-align: center; color: #94a3b8; font-size: 13px; direction: rtl;">
            <p style="margin: 0;">وصلتك هذه الرسالة لأنك اشتركت في منصة بصيرة</p>
            <p style="margin: 5px 0 0;">© 2025 Basira. جميع الحقوق محفوظة.</p>
          </div>

        </div>
      `
    }

    const response = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${MAILERSEND_API_KEY}`,
      },
      body: JSON.stringify(emailData),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`MailerSend Error: ${response.status} - ${errorText}`)
    }

    console.log(`✅ Welcome email sent to: ${userEmail}`)

    return new Response(
      JSON.stringify({ success: true, message: `Email sent to ${userEmail}` }), 
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error("❌ ERROR:", error.message)
    return new Response(
      JSON.stringify({ success: false, error: error.message }), 
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})