Vue.component("remaining-items", {
  props: {
    remaining: Number
  },
  template: `
    <div class="alert alert-danger" v-if="remaining > 10"><slot name='danger'></slot></div>
    <div class="alert alert-secondary" v-else-if="remaining>0">{{remaining}} item(s) to be done</div>
    <div class="alert alert-success" v-else><slot>Hooray!!</slot></div>
    `
});

Vue.component("add-item", {
  data() {
    return {
      newTodo: undefined
    };
  },
  template: `
  <form @submit.prevent="add" class="mb-2">
        <input
          type="text"
          class="form-control"
          placeholder="Add new item..."
          v-model="newTodo"
        />
      </form>
  `,
  methods: {
    add() {
      this.$emit("submitted", this.newTodo);
      this.newTodo = undefined;
    }
  }
});

Vue.filter("friendly-date", date => {
  var diff = new Date() - date;
  if (diff < 1000) return `Just now`;
  if (diff < 60000) return `${Math.floor(diff / 1000)} seconds ago`;
  if (diff < 60000 * 60) return `${Math.floor(diff / 60000)} minutes ago`;
  return "Long long time ago";
});

var app = new Vue({
  el: "#app",
  data: {
    title: "Hello, NDC Oslo",
    todos: [],
    nextTodoId: 5,
    filters: ["All", "Todo", "Done"],
    activeFilter: "All"
  },
  methods: {
    add(newTodo) {
      this.todos.push({
        id: this.nextTodoId++,
        title: newTodo,
        done: false,
        created: new Date()
      });
    }
  },
  computed: {
    filteredTodos() {
      console.log("FILTERED TODOS");
      if (this.activeFilter == "All") return this.todos;
      if (this.activeFilter == "Todo") return this.todos.filter(t => !t.done);
      if (this.activeFilter == "Done") return this.todos.filter(t => t.done);
    }
  },
  created() {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(response => response.json())
      .then(json => {
        this.todos = json.map(t => {
          return {
            ...t,
            done: t.completed,
            created: new Date()
          };
        });
        this.newTodoId = this.todos.length + 1;
      });
  }
});
