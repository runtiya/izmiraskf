// Get all news list
function getStadiums(req, res, next) {
  const stadiums = [
    {
      id: 1,
      name: 'ALAÇATI 15 EYLÜL SAHASI',
      city: 'IZMIR',
      town: 'CESME',
      address: 'Tokoğlu Mahallesi, Atatürk Blv., 35930 Alaçatı Belediyesi/Çeşme/İzmir',
      phoneNumber: '+90 (232) 000 00 00',
      stadiumImage: null,
      longitude: 38.2867069,
      latitude: 26.36926,
      audienceCapacity: 500,
      sizeLength: 120,
      sizeWidth: 90,
      floorType: 'CIM',
      hasLightning: null,
      hasSeating: true,
      hasDisabledTribune: false,
      hasClosedCircuitCameraSystem: false
    },
    {
      id: 2,
      name: 'İZMİR ATATÜRK STADYUMU',
      city: 'IZMIR',
      town: 'KONAK',
      address: 'Mersinli, Şehitler Cd., 35110 Konak/İzmir',
      phoneNumber: '+90 (232) 000 00 00',
      stadiumImage: null,
      longitude: 38.4349586,
      latitude: 27.1754054,
      audienceCapacity: 52000,
      sizeLength: 120,
      sizeWidth: 90,
      floorType: 'CIM',
      hasLightning: true,
      hasSeating: true,
      hasDisabledTribune: null,
      hasClosedCircuitCameraSystem: null
    },
    {
      id: 3,
      name: 'BALÇOVA BELEDİYESİ SPOR KOMPLEKSİ',
      city: 'IZMIR',
      town: 'BALCOVA',
      address: 'Korutürk, Gonca Sk. No:3, 35330 Balçova/İzmir',
      phoneNumber: '+90 (232) 000 00 00',
      stadiumImage: null,
      longitude: 38.3893229,
      latitude: 27.0200117,
      audienceCapacity: 750,
      sizeLength: 120,
      sizeWidth: 90,
      floorType: 'SUNICIM',
      hasLightning: true,
      hasSeating: null,
      hasDisabledTribune: true,
      hasClosedCircuitCameraSystem: false
    },
    {
      id: 4,
      name: 'BERGAMA 14 EYLÜL STADI',
      city: 'IZMIR',
      town: 'BERGAMA',
      address: 'Maltepe, Münir Nurettin Sk. No:2, 35700 Bergama/İzmir',
      phoneNumber: '+90 (232) 000 00 00',
      stadiumImage: null,
      longitude: 39.1129946,
      latitude: 27.1723958,
      audienceCapacity: 2000,
      sizeLength: 105,
      sizeWidth: 68,
      floorType: 'CIM',
      hasLightning: false,
      hasSeating: false,
      hasDisabledTribune: false,
      hasClosedCircuitCameraSystem: false
    },
    {
      id: 5,
      name: 'MUSTAFA DENİZLİ ALSANCAK STADI',
      city: 'IZMIR',
      town: 'KONAK',
      address: 'Halkapınar, Şehitler Cd., 35230 Konak/İzmir',
      phoneNumber: '+90 (232) 000 00 00',
      stadiumImage: null,
      longitude: 38.437282,
      latitude: 27.1481851,
      audienceCapacity: 15000,
      sizeLength: 120,
      sizeWidth: 90,
      floorType: 'CIM',
      hasLightning: true,
      hasSeating: true,
      hasDisabledTribune: true,
      hasClosedCircuitCameraSystem: true
    },
    {
      id: 6,
      name: 'NARLIDERE ALİ ARTUNER STADI',
      city: 'IZMIR',
      town: 'NARLIDERE',
      address: 'Sahilevleri, Stad Sk., 35320 Narlıdere/İzmir',
      phoneNumber: '+90 (232) 000 00 00',
      stadiumImage: null,
      longitude: 38.3976802,
      latitude: 27.0007686,
      audienceCapacity: 320,
      sizeLength: 120,
      sizeWidth: 90,
      floorType: 'TOPRAK',
      hasLightning: false,
      hasSeating: true,
      hasDisabledTribune: false,
      hasClosedCircuitCameraSystem: false
    },
    {
      id: 7,
      name: 'TİRE 4 EYLÜL SAHASI',
      city: 'IZMIR',
      town: 'TIRE',
      address: 'Yeni, 35905 Tire/İzmir',
      phoneNumber: '+90 (232) 000 00 00',
      stadiumImage: null,
      longitude: 38.0901442,
      latitude: 27.7305251,
      audienceCapacity: 2200,
      sizeLength: 120,
      sizeWidth: 90,
      floorType: 'SUNICIM',
      hasLightning: false,
      hasSeating: true,
      hasDisabledTribune: false,
      hasClosedCircuitCameraSystem: false
    },
    {
      id: 8,
      name: 'TİRE GAZİ MUSTAFA KEMAL ATATÜRK SAHASI',
      city: 'IZMIR',
      town: 'TIRE',
      address: 'Atatürk, 35900 Tire/İzmir',
      phoneNumber: '+90 (232) 000 00 00',
      stadiumImage: null,
      longitude: 38.1064733,
      latitude: 27.7166102,
      audienceCapacity: 12700,
      sizeLength: 120,
      sizeWidth: 90,
      floorType: 'CIM',
      hasLightning: true,
      hasSeating: true,
      hasDisabledTribune: true,
      hasClosedCircuitCameraSystem: true
    }
  ];

  res.status(200).json({
    error: false,
    message: 'Stadiums fetched successfully!',
    stadiums: stadiums
  });
}


// Get a news by id
function findStadium(req, res, next) {

}

// Create a new news
function createStadium(req, res, next) {
  const stadium = req.body;
  console.log(stadium);
  res.status(200).json({
    error: false,
    message: 'Stadium added successfully!',
    stadiumId: null
  });
}

// Update a news by id
function updateStadium(req, res, next) {
  const stadium = req.body;
  console.log(stadium);
  res.status(200).json({
    error: false,
    message: 'Stadium updated successfully!'
  });
}

// Delete a news by id
function deleteStadium(req, res, next) {
  const stadiumId = req.params.id;

  console.log(stadiumId);
  res.status(200).json({
    error: false,
    message: 'Stadium deleted successfully!'
  });
}


exports.getStadiums = getStadiums;
exports.findStadium = findStadium;
exports.createStadium = createStadium;
exports.updateStadium = updateStadium;
exports.deleteStadium = deleteStadium;
