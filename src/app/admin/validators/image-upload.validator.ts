import { AbstractControl } from "@angular/forms";
import { Observable, Observer, of } from "rxjs";
import { imageMimeTypeList } from "../../assets/lists/image-mime-type.list";

export const imageUploadValidator = (control: AbstractControl): Promise<{[key: string]: any}> | Observable<{[key: string]: any}> => {

  if (typeof(control.value) === 'string' || !control.value) {
    return of(null);
  }
  const file = control.value as File;
  const fileReader = new FileReader();
  const fileReaderObservable = new Observable((observer: Observer<{[key: string]: any}>) => {
    fileReader.addEventListener("loadend", () => {
      let isValid = false;
      const mimeTypeArray = imageMimeTypeList;

      isValid = (mimeTypeArray.find((element) => {return element == file.type}) ? true : false) && file.size < 5242880; // 5MB limitation

      if (isValid) {
        observer.next(null);
      } else {
        observer.next({ invalidMimeType: true });
      }
      observer.complete()
    });
    fileReader.readAsArrayBuffer(file);
  });

  return fileReaderObservable;
};
