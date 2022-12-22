const { v4: uuidv4 } = require('uuid');
const { BlobService } = require('../auth/blobStorage-azure.auth');

const BlobServiceImg = async (image) => {
    const nombreImg = `${uuidv4()}.${image?.format}`;
    const uploadOptions = {
        container: process.env.containerNameImages,
        blob: nombreImg, 
        text: image?.base64
    };
    const response = await BlobService(uploadOptions.text, uploadOptions.blob, uploadOptions.container);
    return response;
}
const BlobServiceDocuments = async (document) => {
    const nombreDocuments = `${uuidv4()}.${document?.format}`;
    const uploadOptions = {
        container: process.env.containerNameDocuments,
        blob: nombreDocuments, 
        text: document?.base64
    };
    const response = await BlobService(uploadOptions.text, uploadOptions.blob, uploadOptions.container);
    return response;
}

module.exports = {
    BlobServiceImg,
    BlobServiceDocuments 
}