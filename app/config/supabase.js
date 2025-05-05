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

  await supabase.storage
    .from('insightgathers-bucket')
    .upload(`public/images/${path}/${filename}`, file, {
      cacheControl: '3600',
      upsert: false,
    });

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

// const uploadToSupabase = async (fileBuffer, filename, mimetype) => {
//   const { data, error } = await supabase.storage
//     .from('insightgathers-bucket')
//     .upload(filename, fileBuffer, {
//       contentType: mimetype,
//       upsert: true,
//     });

//   if (error) {
//     throw new Error(`Upload failed: ${error.message}`);
//   }

//   const { data: publicUrlData } = supabase.storage
//     .from('insightgathers-bucket')
//     .getPublicUrl(filename);

//   return publicUrlData.publicUrl;
// };

// const deleteFile = async (filename) => {
//   const { error } = await supabase.storage
//     .from('insightgathers-bucket')
//     .remove([filename]);

//   if (error) {
//     throw new Error(`Failed to delete file: ${error.message}`);
//   }
// };
