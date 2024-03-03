const getFileMimeType = (file: File) => {
  let mimeType = '';
  switch (file.type) {
    case 'image/jpeg':
    case 'image/png':
    case 'svg+xml': {
      mimeType = 'image';
      return mimeType;
    }
    case 'application/pdf': {
      mimeType = 'pdf';
      return mimeType;
    }
    case 'text/csv': {
      mimeType = 'csv';
      return mimeType;
    }
    default: {
      mimeType = 'default';
      return mimeType;
    }
  }
};

export default getFileMimeType;
