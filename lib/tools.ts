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
];
