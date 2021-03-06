﻿import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuggestionsPage } from '../pages/suggestions/suggestions';

import { Sortie } from '../models/sortie'
import { Carte } from '../models/carte'
import {Utilisateur} from '../models/utilisateur'

import { ViewController } from 'ionic-angular';
/**
 * Generated class for the ModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-criteria',
    templateUrl: 'fixer_criteres.html',
})
export class CriteriaPage {

public items: any
public utilisateur: Utilisateur = {
    _id: '',
    userProfile: {userName: '', userMail: ''},
    deviceTokens: [],
    searches: [],
    accessControl: {
      appRoles: [],
      appGroups: [],
      users: [],
      groups: [],
      permissions: []
    }
  }
public sortie: Sortie = {
    accessControl:{
    userPermissionsOnApp: [],
    userPermissionsOnObject: [],
    users: ''
  },
  _id: '',
  searchParameters:{
    useCase: '',
    useCaseParams: [], 
      isOpen: '',
       name: '',
      timeStamp: null
    },
      elementSelected: [],
      elementExcluded: [],
      elementLiked: [],
      elementDisliked: [],
      created_At: null
    }

constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    if(localStorage.getItem(navParams.get('user_id'))){
      this.utilisateur = JSON.parse(localStorage.getItem(navParams.get('user_id')));
    }
    // this.initializeItems();
}

itemTapped(event) {
    this.navCtrl.setRoot(SuggestionsPage, {
        user_id: this.utilisateur._id,
        search_name: this.sortie.searchParameters.name,
        search_useCase: this.sortie.searchParameters.useCase,
        search_created_At: this.sortie.created_At,
    });
    // this.viewCtrl.dismiss()
}

closeModal() {
  this.viewCtrl.dismiss();
}

ionViewDidLoad() {
    console.log('ionViewDidLoad CriteriaPage');
}

}


// initializeItems() {
//     this.items = [
//             "Colmar", "Haguenau", "Mulhouse", "Ribeauvillé", "Strasbourg", "Agen", "Bayonne", "Bergerac", "Biarritz", "Bordeaux", "Dax", "Lacq", "Libourne", "Mont-de-Marsan", "Pau", "Périgueux", "Pessac", "Saint-Jean-de-Luz", "Talence", "Aurillac", "Clermont-Ferrand", "Le Puy-en-Velay", "Montluçon", "Moulins", "Riom", "Vichy", "Alençon", "Arromanches", "Avranches", "Bayeux", "Bénouville", "Caen", "Cherbourg", "Courseulles", "    Coutances", "Deauville", "Falaise", "Grandcamp-Maisy", "Granville", "Honfleur", "Lisieux", "Ouistreham", "Saint-Lô", "Sainte-Marie-du-Mont", "Sainte-Mère-Église", "Trouville", "Auray", "Brest", "Carnac", "Dinan", "Dinard", "Douarnenez", "Fougères", "Guingamp", "Locmariaquer", "Lorient", "Morlaix", "Quimper", "Rennes", "Saint-Brieuc", "Saint-Malo", "Vannes", "Autun", "Auxerre", "Beaune", "Chalon-sur-Saône", "Cîteaux", "Cluny", "Dijon", "Le Creusot", "Mâcon", "Nevers", "Sens", "Vézelay", "Amboise", "Azay-le-Rideau", "Beaugency", "Blois", "Bourges", "Chambord", "Chartres", "Châteauroux", "Chenonceaux", "Chinon", "Dreux", "Langeais", "Loches", "Orléans", "Saint-Amand-Montrond", "Saint-Benoît-sur-Loire", "Sancerre", "Tours", "Vendôme", "Vierzon", "Villandry", "Châlons-en-Champagne", "Charleville-Mézières", "Chaumont", "Clairvaux", "Épernay", "Langres", "Reims", "Rocroi", "Saint-Dizier", "Sedan", "Troyes", "Ajaccio", "Bastia", "Bonifacio", "Corte", "Belfort", "Besançon", "Dole", "Lons-le-Saunier", "Montbéliard", "Vesoul", "Cayenne", "Kourou", "Mana", "Saint-Laurent du Maroni", "Basse-Terre", "Pointe-à-Pitre", "Dieppe", "Elbeuf", "Évreux", "Fécamp", "Gisors", "Jumièges", "Le Havre", "Le Petit-Quevilly", "Lillebonne", "Rouen", "Argenteuil", "Athis-Mons", "Champigny-sur-Marne", "Charenton-le-Pont", "Châtillon", "Chatou", "Chelles", "Clichy", "Colombes", "Corbeil-Essonnes", "Courbevoie", "Créteil", "Drancy", "Épinay-sur-Seine", "Étampes", "Évry", "Fontainebleau", "Fresnes", "Gagny", "Gennevilliers", "Issy-les-Moulineaux", "Ivry-sur-Seine", "Levallois-Perret", "Malakoff", "Meaux", "Melun", "Meudon", "Montreuil", "Montrouge", "Nanterre", "Nemours", "Neuilly-sur-Seine", "Paris", "Poissy", "Pontoise", "Provins", "Puteaux", "Rambouillet", "Rueil-Malmaison", "Saint-Cloud", "Saint-Denis", "Saint-Germain-en-Laye", "Saint-Maur-des-Fossés", "Saint-Ouen", "Sénart", "Sèvres", "Suresnes", "Versailles", "Villejuif", "Villeneuve-Saint-Georges", "Vincennes", "Viry-Châtillon", "Vitry-sur-Seine", "Aigues-Mortes", "Alès", "Beaucaire", "Béziers", "Carcassonne", "Mende", "Montpellier", "Narbonne", "Nîmes", "Perpignan", "Sète", "Aubusson", "Brive-la-Gaillarde", "Guéret", "Limoges", "Oradour-sur-Glane", "Saint-Yrieix-la-Perche", "Tulle", "Bar-le-Duc", "Domrémy-la-Pucelle", "Épinal", "Forbach", "Longwy", "Lunéville", "Lyon", "Metz", "Nancy", "Remiremont", "Saint-Dié", "Saint-Mihiel", "Thionville", "Toul", "Verdun", "Fort-de-France", "La Trinité", "Saint-Pierre", "Albi", "Auch", "Cahors", "Castres", "Foix", "Gavarnie", "Lourdes", "Millau", "Montauban", "Rocamadour", "Rodez", "Saint-Affrique", "Tarbes", "Toulouse", "Armentières", "Arras", "Béthune", "Boulogne", "Calais", "Cambrai", "Croix", "Douai", "Dunkirk", "Gravelines", "Henin-Beaumont", "Hesdin", "Le Touquet-Paris-Plage", "Lens", "Liévin", "Lille", "Marcq-en-Baroeul", "Maubeuge", "Roubaix", "Saint-Amand-les-Eaux", "Saint-Omer", "Tourcoing", "Valenciennes", "Wattrelos", "Angers", "Cholet", "Fontevrault-l’Abbaye", "La Baule-Escoublac", "La Roche-sur-Yon", "Laval", "Le Mans", "Nantes", "Rezé", "Saint-Nazaire", "Saumur", "Solesmes", "Abbeville", "Amiens", "Beauvais", "Chantilly", "Château-Thierry", "Compiègne", "Coucy", "Creil", "Ham", "Laon", "Noyon", "Saint-Quentin", "Senlis", "Soissons", "Angoulême", "Châtellerault", "Cognac", "La Rochelle", "Niort", "Poitiers", "Rochefort", "Aix-en-Provence", "Antibes", "Arles", "Aubagne", "Avignon", "Briançon", "Cannes", "Digne-les-Bains", "Fos", "Fréjus", "Gap", "Grasse", "Hyères", "La Seyne-sur-Mer", "Les Baux-de-Provence"
//     ];
// }

// getItems(ev) {
//     this.initializeItems();
//     var val = ev.target.value;
//     if (val && val.trim() != '') {
//         this.items = this.items.filter((item) => {
//             return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
//         })
//     }
// }