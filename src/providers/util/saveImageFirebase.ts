import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { FirebaseApp } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable()
export class SaveImageFirebase {
  public imgURL: string;

  constructor(private fb: FirebaseApp, private angFireStore: AngularFirestore) {
    //Construtor vazio
  }

  async saveImageAndReturnPath(pathReference: string, imageName: string, imageBase64ToSave: any): Promise<string> {

    //Caminho + Nome da Imagem no firebase (Ex. imagens/arquivo.jpg)
    var fullPath = pathReference + imageName;

    //Actually upload file to Firestore now
    const storageRef: firebase.storage.Reference = firebase.storage().ref(fullPath);
    const uploadTask: firebase.storage.UploadTask = storageRef.putString(imageBase64ToSave, 'base64');

    //After uploading the file
    return uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {

        //Fetch the download URL of the Storage file
        return uploadSnapshot.ref.getDownloadURL().then((downloadURL) => {

        // console.log(imageUrlReturn);
        //Now create the Firestore entry
        /* this.afs.doc(path).set({
        FileName: uploadSnapshot.metadata.name,
        FileContentType: uploadSnapshot.metadata.contentType,
        FileSize: uploadSnapshot.metadata.size,
        FileURL: downloadURL,
        FileTimeCreated: uploadSnapshot.metadata.timeCreated,
        })
        */

        this.imgURL = downloadURL;

        return downloadURL;
        })
    });

    //return this.imgURL;
  }

  public generateUUID(): any {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

}
