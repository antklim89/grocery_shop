

interface ImageFormat {
    // ext: string
    // hash: string
    // height: number
    // mime: string
    // name: string
    // path?: string
    // size: number
    url: string
    // width: number
}

export interface StrapiImage {
    alternativeText: string
    // caption: string
    // created_at: string
    // ext: string
    formats: {
        // large: ImageFormat
        // medium: ImageFormat
        // small: ImageFormat
        thumbnail: ImageFormat
    }
    // hash: string
    // height: number
    // id: number
    // mime: string
    // name: string
    // previewUrl: null
    // provider: string
    // provider_metadata: null
    // size: number
    // updated_at: string
    url: string
    // width: number
}
