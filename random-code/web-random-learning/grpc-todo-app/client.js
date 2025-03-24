const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

// use proto loader to load the proto file synchronously
const packageDef = protoLoader.loadSync("todo.proto", {});
// load the proto file package definition into a grpc object
const grpcObject = grpc.loadPackageDefinition(packageDef);
// get the todo package from the grpc object
const todoPackage = grpcObject.todoPackage;

const client = new todoPackage.Todo(
  "localhost:40000",
  grpc.credentials.createInsecure()
);

// client.createTodo({ content: "todo two" }, (err, response) => {
//   console.log("Received created todo from server ", response);
// });

// client.createTodo({ content: "todo one" }, (err, response) => {
//   console.log("Received created todo from server ", response);
// });

// client.readTodos(null, (err, response) => {
//   console.log("Received todos from server ", response);
// });

const call = client.readTodosStream();
call.on("data", (item) => {
  console.log("Received streamed todo item from server", item);
});
call.on("end", (e) => console.log("Server ended"));
