<template>
  <div class="page-container">
    <div class="header">
      <h1>Job Board</h1>
      <p>Find your next career opportunity</p>
      <router-link to="/add" class="btn">Post a Job</router-link>
    </div>

    <div class="content-wrapper">
      <aside class="filter-section">
        <filter-nav :jobs="jobs" @filtered-jobs="updateFilteredJobs" />
      </aside>

      <main class="job-list-section">
        <div v-if="filteredJobs.length" class="job-list">
          <div v-for="job in filteredJobs" :key="job.id" class="job-card">
            <h3>{{ job.titre }}</h3>
            <p class="company-info">
              <span>{{ job.localisation }}</span> •
              <span>{{ job.contrat }}</span>
            </p>
            <p class="brief-description">{{ job.description.substring(0, 100) }}...</p>
            <div class="meta-info">
              <span class="salary">{{ job.salaire }} MAD/an</span>
              <div class="btn-group">
                <router-link :to="`/jobs/${job.id}`" class="view-btn">See More</router-link>
                <router-link :to="`/edit/${job.id}`" class="view-btn">Edit Job</router-link>
              </div>
              
            </div>
          </div>
        </div>
        <div v-else class="empty-state">
          <p>No jobs found matching your criteria</p>
        </div>
      </main>
    </div>
  </div>
</template>

<style>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header {
  text-align: center;
  padding: 2rem;
  background: #2196F3;
  color: white;
  margin-bottom: 2rem;
  border-radius: 8px;
}

.header h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.header p {
  margin-bottom: 1rem;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: white;
  color: #2196F3;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn:hover {
  background: #f0f0f0;
  transform: translateY(-2px);
}

.content-wrapper {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
  margin-top: 1rem;
}

.filter-section {
  background: #E3F2FD;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.job-list-section {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #E3F2FD;
}

.job-card {
  background: white;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.job-card:hover {
  transform: translateY(-3px);
}

.brief-description {
  color: #666;
  font-size: 0.9em;
  margin-bottom: 1rem;
}

.meta-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.salary {
  font-weight: bold;
  color: #2196F3;
}

.view-btn {
  display: block;
  padding: 0.5rem 1rem;
  background: #2196F3;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  width: fit-content;
  margin: 10px;
}

.edit-btn {
  display: block;
  padding: 0.5rem 1rem;
  background: #2196F3;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  width: fit-content;
  margin: 10px;
}

.view-btn:hover {
  background: #1976D2;
  transform: translateY(-2px);
}

.btn-group{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center; 
}
</style>

<script>
import JobDetail from "@/components/JobDetail.vue";
import FilterNav from "@/components/FilterNav.vue";

export default {
  name: "Home",
  components: { FilterNav, JobDetail },
  data() {
    return {
      jobs: [],
      filteredJobs: []
    };
  },
  async created() {
    try {
      const response = await fetch('http://localhost:3000/jobs');
      this.jobs = await response.json();
      this.filteredJobs = [...this.jobs];
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  },
  methods: {
    updateFilteredJobs(filteredJobs) {
      this.filteredJobs = filteredJobs;
    }
  }
};
</script>
