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
    newTodo: null,
    filters: ["All", "Todo", "Done"],
    activeFilter: "All"
  },
  methods: {
    add() {
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodo,
        done: false,
        created: new Date()
      });
      this.newTodo = null;
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
      .then(
        json =>
          (this.todos = json.map(t => {
            return {
              ...t,
              done: t.completed,
              created: new Date()
            };
          }))
      );
  }
});
