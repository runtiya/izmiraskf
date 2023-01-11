// Get all teams list
function getTeams(req, res, next) {
  const teams = [
    {
      id: 1,
      TFFClubCode: '018198',
      officialName: 'İZMİR EKONOMİ ÜNİVERSİTESİ GENÇLİK VE SPOR',
      shortName: 'İZMİR EKONOMİ ÜNİVERSİTESİ',
      city: 'IZMIR',
      town: 'BALCOVA',
      address: 'Fevzi Çakmak, Sakarya Cd. No:156, 35330 Balçova/İzmir',
      logo: null,
      longitude: null,
      latitude: null,
      presidentName: 'Cihangir Lübiç',
      phoneNumber: '0 232 000 00 00',
      faxNumber: '0 232 000 00 00',
      websiteURL: 'https://www.ieu.edu.tr/tr',
      colorCodes: '#FF6C00;#0F0F0F',
      stadiumId: 3,
      isMember: false,
      isVisible: true
    },
    {
      id: 2,
      TFFClubCode: '014741',
      officialName: 'BALÇOVA BELEDİYE TERMAL SPOR',
      shortName: 'BALÇOVA BEL. TERMAL SPOR',
      city: 'IZMIR',
      town: 'BALCOVA',
      address: 'Fevzi Çakmak, Cengiz Topel Sk. No:1, 35330 Balçova/İzmir',
      logo: null,
      longitude: null,
      latitude: null,
      presidentName: 'Fatma Çalkaya',
      phoneNumber: '0 232 000 00 00',
      faxNumber: '0 232 000 00 00',
      websiteURL: 'https://www.balcova.bel.tr/',
      colorCodes: '#00BDFF;#0DE55C',
      stadiumId: 3,
      isMember: true,
      isVisible: true
    },
    {
      id: 3,
      TFFClubCode: '012345',
      officialName: 'GÜZELYALI 1925 GENÇLİK VE SPOR KULÜBÜ',
      shortName: 'GÜZELYALI 1925 SK',
      city: 'IZMIR',
      town: 'KONAK',
      address: '',
      logo: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      longitude: null,
      latitude: null,
      presidentName: null,
      phoneNumber: '0 232 000 00 00',
      faxNumber: '0 232 000 00 00',
      websiteURL: null,
      colorCodes: '#F00000;#FFF300',
      stadiumId: 2,
      isMember: true,
      isVisible: false
    },
    {
      id: 4,
      TFFClubCode: '123456',
      officialName: 'BORNOVA GENÇLİK VE SPOR KULÜBÜ',
      shortName: 'BORNOVA GENÇLİK VE SPOR KULÜBÜ',
      city: 'IZMIR',
      town: 'BORNOVA',
      address: 'Somewhere in Bornova/İzmir',
      logo: null,
      longitude: null,
      latitude: null,
      presidentName: 'John Doe',
      phoneNumber: '0 232 000 00 00',
      faxNumber: '0 232 000 00 00',
      websiteURL: null,
      colorCodes: '#3AE507;#FFFFFF',
      stadiumId: 5,
      isMember: false,
      isVisible: true
    },
    {
      id: 5,
      TFFClubCode: '098765',
      officialName: 'KARŞIYAKA CEMİYET GENÇLİK VE SPOR KULÜBÜ',
      shortName: 'KARŞIYAKA CEMİYET SK',
      city: 'IZMIR',
      town: 'KARSIYAKA',
      address: 'Karşıyaka Çarşı No:19/12',
      logo: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      longitude: null,
      latitude: null,
      presidentName: 'Jane Doe',
      phoneNumber: '0 232 000 00 00',
      faxNumber: '0 232 000 00 00',
      websiteURL: null,
      colorCodes: '#36DC05;#FFFFFF',
      stadiumId: 2,
      isMember: false,
      isVisible: true
    },
    {
      id: 5,
      TFFClubCode: '001912',
      officialName: 'KARŞIYAKA SPOR KULÜBÜ',
      shortName: 'KARŞIYAKA SK',
      city: 'IZMIR',
      town: 'KARSIYAKA',
      address: 'Karşıyaka Çarşı No:19/12',
      logo: null,
      longitude: null,
      latitude: null,
      presidentName: 'Turgay Büyükkarcı',
      phoneNumber: '0 232 000 00 00',
      faxNumber: '0 232 000 00 00',
      websiteURL: null,
      colorCodes: '#DC0505;#36DC05',
      stadiumId: 2,
      isMember: true,
      isVisible: true
    }
  ];

  res.status(200).json({
    error: false,
    message: 'Teams fetched successfully!',
    teams: teams
  });
}

// Get a team by id
function findTeam(req, res, next) {

}

// Create a new team
function createTeam(req, res, next) {
  const stadium = req.body;
  console.log(stadium);
  res.status(200).json({
    error: false,
    message: 'Team added successfully!',
    stadiumId: null
  });
}

// Update a team by id
function updateTeam(req, res, next) {
  const stadium = req.body;
  console.log(stadium);
  res.status(200).json({
    error: false,
    message: 'Team updated successfully!'
  });
}

// Delete a team by id
function deleteTeam(req, res, next) {
  const stadiumId = req.params.id;

  console.log(stadiumId);
  res.status(200).json({
    error: false,
    message: 'Team deleted successfully!'
  });
}


exports.getTeams = getTeams;
exports.findTeam = findTeam;
exports.createTeam = createTeam;
exports.updateTeam = updateTeam;
exports.deleteTeam = deleteTeam;
