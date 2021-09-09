

interface ImageFormat {
    url: string
}

export type StripiFormatType = 'thumbnail'|'large'|'small'|'medium'

export interface IStrapiImage {
    alternativeText: string
    formats: Record<StripiFormatType, ImageFormat>
    id: number
    url: string
}
