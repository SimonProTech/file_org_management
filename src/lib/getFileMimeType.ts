const getFileMimeType = (file: File) => {
  let mimeType = '';
  switch (file.type) {
    case 'image/jpeg':
    case 'image/png': {
      mimeType = 'image';
      return mimeType;
    }
    case 'image/svg+xml': {
      mimeType = 'svg';
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
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
      mimeType = 'docx';
      return mimeType;
    }
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
      mimeType = 'xlsx';
      return mimeType;
    }
    case 'application/msword': {
      mimeType = 'doc';
      return mimeType;
    }
    default: {
      mimeType = 'default';
      return mimeType;
    }
  }
};

export default getFileMimeType;
