const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  port: 3306,
  password: '17Nisan1996',
  database: 'izmiraskf',
});

function getAboutContent(req, res, next) {

  connection.connect();

  connection.query(
    'select * from aboutiaskf',
    (error, result, fields) => {
      if (error) {
        console.log(error);
      }
      else console.log(result)
    }
  );

  connection.end();

  res.status(200).json({
    error: false,
    message: 'About Content fetched successfully!',
    aboutContent: {
      aboutText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu ultrices ligula. Quisque vitae eleifend risus. Sed magna risus, tempor vel felis sit amet, interdum elementum tortor. Nulla facilisi. Integer lacinia dui a enim luctus pulvinar sed id tellus. Sed ac consectetur turpis. Sed mollis dapibus erat id dictum. Phasellus ullamcorper erat id nisl molestie, vel pharetra nibh tempor. Maecenas gravida, lorem quis molestie pretium, arcu quam aliquet turpis, vitae auctor justo quam tempus arcu. Phasellus porta ullamcorper accumsan. Nunc lobortis, ante ac blandit feugiat, elit tortor varius diam, et posuere arcu magna et nulla. Nunc aliquam, risus non interdum placerat, est ex feugiat lectus, ac imperdiet arcu arcu non justo. In urna mi, semper et rutrum vel, pulvinar id lectus. In magna tellus, varius eget felis et, scelerisque suscipit ligula. Morbi feugiat blandit vestibulum. Quisque posuere risus ut mauris posuere dapibus. Vestibulum mattis nunc eu tincidunt tincidunt. Quisque vel efficitur dolor. Ut id sapien elit. Donec vitae commodo quam, vitae tempor lacus. Fusce tempus pharetra pretium. Aliquam a elit eu leo malesuada porta eu a risus. Etiam suscipit tortor ut enim tempus, ac scelerisque ligula molestie. Suspendisse dignissim sapien porttitor turpis porttitor efficitur quis ut arcu. Maecenas a tincidunt est, vitae tristique eros. Integer lacinia dictum ligula, eget tristique odio vehicula eu.',
      address: 'Kıbrıs Şehitleri No:76 Alsancak Konak/İZMİR',
      phoneNumber: '0 (232) 463 66 44',
      faxNumber: '0 (232) 463 84 04'
    },
    staffList: [
      {
        id: 1,
        title: 'Yönetim Kurulu Başkanı',
        name: 'Efkan Muhtar',
        email: 'efkan.muhtar@izmiraskf.com',
        phone: '0 000 000 00 00',
        profileImage: null,
        isVisible: true,
        order: 1
      },
      {
        id: 2,
        title: 'Genel Sekreter',
        name: 'Ali Alanç',
        email: 'ali.alanc@izmiraskf.com',
        phone: '0 000 000 00 00',
        profileImage: null,
        isVisible: false,
        order: 2
      },
      {
        id: 6,
        title: 'İdari Personel',
        name: 'Ejder Cihan Kaya',
        email: 'cihan.kaya@izmiraskf.com',
        phone: '0 000 000 00 00',
        profileImage: null,
        isVisible: true,
        order: 6
      },
      {
        id: 7,
        title: 'İdari Personel',
        name: 'Erhan Daşdelen',
        email: 'erhan.dasdelen@izmiraskf.com',
        phone: '0 000 000 00 00',
        profileImage: null,
        isVisible: false,
        order: 7
      },
      {
        id: 8,
        title: 'İdari Koordinatör',
        name: 'Mustafa Yılmaz',
        email: 'mustafa.yilmaz@izmiraskf.com',
        phone: '0 000 000 00 00',
        profileImage: null,
        isVisible: true,
        order: 8
      },
      {
        id: 9,
        title: 'Personel',
        name: 'Mustafa İlhan Usta',
        email: 'mustafa.usta@izmiraskf.com',
        phone: '0 000 000 00 00',
        profileImage: null,
        isVisible: true,
        order: 9
      }
    ]
  });
}


function createAboutContent(req, res, next) {
  console.log(req.body);
  res.status(200).json({
    error: false,
    message: 'New Staff created successfully!'
  });
}

function updateAboutContent(req, res, next) {
  const aboutContent = req.body;
  console.log(aboutContent);
  res.status(200).json({
    error: false,
    message: 'About Content updated successfully!'
  });
}

function updateAboutContentForStaff(req, res, next) {
  console.log(req.params.id);
  console.log(req.body);
  res.status(200).json({
    error: false,
    message: 'Staff updated successfully!'
  });
}

function deleteAboutContentForStaff(req, res, next) {
  console.log(req.params.id)
  res.status(200).json({
    error: false,
    message: 'Staff deleted successfuly!'
  })
}


exports.getAboutContent = getAboutContent;
exports.createAboutContent = createAboutContent;
exports.updateAboutContent = updateAboutContent;
exports.updateAboutContentForStaff = updateAboutContentForStaff;
exports.deleteAboutContentForStaff = deleteAboutContentForStaff;
