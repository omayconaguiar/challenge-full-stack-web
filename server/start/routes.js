"use strict";

const Route = use("Route");

Route.post("/api/users", "UserController.store");
Route.get("/api/users", "UserController.index");
Route.get("/api/users/:id", "UserController.show");
Route.put("/api/users/:id", "UserController.update");
Route.delete("/api/users/:id", "UserController.destroy");
