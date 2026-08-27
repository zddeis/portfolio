import { ReactNode } from 'react'
import { Mail, FileText } from 'lucide-react'
import { Github } from './icons'

export type Links = {
  source: string | null
  docs: string | null
  website: string | null
}

export type Project = {
  name: string
  tools: string[]
  timeline: string
  description: string
  longDescription: string
  images: string[] | null
  links: Links | null
  highlights: string[]
}

export const tools: Record<string, string> = {
  'Lua': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/lua/lua-original.svg',
  'C#': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg',
  'TailwindCSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  'Laravel': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg',
  'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg',
  'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg',
  'Redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg',
  '.NET': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg',
}

export const projects: Project[] = [
  {
    name: 'Ghota',
    tools: ['Laravel', 'React', 'PostgreSQL', 'Redis', 'Docker'],
    timeline: 'Jun 2026 - Now',
    description: 'Platform for creating communities, sharing knowledge, and learning together, where anyone can host a community.',
    longDescription: `
      Online platform where anyone can create, host, and grow their own community around a shared interest, expertise, or purpose.
      Creators can choose how their community operates: private for exclusive groups, paid for membership-based communities, or public and free for open communities. Create courses, organize lessons, share resources, and engage directly with members.
      The platform is designed to make community building and knowledge sharing accessible to everyone—from educators and creators to professionals, organizations, and niche interest groups. Hosts have the tools to build their own space, manage members, publish learning content, and create meaningful interactions, while members can discover communities, participate in discussions, and learn at their own pace.
    `,
    images: ["/portfolio/assets/project_images/Ghota.png"],
    links: {
      docs: null,
      source: null,
      website: 'https://ghota.io',
    },
    highlights: [
      'Public, private, and paid communities',
      'Community creation and management',
      'Courses and structured lessons',
      'Collaborative discussions and content sharing',
      'Membership and monetization tools',
    ],
  },
  {
    name: 'zdSharp',
    tools: ['C#', '.NET'],
    timeline: 'Jul 2024 - Dec 2025',
    description: 'A beginner-friendly, dynamically typed scripting language implemented in C# with an interpreter, standard library, and VS Code syntax extension.',
    longDescription: `
      ZD# is a compact, easy-to-learn programming language implemented in C# that focuses on readable syntax and rapid prototyping. It ships with an interpreter (zds.exe), runtime library (zds.dll), and a Visual Studio Code extension for syntax highlighting, making it simple to get started writing and running .zds scripts. ZD# supports variables with automatic type inference, functions, arrays and array helpers (map/filter/find), string utilities, math and trigonometry functions, control flow (if/else, while, for), console I/O, and basic runtime utilities like timestamps and constants
    `,
    images: ['/portfolio/assets/project_images/zdSharp.png'],
    links: {
      docs: 'https://zddeis.github.io/zdSharp_docs/',
      source: 'https://github.com/zddeis/zdSharp',
      website: null,
    },
    highlights: [
      'Beginner-friendly syntax designed for readability and quick learning.',
      'VS Code extension with syntax highlighting',
      'Distributed as an interpreter (zds.exe) with a separate runtime DLL and runtimeconfig.'
    ],
  },
  // {
  //   name: 'Project Name',
  //   tools: ['Tool_1', 'Tool_2', 'Tool_3'],
  //   timeline: 'Date - Date',
  //   description: 'Description',
  //   longDescription: `
  //     A longer, more detailed description of the project goes here. You can cover what it does, the problem it solves, the architecture, and anything else worth highlighting.
  //   `,
  //   images: null,
  //   links: {
  //     docs: null,
  //     source: null,
  //  },
  //   highlights: [
  //     'Highlight_1',
  //     'Highlight_2',
  //     'Highlight_3'
  //   ],
  // },
]

export type ContactItem = {
  name: string
  icon: ReactNode
  href: string
  tooltip?: string
}

export const contact: ContactItem[] = [
  {
    name: 'Email',
    icon: <Mail size={20} />,
    href: 'mailto:david.fcg07@gmail.com',
    tooltip: 'david.fcg07@gmail.com',
  },
  {
    name: 'GitHub',
    icon: <Github />,
    href: 'https://github.com/zddeis',
    tooltip: 'github.com/zddeis',
  },
  {
    name: 'Resume',
    icon: <FileText size={20} />,
    href: '/portfolio/resume.pdf',
  },
]

export const about = {
  name: 'David Gouveia',
  role: 'Software Developer',
  birthdate: new Date('2007-09-16'),
  location: 'Coimbra, Portugal',
}

export const getAge = () => {
  const now = new Date()
  let age = now.getFullYear() - about.birthdate.getFullYear()
  const m = now.getMonth() - about.birthdate.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < about.birthdate.getDate())) age--
  return age
}
