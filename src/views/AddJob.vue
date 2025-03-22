<template>
  <div class="add-job">
    <h1>Add Job Page</h1>
    <p>Fill this form to add a new job offer</p>
    <router-link to="/" class="back-btn">Back to Home</router-link>
    <form @submit.prevent="submitJob" class="form-container">
      <!-- Job title  -->
      <div class="form-group">
        <label>Job Title</label>
        <input type="text" v-model="newJob.titre" required placeholder="Job Title"/>
      </div>

      <!-- Description  -->
      <div class="form-group">
        <label>Description</label>
        <textarea
          v-model="newJob.description"
          required
          placeholder="Description"
        ></textarea>
      </div>

      <!-- Salary -->
      <div class="form-group">
        <label>Salary</label>
        <input
          type="number"
          v-model.number="newJob.salaire"
          required
          placeholder="Salaire"
        />
      </div>

      <!-- Category -->
      <div class="form-group">
        <label>Catégorie</label>
        <input
          type="text"
          v-model="newJob.catégorie"
          required
          placeholder="Catégorie"
        />
      </div>

      <!-- Mode -->
      <div class="form-group">
        <label>Work Mode</label>
        <select v-model="newJob.mode" required>
          <option value="" disabled selected>Select work mode</option>
          <option value="Présentiel">Présentiel</option>
          <option value="Télétravail">Télétravail</option>
          <option value="Hybride">Hybride</option>
        </select>
      </div>

      <div class="form-group">
        <label>Contract Type</label>
        <select v-model="newJob.contrat" required>
          <option value="" disabled selected>Select contract type</option>
          <option value="CDI">CDI</option>
          <option value="CDD">CDD</option>
          <option value="Freelance">Freelance</option>
        </select>
      </div>

      <!-- Location  -->
      <div class="form-group">
        <label>Location</label>
        <input type="text" v-model="newJob.localisation" required placeholder="Location" />
      </div>

      <div class="button-group">
        <button type="submit" class="submit-btn">Add Job</button>
        <button type="reset" class="cancel-btn" @click="$router.push('/')">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "AddJob",
  data() {
    return {
      newJob: {
        id: "",
        titre: "",
        description: "",
        salaire: "",
        date: new Date().toISOString().split("T")[0],
        catégorie: "",
        mode: "",
        contrat: "",
        localisation: "",
      },
    };
  },
  methods: {
    async submitJob() {
      try {
        
        const jobsResponse = await fetch('http://localhost:3000/jobs');
        if (!jobsResponse.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const jobs = await jobsResponse.json();
        
        
        this.newJob.id = (jobs.length + 2).toString();

        
        const response = await fetch('http://localhost:3000/jobs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.newJob),
        });

        if (!response.ok) {
          throw new Error('Failed to submit job');
        }

        this.$router.push('/');
        alert('Job submitted successfully!');

        // Reset form
        this.newJob = {
          id: "", 
          titre: "",
          description: "",
          salaire: "",
          date: new Date().toISOString().split("T")[0],
          catégorie: "",
          mode: "",
          contrat: "",
          localisation: ""
        };
      } catch (error) {
        console.error('Error submitting job:', error);
        alert('Failed to submit job. Please try again.');
      }
    }
  }
};
</script>

<style scoped>
.add-job {
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
  background: #2a9dfc;
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-weight: bold;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: #2385d4;
  transform: translateY(-2px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-container {
  max-width: 600px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  justify-content: center;
}

.form-group {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group label {
  width: 200px;
  min-width: 100px;
  text-align: right;
  font-weight: bold;
}

.form-group input,
.form-group select,
.form-group textarea {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.submit-btn,
.cancel-btn {
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn {
  background: #42b983;
  color: white;
}

.cancel-btn {
  background: #e74c3c;
  color: white;
}

.submit-btn:hover {
  background: #3aa876;
  transform: translateY(-2px);
}

.cancel-btn:hover {
  background: #c0392b;
  transform: translateY(-2px);
}
</style>
