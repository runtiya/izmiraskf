function getAboutContent(req, res, next) {

  res.status(200).json({
    error: false,
    message: 'About Content fetched successfully!',
    aboutContent: {
      aboutText: 'Vivamus ut risus sed lacus tempus volutpat ut a justo. In hac habitasse platea dictumst. In condimentum ultrices gravida. Nam turpis tellus, laoreet non eros sit amet, facilisis vehicula orci. Praesent eget lacus lacinia, faucibus turpis id, lobortis massa. Pellentesque dapibus metus diam, eget cursus justo fringilla sit amet.',
      address: 'Kıbrıs Şehitleri No:76 Alsancak Konak/İZMİR',
      phoneNumber: '0 (232) 000 00 00',
      faxNumber: '0 (232) 000 00 00'
    },
    staffList: [
      {
        id: 1,
        title: 'İl Temsilcisi',
        name: 'Name Surname',
        email: 'name.surname@izmirtff.com.tr',
        phone: '0 000 000 00 00',
        profileImage: null,
        isVisible: true,
        order: 1
      },
      {
        id: 2,
        title: 'Yardımcı',
        name: 'Name Surname',
        email: 'name.surname@izmirtff.com.tr',
        phone: '0 000 000 00 00',
        profileImage: null,
        isVisible: false,
        order: 2
      },
      {
        id: 3,
        title: 'Yardımcı',
        name: 'Name Surname',
        email: 'name.surname@izmirtff.com.tr',
        phone: '0 000 000 00 00',
        profileImage: null,
        isVisible: false,
        order: 3
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
