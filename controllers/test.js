// test.use(express.json());
exports.getTest = (req, res, next) => {
    res.send(`<h1 style="text-align: center">Salut le Monde !</h1></br></br></br></br></br><p style="text-align: center">On est dans le controller !</p>`)
};

const TestModel = require('../models/testModel');

exports.postTest = (req, res, next) => {
    // delete req.body._id;
    const test = new TestModel({
        ...req.body
    });
    test.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => {res.status(400).json({ error });
                        console.log('coucou')});
};
