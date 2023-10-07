import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from "@angular/material/dialog";
import { DatePipe } from "@angular/common";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { fontAwesomeIconList } from '../assets/lists/font-awesome-icon.list';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fileMimeTypeList } from "../assets/lists/file-mime-type.list";
import { systemMessages } from "../assets/messages/system";
import { cityList } from "../assets/lists/city-tr.list";
import { townList } from "../assets/lists/town-izmir.list";
import { floorTypeList } from "../assets/lists/floor-type.list";
import { matchStatusList } from "../assets/lists/match-status.list";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class globalFunctions {
  fileMimeTypeList = fileMimeTypeList;
  cityList = cityList;
  townList = townList;
  floorTypeList = floorTypeList;
  matchStatusList = matchStatusList;
  fontAwesomeIconList = fontAwesomeIconList;
  environment = environment;

  constructor(
    private _datePipe: DatePipe,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {}

  public snackBar: Subject<string> = new Subject();
  public getToolbarTitle: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  showSnackBar(messageCode) {
    this.snackBar.next(systemMessages[messageCode]);
  }

  setToolbarTitle(_toolbarTitle: string) {
    this.getToolbarTitle.next(_toolbarTitle);
  }

  getConvertedDateEU(_date: string): string {
    if (_date !== null) {
      const dateParts = _date.split(' ');
      const datePart = dateParts[0].split('.').reverse().join('-');
      const timePart = dateParts[1];

      return `${datePart} ${timePart}:00`;
    } else {
      return null;
    }
  }

  getDate(_date: Date | string): string {
    const formattedDate = _date !== null ? this._datePipe.transform(_date, 'dd.MM.yyyy') : null;
    return formattedDate;
  }

  getDateTime(_date: Date | string): string {
    const formattedDate = _date !== null ? this._datePipe.transform(_date, 'dd.MM.yyyy HH:mm') : null;
    return formattedDate;
  }


  getLocalDate(_date: Date | string): string {
    const formattedDate = _date !== null ? this._datePipe.transform(_date, 'longDate') : null;
    return formattedDate;
  }

  getLocalDateTime(_date: Date | string): string {
    const formattedDate = _date !== null ? ( this._datePipe.transform(_date, 'longDate') + " " + this._datePipe.transform(_date, 'shortTime') ) : null;
    return formattedDate;
  }

  getFullYear(): string {
    return new Date().getFullYear().toString();
  }

  getTimeStamp(): string {
    return this._datePipe.transform((new Date), 'yyyy-MM-ddTHH:mm:ss');
  }

  getTownValue(name: string): string {
    if (name) {
      return this.townList.find(t => t.name === name).value;
    } else {
      return null;
    }

  }

  getCityValue(name: string): string {
    if (name) {
      return this.cityList.find(c => c.name === name).value;
    } else {
      return null;
    }

  }

  getFloorTypeValue(name: string): string {
    if (name) {
      return this.floorTypeList.find(t => t.name === name).value;
    } else {
      return null;
    }
  }

  getMatchStatusName(value: string): string {
    if (value) {
      return this.matchStatusList.find(s => s.value === value).name;
    } else {
      return null;
    }
  }

  getMatchStatusValue(name: string): string {
    if (name) {
      return this.matchStatusList.find(s => s.name === name).value;
    } else {
      return null;
    }
  }

  getMatchStatusClass(name: string): string {
    if (name) {
      return this.matchStatusList.find(s => s.name == name).class;
    } else {
      return null;
    }
  }

  getFontAwesomeIcon(_icon: string): IconDefinition {
    return this.fontAwesomeIconList[_icon];
  }

  getMimeType(mimeType: string): string {
    var mimeType: string;
    const mimeTypeList = {
      'application/pdf': () => {
        mimeType = 'PDF';
      },
      'application/msword': () => {
        mimeType = 'Word';
      },
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': () => {
        mimeType = 'Word';
      },
      'application/vnd.ms-excel': () => {
        mimeType = 'Excel';
      },
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': () => {
        mimeType = 'Excel';
      },
      'application/vnd.ms-powerpoint': () => {
        mimeType = 'Powerpoint';
      },
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': () => {
        mimeType = 'Powerpoint';
      },
      'text/csv': () => {
        mimeType = 'CSV';
      },
      'text/plain': () => {
        mimeType = 'TXT';
      }
    };

    if (mimeType in mimeTypeList) {
      mimeTypeList[mimeType]();
    } else {
      mimeType = 'File';
    }

    return mimeType;
  }

  getMimeTypeIcon(_mimeType:string): IconDefinition {
    var _icon: IconDefinition;
    const mimeTypeList = {
      'application/pdf': () => {
        _icon = fontAwesomeIconList.faFilePdf;
      },
      'application/msword': () => {
        _icon = fontAwesomeIconList.faFileWord;
      },
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': () => {
        _icon = fontAwesomeIconList.faFileWord;
      },
      'application/vnd.ms-excel': () => {
        _icon = fontAwesomeIconList.faFileExcel;
      },
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': () => {
        _icon = fontAwesomeIconList.faFileExcel;
      },
      'application/vnd.ms-powerpoint': () => {
        _icon = fontAwesomeIconList.faFilePowerpoint;
      },
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': () => {
        _icon = fontAwesomeIconList.faFilePowerpoint;
      },
      'text/csv': () => {
        _icon = fontAwesomeIconList.faFileCsv;
      },
      'text/plain': () => {
        _icon = fontAwesomeIconList.faFileText;
      }
    };

    if (_mimeType in mimeTypeList) {
      mimeTypeList[_mimeType]();
    } else {
      _icon = fontAwesomeIconList.faPaperclip;
    }

    return _icon;
  }

  checkMimeType(mimeType: string): boolean {
    return !!fileMimeTypeList.find(m => m === mimeType);
  }

  getDownloadFileElement(filePath: string, fileName: string): HTMLAnchorElement {
    const downloadLink = document.createElement('a');
    downloadLink.href = filePath;
    downloadLink.download = fileName;
    downloadLink.target = '_blank';
    return downloadLink;
  }

  downloadFile(file: Blob, fileName: string) {
    const url: string = window.URL.createObjectURL(file);
    const link: HTMLAnchorElement = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(url);
    link.remove();
  }

  setFileSize(size: number): string {
    return (size / (1024 * 1024)).toFixed(2) + ' MB';
  }

  getPaginationPageSizeOptions(): Array<number> {
    return [10, 20, 50, 100];
  }

  getSafeResourceUrl(url: string): SafeResourceUrl{
    return url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : null;
  }

}
