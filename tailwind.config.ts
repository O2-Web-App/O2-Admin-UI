// import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

module.exports = {
    darkMode: ["class"],
    content: [
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: "#559F34",
                "primary-light": {
                    DEFAULT: "#559F34",
                    10: "rgba(85, 159, 52, 0.1)",
                    70: "rgba(85, 159, 52, 0.7)",
                },
                secondary: "#7ECB2A",
                accent: "#0494FC",
                background_color: "#F8FAFC",
                card_color: "#FFFFFF",
                description: "#97A2B0",
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                },
                sidebar: {
                    DEFAULT: 'hsl(var(--sidebar-background))',
                    foreground: 'hsl(var(--sidebar-foreground))',
                    primary: 'hsl(var(--sidebar-primary))',
                    'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
                    accent: 'hsl(var(--sidebar-accent))',
                    'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
                    border: 'hsl(var(--sidebar-border))',
                    ring: 'hsl(var(--sidebar-ring))'
                }
            },
            fontSize: {
                heading: ["30px", "36px"],
                title: ["22px", "28px"],
                body: ["18px", "24px"],
                font_description: ["16px", "20px"],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            }
        },
        images: {
            domains: ["127.0.0.1"],
        },
    },
    plugins: [tailwindcssAnimate],
}