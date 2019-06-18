<template>
  <div>
    <h1>Categories</h1>
    <b-table striped hover :items="categories" :fields="fields">
      <template slot="actions" slot-scope="data">
        <div v-if="editingCategory.id!=data.item.id">
          <button class="btn btn-secondary btn-sm" @click="edit(data.item, data.index)">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-danger btn-sm" @click="remove(data.item, data.item.id)">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
        <div v-else>
          <button class="btn btn-primary btn-sm" @click="update()">
            <i class="fas fa-save"></i>
          </button>
          <button class="btn btn-default btn-sm" @click="cancelUpdate()">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </template>
      <template slot="name" slot-scope="data">
        <template v-if="editingCategory.id!=data.item.id">{{data.value}}</template>
        <template v-else>
          <input type="text" class="form-control" v-model="editingCategory.name">
        </template>
      </template>
      <template slot="description" slot-scope="data">
        <template v-if="editingCategory.id!=data.item.id">{{data.value}}</template>
        <template v-else>
          <input type="text" class="form-control" v-model="editingCategory.description">
        </template>
      </template>
      <template slot="bottom-row">
        <td>
          <input
            type="text"
            v-model="addingCategory.name"
            placeholder="Name..."
            class="form-control"
            :class="{ 'is-invalid': errors && errors.name }"
          >
          <div class="invalid-feedback" v-if="errors && errors.name">{{ errors.name }}</div>
        </td>
        <td>
          <input
            type="text"
            v-model="addingCategory.description"
            placeholder="Description..."
            class="form-control"
            :class="{ 'is-invalid': errors && errors.description }"
          >
          <div class="invalid-feedback" v-if="errors && errors.description">{{ errors.description }}</div>
        </td>
        <td>
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-primary btn-sm" @click="add()">
              <i class="fas fa-plus"></i>
            </button>
            <button type="button" class="btn btn-default btn-sm" @click="resetAdd()">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </td>
      </template>
    </b-table>
  </div>
</template>

<script>
import { CategoriesService } from "@/services/NorthwindService.js";

export default {
  data() {
    return {
      fields: ["name", "description", "actions"],
      categories: [],
      editingCategory: {},
      editingIndex: null,
      addingCategory: {
        name: "",
        description: ""
      },
      defaultCategory: {
        name: "",
        description: ""
      },
      errors: null
    };
  },
  created() {
    this.fetchAll();
  },
  methods: {
    fetchAll() {
      CategoriesService.getAll()
        .then(result => (this.categories = result.data))
        .catch(error => console.error(error));
    },
    edit(cat, index) {
      this.editingCategory = cat;
      this.editingIndex = index;
    },
    update() {
      CategoriesService.update(this.editingCategory)
        .then(() => {
          this.editingCategory = {};
          this.fetchAll();
        })
        .catch(err => Console.log(err));
    },
    cancelUpdate() {
      this.editingCategory = {};
    },
    remove(cat, id) {
      this.$bvModal
        .msgBoxConfirm(
          `Please confirm that you want to delete '${cat.name}'.`,
          {
            title: "Please Confirm",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "Delete",
            cancelVariant: "default",
            cancelTitle: "Cancel",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true
          }
        )
        .then(value => {
          if (value) {
            CategoriesService.delete(id).then(
              r => (this.categories = this.categories.filter(d => d.id != id))
            );
          }
        });
    },
    add() {
      this.validate(this.addingCategory);
      if (this.errors) return;
      CategoriesService.create(this.addingCategory)
        .then(result => {
          this.categories.push(result.data);
          this.resetAdd();
        })
        .catch(err => console.log(err));
    },
    resetAdd() {
      this.addingCategory = { ...this.defaultCategory };
    },
    validate(cat) {
      this.errors = {};

      if (!cat.name.trim()) this.errors.name = "Name is a required field";
      if (!cat.description.trim())
        this.errors.description = "Description is a required field";

      if (Object.keys(this.errors).length == 0) this.errors = null;
    }
  }
};
</script>

<style scoped>
</style>