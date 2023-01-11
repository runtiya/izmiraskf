function getSeasons(req, res, next) {
  const seasons = [
    {
      id: 1,
      name: '2022-2023',
      year: '2022-2023',
      isActive: true,
    },
    {
      id: 2,
      name: '2021-2022',
      year: '2021-2022',
      isActive: false,
    },
    {
      id: 3,
      name: '2020-2021',
      year: '2020-2021',
      isActive: false,
    },
  ];

  res.status(200).json({
    error: false,
    message: 'Seaons fetched successfully!',
    seasons: seasons
  });
}

function createSeason(req, res, next) {
  const season = req.body;
  console.log(season);
  res.status(200).json({
    error: false,
    message: 'Season added successfully!',
    seasonId: null
  });
}


function updateSeason(req, res, next) {
  const season = req.body;
  console.log(season);
  res.status(200).json({
    error: false,
    message: 'Season updated successfully!'
  });
}

function deleteSeason(req, res, next) {
  const seasonId = req.params.id;
  console.log(seasonId);
  res.status(200).json({
    error: false,
    message: 'Season deleted successfully!'
  });
}


exports.getSeasons = getSeasons;
exports.createSeason = createSeason;
exports.updateSeason = updateSeason;
exports.deleteSeason = deleteSeason;
