/** @type {import('tailwindcss').Config} */


/**
 * Tokens de cor do B2B Orgafarma (extraídos de orgafarma/vendas).
 *
 * - brand  → escala azul-petróleo usada em todo o app (no projeto original
 *            ela sobrescreve `emerald`; aqui o alias é mantido para que
 *            markup copiado com `emerald-*` continue igual).
 * - navy   → azul-marinho dos headers, gradientes e telas de auth.
 * - accent → azuis de destaque (login, busca, links).
 * - gray   → neutro padrão do Tailwind (base de todo o admin dark).
 * - status → sucesso / perigo / alerta / info.
 */
const brand = {
    50:  '#f0f7fa',
    100: '#daeef5',
    200: '#b5dcea',
    300: '#8fcadf',
    400: '#72abc1', // cor principal da marca
    500: '#5a96ae',
    600: '#4a82a0',
    700: '#3a6e8c',
    800: '#2a5a78',
    900: '#1a4664',
    950: '#102a3c',
    DEFAULT: '#72abc1',
};

const navy = {
    400: '#1f4e8f', // brilho do gradiente radial
    500: '#1a3d6e', // fim do gradiente dos cards/headers
    600: '#1b2a55', // barra de navegação do portal
    700: '#0f2744', // azul-marinho principal
    800: '#0c1f3d', // início do gradiente das telas de auth
    850: '#0a1c34',
    900: '#071528',
    950: '#030c18',
    DEFAULT: '#0f2744',
};

module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/**/*", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // fontFamily: {
      //     sans:       ['Montserrat', ...defaultTheme.fontFamily.sans],
      //     montserrat: ['Montserrat', ...defaultTheme.fontFamily.sans],
      //     inter:      ['Inter', ...defaultTheme.fontFamily.sans],
      // },

      colors: {
          brand,
          emerald: brand, // compatibilidade com o app original
          navy,

          // gray: colors.gray,

          accent: {
              DEFAULT: '#2f7bff', // destaques de texto (login)
              search:  '#3483fa', // foco de busca / ícones
          },

          promo: {
              DEFAULT: '#ee4d2d', // preços promocionais / combos
              orange:  '#ff7337',
          },

          success: {
              50:  '#f0fdf4',
              DEFAULT: '#16a34a',
              light: '#10b981',
              dark:  '#059669',
              deep:  '#15803d',
          },
          danger: {
              50:  '#fef2f2',
              200: '#fca5a5',
              DEFAULT: '#dc2626',
          },
          warning: {
              50:  '#fffbeb',
              100: '#fef3c7',
              200: '#fde68a',
              DEFAULT: '#d97706',
              light: '#f59e0b',
              dark:  '#b45309',
          },
          info: {
              50:  '#eff6ff',
              DEFAULT: '#3b82f6',
          },

          surface: {
              DEFAULT: '#ffffff',
              muted:   '#f8fafc',
              subtle:  '#f3f4f6',
          },
          line: {
              DEFAULT: '#e5e7eb', // bordas padrão
              soft:    '#e4e7f0', // bordas de inputs/cards do portal
          },
          ink: {
              DEFAULT: '#111827', // texto principal
              soft:    '#374151',
              muted:   '#6b7280',
              faint:   '#9ca3af',
              ghost:   '#c0c0c0', // rótulos discretos
          },

          whatsapp: '#25d366',
      },

      backgroundImage: {
          'navy-card':   'linear-gradient(135deg, #0f2744 0%, #1a3d6e 100%)',
          'navy-bar':    'linear-gradient(135deg, #0f2744, #1b2a55)',
          'navy-auth':   'linear-gradient(150deg, #0c1f3d 0%, #071528 60%, #030c18 100%)',
          'navy-radial': 'radial-gradient(120% 160% at 78% -20%, #1f4e8f 0%, #0f2744 55%, #0a1c34 100%)',
      },
    },
  },
  plugins: [],
}