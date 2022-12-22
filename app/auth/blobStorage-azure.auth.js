const { BlobServiceClient } = require("@azure/storage-blob");
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.connectionStringAzureBlob);
const Promise = require('bluebird');

const BlobService = async (data, fileName, container) => {
    const containerClient = await blobServiceClient.getContainerClient(container);
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    const matches = data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    const buffer = new Buffer.from(matches[2], 'base64');
    const response = await blockBlobClient.upload(buffer, buffer.byteLength);
    return response;
}; 

module.exports = {
    BlobService
}