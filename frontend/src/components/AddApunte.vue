<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          class="form-control"
          required
          v-model="apunte.title"
        />
      </div>

      <div class="form-group">
        <label for="description">description</label>
        <input
          class="form-control"
          id="description"
          name="description"
          required
          v-model="apunte.description"
        />
      </div>

      <button @click="saveApunte" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn btn-success" @click="newApunte">Add</button>
    </div>
  </div>
</template>

<script>
import ApunteDataService from "../services/ApunteDataService";

export default {
  name: "add-apunte",
  data() {
    return {
      apunte: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    saveApunte() {
      let data = {
        title: this.apunte.title,
        description: this.apunte.description,
      };

      ApunteDataService.create(data)
        .then((response) => {
          this.apunte.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.error(e);
        });
    },
    newApunte() {
      this.submitted = false;
      this.apunte = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
