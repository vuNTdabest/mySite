const mgdb = require('./db')

const Todo = function(todo) {
    this.title = todo.title;
    this.description = todo.description;
    this.published = todo.published;
};

// Todo.create = (newTodo, result) => {
//     mgdb.query('INSERT INTO ')
// }