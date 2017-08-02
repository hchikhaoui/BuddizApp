
export class Elementt{
    accessControl:{
    userPermissionsOnApp: Array<string>,
    userPermissionsOnObject:Array<string>,
    };
    basicParameters:{
      name: string,
      description: string
    };
    detailedInformation:{
      coordinates: Array<number>,
      latitude:number,
      longitude:number,
      address:string,
      useCase: Array<string>,
      phoneNumber: string,
      website: string,
      rating: number
    };
      specificProviderData:{
        providerName: string,
        elementId: string
      };
      filterableCriterias: Array<any>;
      medias: Array<{
        type: string,
        value: string,
        attributions: Array<{
          uniqueName: Array<string>,
          website: Array<string>,
        }> 
      }>;
        comments: Array<{
          content: string,
          date: number,
          attributions: Array<{
            uniqueName: string,
            photo: string,
            date: Date,
            website: string,
            rating: number
          }>
        }>      
      _id: string
}

// [
    //   "element-global-read","interaction-global-list","search-admin-read","search-admin-update","search-global-create","search-global-list","search-global-read","search-global-update","search-invitation-create","search-invitation-read","search-result-read","search-suggestion-create","search-suggestion-list","search-suggestion-read","search-vote-create","search-vote-list","search-vote-read","usecase-global-list","usecase-global-read","user-global-list","user-global-read","user-global-update"
    // ],
      