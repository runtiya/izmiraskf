function getDocuments(req, res, next) {
  const documentType = req.params.type;
  const documents = [
    {
      id: 1,
      docName: 'File #1',
      content: null,
      mimeType: 'pdf',
      category: 'AMATORLIGSTATULERI',
      orderNo: 1
    },
    {
      id: 2,
      docName: 'File #2',
      content: null,
      mimeType: 'pdf',
      category: 'AMATORLIGSTATULERI',
      orderNo: 2
    },
    {
      id: 3,
      docName: 'File #3',
      content: null,
      mimeType: 'docx',
      category: 'AMATORLIGSTATULERI',
      orderNo: 3
    },
    {
      id: 4,
      docName: 'File #4',
      content: null,
      mimeType: 'xlsx',
      category: 'AMATORLIGSTATULERI',
      orderNo: 4
    },
    {
      id: 5,
      docName: 'File #5',
      content: null,
      mimeType: 'pdf',
      category: 'AMATORLIGSTATULERI',
      orderNo: 5
    },
    {
      id: 6,
      docName: 'File #6',
      content: null,
      mimeType: 'pdf',
      category: 'AMATORLIGSTATULERI',
      orderNo: 6
    },
    {
      id: 7,
      docName: 'File #1',
      content: null,
      mimeType: 'pdf',
      category: 'TALIMATLAR',
      orderNo: 1
    },
    {
      id: 8,
      docName: 'File #2',
      content: null,
      mimeType: 'pdf',
      category: 'TALIMATLAR',
      orderNo: 2
    },
    {
      id: 9,
      docName: 'File #3',
      content: null,
      mimeType: 'docx',
      category: 'TALIMATLAR',
      orderNo: 3
    },
    {
      id: 10,
      docName: 'File #4',
      content: null,
      mimeType: 'xlsx',
      category: 'TALIMATLAR',
      orderNo: 4
    },
    {
      id: 11,
      docName: 'File #1',
      content: null,
      mimeType: 'pdf',
      category: 'LISANSFORMLARI',
      orderNo: 1
    },
    {
      id: 12,
      docName: 'File #2',
      content: null,
      mimeType: 'docx',
      category: 'LISANSFORMLARI',
      orderNo: 2
    },
    {
      id: 13,
      docName: 'File #3',
      content: null,
      mimeType: 'docx',
      category: 'LISANSFORMLARI',
      orderNo: 3
    },
    {
      id: 14,
      docName: 'File #4',
      content: null,
      mimeType: 'pdf',
      category: 'LISANSFORMLARI',
      orderNo: 4
    },
    {
      id: 15,
      docName: 'File #5',
      content: null,
      mimeType: 'pdf',
      category: 'LISANSFORMLARI',
      orderNo: 5
    },
    {
      id: 16,
      docName: 'File #1',
      content: null,
      mimeType: 'pdf',
      category: 'BELGELER',
      orderNo: 1
    },
    {
      id: 17,
      docName: 'File #2',
      content: null,
      mimeType: 'pdf',
      category: 'BELGELER',
      orderNo: 2
    },
    {
      id: 18,
      docName: 'File #3',
      content: null,
      mimeType: 'pdf',
      category: 'BELGELER',
      orderNo: 3
    },
  ];
  const filteredDocs = documents.filter(doc => doc.category == documentType);
  res.status(200).json({
    error: false,
    message: 'Documents fetched successfully!',
    documents: filteredDocs
  });
}

function createDocument(req, res, next) {
  const document = req.body;
  console.log(document);
  res.status(200).json({
    error: false,
    message: 'Document added successfully!',
    documentId: null
  });
}

function updateDocument(req, res, next) {
  const document = req.body;
  console.log(document);
  res.status(200).json({
    error: false,
    message: 'Document updated successfully!'
  });
}

function deleteDocument(req, res, next) {
  const documentId = req.params.id;
  console.log(documentId);
  res.status(200).json({
    error: false,
    message: 'Document deleted successfully!'
  });
}


exports.getDocuments = getDocuments;
exports.createDocument = createDocument;
exports.updateDocument = updateDocument;
exports.deleteDocument = deleteDocument;
