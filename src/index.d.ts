export type TBabel = {
    transform: (temp: string, options: object) => ({
        code?: string
    })
};