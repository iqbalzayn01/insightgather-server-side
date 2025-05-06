const { createClient } = require('@supabase/supabase-js');
const { supabaseUrl, supabaseKey } = require('./index');

const url = supabaseUrl ?? '';
const key = supabaseKey ?? '';

if (!url || !key) {
  console.error('FATAL ERROR: SUPABASE_URL or SUPABASE_KEY is not defined.');
}

const supabase = createClient(url, key);

const getImageUrl = (name, path) => {
  const { data } = supabase.storage
    .from('insightgathers-bucket')
    .getPublicUrl(`public/images/${path}/${name}`);

  return data.publicUrl;
};

const uploadFile = async (file, path) => {
  const fileType = file.mimetype.split('/')[1];
  const filename = `${path}-${Date.now()}.${fileType}`;

  const { error } = await supabase.storage
    .from('insightgathers-bucket')
    .upload(`public/images/${path}/${filename}`, file.buffer, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.mimetype,
    });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  return filename;
};

const deleteFile = async (filename, path) => {
  await supabase.storage
    .from('insightgathers-bucket')
    .remove([`public/images/${path}/${filename}`]);
};

module.exports = {
  getImageUrl,
  uploadFile,
  deleteFile,
};
