export function calculateTopPosition(element) {
  const headerOffset = 60; // Adjust this based on your fixed header's height
  const elementPosition =
    element.getBoundingClientRect().top + window.scrollY - headerOffset;
  return elementPosition;
}