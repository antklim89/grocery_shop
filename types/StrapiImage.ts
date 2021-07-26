

interface ImageFormat {
    url: string
}

export interface StrapiImage {
    alternativeText: string
    formats: {
        thumbnail: ImageFormat
    }
    id: number
    url: string
}
