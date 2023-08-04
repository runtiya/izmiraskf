import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from "@angular/material/dialog";
import { DatePipe } from "@angular/common";
import { fontAwesomeIconList } from '../assets/lists/font-awesome-icon.list';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fileMimeTypeList } from "../assets/lists/file-mime-type.list";
import { systemMessages } from "../assets/messages/system";
import { cityList } from "../assets/lists/city-tr.list";
import { townList } from "../assets/lists/town-izmir.list";
import { floorTypeList } from "../assets/lists/floor-type.list";

@Injectable({
    providedIn: 'root'
})
export class globalFunctions {
  fileMimeTypeList = fileMimeTypeList;
  cityList = cityList;
  townList = townList;
  floorTypeList = floorTypeList;

  constructor(
    private _datePipe: DatePipe,
    public dialog: MatDialog,
  ) {}

  public snackBar: Subject<string> = new Subject();
  public showSpinner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public getToolbarTitle: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  showSnackBar(messageCode) {
    this.snackBar.next(systemMessages[messageCode]);
  }

  setSpinner(_displaySpinner: boolean) {
    this.showSpinner.next(_displaySpinner);
  }

  setToolbarTitle(_toolbarTitle: string) {
    this.getToolbarTitle.next(_toolbarTitle);
  }

  registerLocalDate(_date: Date): string {
    return this._datePipe.transform(_date, 'dd.MM.yyyy');
  }

  registerLocalDateForLongDate(_date: Date): string {
    const formattedDate = _date !== null ? this._datePipe.transform(_date, 'longDate') : null;
    return formattedDate
  }

  registerLocalDateForShortTime(_date: Date): string {
    const formattedDate = _date !== null ? this._datePipe.transform(_date, 'shortTime') : null;
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

  getDownloadFileElement(filePath: string, fileName: string): HTMLAnchorElement {
    const downloadLink = document.createElement('a');
    downloadLink.href = filePath;
    downloadLink.download = fileName;
    downloadLink.target = '_blank';
    return downloadLink;
  }

  setFileSize(size: number): string {
    return (size / (1024 * 1024)).toFixed(2) + ' MB';
  }

}
