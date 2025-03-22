<template>
  <nav class="filter-nav">
    <button class="add-btn" @click="$router.push('/add')">Add a job</button>
    <!--Search Feature-->
    <input
      type="text"
      v-model="searchQuery"
      @input="updateSearch"
      placeholder="Search Jobs"
    />

    <div class="filters-container">
      <!-- Category Filter-->
      <select v-model="filters.category" @change="applyFilters">
        <option value="" default>All Categories</option>
        <option
          v-for="category in jobCategories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>

      <!-- Mode Filter-->
      <select v-model="filters.mode" @change="applyFilters">
        <option value="" default>All Modes</option>
        <option v-for="mode in jobModes" :key="mode" :value="mode">
          {{ mode }}
        </option>
      </select>

      <!-- Contract Filter-->
      <select v-model="filters.contract" @change="applyFilters">
        <option value="" default>All Types of Contracts</option>
        <option
          v-for="contract in jobContracts"
          :key="contract"
          :value="contract"
        >
          {{ contract }}
        </option>
      </select>

      <!-- Salary Filter -->
      <select v-model="filters.salaryRange" @change="applyFilters">
        <option value="" default>All Salary Ranges</option>
        <option
          v-for="range in filters.salaryRanges"
          :key="range.value"
          :value="range.value"
        >
          {{ range.label }}
        </option>
      </select>

      <!-- Location Filter -->
      <select v-model="filters.location" @change="applyFilters">
        <option value="" default>All Locations</option>
        <option
          v-for="location in jobLocations"
          :key="location"
          :value="location"
        >
          {{ location }}
        </option>
      </select>
      <button class="reset-btn" @click="ResetFilters">Reset Filters</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "FilterNav",
  data() {
    return {
      jobs: [],
      searchQuery: "",
      filters: {
        category: "",
        location: "",
        mode: "",
        contract: "",
        salaryRanges: [
          { label: "Entry Level (0-30k)", value: "0-30000" },
          { label: "Mid Level (30k-50k)", value: "30000-50000" },
          { label: "Senior Level (50k+)", value: "50000+" },
        ],
        salaryRange: "",
      },
    };
  },
  async created() {
    try {
      const response = await fetch('http://localhost:3000/jobs');
      this.jobs = await response.json();
      this.applyFilters();
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  },
  computed: {
    jobCategories() {
      return [...new Set(this.jobs.map((job) => job.catégorie))];
    },
    jobModes() {
      return [...new Set(this.jobs.map((job) => job.mode))];
    },
    jobContracts() {
      return [...new Set(this.jobs.map((job) => job.contrat))];
    },
    jobLocations() {
      return [...new Set(this.jobs.map((job) => job.localisation))];
    },
  },
  methods: {
    updateSearch() {
      this.$emit("update:search", this.searchQuery);
      this.applyFilters();
    },
    applyFilters() {
      const filtered = this.jobs.filter((job) => {
        // Search Filter
        const matchSearch = job.titre
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
        //Category Filter
        const matchCategory =
          !this.filters.category || job.catégorie === this.filters.category;

        // Location Filter
        const matchLocation =
          !this.filters.location || job.localisation === this.filters.location;

        // Work mode filter
        const matchMode = !this.filters.mode || job.mode === this.filters.mode;

        //Contract Type Filter
        const matchContract =
          !this.filters.contract || job.contrat === this.filters.contract;

        // Salary filter
        const salary = job.salaire;
        const matchSalary = this.filters.salaryRange === "" || this.filters.salaryRanges.some(range => {
          const [min, max] = range.value.split(/-|\+/);

          if (range.value.endsWith('+')) {
            return salary >= parseInt(min, 10);
          }
          return salary >= parseInt(min, 10) && salary <= parseInt(max, 10);
        });

        return (
          matchSearch &&
          matchCategory &&
          matchLocation &&
          matchMode &&
          matchSalary &&
          matchContract
        );
      });

      this.$emit("filtered-jobs", filtered);
    },
    ResetFilters(){
      this.filters = {
        category: "",
        location: "",
        mode: "",
        contract: "",
        salaryRange: "",
        salaryRanges: [
          { label: "Entry Level (0-30k)", value: "0-30000" },
          { label: "Mid Level (30k-50k)", value: "30000-50000" },
          { label: "Senior Level (50k+)", value: "50000+" },
        ]
      };
      this.searchQuery = "";
      this.applyFilters();
    },
    watch: {
      searchQuery() {
        this.applyFilters();
      },
    },
  },
};
</script>

<style scoped>
.filter-nav {
  padding: 10px;
  margin-bottom: 20px;
  text-align: center;
}

.filters-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.filters-container select {
  flex: 1;
  min-width: 200px;
  max-width: 200px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.filters-container input[type="text"] {
  flex: 1;
  min-width: 200px;
  max-width: 200px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.filter-nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #2c3e50;
  padding: 5px 10px;
  border-radius: 4px;
}

.filter-nav a:hover {
  color: white;
}

.filter-nav a.router-link-exact-active {
  color: white;
}

.add-btn {
  display: inline-block;
  padding: 0.8rem 2rem;
  background: #2a9dfc;
  color: white;
  text-decoration: none;
  border: none;
  border-radius: 15px;
  font-weight: bold;
  transition: all 0.3s ease;
  margin: 10px;
}

.reset-btn {
  display: inline-block;
  padding: 0.8rem 2rem;
  background: #2a9dfc;
  color: white;
  text-decoration: none;
  border: none;
  border-radius: 15px;
  font-weight: bold;
  transition: all 0.3s ease;
  margin: 10px;
}

.add-btn:hover {
  background: #2385d4;
  transform: translateY(-2px);
}
</style>
