<template>
  <div class="job-detail">
    <template v-if="job">
      <h1>{{ job.titre }}</h1>
      <div class="job-info">
        <p class="company-info">
          <span>{{ job.localisation }}</span> •
          <span>{{ job.contrat }}</span>
        </p>
        <p class="description">{{ job.description }}</p>
        <div class="meta-info">
          <span class="salary">{{ job.salaire }}</span>
          <p>Category: {{ job.catégorie }}</p>
          <p>Mode: {{ job.mode }}</p>
          <p>Created Date: {{ job['date de création'] }}</p>
        </div>
      </div>
      <div class="btn-group">
        <router-link to="/" class="back-btn">Back to Home</router-link>
        <router-link to="/" class="delete-btn" @click="DeleteJob">Delete Job</router-link>
      </div>
    </template>
    <template v-else>
      <p>Loading job details...</p>
    </template>
  </div>
</template>

<script>
export default {
  name: 'JobDetail',
  data() {
    return {
      job: null,
      isDeleting: false
    };
  },
  methods: {
    async DeleteJob() {
      this.isDeleting = true;
      try {
        const jobId = this.$route.params.id;
        const response = await fetch(`http://localhost:3000/jobs/${jobId}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Failed to delete job');
        }

        this.$router.push('/');
        alert('Job deleted successfully!');
      } catch (error) {
        alert('Failed to delete job. Please try again.');
      } finally {
        this.isDeleting = false;
      }
    }
  },
  async created() {
    const jobId = this.$route.params.id;
    try {
      const response = await fetch(`http://localhost:3000/jobs/${jobId}`);
      if (!response.ok) {
        throw new Error('Job not found');
      }
      this.job = await response.json();
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  }
};
</script>

<style scoped>
.job-detail {
  padding: 2rem;
  text-align: center;
}

h1 {
  color: #35495e;
  margin-bottom: 1rem;
}

p {
  color: #666;
  margin-bottom: 2rem;
}

.back-btn {
  display: inline-block;
  padding: 0.8rem 2rem;
  background: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: #3aa876;
  transform: translateY(-2px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.delete-btn {
  display: inline-block;
  padding: 0.8rem 2rem;
  background: #e74c3c;
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-weight: bold;
  transition: all 0.3s ease;
  margin-left: 1rem;
}

.delete-btn:hover {
  background: #c0392b;
  transform: translateY(-2px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.btn-group{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
