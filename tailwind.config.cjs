const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: 'class',
    plugins: [
        require('tailwind-capitalize-first-letter')
    ],
    theme: {
        screens: {
            // Mui aligned
            'xsm': { 'min': '0px', 'max': '599px' },

            'sm': '600px',

            'md': '900px',

            'lg': '1200px',

            'xl': '1536px',

            'xxl': '1921px',

            'print': { 'raw': 'print' }, // add support for print: -prefix 
        },

        extend: {
            fontWeight: {
                bold: 600
            },
            fontFamily: {
                'sans': ['Inter', ...defaultTheme.fontFamily.sans],
            },
            scale: {
                'flip': '-1'
            },
            transitionProperty: {
                'height': 'height',
                'width': 'width',
                'spacing': 'margin, padding',
                'margin': 'margin',
                'padding': 'padding',
            },
            keyframes: {
                bounceScale: {
                    '0%': { transform: 'scale(0)' },
                    '50%': { transform: 'scale(1.1)' },
                    '100%': { transform: 'scale(1)' },
                },
                bounceUp: {
                    '0%': { transform: 'translateY(150px)', opacity: '0' },
                    '50%': { transform: 'translateY(-10px)', opacity: '0.5' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                }
            },
            animation: {
                bounceScale: 'bounceScale 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                bounceUp: 'bounceUp 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                fadeIn: 'fadeIn 1s ease-in-out',
            },
            colors: {
                primary: {
                    [900]: '#191B38',
                    [800]: '#2B2D55',
                    [700]: '#3C3F80',
                    [600]: '#3C40B4',
                    [500]: '#5462CF',
                    [400]: '#7387DD',
                    [300]: '#9BB1E9',
                    [200]: '#C0CEF2',
                    [100]: '#DCE5F9',
                    [50]: '#F2F5FC',
                },
                secondary: {
                    dark: '#232958',
                    DEFAULT: '#5867dd',
                    light: '#8290ff'
                },
                background: {
                    light: "#f9fafe",
                    DEFAULT: "#F6F7F9",
                    dark: "#edf0f5",
                },
                gray: {
                    [900]: '#0F172A',
                    [800]: '#1E293B',
                    [700]: '#334155',
                    [600]: '#475569',
                    [500]: '#64748B',
                    [400]: '#94A3B8',
                    [300]: '#CBD5E1',
                    [200]: '#E2E8F0',
                    [100]: '#F1F5F9',
                    [50]: '#F7F9FD',
                },
                grey: {
                    ...colors.gray,
                    light: colors.gray[300],
                    DEFAULT: colors.gray[500],
                    dark: colors.gray[800],
                },
                red: {
                    [900]: '#7D1C46',
                    [800]: '#971C4D',
                    [700]: '#B41D54',
                    [600]: '#D52A66',
                    [500]: '#EA4879',
                    [400]: '#F47698',
                    [300]: '#F8AABE',
                    [200]: '#FBD0DA',
                    [100]: '#FDE7EC',
                    [50]: '#FEF1F4',
                },
                orange: {
                    ...colors.orange,
                    light: colors.orange[300],
                    DEFAULT: colors.orange[500],
                    dark: colors.orange[800],
                },
                yellow: {
                    [900]: '#7A350D',
                    [800]: '#943E0C',
                    [700]: '#B75206',
                    [600]: '#DD7602',
                    [500]: '#F99E07',
                    [400]: '#FFC020',
                    [300]: '#FFD54F',
                    [200]: '#FFE688',
                    [100]: '#FFF4C6',
                    [50]: '#FFFBEB',
                },
                green: {
                    [900]: '#184946',
                    [800]: '#175853',
                    [700]: '#176E66',
                    [600]: '#18897E',
                    [500]: '#21AB9B',
                    [400]: '#3AC7B4',
                    [300]: '#56DBC5',
                    [200]: '#A0EFDF',
                    [100]: '#D0F7EF',
                    [50]: '#F1FCF9',
                },
                teal: {
                    [900]: '#0F4B6B',
                    [800]: '#0B5B81',
                    [700]: '#086A9C',
                    [600]: '#0986C0',
                    [500]: '#16A7E1',
                    [400]: '#55C6F3',
                    [300]: '#81D4F8',
                    [200]: '#BCE6FB',
                    [100]: '#E1F3FD',
                    [50]: '#F1F9FE',
                },
                white: colors.white,
                blue: {
                    ...colors.blue,
                    light: colors.blue[300],
                    DEFAULT: colors.blue[500],
                    dark: colors.blue[800],
                },
                indigo: {
                    ...colors.indigo,
                    light: colors.indigo[300],
                    DEFAULT: colors.indigo[500],
                    dark: colors.indigo[800],
                },
                purple: {
                    [900]: '#251D7A',
                    [800]: '#3A3093',
                    [700]: '#584CB7',
                    [600]: '#7D6FDB',
                    [500]: '#A798FF',
                    [400]: '#BEB1FF',
                    [300]: '#CCC1FF',
                    [200]: '#DDD5FF',
                    [100]: '#EEEAFF',
                },
                pumpkin: {
                    [900]: '#7A161C',
                    [800]: '#932825',
                    [700]: '#B7473B',
                    [600]: '#DB6C56',
                    [500]: '#FF9777',
                    [400]: '#FFB899',
                    [300]: '#FFCCAD',
                    [200]: '#FFE1C8',
                    [100]: '#FFEAE4',
                    [50]: '#FFF6F4',
                },
                pink: {
                    ...colors.pink,
                    light: colors.pink[300],
                    DEFAULT: colors.pink[500],
                    dark: colors.pink[800],
                },
                disabled: {
                    light: 'rgba(0, 0, 0, 0.26)',
                    DEFAULT: 'rgba(0, 0, 0, 0.38)'
                }
            },
        }
    }
}
