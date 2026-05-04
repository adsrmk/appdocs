import { defineConfig, type DefaultTheme } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// ─── Sidebar Guide ──────────────────────────────────────────────────────────

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Getting started',
      collapsed: false,
      items: [
        { text: 'Add Domain', link: 'add_domain' },
        { text: 'Setup DNS records', link: 'setup_dns' }
      ]
    },
    {
      text: 'Application(s)',
      collapsed: false,
      items: [
        { text: 'Users', link: 'users' },
        { text: 'File Manager', link: 'file_manager' },
        { text: 'Redirects', link: 'redirect' },
        { text: 'SSH Keys', link: 'SSH' },
        { text: 'Backups', link: 'backups' },
        { text: 'Database', link: 'database' },
        {
          text: 'Wordpress Toolkit',
          items: [
            { text: 'General', link: 'general' },
            { text: 'Plugins', link: 'plugins' },
            { text: 'Themes', link: 'themes' },
            { text: 'Users', link: 'wp_users' },
            { text: 'Debug', link: 'debug' }
          ]
        },
        {
          text: 'Email',
          items: [
            { text: 'Setup Mail DNS', link: 'setup_mail_records' },
            { text: 'Mailbox', link: 'mailbox' },
            { text: 'Forwarders', link: 'forwarders' },
            { text: 'Catch All', link: 'catchall' },
            { text: 'Spam Settings', link: 'spam_settings' },
            { text: 'Out of office', link: 'out_of_office' },
            { text: 'File Attachments', link: 'file_attachment' },
            { text: 'Add Mailbox to Gmail', link: 'gmail' },
            { text: 'Webmail', link: 'webmail' }
          ]
        }
      ]
    },
    {
      text: 'Security',
      collapsed: false,
      items: [
        { text: 'Setup 2FA', link: '2FA' },
        { text: 'DNSSEC', link: 'dnssec' },
        { text: 'Credentials', link: 'credentials' }
      ]
    },
    {
      text: 'Billing',
      collapsed: false,
      items: [
        { text: 'Payment methods', link: 'payments' },
        { text: 'Failed payment', link: 'failed-payment' },
        { text: 'VAT', link: 'VAT' }
      ]
    },
    {
      text: 'Wordpress',
      collapsed: false,
      items: [
        { text: 'Increase WP memory limit', link: 'wp_memory' },
        { text: 'Setup WP mail', link: 'wp_mail' },
        { text: 'Reset WP password', link: 'reset_admin_pass' },
        { text: 'Create or restore backup', link: 'ai1wm' },
        { text: 'Disable Cron jobs', link: 'cronjobs' }
      ]
    },
    {
      text: 'Issues',
      collapsed: false,
      items: [
        { text: 'ERR_CONN_REFUSED', link: 'ERR_CONNECTION_REFUSED' },
        { text: 'ERR_NOT_RESOLVED', link: 'ERR_NAME_NOT_RESOLVED' },
        { text: 'ERR_SSL_PROTOCOL', link: 'ERR_SSL_PROTOCOL_ERROR' },
        { text: 'Image upload error', link: 'Upload' },
        { text: 'Error Database Conn.', link: 'connection_db' },
        { text: 'ERR_502: Bad Gateway', link: '502' },
        { text: 'ERR_1015: Rate Limited', link: '1015' },
        { text: 'Requesting SSL', link: 'SSL' },
        { text: 'Elementor 500', link: 'elementor_500' },
        { text: 'Unable to access FTP', link: 'SFTP' }
      ]
    }
  ]
}

// ─── Sidebar Developers ─────────────────────────────────────────────────────

function sidebarDevelopers(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'General',
      items: [
        { text: 'WCAG', link: 'wcag' },
        { text: 'ARIA Roles', link: 'ARIA' },
        { text: 'Semantic HTML', link: 'semantic_html' }
      ]
    },
    {
      text: 'Developer Features',
      collapsed: false,
      items: [
        { text: 'IonCube loader', link: 'ioncube' },
        { text: 'PHP', link: 'php' },
        { text: 'Redis', link: 'redis' },
        {
          text: 'Web Dev Tools',
          items: [
            { text: 'Caniuse', link: 'caniuse' },
            { text: 'Accessibility', link: 'accessibility' },
            { text: 'Pagespeed Insights', link: 'psi' },
            { text: 'Search console', link: 'search_console' },
            { text: 'MDN HTTP', link: 'mdn_http' }
          ]
        }
      ]
    },
    {
      text: 'Web Security',
      collapsed: false,
      items: [
        { text: 'Reinstall WP core using CLI', link: 'wp_cli' },
        { text: 'Obfuscate Wordpress', link: 'obfuscate' },
        { text: 'Remove fingerprints and versions', link: 'hide_wp' },
        { text: 'Disable WP-Login', link: 'backend' },
        { text: 'Disable REST-API', link: 'rest_api' },
        { text: 'HTTP Headers', link: 'HTTP_security' },
        { text: 'CAPTCHA', link: 'captcha' },
        { text: 'Change Database Prefix', link: 'db_prefix' },
        { text: 'Idle Session Timeouts', link: 'session_timeout' },
        { text: 'Automatic Updates', link: 'auto_updates' },
        { text: 'Disable File Editing', link: 'disable_file' },
        { text: 'Block User Enumeration', link: 'block_user_enum' },
        { text: 'File Permissions', link: 'chmod' }
      ]
    },
    {
      text: 'SEO',
      collapsed: false,
      items: [
        { text: 'Schema Markup', link: 'schema' },
        { text: 'XML Sitemaps', link: 'sitemap' },
        { text: 'Indexing', link: 'indexing' }
      ]
    },
    {
      text: 'Performance',
      collapsed: false,
      items: [
        { text: 'Speculation Rules API', link: 'speculation_rules_api' },
        { text: 'Link Preloading', link: 'preloading' },
        { text: 'Dequeueing', link: 'dequeue' },
        {
          text: 'FCGI',
          items: [
            { text: 'FCGI', link: 'fastcgi' },
            { text: 'Preload FCGI Cache', link: 'preload_fcgi' }
          ]
        },
        { text: 'Formatting Images', link: 'image_formats' },
        { text: 'Optimizing Font', link: 'optimizing_font' },
        {
          text: 'Metrics',
          items: [
            { text: 'TTFB', link: 'ttfb' },
            { text: 'FCP/LCP', link: 'lcp' },
            { text: 'INP', link: 'inp' },
            { text: 'CLS', link: 'cls' }
          ]
        }
      ]
    }
  ]
}

// ─── Nav Items ──────────────────────────────────────────────────────────────

const navItems: DefaultTheme.NavItem[] = [
  { text: 'Guide', link: '/guide/2FA', activeMatch: '/(en-us/)?guide/' },
  { text: 'Developers', link: '/developers/wcag', activeMatch: '/(en-us/)?developers/' },
  { text: 'Whatsapp', link: 'https://api.whatsapp.com/send/?phone=31613332490' },
  { text: 'Status', link: 'https://status.oscloud.nl/' }
]

// ─── Main Config ────────────────────────────────────────────────────────────

export default withMermaid({
  title: 'OS Support',
  description: 'OSCloud Support Documentation',
  lang: 'nl-NL',
  cleanUrls: true,
  lastUpdated: true,
  appearance: false,


  locales: {
    root: {
      label: 'Nederlands',
      lang: 'nl-NL',
      dir: 'ltr'
    },
    'en-us': {
      label: 'English',
      lang: 'en-US',
      dir: 'ltr'
    }
  },

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/emblem48x48.png' }],
    ['meta', { name: 'theme-color', content: '#bc3411' }]
  ],

  themeConfig: {
    nav: navItems,

    siteTitle: false,
    logo: {
      src: '/OSCLO.png',
      alt: 'OSCloud Logo',
      link: '/'
    },

    sidebar: {
      '/guide/': { base: '/guide/', items: sidebarGuide() },
      '/developers/': { base: '/developers/', items: sidebarDevelopers() },
      '/en-us/guide/': { base: '/en-us/guide/', items: sidebarGuide() },
      '/en-us/developers/': { base: '/en-us/developers/', items: sidebarDevelopers() }
    },

    search: {
      provider: 'algolia',
      options: {
        appId: 'K0IFZQKPA9',
        apiKey: '240f46d06c9eb11ed5fba213c0f55bb5',
        indexName: 'Doc site'
      }
    },

    socialLinks: []
  }
})
