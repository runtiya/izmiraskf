import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { NewsModel } from "../models/admin-news.model";
import { NewsService } from "../services/admin-news.service";

import { DisciplinaryBoardFileModel } from '../models/admin-disciplinaryboardfiles.model';

import { globalFunctions } from "../../functions/global.function";

import { template_news_disciplinaryboard_disiplinkurulu, template_news_disciplinaryboard_iltertipkomitesi } from "../assets/texts/news-text";

@Injectable({
    providedIn: 'root'
})
export class disciplinaryBoardFunctions {

  newsContentTemplate: string;

  constructor(
    private newsService: NewsService,
    private globalFunctions: globalFunctions
    ) {}

  createNewsForDisciplinaryBoardAnnouncement(disciplinaryBoardFile: DisciplinaryBoardFileModel) {
    let _template: string = null;
    let _imagePath: string = null;
    if (disciplinaryBoardFile.caseType === "DISIPLINKURULU") {
      _template = template_news_disciplinaryboard_disiplinkurulu;
      _imagePath = "http://localhost:3000/images/statics/disiplinkurulukararlari.jpg";
    } else if (disciplinaryBoardFile.caseType === "ILTERTIPKOMITESI") {
      _template = template_news_disciplinaryboard_iltertipkomitesi;
      _imagePath = "http://localhost:3000/images/statics/tertipkomitesikararlari.jpg";
    }

    let _newsModel = <NewsModel>{};
    _newsModel.createdAt = this.globalFunctions.getTimeStamp();
    _newsModel.createdBy = null;
    _newsModel.updatedAt = null;
    _newsModel.updatedBy = null;
    _newsModel.title = `${disciplinaryBoardFile.title} ${disciplinaryBoardFile.caseNo}`;
    _newsModel.content = this.buildContentForAnnouncement(_template, disciplinaryBoardFile);
    _newsModel.imagePath = _imagePath;
    _newsModel.imageAttachment = null;
    _newsModel.isVisible = true;

    this.newsService.addNews(_newsModel);
  }

  buildContentForAnnouncement(template: string, disciplinaryBoardFile: DisciplinaryBoardFileModel): Text | string {
    const replacements = {
      title: disciplinaryBoardFile.title,
      caseNo: disciplinaryBoardFile.caseNo,
      caseDate: this.globalFunctions.registerLocalDate(disciplinaryBoardFile.caseDate),
      caseType: disciplinaryBoardFile.caseType.toLowerCase()
    }

    return template.replace(/{{(\w+)}}/g, (match, placeholder) => {
      if (replacements.hasOwnProperty(placeholder)) {
        return replacements[placeholder];
      }
      return match;
    });
  }


}

