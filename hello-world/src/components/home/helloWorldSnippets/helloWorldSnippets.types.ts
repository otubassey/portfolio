export type Snippet = {
    language: string | null,
    tabs: Tab[] | null
};

export type Tab = {
    filename: string,
    snippet: string
};
