export default function Content() {
  return (
    <article>
      <p className="text-xl text-slate-300 leading-relaxed mb-6">
        More than 80% of data breaches involve weak or stolen passwords. Despite years of warnings, &quot;123456&quot; and &quot;password&quot; remain the most commonly used passwords on the internet. If you&apos;re relying on something you can easily remember, chances are it can be easily cracked.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">What Makes a Password Truly Secure?</h2>
      <p className="text-slate-300 leading-relaxed mb-4">
        Security researchers measure password strength by how long it would take an automated system to guess it. The key factors are:
      </p>
      <ul className="space-y-2 mb-6 list-none">
        {[
          ['Length', 'Every additional character exponentially increases the number of combinations. A 16-character password is astronomically harder to crack than an 8-character one.'],
          ['Character variety', 'Mixing uppercase, lowercase, numbers and symbols dramatically increases the search space for attackers.'],
          ['Randomness', 'Human-chosen passwords follow predictable patterns. Machines exploit these patterns. True randomness is key.'],
          ['Uniqueness', 'Using the same password across multiple sites means one breach exposes everything.'],
        ].map(([term, def]) => (
          <li key={term} className="flex gap-2 text-slate-300">
            <span className="text-indigo-400 shrink-0">▸</span>
            <span><strong className="text-white">{term}</strong> — {def}</span>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">The 5 Most Common Password Mistakes</h2>

      <h3 className="text-xl font-bold text-white mt-7 mb-3">1. Using personal information</h3>
      <p className="text-slate-300 leading-relaxed mb-4">
        Birthdays, pet names, city names, and children&apos;s names are the first things attackers try. This information is often publicly available on social media.
      </p>

      <h3 className="text-xl font-bold text-white mt-7 mb-3">2. Simple substitutions</h3>
      <p className="text-slate-300 leading-relaxed mb-4">
        Changing &quot;e&quot; to &quot;3&quot; or &quot;a&quot; to &quot;@&quot; (like &quot;p@ssw0rd&quot;) provides almost no additional security. Modern cracking tools are specifically trained to try these variations.
      </p>

      <h3 className="text-xl font-bold text-white mt-7 mb-3">3. Short passwords</h3>
      <p className="text-slate-300 leading-relaxed mb-4">
        An 8-character password, even with mixed characters, can be cracked in minutes with modern hardware. Aim for <strong className="text-white">at least 12 characters</strong>, and 16+ for anything important.
      </p>

      <h3 className="text-xl font-bold text-white mt-7 mb-3">4. Reusing passwords</h3>
      <p className="text-slate-300 leading-relaxed mb-4">
        When a major site gets breached — and breaches happen constantly — attackers immediately try those credentials on banking sites, email providers and social media. One leaked password can cascade into complete account takeover.
      </p>

      <h3 className="text-xl font-bold text-white mt-7 mb-3">5. Storing passwords in plain text</h3>
      <p className="text-slate-300 leading-relaxed mb-4">
        Writing passwords in a notes app, a spreadsheet or a sticky note defeats the purpose entirely. Use a dedicated password manager.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">What a Strong Password Actually Looks Like</h2>
      <p className="text-slate-300 leading-relaxed mb-4">
        A genuinely strong password looks something like: <code className="bg-slate-800 px-2 py-0.5 rounded text-indigo-300 font-mono text-sm">Kx#9mPqL2@nWvT7!</code>
      </p>
      <p className="text-slate-300 leading-relaxed mb-4">
        It&apos;s 16 characters, uses all character types, contains no recognizable words or patterns, and was generated randomly. You won&apos;t remember it — but that&apos;s fine, because you shouldn&apos;t have to.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">How to Generate Strong Passwords for Free</h2>
      <p className="text-slate-300 leading-relaxed mb-4">
        Our <a href="/tools/password-generator" className="text-indigo-400 hover:text-indigo-300 underline">free Password Generator</a> creates cryptographically random passwords instantly, with full control over length (6 to 64 characters), character sets, and whether to exclude ambiguous characters.
      </p>
      <p className="text-slate-300 leading-relaxed mb-4">
        You can also check how secure your current passwords are with our <a href="/tools/password-strength" className="text-indigo-400 hover:text-indigo-300 underline">Password Strength Checker</a> — which analyzes your password entirely in your browser without ever transmitting it.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">Managing Your Passwords</h2>
      <p className="text-slate-300 leading-relaxed mb-4">
        Once you start generating unique, complex passwords for every account, you&apos;ll need a way to store them. We recommend using a reputable password manager like <strong className="text-white">Bitwarden</strong> (free, open-source) or <strong className="text-white">1Password</strong>. Also enable <strong className="text-white">two-factor authentication (2FA)</strong> wherever available.
      </p>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">The Bottom Line</h2>
      <p className="text-slate-300 leading-relaxed mb-4">
        Password security isn&apos;t complicated — it just requires the right habits. Use a random generator, store passwords in a manager, never reuse them, and enable 2FA. Your future self will thank you.
      </p>
      <p className="text-slate-300 leading-relaxed">
        <a href="/tools/password-generator" className="text-indigo-400 hover:text-indigo-300 underline">Generate your first strong password now — it takes 5 seconds →</a>
      </p>
    </article>
  );
}
