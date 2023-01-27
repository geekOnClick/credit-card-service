export interface IPair {
    from: string;
    to: string;
    course?: number;
}

export interface INews {
    author?: string | null;
    content?: string | null;
    description: string;
    publishedAt?: string;
    source?: {
        id: string | null;
        name: string;
    };
    title: string;
    url: string;
    urlToImage: string;
}
