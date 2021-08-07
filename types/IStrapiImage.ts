

interface ImageFormat {
    url: string
}

export interface IStrapiImage {
    alternativeText: string
    formats: {
        thumbnail: ImageFormat
    }
    id: number
    url: string
}
