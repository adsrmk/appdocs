import { defineConfig, type DefaultTheme } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

const nlWorkforce: DefaultTheme.SidebarItem[] = [
  {
    "text": "Dashboard",
    "collapsed": false,
    "items": [
      {
        "text": "Het ondernemersdashboard gebruiken",
        "link": "ondernemersdashboard-gebruiken"
      },
      {
        "text": "Teaminzicht en bezetting bekijken",
        "link": "teaminzicht-bekijken"
      }
    ]
  },
  {
    "text": "Medewerkers",
    "collapsed": false,
    "items": [
      {
        "text": "Een medewerker uitnodigen",
        "link": "medewerker-uitnodigen"
      },
      {
        "text": "Het werknemersoverzicht gebruiken",
        "link": "werknemersoverzicht-gebruiken"
      }
    ]
  },
  {
    "text": "Urenregistraties",
    "collapsed": false,
    "items": [
      {
        "text": "Urenregistraties goedkeuren",
        "link": "urenregistraties-goedkeuren"
      },
      {
        "text": "Ontbrekende uren opvolgen",
        "link": "ontbrekende-uren-opvolgen"
      }
    ]
  },
  {
    "text": "Verlofbeheer",
    "collapsed": false,
    "items": [
      {
        "text": "Verlofaanvragen beoordelen",
        "link": "verlofaanvragen-beoordelen"
      },
      {
        "text": "Teambeschikbaarheid controleren",
        "link": "teambeschikbaarheid-controleren"
      }
    ]
  }
]
const nlOrganization: DefaultTheme.SidebarItem[] = [
  {
    "text": "Aan de slag",
    "collapsed": false,
    "items": [
      {
        "text": "Welkom bij Heurs voor ondernemers",
        "link": "welkom-voor-ondernemers"
      },
      {
        "text": "Je organisatie inrichten",
        "link": "organisatie-inrichten"
      }
    ]
  },
  {
    "text": "Instellingen",
    "collapsed": false,
    "items": [
      {
        "text": "Werkweek en bezetting instellen",
        "link": "werkweek-en-bezetting-instellen"
      },
      {
        "text": "Verlofbeleid instellen",
        "link": "verlofbeleid-instellen"
      },
      {
        "text": "Urenherinneringen en meldingen instellen",
        "link": "urenherinneringen-instellen"
      },
      {
        "text": "Je ondernemersaccount beveiligen",
        "link": "beveiliging-en-2fa"
      }
    ]
  },
  {
    "text": "Hulp",
    "collapsed": false,
    "items": [
      {
        "text": "Veelgestelde vragen voor ondernemers",
        "link": "veelgestelde-vragen"
      }
    ]
  }
]
const enWorkforce: DefaultTheme.SidebarItem[] = [
  {
    "text": "Dashboard",
    "collapsed": false,
    "items": [
      {
        "text": "Use the employer dashboard",
        "link": "ondernemersdashboard-gebruiken"
      },
      {
        "text": "View team insights and staffing",
        "link": "teaminzicht-bekijken"
      }
    ]
  },
  {
    "text": "Employees",
    "collapsed": false,
    "items": [
      {
        "text": "Invite an employee",
        "link": "medewerker-uitnodigen"
      },
      {
        "text": "Use the employee overview",
        "link": "werknemersoverzicht-gebruiken"
      }
    ]
  },
  {
    "text": "Time registration",
    "collapsed": false,
    "items": [
      {
        "text": "Approve time registrations",
        "link": "urenregistraties-goedkeuren"
      },
      {
        "text": "Follow up on missing hours",
        "link": "ontbrekende-uren-opvolgen"
      }
    ]
  },
  {
    "text": "Leave management",
    "collapsed": false,
    "items": [
      {
        "text": "Review leave requests",
        "link": "verlofaanvragen-beoordelen"
      },
      {
        "text": "Check team availability",
        "link": "teambeschikbaarheid-controleren"
      }
    ]
  }
]
const enOrganization: DefaultTheme.SidebarItem[] = [
  {
    "text": "Getting started",
    "collapsed": false,
    "items": [
      {
        "text": "Welcome to Heurs for employers",
        "link": "welkom-voor-ondernemers"
      },
      {
        "text": "Set up your organization",
        "link": "organisatie-inrichten"
      }
    ]
  },
  {
    "text": "Settings",
    "collapsed": false,
    "items": [
      {
        "text": "Configure the workweek and staffing target",
        "link": "werkweek-en-bezetting-instellen"
      },
      {
        "text": "Configure the leave policy",
        "link": "verlofbeleid-instellen"
      },
      {
        "text": "Configure time reminders and notifications",
        "link": "urenherinneringen-instellen"
      },
      {
        "text": "Secure your employer account",
        "link": "beveiliging-en-2fa"
      }
    ]
  },
  {
    "text": "Help",
    "collapsed": false,
    "items": [
      {
        "text": "Frequently asked questions for employers",
        "link": "veelgestelde-vragen"
      }
    ]
  }
]

const nlTheme: DefaultTheme.Config = {
  siteTitle: 'Heurs Support',
  logo: '/heurs-icon.png',
  nav: [
    { text: 'Workforce', link: '/workforce/', activeMatch: '^/workforce/' },
    { text: 'Organisatie', link: '/organization/', activeMatch: '^/organization/' },
    { text: 'Contact', link: 'mailto:support@heurs.nl' }
  ],
  sidebar: {
    '/workforce/': { base: '/workforce/', items: nlWorkforce },
    '/organization/': { base: '/organization/', items: nlOrganization }
  },
  search: { provider: 'local' },
  outline: { label: 'Op deze pagina' },
  lastUpdated: { text: 'Laatst bijgewerkt' },
  docFooter: { prev: 'Vorige pagina', next: 'Volgende pagina' },
  sidebarMenuLabel: 'Menu',
  returnToTopLabel: 'Terug naar boven',
  socialLinks: []
}

const enTheme: DefaultTheme.Config = {
  siteTitle: 'Heurs Support',
  logo: '/heurs-icon.png',
  nav: [
    { text: 'Workforce', link: '/en-us/workforce/', activeMatch: '^/en-us/workforce/' },
    { text: 'Organization', link: '/en-us/organization/', activeMatch: '^/en-us/organization/' },
    { text: 'Contact', link: 'mailto:support@heurs.nl' }
  ],
  sidebar: {
    '/en-us/workforce/': { base: '/en-us/workforce/', items: enWorkforce },
    '/en-us/organization/': { base: '/en-us/organization/', items: enOrganization }
  },
  search: { provider: 'local' },
  outline: { label: 'On this page' },
  lastUpdated: { text: 'Last updated' },
  docFooter: { prev: 'Previous page', next: 'Next page' },
  sidebarMenuLabel: 'Menu',
  returnToTopLabel: 'Return to top',
  socialLinks: []
}

export default withMermaid(defineConfig({
  title: 'Heurs Support',
  description: 'Bilingual support documentation for the Heurs workforce app.',
  lang: 'nl-NL',
  cleanUrls: true,
  lastUpdated: true,
  appearance: false,
  locales: {
    root: { label: 'Nederlands', lang: 'nl-NL', link: '/', themeConfig: nlTheme },
    'en-us': { label: 'English', lang: 'en-US', link: '/en-us/', themeConfig: enTheme }
  },
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/heurs-icon.png' }],
    ['meta', { name: 'theme-color', content: '#f8cf00' }]
  ]
}))
