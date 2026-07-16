import { defineConfig, type DefaultTheme } from 'vitepress'

const nlSidebar: DefaultTheme.Sidebar = [
  {
    text: 'Aan de slag',
    items: [
      { text: 'Welkom bij Heurs', link: '/aan-de-slag/welkom-voor-ondernemers' },
      { text: 'Organisatie inrichten', link: '/aan-de-slag/organisatie-inrichten' },
      { text: 'Veelgestelde vragen', link: '/aan-de-slag/veelgestelde-vragen' }
    ]
  },
  {
    text: 'Dashboard',
    items: [
      { text: 'Dashboard gebruiken', link: '/dashboard/ondernemersdashboard-gebruiken' },
      { text: 'Teaminzicht en bezetting', link: '/dashboard/teaminzicht-bekijken' }
    ]
  },
  {
    text: 'Medewerkers',
    items: [
      { text: 'Medewerker uitnodigen', link: '/medewerkers/medewerker-uitnodigen' },
      { text: 'Werknemersoverzicht', link: '/medewerkers/werknemersoverzicht-gebruiken' }
    ]
  },
  {
    text: 'Urenregistraties',
    items: [
      { text: 'Uren goedkeuren', link: '/urenregistraties/urenregistraties-goedkeuren' },
      { text: 'Ontbrekende uren opvolgen', link: '/urenregistraties/ontbrekende-uren-opvolgen' }
    ]
  },
  {
    text: 'Verlofbeheer',
    items: [
      { text: 'Aanvragen beoordelen', link: '/verlofbeheer/verlofaanvragen-beoordelen' },
      { text: 'Teambeschikbaarheid', link: '/verlofbeheer/teambeschikbaarheid-controleren' }
    ]
  },
  {
    text: 'Instellingen',
    items: [
      { text: 'Werkweek en bezetting', link: '/instellingen/werkweek-en-bezetting-instellen' },
      { text: 'Verlofbeleid', link: '/instellingen/verlofbeleid-instellen' },
      { text: 'Herinneringen en meldingen', link: '/instellingen/urenherinneringen-instellen' },
      { text: 'Beveiliging en 2FA', link: '/instellingen/beveiliging-en-2fa' }
    ]
  }
]

const enSidebar: DefaultTheme.Sidebar = [
  {
    text: 'Getting started',
    items: [
      { text: 'Welcome to Heurs', link: '/en/getting-started/welcome-for-employers' },
      { text: 'Set up your organization', link: '/en/getting-started/set-up-your-organization' },
      { text: 'Frequently asked questions', link: '/en/getting-started/frequently-asked-questions' }
    ]
  },
  {
    text: 'Dashboard',
    items: [
      { text: 'Use the dashboard', link: '/en/dashboard/use-the-employer-dashboard' },
      { text: 'Team insights and staffing', link: '/en/dashboard/view-team-insights' }
    ]
  },
  {
    text: 'Employees',
    items: [
      { text: 'Invite an employee', link: '/en/employees/invite-an-employee' },
      { text: 'Use the employee overview', link: '/en/employees/use-the-employee-overview' }
    ]
  },
  {
    text: 'Time registration',
    items: [
      { text: 'Approve registrations', link: '/en/time-registration/approve-time-registrations' },
      { text: 'Follow up missing hours', link: '/en/time-registration/follow-up-missing-hours' }
    ]
  },
  {
    text: 'Leave management',
    items: [
      { text: 'Review requests', link: '/en/leave-management/review-leave-requests' },
      { text: 'Check team availability', link: '/en/leave-management/check-team-availability' }
    ]
  },
  {
    text: 'Settings',
    items: [
      { text: 'Workweek and staffing', link: '/en/settings/configure-workweek-and-staffing' },
      { text: 'Leave policy', link: '/en/settings/configure-the-leave-policy' },
      { text: 'Reminders and notifications', link: '/en/settings/configure-time-reminders' },
      { text: 'Account security and 2FA', link: '/en/settings/secure-your-employer-account' }
    ]
  }
]

export default defineConfig({
  title: 'Heurs Support',
  cleanUrls: true,
  lastUpdated: true,
  appearance: true,
  locales: {
    root: {
      label: 'Nederlands',
      lang: 'nl-NL',
      title: 'Heurs Support',
      description: 'Handleidingen voor de Heurs workforce-app.'
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      title: 'Heurs Support',
      description: 'Guides for the Heurs workforce app.'
    }
  },
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/heurs-icon.png' }],
    ['meta', { name: 'theme-color', content: '#206bc4' }]
  ],
  themeConfig: {
    logo: { src: '/heurs-icon.png', alt: 'Heurs' },
    siteTitle: 'Heurs Support',
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: 'Zoeken', buttonAriaLabel: 'Zoeken' },
              modal: {
                noResultsText: 'Geen resultaten gevonden voor',
                resetButtonTitle: 'Zoekopdracht wissen',
                footer: { selectText: 'selecteren', navigateText: 'navigeren', closeText: 'sluiten' }
              }
            }
          }
        }
      }
    },
    locales: {
      root: {
        label: 'Nederlands',
        selectText: 'Talen',
        nav: [
          { text: 'Documentatie', link: '/' },
          { text: 'Contact', link: 'mailto:support@heurs.nl' }
        ],
        sidebar: nlSidebar,
        outline: { label: 'Op deze pagina' },
        docFooter: { prev: 'Vorige', next: 'Volgende' },
        lastUpdated: { text: 'Laatst bijgewerkt' },
        sidebarMenuLabel: 'Menu',
        returnToTopLabel: 'Terug naar boven',
        darkModeSwitchLabel: 'Thema'
      },
      en: {
        label: 'English',
        selectText: 'Languages',
        nav: [
          { text: 'Documentation', link: '/en/' },
          { text: 'Contact', link: 'mailto:support@heurs.nl' }
        ],
        sidebar: enSidebar,
        outline: { label: 'On this page' },
        docFooter: { prev: 'Previous', next: 'Next' },
        lastUpdated: { text: 'Last updated' },
        sidebarMenuLabel: 'Menu',
        returnToTopLabel: 'Return to top',
        darkModeSwitchLabel: 'Theme'
      }
    },
    socialLinks: []
  }
})
