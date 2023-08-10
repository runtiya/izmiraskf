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

import { GlobalFixtureExportModel } from "../models/global-fixture-export.model";
import * as XLSX from 'xlsx';

@Injectable({
    providedIn: 'root'
})
export class globalFileImportExportFunctions {
  fileMimeTypeList = fileMimeTypeList;
  cityList = cityList;
  townList = townList;
  floorTypeList = floorTypeList;

  constructor(
  ) {}





}
