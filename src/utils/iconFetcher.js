import skillsData from '/src/data/skills.json';

export async function fetchIcon(skillId) {
  try {
    const skill = skillsData.find((skill) => skill.id === skillId);

    if (!skill) {
      throw new Error(`Skill not found: ${skillId}`);
    }

    const image = await import(`/src/assets/images/skills/${skill.icon}`);
    return image.default;
  } catch (error) {
    console.error(error);
    return null;
  }
}
