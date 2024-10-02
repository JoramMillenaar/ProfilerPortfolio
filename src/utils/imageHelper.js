const images = import.meta.glob('../assets/images/*');

export async function getImageUrl(path) {
  const importImage = images[`../assets/images/${path}`];
  if (importImage) {
    try {
      const module = await importImage();
      return module.default;
    } catch (error) {
      console.error('Error loading image:', path, error);
      return '';
    }
  } else {
    console.error('Image not found:', path);
    return '';
  }
}
