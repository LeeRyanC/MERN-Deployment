const petControllers = require("../controllers/controllers");

module.exports = app => {
    app.get("/pets", petControllers.findPets);
    app.get("/pets/:id", petControllers.findOne);
    app.post("/pets/new", petControllers.createNew);
    app.put("/pets/update/:id", petControllers.updateOne);
    app.delete("/pets/delete/:id", petControllers.deleteOne);
}