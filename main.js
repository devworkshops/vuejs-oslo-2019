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
  created(){
    this.todos = [
        { id: 1, title: "New Item", done: false, created: new Date(2019, 1, 1) },
        {
          id: 2,
          title: "New Item 1",
          done: false,
          created: new Date(2019, 1, 1)
        },
        { id: 3, title: "New Item 2", done: true, created: new Date() },
        { id: 4, title: "New Item 3", done: false, created: new Date() }
      ];
  }
});
