import skillsData from '@/data/skills.json';

export async function fetchIcon(skillId) {
  try {
    const skill = skillsData.find((skill) => skill.id === skillId);

    if (!skill) {
      throw new Error(`Skill not found: ${skillId}`);
    }

    const image = await import(`@/assets/images/skills/${skill.icon}`);
    return image.default;
  } catch (error) {
    return null;
  }
}
