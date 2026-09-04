'use strict'

window.FurinaSiteData = Object.freeze({
  guides: [
    {
      id: 'getting-started',
      title: 'Getting Started',
      category: 'beginner',
      icon: '✦',
      description:
        'Install Furina, open the panel, choose Essentials or Full Atelier, and learn the first five things worth trying.',
      href: 'getting-started.html',
      tags: ['install', 'essentials', 'beginner', 'setup']
    },
    {
      id: 'customization',
      title: 'Customization',
      category: 'visual',
      icon: '◈',
      description:
        'Themes, per-chat scope, backgrounds, live wallpapers, chat styling, atmosphere, entrance animations, languages and Custom CSS.',
      href: 'customization.html',
      tags: ['themes', 'backgrounds', 'wallpaper', 'css', 'language']
    },
    {
      id: 'immersion',
      title: 'Immersion',
      category: 'visual',
      icon: '☁',
      description:
        'Atmosphere effects, music and ambience, draggable stickers, Reader Mode and Focus Mode for individual conversations.',
      href: 'immersion.html',
      tags: [
        'atmosphere',
        'music',
        'soundcloud',
        'youtube',
        'stickers',
        'reader',
        'focus'
      ]
    },
    {
      id: 'director',
      title: 'Director',
      category: 'roleplay',
      icon: '🎬',
      description:
        'Persistent notes, next-reply direction, Guard Rails, narrative presets, Director Cues and knowledge boundaries.',
      href: 'director.html',
      tags: ['ooc', 'director', 'cues', 'guards', 'knowledge']
    },
    {
      id: 'continuity',
      title: 'Continuity',
      category: 'roleplay',
      icon: '◆',
      description:
        'Build a Continuity Vault, save memories, understand selective injection and keep long-running roleplays consistent.',
      href: 'continuity.html',
      tags: ['memory', 'continuity', 'vault', 'context', 'capture']
    },
    {
      id: 'story',
      title: 'Story Tools',
      category: 'roleplay',
      icon: '◒',
      description:
        'Scene State, scene presentation, recaps, Previously On, timeline events, snapshots, bookmarks, chapters and Story Bible workflows.',
      href: 'story.html',
      tags: ['scene', 'recap', 'timeline', 'snapshot', 'bookmarks', 'chapters']
    },
    {
      id: 'interfaces',
      title: 'Alternate Interfaces',
      category: 'interfaces',
      icon: '◇',
      description:
        'Learn Visual Novel Mode and Phantom Chat, what each interface changes, and where experimental limitations apply.',
      href: 'interfaces.html',
      tags: [
        'visual novel',
        'phantom',
        'interface',
        'portraits',
        'group scenes'
      ]
    },
    {
      id: 'response-styles',
      title: 'Response Styles',
      category: 'roleplay',
      icon: 'Aa',
      description:
        "Browse Furina's response-style library and learn how to copy a style into Clank's Custom Response Styles.",
      href: 'response-styles.html',
      tags: ['style', 'prompts', 'roleplay', '5000', 'copy']
    },
    {
      id: 'profile-atelier',
      title: 'Profile Atelier',
      category: 'visual',
      icon: '◎',
      description:
        'Connect one ClankWorld profile to Miyabi and customize its background, cards, effects, atmosphere and themes locally.',
      href: 'profile-atelier.html',
      tags: ['profile', 'miyabi', 'cards', 'themes', 'effects']
    },
    {
      id: 'sharing',
      title: 'Sharing & Portability',
      category: 'data',
      icon: '↗',
      description:
        'Theme exports, Full Setup packages, Story Bibles, profile settings, previews, merge/replace behavior and backups.',
      href: 'sharing.html',
      tags: ['export', 'import', 'json', 'backup', 'story bible', 'full setup']
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      category: 'support',
      icon: '?',
      description:
        "Fix common install, panel, wallpaper, media, state and experimental-interface problems, and understand Furina's boundaries.",
      href: 'troubleshooting.html',
      tags: ['help', 'bugs', 'diagnostics', 'reset', 'context invalidated']
    },
    {
      id: 'releases',
      title: 'Releases',
      category: 'support',
      icon: '↓',
      description:
        'Current download, release history, update notes and the version of Furina this documentation describes.',
      href: 'releases.html',
      tags: ['download', 'version', 'changelog', 'update', '1.3.1']
    }
  ],

  responseStyles: [
    [
      'general',
      '🎬',
      'Cinematic Roleplay',
      'Immersive, dramatic scenes with visual clarity, atmosphere, and strong pacing.'
    ],
    [
      'relationship',
      '🕯️',
      'Slow Burn',
      'Gradual trust, attraction, rivalry, intimacy, and believable emotional development.'
    ],
    [
      'pacing',
      '💬',
      'Dialogue Focused',
      'Conversation-forward RP with distinct voices, subtext, and lighter narration.'
    ],
    [
      'general',
      '✒',
      'Literary',
      'Rich prose, precise imagery, subtext, atmosphere, and restrained emotional writing.'
    ],
    [
      'genre',
      '☠',
      'Horror',
      'Threat, dread, survival, monsters, disturbing imagery, consequences, and escalating danger.'
    ],
    [
      'genre',
      '◉',
      'Psychological Horror',
      'Paranoia, ambiguity, unreliable perception, contradiction, and slowly destabilizing reality.'
    ],
    [
      'genre',
      '⚔',
      'Action',
      'Clear choreography, tactical continuity, injuries, momentum, and capable opposition.'
    ],
    [
      'genre',
      '☕',
      'Slice of Life',
      'Everyday interactions, routines, humor, comfort, and low-stakes character development.'
    ],
    [
      'group',
      '◫',
      'Ensemble / Group RP',
      'Distinct cast members, knowledge boundaries, group dynamics, and natural participation.'
    ],
    [
      'general',
      '▶',
      'Proactive Characters',
      'Independent characters with initiative, boundaries, opinions, and lives beyond the user.'
    ],
    [
      'general',
      '◇',
      'Character Study',
      'Deep characterization, contradictions, personal history, habits, flaws, and gradual self-revelation.'
    ],
    [
      'relationship',
      '✚',
      'Hurt / Comfort',
      'Vulnerability, recovery, care, boundaries, emotional aftermath, and earned reassurance.'
    ],
    [
      'relationship',
      '◒',
      'Angst',
      'Emotional conflict, regret, distance, grief, difficult choices, and consequences that linger.'
    ],
    [
      'relationship',
      '⌂',
      'Found Family',
      'Belonging, trust, household dynamics, chosen bonds, conflict, and gradually built familiarity.'
    ],
    [
      'relationship',
      '♡',
      'Cozy Romance',
      'Warm affection, everyday intimacy, playful chemistry, comfort, and relationship life.'
    ],
    [
      'relationship',
      '⚡',
      'Rivals / Enemies-to-Lovers',
      'Friction, competition, distrust, reluctant respect, chemistry, and gradual relationship change.'
    ],
    [
      'genre',
      '✦',
      'Dark Fantasy',
      'Dangerous magic, old worlds, moral ambiguity, supernatural consequences, and ominous atmosphere.'
    ],
    [
      'genre',
      '☺',
      'Comedy',
      'Character-driven humor, timing, awkward situations, escalation, and distinct comedic personalities.'
    ],
    [
      'genre',
      '⌕',
      'Mystery / Investigation',
      'Clues, suspects, deductions, evidence, false leads, and mysteries the user can genuinely investigate.'
    ],
    [
      'genre',
      '△',
      'Survival / Expedition',
      'Resources, weather, navigation, injuries, shelter, travel, and practical survival pressure.'
    ],
    [
      'genre',
      '↗',
      'Adventure / Exploration',
      'Discovery, travel, ruins, cultures, companions, landmarks, and a strong sense of journey.'
    ],
    [
      'story',
      '♜',
      'Political Intrigue',
      'Factions, leverage, alliances, reputation, secrets, negotiation, and competing interests.'
    ],
    [
      'general',
      '✓',
      'Canon Fidelity',
      'Prioritizes established canon personality, voice, abilities, relationships, worldview, and limitations.'
    ],
    [
      'pacing',
      '⚡',
      'Snappy / Reactive',
      'Shorter turns, quick back-and-forth, minimal filler, and frequent opportunities for the user to act.'
    ],
    [
      'genre',
      '!',
      'Suspense / Thriller',
      'Pressure, pursuit, deadlines, secrets, close calls, hidden motives, and escalating uncertainty.'
    ],
    [
      'story',
      '◎',
      'Living World',
      'Factions, cultures, institutions, background events, rumors, economies, and a world that moves without the user.'
    ],
    [
      'relationship',
      '✕',
      'Betrayal',
      'Broken trust, hidden motives, divided loyalties, consequences, guilt, anger, and difficult aftermath.'
    ],
    [
      'story',
      '▦',
      'Academy Focused',
      'Classes, clubs, rivalries, teachers, campus life, exams, friendships, and believable school routines.'
    ],
    [
      'story',
      '★',
      'Epic / High Stakes',
      'Wars, disasters, world-changing threats, difficult leadership, sacrifice, scale, and consequences.'
    ],
    [
      'genre',
      '⌛',
      'Historical / Period RP',
      'Period-aware society, technology, etiquette, institutions, language, and everyday life without textbook narration.'
    ],
    [
      'relationship',
      '♡',
      'Romantic Tension',
      'Chemistry, attraction, hesitation, subtext, near-moments, boundaries, and unresolved romantic possibility.'
    ],
    [
      'story',
      '◇',
      'Visual Novel',
      "Structured narration and speaker beats designed to pair with Furina's Visual Novel Interface."
    ]
  ].map(([category, icon, name, description]) => ({
    category,
    icon,
    name,
    description
  }))
})
