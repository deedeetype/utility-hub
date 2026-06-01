export default function Content() {
  return (
    <article>
      <p className="text-xl text-slate-300 leading-relaxed mb-6">
        QR codes are everywhere — on restaurant menus, product packaging, business cards, event tickets and subway posters. But how do they actually work, and how can you create one for free? Here&apos;s everything you need to know.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">What Is a QR Code?</h2>
      <p className="text-slate-300 leading-relaxed mb-4">
        QR stands for <strong className="text-white">Quick Response</strong>. A QR code is a two-dimensional barcode that can store a variety of data types — most commonly a URL, but also plain text, email addresses, phone numbers, WiFi credentials and more. Unlike a traditional barcode that only holds about 13 digits, a QR code can store up to <strong className="text-white">4,296 alphanumeric characters</strong>.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">A Brief History</h2>
      <p className="text-slate-300 leading-relaxed mb-4">
        QR codes were invented in 1994 by <strong className="text-white">Denso Wave</strong>, a Japanese automotive company, to track vehicle parts during manufacturing. The design was intentionally made public and royalty-free, which is why QR codes spread across virtually every industry. The real turning point came around 2017–2020, when iOS and Android added native QR scanning to their camera apps — no additional app needed.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">What Can You Encode in a QR Code?</h2>
      <ul className="space-y-2 mb-6 list-none">
        {[
          ['Website URLs', 'The most common use case — great for print materials that need to link online.'],
          ['WiFi credentials', 'Let guests connect to your network without typing a password.'],
          ['Email addresses', 'Open a pre-addressed compose window on scan.'],
          ['Phone numbers', 'Dial directly on scan.'],
          ['Plain text', 'Short messages, instructions, or notes.'],
          ['Payment links', 'Link to PayPal, Stripe, or other payment platforms.'],
        ].map(([term, def]) => (
          <li key={term} className="flex gap-2 text-slate-300">
            <span className="text-indigo-400 shrink-0">▸</span>
            <span><strong className="text-white">{term}</strong> — {def}</span>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">5 Practical Uses for QR Codes</h2>

      <h3 className="text-xl font-bold text-white mt-7 mb-3">1. Restaurant menus</h3>
      <p className="text-slate-300 leading-relaxed mb-4">
        Display a table tent with a QR code linking to your digital menu. Update the menu online without reprinting anything.
      </p>

      <h3 className="text-xl font-bold text-white mt-7 mb-3">2. Business cards</h3>
      <p className="text-slate-300 leading-relaxed mb-4">
        Add a QR code that links to your LinkedIn profile, portfolio, or contact page. Far more versatile than just printing a URL.
      </p>

      <h3 className="text-xl font-bold text-white mt-7 mb-3">3. Event marketing</h3>
      <p className="text-slate-300 leading-relaxed mb-4">
        Place QR codes on flyers and posters that link to event pages, ticket sales or RSVP forms.
      </p>

      <h3 className="text-xl font-bold text-white mt-7 mb-3">4. Product packaging</h3>
      <p className="text-slate-300 leading-relaxed mb-4">
        Link to setup instructions, user manuals, or warranty registration — without cluttering your packaging with text.
      </p>

      <h3 className="text-xl font-bold text-white mt-7 mb-3">5. WiFi sharing</h3>
      <p className="text-slate-300 leading-relaxed mb-4">
        Print a QR code at your Airbnb, office or café that automatically connects guests to your WiFi. No more reading out long passwords.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">How to Create a QR Code for Free</h2>
      <p className="text-slate-300 leading-relaxed mb-4">
        Our <a href="/tools/qr-code" className="text-indigo-400 hover:text-indigo-300 underline">free QR Code Generator</a> lets you create a custom QR code in seconds:
      </p>
      <ol className="space-y-2 mb-6 list-none">
        <li className="flex gap-2 text-slate-300"><span className="text-indigo-400 font-bold shrink-0">1.</span><span><strong className="text-white">Enter your content</strong> — a URL, email, phone number, WiFi credentials or text</span></li>
        <li className="flex gap-2 text-slate-300"><span className="text-indigo-400 font-bold shrink-0">2.</span><span><strong className="text-white">Customize</strong> — choose foreground and background colors, and pick a size (128px to 512px)</span></li>
        <li className="flex gap-2 text-slate-300"><span className="text-indigo-400 font-bold shrink-0">3.</span><span><strong className="text-white">Download</strong> — export as a PNG, ready to use in any design or print project</span></li>
      </ol>
      <p className="text-slate-300 leading-relaxed mb-4">
        Everything runs in your browser. No account required, no watermarks, no limits.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Tips for Better QR Codes</h2>
      <ul className="space-y-2 mb-6 list-none">
        {[
          ['Keep the URL short', 'Shorter URLs create simpler codes that scan faster. Use a URL shortener if needed.'],
          ['Maintain contrast', 'Dark code on a light background is most reliable. Avoid low-contrast color combinations.'],
          ['Test before printing', 'Always scan your QR code on multiple devices before committing to a print run.'],
          ['Size appropriately', 'For print materials, a QR code should be at least 2 cm × 2 cm.'],
          ['Leave quiet zones', 'Ensure adequate white space around the code. Crowding it reduces scan reliability.'],
        ].map(([term, def]) => (
          <li key={term} className="flex gap-2 text-slate-300">
            <span className="text-indigo-400 shrink-0">▸</span>
            <span><strong className="text-white">{term}</strong> — {def}</span>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Create Your QR Code Now</h2>
      <p className="text-slate-300 leading-relaxed mb-4">
        It takes about 10 seconds. No sign-up, no credit card, no watermark.
      </p>
      <p className="text-slate-300 leading-relaxed">
        <a href="/tools/qr-code" className="text-indigo-400 hover:text-indigo-300 underline">Try our free QR Code Generator →</a>
      </p>
    </article>
  );
}
