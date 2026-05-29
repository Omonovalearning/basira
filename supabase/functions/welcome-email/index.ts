import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const MAILERSEND_API_KEY = Deno.env.get("MAILERSEND_API_KEY")

serve(async (req) => {
  try {
    // 1. استقبال بيانات المشترك الجديد من قاعدة البيانات
    const payload = await req.json()
    const userEmail = payload.record.email 

    // 2. إرسال الطلب إلى MailerSend
    const response = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${MAILERSEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: {
          email: "welcome@basira.top", // الإيميل الرسمي للنطاق الموثق
          name: "بصيرة | Basira"
        },
        reply_to: {
          email: "basiralearning@gmail.com", // إيميل الجيميل الخاص بك لتلقي ردود المشتركين عليه
          name: "دعم بصيرة"
        },
        to: [{ email: userEmail }],
        subject: "Welcome to Basira! | أهلاً بك في منصة بصيرة",
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eef2f6; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); background-color: #ffffff;">
            
            <div style="background: linear-gradient(135deg, #1e293b, #0f172a); padding: 30px; text-align: center; color: #ffffff;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 600; letter-spacing: 1px;">بصيرة | Basira</h1>
              <p style="margin: 5px 0 0 0; color: #94a3b8; font-size: 14px;">تبسيط المعرفة | Simplifying Knowledge</p>
            </div>

            <div style="padding: 30px; direction: rtl; text-align: right; color: #334155; border-bottom: 1px inherit #e2e8f0;">
              <h2 style="color: #0f172a; font-size: 22px; margin-top: 0;">أهلاً بك في بصيرة! 👋</h2>
              <p style="font-size: 16px; line-height: 1.8; color: #475569;">
                يسعدنا جداً انضمامك إلينا. في <strong>بصيرة</strong>، نؤمن بأن المعرفة قوة، وأن قيمتها الحقيقية تكمن في تبسيطها لتصل إلى الجميع بوضوح وعمق.
              </p>
              <p style="font-size: 16px; line-height: 1.8; color: #475569;">
                من الآن فصاعداً، ستكون أول من يصله مقالاتنا الدورية، أفكارنا الملهمة، وآخر التحديثات التي تساعدك على رؤية الأشياء من منظور أكثر عمقاً وتبسيطاً.
              </p>
              <div style="margin: 25px 0; text-align: center;">
                <a href="https://basira.top" style="background-color: #2563eb; color: #ffffff; padding: 12px 30px; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block; font-size: 15px;">زيارة منصة بصيرة</a>
              </div>
              <p style="font-size: 14px; color: #64748b; margin-bottom: 0;">تحياتنا الحارة،<br>فريق بصيرة</p>
            </div>

            <div style="padding: 30px; direction: ltr; text-align: left; color: #334155; background-color: #f8fafc;">
              <h2 style="color: #0f172a; font-size: 20px; margin-top: 0;">Welcome to Basira! 👋</h2>
              <p style="font-size: 15px; line-height: 1.7; color: #475569;">
                We are absolutely thrilled to have you with us. At <strong>Basira</strong>, we believe that knowledge is power, and its true value lies in making it simple, accessible, and deeply impactful.
              </p>
              <p style="font-size: 15px; line-height: 1.7; color: #475569;">
                From this moment on, you’ll be the first to receive our latest articles, insights, and updates designed to help you view the world through a clearer lens.
              </p>
              <div style="margin: 25px 0; text-align: center;">
                <a href="https://basira.top" style="background-color: #0f172a; color: #ffffff; padding: 12px 30px; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block; font-size: 14px;">Visit Basira Platform</a>
              </div>
              <p style="font-size: 13px; color: #64748b; margin-bottom: 0;">Warm regards,<br>The Basira Team</p>
            </div>

            <div style="background-color: #f1f5f9; padding: 15px; text-align: center; color: #94a3b8; font-size: 12px;">
              &copy; 2026 Basira. All rights reserved. | جميع الحقوق محفوظة.
            </div>

          </div>
        `,
      }),
    })

    return new Response(JSON.stringify({ message: "Success" }), { status: 200 })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 })
  }
})