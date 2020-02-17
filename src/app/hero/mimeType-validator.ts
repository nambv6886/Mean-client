import { AbstractControl } from '@angular/forms';
import { Observable, Observer, observable, of } from 'rxjs';

export const mimeType = (control: AbstractControl): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
  const file = control.value as File;
  const fileReader = new FileReader();
  if (typeof (control.value) === 'string') {
    return of(null);
  }
  const frObs = Observable.create((observer: Observer<{ [key: string]: any }>) => {
    fileReader.addEventListener("loadend", () => {
      const arr = new Uint8Array(fileReader.result as Uint8Array).subarray(0, 4);
      let header = "";
      let isValid = false;
      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16);
      }
      switch (header) {
        case "89504e47":
          // image/png
          isValid = true;
          break;
        case "47494638":
          // image/gif
          isValid = true;
          break;
        // "image/jpeg"
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
          isValid = true;
          break;
        default:
          // type: unknow
          isValid = false; // Or you can use the blob.type as fallback
          break;
      }
      if (isValid) {
        observer.next(null);
      } else {
        observer.next({ invalidMimeType: true });
      }
      observer.complete();
    });
    fileReader.readAsArrayBuffer(file);
  });
  return frObs;
};
