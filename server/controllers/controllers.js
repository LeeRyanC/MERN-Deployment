const Pet = require("../models/models")

module.exports.findPets = (req, res) => {
    Pet.find()
        .then(allPets => {
            console.log(allPets);
            res.json({pets: allPets})
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
}

module.exports.findOne = (req, res) => {
    Pet.findOne({_id: req.params.id})
        .then(onePet => {
            console.log(onePet);
            res.json({pet: onePet})
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
}

module.exports.createNew = (req, res) => {
    Pet.create(req.body)
        .then(newPet => {
            console.log(newPet);
            res.json({pet: newPet});
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
}

module.exports.updateOne = (req, res) => {
    Pet.findOneAndUpdate({_id: req.params.id}, req.body, {runValidators: true, new: true, context: "query"})
        .then(updatedPet =>{
            console.log(updatedPet);
            res.json({pet: updatedPet});
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
}

module.exports.deleteOne = (req, res) => {
    Pet.findOneAndDelete({_id: req.params.id})
        .then(deletedPet => {
            console.log(deletedPet);
            res.json({pet: deletedPet});
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
}