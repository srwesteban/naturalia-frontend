const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;

// Sube una imagen a Cloudinary y retorna la URL segura
export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "Upload_Images");

  const response = await fetch(CLOUDINARY_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Error uploading image");
  }

  const data = await response.json();
  return data.secure_url;
};
