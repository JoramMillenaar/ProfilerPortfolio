<template>
  <nav-bar :showAtTop="true" />
  <div class="skills-page">
    <main>
      <section class="skills-section">
        <div class="container">
          <h2 id="skills">My Skills</h2>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search skills..."
            class="search-bar"
          />
          <table class="skills-table">
            <thead>
              <tr>
                <th @click="sortBy('id')">
                  Icon
                  <span v-if="sortKey === 'id'">
                    <span v-if="sortOrder === 'asc'">▲</span>
                    <span v-else>▼</span>
                  </span>
                </th>
                <th @click="sortBy('name')">
                  Name
                  <span v-if="sortKey === 'name'">
                    <span v-if="sortOrder === 'asc'">▲</span>
                    <span v-else>▼</span>
                  </span>
                </th>
                <th @click="sortBy('estHours')">
                  Est. Hours Spent
                  <span v-if="sortKey === 'estHours'">
                    <span v-if="sortOrder === 'asc'">▲</span>
                    <span v-else>▼</span>
                  </span>
                </th>
                <th @click="sortBy('level')">
                  Level
                  <span v-if="sortKey === 'level'">
                    <span v-if="sortOrder === 'asc'">▲</span>
                    <span v-else>▼</span>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="skill in filteredSkills" :key="skill.id">
                <td>
                  <skill-emblem :name="skill.id" />
                </td>
                <td>{{ skill.name }}</td>
                <td>{{ skill.estHours }}</td>
                <td>{{ skill.level }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <site-footer></site-footer>
    </main>
  </div>
</template>

<script>
import SiteFooter from '../components/SiteFooter.vue';
import skillsData from '@/data/skills.json';
import SkillEmblem from '@/components/experience/SkillEmblem.vue';
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    SiteFooter,
    SkillEmblem,
    NavBar,
  },
  data() {
    return {
      skills: skillsData,
      searchQuery: '',
      sortKey: 'level',
      sortOrder: 'desc',
    };
  },
  computed: {
    filteredSkills() {
      let filtered = this.skills.filter((skill) =>
        skill.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      if (this.sortKey) {
        filtered.sort((a, b) => {
          let aValue = a[this.sortKey];
          let bValue = b[this.sortKey];

          // Custom sorting for 'level' if necessary
          if (this.sortKey === 'level') {
            const levels = ['Familiar', 'Proficient', 'Seasoned', 'Advanced'];
            aValue = levels.indexOf(aValue);
            bValue = levels.indexOf(bValue);
          }

          if (aValue < bValue) {
            return this.sortOrder === 'asc' ? -1 : 1;
          } else if (aValue > bValue) {
            return this.sortOrder === 'asc' ? 1 : -1;
          } else {
            return 0;
          }
        });
      }

      return filtered;
    },
  },
  methods: {
    sortBy(key) {
      if (this.sortKey === key) {
        // Toggle sort order
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        // Set new sort key and default to ascending order
        this.sortKey = key;
        this.sortOrder = 'asc';
      }
    },
  },
};
</script>

<style scoped>
.skills-page {
  padding: 2rem 0;
}

.search-bar {
  margin: 1.5rem 0;
  padding: 0.75rem;
  width: 100%;
  max-width: 400px;
  font-size: 1rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: black;
  color: white;
}

.skills-table {
  width: 100%;
  border-collapse: collapse;
}

.skills-table th,
.skills-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border);
}

.skills-table th {
  background-color: var(--bg-color-secondary);
  cursor: pointer;
  user-select: none;
}

.skills-table th span {
  margin-left: 5px;
  font-size: 0.8em;
}

.skill-emblem {
  width: 40px;
  height: 40px;
  object-fit: contain;
}
</style>
