<template>
  <div v-if="currentApunte" class="edit-form">
    <h4>Apunte</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          class="form-control"
          v-model="currentApunte.title"
        />
      </div>
      <div class="form-group">
        <label for="description" class="font-weight-bold">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          class="form-control"
          v-model="currentApunte.description"
        />
      </div>
      <div class="form-group">
        <label for="status" class="font-weight-bold">Status</label>
        {{ currentApunte.published ? "Published" : "Pending" }}
      </div>
    </form>
    <button
      class="badge badge-primary mr-2"
      v-if="currentApunte.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button
      v-else
      class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>
    <button class="badge badge-danger mr-2" @click="deleteApunte">
      Delete
    </button>
    <button class="badge badge-success" type="submit" @click="updateTutorial">
      Update
    </button>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Please click on a Apunte...</p>
  </div>
</template>

<script>
import ApunteDataService from "../services/ApunteDataService";
export default {
  name: "apunte",
  data() {
    return {
      currentApunte: null,
      message: "",
    };
  },
  methods: {
    getApunte(id) {
      ApunteDataService.get(id)
        .then((response) => {
          this.currentApunte = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updatePublished(status) {
      let data = {
        id: this.currentApunte.id,
        title: this.currentApunte.title,
        published: status,
      };

      ApunteDataService.update(this.currentApunte.id, data)
        .then((response) => {
          this.currentApunte.published = status;
          console.log(response.data);
        })
        .catch((e) => {
          console.error(e);
        });
    },
    updateTutorial() {
      ApunteDataService.update(this.currentApunte.id, this.currentApunte)
        .then((response) => {
          console.log(response.data);
        })
        .catch((e) => {
          console.error(e);
        });
    },
    deleteTutorial() {
      ApunteDataService.delete()
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "apuntes" });
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getApunte(this.$router.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
.badge-danger {
  background: #8a0522;
  color: white;
  outline: none;
  text-decoration: none;
}
.badge-success {
  background: #0db6b6;
  color: white;
  outline: none;
  text-decoration: none;
}
.badge-primary {
  background: #0d10b6;
  color: white;
  outline: none;
  text-decoration: none;
}
</style>
