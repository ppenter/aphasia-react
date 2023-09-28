export const siteConfig = {
    locales: ['en', 'th'],
    defaultLocale: 'en',
    navMenu: [{
        title: "home",
        href: "/",
        emoji: "🏠"
    },
    {
        title: "settings",
        href: "/settings",
        emoji: "⚙️"
    }
]
}

export const mainMenu =  [
    {
        title: "iwant",
        img: "/images/menu/wave.png",
        href: "/iwant",
        list: [
            {
                "title": "eat",
                "img": "/images/menu/iwant/vegetarian.png",
                "speech": "I want to eat"
            },
            {
                "title": "drink",
                "img": "/images/menu/iwant/water-bottle.png",
                "speech": "I want to drink"
            },
            {
                "title": "get up",
                "img": "/images/menu/iwant/support.png",
                "speech": "I want to get up"
            },
            {
                "title": "rest",
                "img": "/images/menu/iwant/day.png",
                "speech": "I want to rest"
            },
            {
                "title": "toilet",
                "img": "/images/menu/iwant/toilet.png",
                "speech": "I want to use the restroom"
            }
        ]
    },
    {
        title: "ifeel",
        img: "/images/menu/feeling.png",
        href: "/ifeel",
        list: [
            {
                "title": "happy",
                "img": "/images/menu/iwant/day.png",
                "speech": "I feel happy"
            },
            {
                "title": "sad",
                "img": "/images/menu/iwant/day.png",
                "speech": "I feel sad"
            },
            {
                "title": "tired",
                "img": "/images/menu/iwant/day.png",
                "speech": "I feel tired"
            },
            {
                "title": "angry",
                "img": "/images/menu/iwant/day.png",
                "speech": "I feel angry"
            },
            {
                "title": "afraid",
                "img": "/images/menu/iwant/day.png",
                "speech": "I feel afraid"
            }
        ]
    },
    {
        title: "typetext",
        img: "/images/menu/chat.png",
        href: "/tts",
    },
    {
        title: "favorites",
        img: "/images/menu/heart.png",
        href: "/favorites",
    }
]