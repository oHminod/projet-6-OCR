const SauceModel = require('../models/sauce');
const fs = require('fs');

exports.getAllSauces =  (req, res, next) => {
    SauceModel.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

exports.getThisSauce =  (req, res, next) => {
    SauceModel.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
};


exports.ajouterSauce =  (req, res, next) => {
    const nouvelleSauce = JSON.parse(req.body.sauce);
    const sauce = new SauceModel({
        ...nouvelleSauce,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersdisLiked: [],
    });
    sauce.save()
        .then(() => res.status(201).json({message: 'Sauce enregistré !'}))
        .catch(error => res.status(402).json({ error }));
};

exports.modifierSauce = (req, res, next) => {
    const image = req.file;
    let sauce = new SauceModel();
    if (image) {
        const sauceRequete = JSON.parse(req.body.sauce);
        if (sauceRequete.userId != req.session.userId) {
            return res.status(401).json({message: 'Accès refusé !'})
        }
        SauceModel.findOne({ _id: req.params.id})
            .then(sauceModifiee => {
                const filename = sauceModifiee.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    sauce = {
                        ...sauceRequete,
                        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                    };
                    SauceModel.updateOne({ _id: req.params.id }, sauce)
                        .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
                        .catch(error => res.status(400).json({ error }));
                });
            })
            .catch( error => {
                res.status(500).json({ error });
            });
        } else {
            if (req.body.userId != req.session.userId) {
                return res.status(401).json({message: 'Accès refusé !'})
            }
            sauce = {
                ...req.body
            }
            SauceModel.updateOne({ _id: req.params.id }, sauce)
                .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
                .catch(error => res.status(400).json({ error }));
        };
};

exports.supprimerSauce = (req, res, next) => {
    SauceModel.findOne({ _id: req.params.id})
        .then(sauce => {
            if (sauce.userId != req.session.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    SauceModel.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
 };

 exports.likerSauce = (req, res, next) => {
    SauceModel.findOne({ _id: req.params.id})
        .then(sauce => {
            let userLike = sauce.usersLiked.indexOf(req.body.userId);
            let userDislike = sauce.usersDisliked.indexOf(req.body.userId);
            if (req.body.like == '1') {
                    sauce.usersLiked.push(req.body.userId);
                    sauce.likes = sauce.usersLiked.length;
                    SauceModel.updateOne({ _id: req.params.id }, sauce)
                        .then(() => res.status(200).json({ message: 'Sauce likée !'}))
                        .catch(error => res.status(400).json({ error }));
            } else if (req.body.like == '0') {
                if (userLike == -1 && userDislike != -1) {
                    sauce.usersDisliked.splice(userDislike, 1);
                    sauce.dislikes = sauce.usersDisliked.length;
                    SauceModel.updateOne({ _id: req.params.id }, sauce)
                        .then(() => res.status(200).json({ message: 'Sauce likée !'}))
                        .catch(error => res.status(400).json({ error }));
                } else if (userLike != -1 && userDislike == -1) {
                    sauce.usersLiked.splice(userLike, 1);
                    sauce.likes = sauce.usersLiked.length;
                    SauceModel.updateOne({ _id: req.params.id }, sauce)
                        .then(() => res.status(200).json({ message: 'Sauce likée !'}))
                        .catch(error => res.status(400).json({ error }));
                }
            } else if (req.body.like == '-1') {
                    sauce.usersDisliked.push(req.body.userId);
                    sauce.dislikes = sauce.usersDisliked.length;
                    SauceModel.updateOne({ _id: req.params.id }, sauce)
                        .then(() => res.status(200).json({ message: 'Sauce likée !'}))
                        .catch(error => res.status(400).json({ error }));
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
 }
