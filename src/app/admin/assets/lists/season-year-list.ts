function yearGenerate() {
  const d = new Date();
  var startYear: number = d.getFullYear();
  var endYear: number;
  var yearInterval: string;
  var yearList = [];

  for (let index = startYear; index >= 2014; index--) {

    endYear = index + 1;
    yearInterval = index + '-' + endYear;
    yearList.push(yearInterval);
  }

  return yearList;
}

export const seasonYearList = yearGenerate();
