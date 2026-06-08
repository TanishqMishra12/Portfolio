const fs = require('fs');

const file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

// Imports
content = content.replace(/import \{([\s\S]*?)Terminal as TerminalIcon,/g, 'import {\n  Sun,\n  Moon,\n$1Terminal as TerminalIcon,');

// Hooks and Toggle
const appHooks = `export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);`;

content = content.replace('export default function App() {', appHooks);

const toggleButton = `      {/* Global Scanline */}
      <button 
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/80 dark:bg-black/80 border border-neutral-300 dark:border-neutral-800 backdrop-blur-md text-black dark:text-white hover:border-red-500/50 hover:text-red-500 dark:hover:border-red-500/50 dark:hover:text-red-500 transition-all shadow-xl group"
      >
        {isDarkMode ? <Sun className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" /> : <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-500" />}
      </button>`;

content = content.replace('{/* Global Scanline */}', toggleButton);

// Color Replacements
const replacements = [
  { search: /bg-\[#0a0a0a\]/g, replace: 'bg-neutral-50 dark:bg-[#0a0a0a]' },
  { search: /bg-\[#0d0d0d\]/g, replace: 'bg-neutral-100 dark:bg-[#0d0d0d]' },
  { search: /text-white/g, replace: 'text-black dark:text-white' },
  { search: /text-\[#f0ede8\]/g, replace: 'text-neutral-900 dark:text-[#f0ede8]' },
  { search: /border-neutral-800/g, replace: 'border-neutral-300 dark:border-neutral-800' },
  { search: /border-neutral-900/g, replace: 'border-neutral-200 dark:border-neutral-900' },
  { search: /bg-black\/50/g, replace: 'bg-white/50 dark:bg-black/50' },
  { search: /bg-black\/60/g, replace: 'bg-white/60 dark:bg-black/60' },
  { search: /bg-black\/80/g, replace: 'bg-white/80 dark:bg-black/80' },
  { search: /bg-black/g, replace: 'bg-white dark:bg-black' },
  { search: /text-neutral-400/g, replace: 'text-neutral-600 dark:text-neutral-400' }
];

// Special care for "bg-black text-white" to avoid duplicate classes
// Actually, they will just become "bg-white dark:bg-black text-black dark:text-white" which is fine.

for (const rule of replacements) {
  content = content.replace(rule.search, rule.replace);
}

fs.writeFileSync(file, content);
console.log('App.tsx refactored successfully.');
