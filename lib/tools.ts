export type Status = 'live' | 'beta' | 'coming-soon';
export type CategoryKey =
  | 'all'
  | 'fun'
  | 'productivity'
  | 'convert'
  | 'text'
  | 'code'
  | 'media'
  | 'design';

export interface ToolDef {
  slug: string;
  name: string;
  description: string;
  category: CategoryKey;
  status: Status;
}

export interface CategoryDef {
  key: CategoryKey;
  label: string;
}

export const CATEGORIES: CategoryDef[] = [
  { key: 'all',          label: 'All Tools'    },
  { key: 'fun',          label: 'Fun & Random' },
  { key: 'productivity', label: 'Productivity' },
  { key: 'convert',      label: 'Calculators'  },
  { key: 'text',         label: 'Text'         },
  { key: 'code',         label: 'Code'         },
  { key: 'media',        label: 'Media'        },
  { key: 'design',       label: 'Design'       },
];

// ─── Add new tools here — sitemap, hub and categories update automatically ───
// Format: { slug, name, description, category, status }
// slug must match the directory name in app/tools/

export const TOOLS: ToolDef[] = [
  // Productivity
  {
    slug: 'script-timer',
    name: 'Script Timer',
    description: 'Calibrate your speech for short-form content — TikTok, Reels, YT Shorts. Perfect your timing in seconds.',
    category: 'productivity',
    status: 'live',
  },
  {
    slug: 'pomodoro',
    name: 'Pomodoro Timer',
    description: '25-minute focus sessions with short and long breaks. Audio alert when time is up.',
    category: 'productivity',
    status: 'live',
  },
  {
    slug: 'qr-code',
    name: 'QR Code Generator',
    description: 'Generate QR codes for any URL, text, email, phone, or WiFi. Download as PNG instantly.',
    category: 'productivity',
    status: 'live',
  },
  {
    slug: 'tip-calculator',
    name: 'Tip Calculator',
    description: 'Calculate tip and split the bill between any number of people with preset or custom percentages.',
    category: 'productivity',
    status: 'live',
  },
  // Text
  {
    slug: 'word-counter',
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and reading time instantly. Perfect for SEO copy, social posts, and essays.',
    category: 'text',
    status: 'live',
  },
  {
    slug: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text in seconds — choose paragraphs, words, or sentences on demand.',
    category: 'text',
    status: 'live',
  },
  {
    slug: 'case-converter',
    name: 'Case Converter',
    description: 'Switch between UPPERCASE, lowercase, Title Case, camelCase, snake_case and more in one click.',
    category: 'text',
    status: 'live',
  },
  // Code
  {
    slug: 'base64',
    name: 'Base64 Encoder / Decoder',
    description: 'Encode or decode any text or file to Base64 format instantly, entirely in your browser.',
    category: 'code',
    status: 'live',
  },
  {
    slug: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Prettify, minify, and validate JSON with syntax highlighting. No data ever leaves your browser.',
    category: 'code',
    status: 'live',
  },
  {
    slug: 'regex-tester',
    name: 'Regex Tester',
    description: 'Write, test, and debug regular expressions with live match highlighting and pattern explanations.',
    category: 'code',
    status: 'live',
  },
  // Media
  {
    slug: 'image-resizer',
    name: 'Image Resizer',
    description: 'Resize and compress images directly in your browser — no uploads, no servers, instant results.',
    category: 'media',
    status: 'live',
  },
  // Design
  {
    slug: 'color-picker',
    name: 'Color Picker',
    description: 'Pick colors, generate palettes, and convert between HEX, RGB, HSL and more.',
    category: 'design',
    status: 'live',
  },
  {
    slug: 'css-gradient',
    name: 'CSS Gradient Generator',
    description: 'Build beautiful CSS gradients visually and copy the code instantly. Linear, radial, and conic.',
    category: 'design',
    status: 'live',
  },
  // Fun & Random
  {
    slug: 'spin-wheel',
    name: 'Spin the Wheel',
    description: 'Enter any list of options and spin a wheel to pick a random winner. Perfect for giveaways and decisions.',
    category: 'fun',
    status: 'live',
  },
  {
    slug: 'dice-roller',
    name: 'Dice Roller',
    description: 'Roll D4, D6, D8, D10, D12, D20 or D100 — any number of dice. Great for RPG and board games.',
    category: 'fun',
    status: 'live',
  },
  {
    slug: 'coin-flip',
    name: 'Coin Flipper',
    description: 'Flip a virtual coin with a satisfying animation. Tracks your heads/tails history.',
    category: 'fun',
    status: 'live',
  },
  {
    slug: 'random-number',
    name: 'Random Number Generator',
    description: 'Generate random numbers with custom range, count, and no-duplicates option. Perfect for lotteries.',
    category: 'fun',
    status: 'live',
  },
  // Calculators
  {
    slug: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert length, weight, temperature, volume and area between metric and imperial units instantly.',
    category: 'convert',
    status: 'live',
  },
  {
    slug: 'age-calculator',
    name: 'Age Calculator',
    description: 'Enter a birthdate and get your exact age in years, months, days, weeks, hours — plus next birthday.',
    category: 'convert',
    status: 'live',
  },
  {
    slug: 'bmi-calculator',
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index in metric or imperial. Visual gauge with category interpretation.',
    category: 'convert',
    status: 'live',
  },
  // Security / Productivity
  {
    slug: 'password-generator',
    name: 'Password Generator',
    description: 'Generate strong, secure passwords with custom length, uppercase, lowercase, numbers and symbols.',
    category: 'productivity',
    status: 'live',
  },
  {
    slug: 'password-strength',
    name: 'Password Strength Checker',
    description: 'Check how secure your password is — locally in your browser. Nothing is ever sent anywhere.',
    category: 'productivity',
    status: 'live',
  },
  {
    slug: 'url-encoder',
    name: 'URL Encoder / Decoder',
    description: 'Encode and decode URLs and query strings instantly. Handles special characters and percent-encoding.',
    category: 'code',
    status: 'live',
  },
  // Math / Finance
  {
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    description: 'Calculate percentages, discounts, tax and percentage change. Three calculation modes.',
    category: 'convert',
    status: 'live',
  },
  {
    slug: 'loan-calculator',
    name: 'Loan Calculator',
    description: 'Calculate monthly payments, total interest and full cost of any loan or mortgage.',
    category: 'convert',
    status: 'live',
  },
  {
    slug: 'calorie-calculator',
    name: 'Calorie Calculator',
    description: 'Calculate your daily calorie needs (TDEE) based on age, height, weight and activity level.',
    category: 'convert',
    status: 'live',
  },
  // Time
  {
    slug: 'countdown',
    name: 'Countdown Timer',
    description: 'Count down to any future date or event. Add a name, pick presets like New Year or Summer.',
    category: 'productivity',
    status: 'live',
  },
  {
    slug: 'timezone-converter',
    name: 'Timezone Converter',
    description: 'Convert any date and time between world timezones. Add multiple target timezones at once.',
    category: 'productivity',
    status: 'live',
  },
  // Text
  {
    slug: 'text-diff',
    name: 'Text Diff',
    description: 'Compare two texts side by side and see additions and deletions highlighted line by line.',
    category: 'text',
    status: 'live',
  },
  {
    slug: 'morse-code',
    name: 'Morse Code Converter',
    description: 'Convert text to Morse code and back. Play the audio with real beeps in your browser.',
    category: 'fun',
    status: 'live',
  },
  // Design / Media
  {
    slug: 'aspect-ratio',
    name: 'Aspect Ratio Calculator',
    description: 'Calculate dimensions for any aspect ratio. Includes presets for social media, video and photo.',
    category: 'media',
    status: 'live',
  },
  {
    slug: 'color-palette',
    name: 'Color Palette Generator',
    description: 'Generate harmonious color palettes from any base color. Complementary, analogous, triadic and more.',
    category: 'design',
    status: 'live',
  },
];
