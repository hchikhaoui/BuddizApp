export class Carte {


    _id: string


    detailedInformation: {
      latitude: number,
      longitude: number,
      coordinates: Array<number>
      name: string,
      priceRange: number,
      useCase: Array<string>
    }
// providersData[0].copyrightImageSrc
    providersData:
      Array<{
        elementName: string,
        elementId: string,
        providerName: string,
        copyrightImageSrc: string,
        useCase: Array<string>
        lastUpdate: number
      }>

    associatedElementQualificationEntry: string

    brainScoring: {
      elementId: string,
      searchId: string,
      userId: string,
      requestQuery: string,
      userScoring: number
      requestScoring: number
      searchScoring: number
      action: string
    }









// id: number
// user_id: number
// user: string
// views: number
// likes: number
// comments: number
// favorites: number
// downloads: number
// type: string
// tags: Array<string>
// webformatHeight: number
// webformatWidth: number
// imageHeight: number
// imageWidth: number
// previewWidth: number
// pageURL: string
// previewURL: string
// webformatURL: string
}
