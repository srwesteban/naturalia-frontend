export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "Upload_Images"); // tu preset real

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dy6udvu4e/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Error uploading image");
  }

  const data = await response.json();
  return data.secure_url; // esta es la URL final que guardarás en tu backend
};
