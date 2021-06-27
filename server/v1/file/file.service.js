import { File } from '../../db/models';
import { downloadBlob, uploadBlob } from '../../boundaries/azure_storage';

export async function saveProfileFile(file) {
  const profile = new File();

  profile.name = file.originalname;
  profile.mimeType = file.mimetype;
  profile.fileSize = file.size;

  const savedProfile = await profile.save();
  const location = getAzureLocation(savedProfile);
  await uploadBlob(location, file.buffer);
  return savedProfile;
}

export async function getProfilePicture(fileId) {
  const profile = await File.findById(fileId);
  const location = getAzureLocation(profile);
  const data = await downloadBlob(location);
  const buf = Buffer.from(data.data);
  const base64 = `data:${profile.mimeType};base64,${buf.toString('base64')}`;
  return {type: data.type, base64};
}

export async function getProfilePictureAsBuffer(fileId) {
  const profile = await File.findById(fileId);
  const location = getAzureLocation(profile);
  const data = downloadBlob(location);
  return res.send({ type: data.type, data: data.data });
}

function getAzureLocation(fileObject) {
  if (!fileObject || !fileObject._id) {
    throw new Error('FILE.SERVICE.GET_LOCATION');
  }

  return `${fileObject._id.toString()}_${fileObject.name}`;
}
