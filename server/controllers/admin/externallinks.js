// Get all external links list
function getExternalLinks(req, res, next) {
  const externalLinks = [
    {
      id: 1,
      iconImage: null,
      name: 'T.F.F',
      url: 'https://www.tff.org/',
      type: 'RELATEDLINK',
      faClass: null,
      order: 1,
      isActive: true
    },
    {
      id: 2,
      iconImage: null,
      name: 'T.A.S.K.K',
      url: 'https://www.taskk.org.tr/',
      type: 'RELATEDLINK',
      faClass: null,
      order: 2,
      isActive: true
    },
    {
      id: 3,
      iconImage: null,
      name: 'FIFA',
      url: 'https://www.fifa.com/',
      type: 'RELATEDLINK',
      faClass: null,
      order: 3,
      isActive: true
    },
    {
      id: 4,
      iconImage: null,
      name: 'UEFA',
      url: 'https://www.uefa.com/',
      type: 'RELATEDLINK',
      faClass: null,
      order: 4,
      isActive: true
    },
    {
      id: 5,
      iconImage: null,
      name: 'T.F.F.H.G.D',
      url: 'http://www.tffhgd-izmir.org.tr/',
      type: 'RELATEDLINK',
      faClass: null,
      order: 5,
      isActive: true
    },
    {
      id: 6,
      iconImage: null,
      name: 'İZMİR TÜFAD',
      url: 'https://www.izmirtufad.org.tr/',
      type: 'RELATEDLINK',
      faClass: null,
      order: 6,
      isActive: true
    },
    {
      id: 7,
      iconImage: null,
      name: 'FUTBOLCU SORGULAMA',
      url: 'https://www.tff.org/Default.aspx?pageID=130',
      type: 'RELATEDLINK',
      faClass: null,
      order: 7,
      isActive: true
    },
    {
      id: 8,
      iconImage: null,
      name: 'FUTBOL OYUN KURALLARI',
      url: 'http://www.tff.org/Resources/TFF/Documents/000013/TFF/MHK/2012-2013-Futbol-Oyun-Kurallari-_15_08_2012.pdf',
      type: 'RELATEDLINK',
      faClass: null,
      order: 8,
      isActive: true
    },
    {
      id: 9,
      iconImage: null,
      name: 'INSTAGRAM',
      url: 'https://www.instagram.com/',
      type: 'SOCIALMEDIA',
      faClass: 'fa-brands fa-square-instagram',
      order: 2,
      isActive: true
    },
    {
      id: 10,
      iconImage: null,
      name: 'FACEBOOK',
      url: 'https://www.facebook.com/',
      type: 'SOCIALMEDIA',
      faClass: 'fa-brands fa-square-facebook',
      order: 1,
      isActive: true
    },
    {
      id: 11,
      iconImage: null,
      name: 'TWITTER',
      url: 'https://www.twitter.com/',
      type: 'SOCIALMEDIA',
      faClass: 'fa-brands fa-square-twitter',
      order: 3,
      isActive: true
    }
  ];

  res.status(200).json({
    error: false,
    message: 'External Links fetched successfully!',
    externalLinks: externalLinks
  });
}

// Create a external link
function createExternalLink(req, res, next) {
  const externalLink = req.body;
  console.log(externalLink);
  res.status(200).json({
    error: false,
    message: 'External Links added successfully!',
    linkId: null
  });
}

// Update an external link by id
function updateExternalLink(req, res, next) {
  const externatLink = req.body;
  console.log(externatLink);
  res.status(200).json({
    error: false,
    message: 'External Link updated successfully!'
  });
}

// Delete an external link by id
function deleteExternalLink(req, res, next) {
  const linkId = req.params.id;

  console.log(linkId);
  res.status(200).json({
    error: false,
    message: 'External Link deleted successfully!'
  });
}


exports.getExternalLinks = getExternalLinks;
exports.createExternalLink = createExternalLink;
exports.updateExternalLink = updateExternalLink;
exports.deleteExternalLink = deleteExternalLink;
