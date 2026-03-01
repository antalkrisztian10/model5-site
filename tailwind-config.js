tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['"Plus Jakarta Sans"', 'sans-serif'],
            },
            colors: {
                brand: {
                    // rgb(var(--ch) / <alpha-value>) lets Tailwind opacity modifiers work
                    // e.g. bg-brand-navy/50  or  from-brand-navy/10
                    darkest:     'rgb(var(--brand-darkest-ch) / <alpha-value>)',
                    dark:        'rgb(var(--brand-dark-ch) / <alpha-value>)',
                    navy:        'rgb(var(--brand-navy-ch) / <alpha-value>)',
                    card:        'rgb(var(--brand-card-ch) / <alpha-value>)',
                    navylight:   'rgb(var(--brand-navylight-ch) / <alpha-value>)',
                    gray:        'rgb(var(--brand-navylight-ch) / <alpha-value>)', /* alias */
                    accent:      'rgb(var(--brand-accent-ch) / <alpha-value>)',
                    accentdark:  'rgb(var(--brand-accentdark-ch) / <alpha-value>)',
                    blue:        'rgb(var(--brand-blue-ch) / <alpha-value>)',
                    indigo:      'rgb(var(--brand-indigo-ch) / <alpha-value>)',
                    white:       'rgb(var(--brand-white-ch) / <alpha-value>)',
                    text:        'rgb(var(--brand-text-ch) / <alpha-value>)',
                    textlight:   'rgb(var(--brand-textlight-ch) / <alpha-value>)',
                    placeholder: 'rgb(var(--brand-placeholder-ch) / <alpha-value>)',
                }
            }
        }
    }
}
