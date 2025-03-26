export type PayloadType = {
    email: string
    userId: number
    artisteId?: number
}

export type Enable2FAType = {
    secret: string
}