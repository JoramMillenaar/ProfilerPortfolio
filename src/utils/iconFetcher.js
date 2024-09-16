export async function fetchIcon(name) {
  const images = {
    Python: 'python.svg',
    Django: 'django.webp',
    SQL: 'sql.webp',
    pytest: 'pytest.svg',
    Git: 'git.webp',
    JavaScript: 'js.webp',
    Shell: 'shell.webp',
    'HTML/CSS': 'css.webp',
    Kubernetes: 'kubernetes.svg',
    'Google Cloud': 'googlecloud.svg',
    WordPress: 'wordpress.webp',
    VueJS: 'vuejs.svg',
  };

  try {
    const image = await import(`@/assets/images/skills/${images[name]}`);
    return image.default;
  } catch (error) {
    return null;
  }
}
