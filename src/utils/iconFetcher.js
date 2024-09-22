export async function fetchIcon(name) {
  const images = {
    python: 'python.svg',
    django: 'django.webp',
    sql: 'sql.webp',
    pytest: 'pytest.svg',
    git: 'git.webp',
    javascript: 'js.webp',
    shell: 'shell.webp',
    css: 'css.webp',
    kubernetes: 'kubernetes.svg',
    googlecloud: 'googlecloud.svg',
    wordpress: 'wordpress.webp',
    vuejs: 'vuejs.svg',
  };

  try {
    const image = await import(`@/assets/images/skills/${images[name]}`);
    return image.default;
  } catch (error) {
    return null;
  }
}
