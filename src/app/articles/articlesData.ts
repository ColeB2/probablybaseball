export interface PageLinkType {
    title: string;
    href: string;
    desc: string;
    titleOnly?: boolean;
}

const articles: PageLinkType[] = [
    {
        title: "Strikeouts - Baseballs Chase for Ineptitude", 
        href:'#',
        // href: "/articles/strikeout-progression",
        desc: "Strikeouts have reshaped the modern game - but how did we get here?",
    },
]

export {
    articles,
}