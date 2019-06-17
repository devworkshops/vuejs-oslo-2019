<template>
  <div>
    <h1>{{id?`Supplier #${id}`:'New Supplier'}}</h1>
    <form class="form">
      <div class="form-group">
        <label class="form-label">Company Name</label>
        <input class="form-control" type="text" id="companyNameField" v-model="model.companyName">
      </div>
      <div class="form-group">
        <label class="form-label">Contact Name</label>
        <input class="form-control" type="text" id="contactNameField" v-model="model.contactName">
      </div>
      <div class="form-group">
        <label class="form-label">Contact Title</label>
        <input class="form-control" type="text" id="contactTitleField" v-model="model.contactTitle">
      </div>
    </form>
    <p>
      <!-- <router-link class="btn btn-primary" to="/suppliers">Save</router-link> -->
      <button class="btn btn-primary" @click="save()">Save</button>
      <router-link class="btn" to="/suppliers">Cancel</router-link>
    </p>
  </div>
</template>

<script>
import { SuppliersService } from "@/services/NorthwindService.js";

export default {
  props: {
    id: String,
    supplier: Object
  },
  data() {
    return {
      model: Object
    };
  },
  methods: {
    save() {
      if (this.id) {
        SuppliersService.update(this.model)
          .then(() => this.navigateBack())
          .catch(err => console.log(err));
      } else {
        SuppliersService.create(this.model)
          .then(() => this.navigateBack())
          .catch(err => console.log(err));
      }
    },
    navigateBack() {
      this.$router.push({ name: "suppliers" });
    }
  },
  created() {
    if (this.id && !this.supplier) {
      SuppliersService.get(this.id)
        .then(r => (this.model = r.data))
        .catch(err => console.log("error", err));
    } else {
      this.model = this.supplier || { address: {} };
    }
  }
};
</script>

<style lang="scss" scoped>
</style>