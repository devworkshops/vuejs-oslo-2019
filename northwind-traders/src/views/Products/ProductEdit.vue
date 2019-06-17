<template>
    <div>
        <h1>{{id?`Product #${id}`:'New Product'}}</h1>

        <form @submit.prevent="save()">
          <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" v-model="model.name">
          </div>
          <div class="form-group">
            <label>Category</label>
            <select class="form-control" v-model.number="model.categoryID">
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >{{ category.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Supplier</label>
            <select class="form-control" v-model.number="model.supplierID">
              <option
                v-for="supplier in suppliers"
                :key="supplier.id"
                :value="supplier.id"
              >{{ supplier.companyName }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Quantity Per Unit</label>
            <input type="text" class="form-control" v-model="model.quantityPerUnit">
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <label>Unit Price</label>
              <input type="number" class="form-control" v-model="model.unitPrice">
            </div>
            <div class="form-group col-md-4">
              <label>Units In Stock</label>
              <input type="number" class="form-control" v-model="model.unitsInStock">
            </div>
            <div class="form-group col-md-4">
              <label>Units On Order</label>
              <input type="number" class="form-control" v-model="model.unitsOnOrder">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-4">
              <label>Reorder Level</label>
              <input type="number" class="form-control" v-model="model.reorderLevel">
            </div>
            <div class="form-group col-md-4">
              <label>Status</label>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="discontinuedCheckbox"
                  v-model="model.discontinued"
                >
                <label class="form-check-label" for="discontinuedCheckbox">Discontinued</label>
              </div>
            </div>
          </div>
    
          <button type="submit" class="btn btn-primary">Save</button>
          <button @click="navigateBack()" class="btn btn-default">Cancel</button>
        </form>
    </div>
</template>

<script>
import {
  CategoriesService,
  SuppliersService,
  ProductsService
} from "@/services/NorthwindService.js";

export default {
  props: {
    id: String,
    product: Object
  },
  data() {
    return {
      categories: [],
      suppliers: [],
      model: {
        id: 0,
        supplierID: null,
        categoryID: null,
        quantityPerUnit: "",
        unitPrice: 0.0,
        unitsInStock: 0,
        unitsOnOrder: 0,
        reorderLevel: 0,
        discontinued: false,
        name: ""
      }
    };
  },
  methods: {
    save() {
      if (this.id) {
        ProductsService.update(this.model)
          .then(() => this.navigateBack())
          .catch(error => {
            console.error(error);
          });
      } else {
        ProductsService.create(this.model)
          .then(() => this.navigateBack())
          .catch(error => {
            console.error(error);
          });
      }
    },
    navigateBack() {
      this.$router.push("/products");
    }
  },
  created() {
    CategoriesService.getAll().then(result => (this.categories = result.data));

    SuppliersService.getAll().then(result => (this.suppliers = result.data));

    this.model = this.product || this.model;
    if (this.id && !this.product) {
      ProductsService.get(this.id).then(result => (this.model = result.data));
    }
  }
};
</script>