//@ts-nocheck

export function getUniqueId() {
  return Math.random().toString(36).substring(7);
}

export async function createBlobFromString(client, blobName, fileContentsAsString) {
  const blockBlobClient = await client.getBlockBlobClient(blobName);

  await blockBlobClient.upload(fileContentsAsString, fileContentsAsString.length);
  console.log(`created blob ${blobName}`);
}

export async function downloadBlobToString(containerClient, blobName) {
  const blobClient = await containerClient.getBlobClient(blobName);

  const downloadResponse = await blobClient.download();
  const downloaded = await streamToBuffer(downloadResponse.readableStreamBody);

  return downloaded.toString();
}

async function streamToBuffer(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (data) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on("error", reject);
  });
}
