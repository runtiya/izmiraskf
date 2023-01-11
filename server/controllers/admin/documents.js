function getDocuments(req, res, next) {
  const documentType = req.params.type;
  const documents = [
    {
      id: 1,
      name: 'File #1',
      content: null,
      mimeType: 'pdf',
      category: 'AMATORLIGSTATULERI',
      order: 1
    },
    {
      id: 2,
      name: 'File #2',
      content: null,
      mimeType: 'pdf',
      category: 'AMATORLIGSTATULERI',
      order: 2
    },
    {
      id: 3,
      name: 'File #3',
      content: null,
      mimeType: 'docx',
      category: 'AMATORLIGSTATULERI',
      order: 3
    },
    {
      id: 4,
      name: 'File #4',
      content: null,
      mimeType: 'xlsx',
      category: 'AMATORLIGSTATULERI',
      order: 4
    },
    {
      id: 5,
      name: 'File #5',
      content: null,
      mimeType: 'pdf',
      category: 'AMATORLIGSTATULERI',
      order: 5
    },
    {
      id: 6,
      name: 'File #6',
      content: null,
      mimeType: 'pdf',
      category: 'AMATORLIGSTATULERI',
      order: 6
    },
    {
      id: 7,
      name: 'File #1',
      content: null,
      mimeType: 'pdf',
      category: 'TALIMATLAR',
      order: 1
    },
    {
      id: 8,
      name: 'File #2',
      content: null,
      mimeType: 'pdf',
      category: 'TALIMATLAR',
      order: 2
    },
    {
      id: 9,
      name: 'File #3',
      content: null,
      mimeType: 'docx',
      category: 'TALIMATLAR',
      order: 3
    },
    {
      id: 10,
      name: 'File #4',
      content: null,
      mimeType: 'xlsx',
      category: 'TALIMATLAR',
      order: 4
    },
    {
      id: 11,
      name: 'File #1',
      content: null,
      mimeType: 'pdf',
      category: 'LISANSFORMLARI',
      order: 1
    },
    {
      id: 12,
      name: 'File #2',
      content: null,
      mimeType: 'docx',
      category: 'LISANSFORMLARI',
      order: 2
    },
    {
      id: 13,
      name: 'File #3',
      content: null,
      mimeType: 'docx',
      category: 'LISANSFORMLARI',
      order: 3
    },
    {
      id: 14,
      name: 'File #4',
      content: null,
      mimeType: 'pdf',
      category: 'LISANSFORMLARI',
      order: 4
    },
    {
      id: 15,
      name: 'File #5',
      content: null,
      mimeType: 'pdf',
      category: 'LISANSFORMLARI',
      order: 5
    },
    {
      id: 16,
      name: 'File #1',
      content: null,
      mimeType: 'pdf',
      category: 'BELGELER',
      order: 1
    },
    {
      id: 17,
      name: 'File #2',
      content: null,
      mimeType: 'pdf',
      category: 'BELGELER',
      order: 2
    },
    {
      id: 18,
      name: 'File #3',
      content: null,
      mimeType: 'pdf',
      category: 'BELGELER',
      order: 3
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
