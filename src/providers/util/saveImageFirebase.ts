import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase';


@Injectable()
export class SaveImageFirebase {
  private imgPathFirebase: string = '/images/';


  constructor(private camera: Camera,
              private fb: FirebaseApp,
              private angFireAuth: AngularFireAuth) {


  }

  async saveImageAndReturnPath(pathReference: string, imageName: string, imageBase64ToSave: string) {

    var imageUrlReturn: string = '';

    // imagesNews/FLYER_02.png
    //pathReference = 'imagesNews/';
    //imageName = 'FLYER_02.png';

    //Caminho + Nome da Imagem no firebase (Ex. imagens/arquivo.jpg)
    var fullPath = pathReference + imageName;

    // Get a reference to the storage service, which is used to create references in your storage bucket
    var storage = firebase.storage();

    // Create a storage reference from our storage service
    //Criando uma referência ao seu local no Firebase
    var storageRef = storage.ref();

    // Create a child reference
    //Buscando na "entidade" definida por você (ex: tipo nome da tabela)
    var imagesRef = storageRef.child(pathReference);

    // Child references can also take paths delimited by '/'
    //Neste momento pode buscar diretamente o nome de uma imagem caso ja saiba
    var spaceRef = storageRef.child(pathReference + imageName);

    // Reference's path is: 'images/space.jpg'
    // This is analogous to a file path on disk
    // console.log(spaceRef.fullPath);

    // Reference's name is the last segment of the full path: 'space.jpg'
    // This is analogous to the file name
    //console.log(spaceRef.name);

    // Reference's bucket is the name of the storage bucket where files are stored
    //console.log(spaceRef.bucket);

    //Setando informação do local e nome a ser salvo - putString insere o arquivo em base64
    let taskSave = storageRef.child(fullPath).putString('', 'base64');

    taskSave.on(firebase.storage.TaskEvent.STATE_CHANGED),
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      console.log(progress + "% done");
    },
    (error) => {
      console.log(error)
    },
    () => {
      imageUrlReturn = taskSave.snapshot.downloadURL;
    }

    return imageUrlReturn;
  }
}
