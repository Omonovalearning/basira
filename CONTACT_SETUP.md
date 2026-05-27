# BASIRA Contact Form Integration Guide

## Option 1: Using FormSubmit (Easiest - No Coding Required)

FormSubmit is a free service that handles form submissions and sends emails. Here's how to set it up:

### Steps:

1. **In index.html, replace the contact form section with:**

```html
<form action="https://formsubmit.co/basira.learning@gmail.com" method="POST" class="max-w-[500px] mx-auto">
  <div class="space-y-4">
    <input 
      type="text" 
      name="name" 
      placeholder="Your Name" 
      required
      class="w-full px-5 py-3 rounded-xl dark:bg-obsidian-800/60 bg-white/80 dark:border-white/[0.08] border-obsidian-800/[0.08] border dark:text-white text-obsidian-900 dark:placeholder-platinum/25 placeholder-obsidian-400/50 text-[14px] font-light outline-none focus:dark:border-platinum/20 focus:border-obsidian-800/20 transition-all duration-300"
    >
    <input 
      type="email" 
      name="email" 
      placeholder="your@email.com" 
      required
      class="w-full px-5 py-3 rounded-xl dark:bg-obsidian-800/60 bg-white/80 dark:border-white/[0.08] border-obsidian-800/[0.08] border dark:text-white text-obsidian-900 dark:placeholder-platinum/25 placeholder-obsidian-400/50 text-[14px] font-light outline-none focus:dark:border-platinum/20 focus:border-obsidian-800/20 transition-all duration-300"
    >
    <textarea 
      name="message" 
      placeholder="Your message here..." 
      rows="5"
      required
      class="w-full px-5 py-3 rounded-xl dark:bg-obsidian-800/60 bg-white/80 dark:border-white/[0.08] border-obsidian-800/[0.08] border dark:text-white text-obsidian-900 dark:placeholder-platinum/25 placeholder-obsidian-400/50 text-[14px] font-light outline-none focus:dark:border-platinum/20 focus:border-obsidian-800/20 transition-all duration-300"
    ></textarea>
    <button type="submit" class="w-full px-7 py-3.5 bg-obsidian-800 dark:bg-white/90 dark:text-obsidian-900 text-cream font-semibold text-[13px] tracking-wide rounded-xl hover:dark:bg-white hover:bg-obsidian-700 transition-all duration-300 shadow-lg shadow-black/10">
      Send Message
    </button>
  </div>
  <!-- Redirect to thank you page after submission -->
  <input type="hidden" name="_next" value="https://basira.top/thank-you.html">
  <!-- Disable email from FormSubmit -->
  <input type="hidden" name="_autoresponse" value="Thank you for contacting BASIRA! We'll get back to you soon.">
</form>
```

2. Go to https://formsubmit.co and follow their setup
3. Done! Emails will now go to basira.learning@gmail.com

---

## Option 2: Using EmailJS (More Control)

EmailJS allows you to send emails directly from JavaScript without a backend.

### Setup:

1. Sign up at https://www.emailjs.com/
2. Create an email service
3. Get your Service ID, Template ID, and Public Key
4. Add this script to your page:

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js"></script>
<script>
  emailjs.init('YOUR_PUBLIC_KEY');
  
  function sendEmail(e) {
    e.preventDefault();
    const params = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value
    };
    
    emailjs.send('SERVICE_ID', 'TEMPLATE_ID', params)
      .then(() => {
        alert('Message sent successfully!');
        e.target.reset();
      })
      .catch(err => console.error(err));
  }
</script>
```

---

## Option 3: Using Firebase (Scalable)

For a production app, Firebase is more robust:

1. Create a Firebase project at https://firebase.google.com/
2. Set up Cloud Functions to handle emails
3. Use Firestore to store submissions

---

## Recommendation for BASIRA:

**Use Option 1 (FormSubmit)** — It's the simplest, free, and doesn't require any backend knowledge.

Steps:
1. Replace the contact form HTML as shown above
2. Replace `basira.learning@gmail.com` with your actual email
3. Test it by submitting a message
4. Done!