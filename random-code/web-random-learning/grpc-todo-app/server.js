const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

// use proto loader to load the proto file synchronously
const packageDef = protoLoader.loadSync("todo.proto", {});
// load the proto file package definition into a grpc object
const grpcObject = grpc.loadPackageDefinition(packageDef);
// get the todo package from the grpc object
const todoPackage = grpcObject.todoPackage;

// new grpc server
const server = new grpc.Server();
server.bind("0.0.0.0:40000", grpc.ServerCredentials.createInsecure()); // grpc communication will be with plain text (no ssl)
server.addService(todoPackage.Todo.service, {
  createTodo: createTodo,
  readTodos: readTodos,
  readTodosStream: readTodosStream,
});
server.start();

const todos = [];

function createTodo(call, callback) {
  const todoItem = { id: todos.length + 1, content: call.request.content };
  todos.push(todoItem);
  callback(null, todoItem); // (length of callback, returned value)
}

function readTodos(call, callback) {
  callback(null, {
    todoItems: todos,
  });
}

function readTodosStream(call, callback) {
  todos.forEach((todo) => {
    call.write(todo);
  });
  call.end();
}
