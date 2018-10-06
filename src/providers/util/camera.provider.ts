//import { Camera } from 'ionic-native';
import { Injectable} from '@angular/core';
import {Camera, CameraOptions } from '@ionic-native/camera'

@Injectable()
export class CameraProvider {

  public myPhoto: string = "";
  public myPhotoURL: any;

  imageSrc: string;

  constructor(private camera: Camera) {

    /* /this.cameraApp = this.camApp;*/
  }

  tirarFoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.myPhoto = imageData;
      return imageData;

     }, (err) => {
      // Handle error
     });

     return this.myPhoto;
  }

  escolherFotoX(xpto) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.myPhoto = 'data:image/jpeg;base64,' + imageData;
      return this.myPhoto;

     }, (err) => {
      // Handle error
     });
     return this.myPhoto;
  }

  escolherFoto(sourceTypeCam) {
    var typePhotoOrigin = (sourceTypeCam == 'CAMERA' ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY);

    const options: CameraOptions = {
      quality: 45,
      correctOrientation: true,
      saveToPhotoAlbum: true,
      allowEdit: true,
      targetWidth: 500,
      targetHeight: 500,
      sourceType: typePhotoOrigin,

      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    return this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.imageSrc = 'data:image/jpeg;base64,' + imageData;
      return imageData;

     }, (err) => {
      // Handle error
     });
  }

/*
  takePhoto():string {
     Camera.getPicture({
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.myPhoto = imageData;

      //this.uploadPhoto();
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });

    return this.myPhoto;
  }

  selectPhoto(): string {
     Camera.getPicture({
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: Camera.EncodingType.PNG,
    }).then(imageData => {
      this.myPhoto = imageData;
      //this.uploadPhoto();
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });

    return this.myPhoto;
  }
 // */
 /*
  private uploadPhoto(): void {
    this.myPhotosRef.child(this.generateUUID()).child('myPhoto.png')
      .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
      .then((savedPicture) => {
        this.myPhotoURL = savedPicture.downloadURL;
      });
  }

  private generateUUID(): any {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }


  getPictureFromCamera() {
    return this.getImage(this.camera.PictureSourceType.CAMERA, true);
  }

  getPictureFromPhotoLibrary() {
    return this.getImage(this.camera.PictureSourceType.PHOTOLIBRARY);
  }

  // This method takes optional parameters to make it more customizable
  getImage(pictureSourceType, crop = false, quality = 50, allowEdit = true, saveToAlbum = true) {
    const options = {
      quality,
      allowEdit,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: pictureSourceType,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: saveToAlbum
    };

    // If set to crop, restricts the image to a square of 600 by 600
    if (crop) {
      options['targetWidth'] = 600;
      options['targetHeight'] = 600;
    }

    return this.camera.getPicture(options).then(imageData => {
      const base64Image = 'data:image/png;base64,' + imageData;
      return base64Image;
    }, error => {
      console.log('CAMERA ERROR -> ' + JSON.stringify(error));
    });
  }

  async openGallery(): Promise<string>{
    let cameraOptions = {
                            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
                            destinationType: this.camera.DestinationType.FILE_URI,
                            quality: 100,
                            targetWidth: 600,
                            targetHeight: 600,
                            encodingType: this.camera.EncodingType.JPEG,
                            correctOrientation: true
                          }

    this.camera.getPicture(cameraOptions)
      .then(file_uri => this.imageSrc = file_uri,
      err => console.log(err));

      return this.imageSrc;
  }*/

/*
  xxx(){

    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: this.camera.EncodingType.PNG,
    }).then(imageData => {
      console.log('THIS IS THE Base64' + imageData);
      let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, error => {
      this.error = JSON.stringify(error);
    });
  } */

}
