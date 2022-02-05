<template>
  <div class="list row">
    <div class="col-md-">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by title"
          v-model="title"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Apuntes</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(apunte, index) in apuntes"
          :key="index"
          @click="setActiveApunte(apunte, index)"
        >
          {{ apunte.title }}
        </li>
      </ul>
      <button class="mb-3 btn bnt-sm btn-danger" @click="removeAllApuntes">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentApunte">
        <h4>Apunte</h4>
        <div>
          <label class="font-weight-bold">Title: </label>
          {{ currentApunte.title }}
        </div>
        <div>
          <label class="font-weight-bold">Description: </label>
          {{ currentApunte.description }}
        </div>
        <div>
          <label class="font-weight-bold">Status: </label>
          {{ currentApunte.published }}
        </div>
        <a :href="'/apuntes/' + currentApunte.id" class="badge badge-warning"
          >Edit</a
        >
      </div>
      <div v-else>
        <br />
        <p>Please click on a Apunte...</p>
      </div>
    </div>
  </div>
</template>

<script>
import ApunteDataService from "../services/ApunteDataService";

export default {
  name: "apunte-list",
  data() {
    return {
      apuntes: [],
      currentApunte: null,
      currentIndex: -1,
      title: "",
    };
  },
  methods: {
    retrieveApuntes() {
      ApunteDataService.getAll()
        .then((response) => {
          this.apuntes = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.error(e);
        });
    },
    refreshList() {
      this.retrieveApuntes();
      this.currentApunte = null;
      this.currentIndex = -1;
    },
    setActiveApunte(apunte, index) {
      this.currentApunte = apunte;
      this.currentIndex = index;
    },
    removeAllApuntes() {
      ApunteDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.error(e);
        });
    },
    searchTitle() {
      ApunteDataService.findByTitle()
        .then((response) => {
          this.apuntes = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.error(e);
        });
    },
  },
  mounted() {
    this.retrieveApuntes();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.badge-warning {
  background: #ff9800;
  color: black;
  outline: none;
  text-decoration: none;
}
</style>
