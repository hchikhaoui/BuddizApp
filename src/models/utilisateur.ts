import {Sortie} from './sortie'

export class Utilisateur{
  _id: string;
  userProfile: {userName: string, userMail: string};
  deviceTokens: Array<string>
  searches: Array<string>

  accessControl: {
    appRoles: Array<string>
    appGroups: Array<string>
    users: any
    groups: any
    permissions: Array<string>
  }
}
