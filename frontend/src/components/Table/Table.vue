<template>
    <div>
      <form @submit.prevent="handleSubmit">
        <input type="text" v-model="code" placeholder="Введите code">
        <button type="submit">Войти</button>
      </form>
      
      <div class="a d-flex justify-content-center align-items-center">
        <div>
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Responsible User ID</th>
                <th scope="col">Created At</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(lead, index) in leads" :key="lead.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ lead.name }}</td>
                <td>{{ lead.price }}</td>
                <td>{{ lead.responsible_user_id }}</td>
                <td>{{ formatDate(lead.created_at) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'TableA',
    data() {
      return {
        leads: [],
        code: '' 
      };
    },
    methods: {
      async fetchData() {
        try {
          const response = await axios.get('http://localhost:3000/api/leads');
          this.leads = response.data._embedded.leads; 
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      },
      formatDate(timestamp) {
        const date = new Date(timestamp * 1000); 
        return date.toLocaleString(); 
      },
      async handleSubmit() {
        const redirectUrl = `http://localhost:3000/callback?code=${this.code}`;
        window.location.href = redirectUrl;
      }
    },
    created() {
      this.fetchData(); 
    }
  };
  </script>
  
  <style lang="css" scoped>
  .a {
    height: 100vh;
  }
  </style>
  