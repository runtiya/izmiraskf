import { Injectable } from '@angular/core';

import { NewsModel } from "../models/admin-news.model";
import { NewsService } from "../services/admin-news.service";

import { DisciplinaryBoardFileModel } from '../models/admin-disciplinaryboardfiles.model';

import { globalFunctions } from "../../functions/global.function";

import {
  template_news_disciplinaryboard_disiplinkurulu,
  template_news_disciplinaryboard_iltertipkomitesi
} from "../assets/texts/news-text";

import { environment } from "../../../environments/environment";

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
      _imagePath = environment.serverUrl + "images/statics/disiplinkurulukararlari.jpg";
    } else if (disciplinaryBoardFile.caseType === "ILTERTIPKOMITESI") {
      _template = template_news_disciplinaryboard_iltertipkomitesi;
      _imagePath = environment.serverUrl + "images/statics/tertipkomitesikararlari.jpg";
    }

    let _newsModel = <NewsModel>{};
    _newsModel.createdAt = null;
    _newsModel.createdBy = null;
    _newsModel.updatedAt = null;
    _newsModel.updatedBy = null;
    _newsModel.title = `${disciplinaryBoardFile.title} ${disciplinaryBoardFile.caseNo}`;
    _newsModel.content = this.buildContentForAnnouncement(_template, disciplinaryBoardFile);
    _newsModel.imagePath = _imagePath;
    _newsModel.imageAttachment = null;
    _newsModel.isVisible = true;

    this.newsService.createNews(_newsModel);
  }

  buildContentForAnnouncement(template: string, disciplinaryBoardFile: DisciplinaryBoardFileModel): Text | string {
    const replacements = {
      title: disciplinaryBoardFile.title,
      caseNo: disciplinaryBoardFile.caseNo,
      caseDate: this.globalFunctions.getDate(disciplinaryBoardFile.caseDate),
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

