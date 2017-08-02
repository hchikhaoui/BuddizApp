// import {Carte} from './carte'
import {Elementt} from './elementt'

export class Sortie{
  accessControl:{
    userPermissionsOnApp:Array<string>,
    userPermissionsOnObject: Array<string>,
    users: any
  };
  _id:string;
  searchParameters:{
    useCase:string,
    useCaseParams: Array<{
      type: string,
      name: string,
      placeHolder: string,
      valueType: string,
      value: any,
      displayName: string,
      mapRequired: boolean,
      aroundUser: boolean,
      displayValue: string
      hidden: boolean,
      test: string
    }>
      isOpen:string,
      name:string,
      timeStamp: Date
    };
      elementSelected:Array<Elementt>;
      elementExcluded:Array<Elementt>;
      elementLiked:Array<Elementt>;
      elementDisliked:Array<Elementt>;
      created_At:Date
}






    // [
    //   {"type":"targetDate","name":"Date","placeHolder":"Quand ?","valueType":"datePicker","value":1500969176752},{"type":"location","name":"Adresse","placeHolder":"Où ?","valueType":"location","displayName":"","value":{"latitude":48.8898,"longitude":2.1586},"mapRequired":true,"aroundUser":true,"displayValue":""},{"hidden":true,"type":"useCase","name":"useCase","placeHolder":"Cas d'usage","valueType":"useCase","value":"places","test":"pouet"}
    // ],






// import { Carte } from './carte'

// export class Sortie {
//     id: number;
//     nom: string;
//     description: string;
//     date: String;
//     lieu: string;
//     cartes: Array<Carte>;
//     favoris: Array<Carte>
//   }
