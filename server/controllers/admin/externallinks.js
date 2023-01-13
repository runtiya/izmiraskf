// Get all external links list
function getExternalLinks(req, res, next) {
  const externalLinks = [
    {
      id: 1,
      iconImage: null,
      linkName: 'T.F.F',
      url: 'https://www.tff.org/',
      linkType: 'RELATEDLINK',
      faClass: null,
      orderNo: 1,
      isActive: true
    },
    {
      id: 2,
      iconImage: null,
      linkName: 'T.A.S.K.K',
      url: 'https://www.taskk.org.tr/',
      linkType: 'RELATEDLINK',
      faClass: null,
      orderNo: 2,
      isActive: true
    },
    {
      id: 3,
      iconImage: null,
      linkName: 'FIFA',
      url: 'https://www.fifa.com/',
      linkType: 'RELATEDLINK',
      faClass: null,
      orderNo: 3,
      isActive: true
    },
    {
      id: 4,
      iconImage: null,
      linkName: 'UEFA',
      url: 'https://www.uefa.com/',
      linkType: 'RELATEDLINK',
      faClass: null,
      orderNo: 4,
      isActive: true
    },
    {
      id: 5,
      iconImage: null,
      linkName: 'T.F.F.H.G.D',
      url: 'http://www.tffhgd-izmir.org.tr/',
      linkType: 'RELATEDLINK',
      faClass: null,
      orderNo: 5,
      isActive: true
    },
    {
      id: 6,
      iconImage: null,
      linkName: 'İZMİR TÜFAD',
      url: 'https://www.izmirtufad.org.tr/',
      linkType: 'RELATEDLINK',
      faClass: null,
      orderNo: 6,
      isActive: true
    },
    {
      id: 7,
      iconImage: null,
      linkName: 'FUTBOLCU SORGULAMA',
      url: 'https://www.tff.org/Default.aspx?pageID=130',
      linkType: 'RELATEDLINK',
      faClass: null,
      orderNo: 7,
      isActive: true
    },
    {
      id: 8,
      iconImage: null,
      linkName: 'FUTBOL OYUN KURALLARI',
      url: 'http://www.tff.org/Resources/TFF/Documents/000013/TFF/MHK/2012-2013-Futbol-Oyun-Kurallari-_15_08_2012.pdf',
      linkType: 'RELATEDLINK',
      faClass: null,
      orderNo: 8,
      isActive: true
    },
    {
      id: 9,
      iconImage: null,
      linkName: 'INSTAGRAM',
      url: 'https://www.instagram.com/',
      linkType: 'SOCIALMEDIA',
      faClass: 'fa-brands fa-square-instagram',
      orderNo: 2,
      isActive: true
    },
    {
      id: 10,
      iconImage: null,
      linkName: 'FACEBOOK',
      url: 'https://www.facebook.com/',
      linkType: 'SOCIALMEDIA',
      faClass: 'fa-brands fa-square-facebook',
      orderNo: 1,
      isActive: true
    },
    {
      id: 11,
      iconImage: null,
      linkName: 'TWITTER',
      url: 'https://www.twitter.com/',
      linkType: 'SOCIALMEDIA',
      faClass: 'fa-brands fa-square-twitter',
      orderNo: 3,
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
