import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ImageFile } from '../../models/imageFile';


@Injectable()
export class SaveDeleteImageFirebase {
  public imgURL: string;
  public imageUid: string;

  constructor() {
    //Construtor vazio
  }

  async saveImageAndReturnPath(pathReference: string, imageName: string, imageBase64ToSave: any): Promise<ImageFile> {

    //Caminho + Nome da Imagem no firebase (Ex. imagens/arquivo.jpg)
    var fullPath = pathReference + imageName;

    //Actually upload file to Firestore now
    const storageRef: firebase.storage.Reference = firebase.storage().ref(fullPath);
    const uploadTask: firebase.storage.UploadTask = storageRef.putString(imageBase64ToSave, 'base64');

    var imageDetail = {} as ImageFile;

    //After uploading the file
    return uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {

        //Fetch the download URL of the Storage file
        return uploadSnapshot.ref.getDownloadURL().then((downloadURL) => {

          //imageDetail.imageFileName =
          //console.log('uploadSnapshot.ref.getMetadata()');
          //console.log(uploadSnapshot.ref.getMetadata());

          return uploadSnapshot.ref.getMetadata().then(metadataImage => {
            this.imgURL = downloadURL;

            imageDetail.imageContentType = metadataImage.contentType;
            imageDetail.imageSize = metadataImage.size;
            imageDetail.urlImagem = downloadURL;
            imageDetail.imageDateTimeCreate = metadataImage.timeCreated;
            imageDetail.imageUid = metadataImage.name;

            return imageDetail;
          });

        })
    });

    //return this.imgURL;
  }

  async deleteImageFirebase(pathReference: string, nameImage: string): Promise<boolean> {
    //Caminho + Nome da Imagem no firebase (Ex. imagens/arquivo.jpg)
    var fullPath = pathReference + nameImage;

    var retorno: boolean = false;

    // Create a reference to the file to delete
    // Create a storage reference from our storage service
    var desertRef = firebase.storage().ref().child(fullPath);
    //return true;


    // Delete the file
    return desertRef.delete().then(function() {
      retorno = true;
      return retorno;
    }).catch(function(error) {
      return retorno;
      // Uh-oh, an error occurred!
    });
    //return retorno;
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
