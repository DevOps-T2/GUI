const placnikModel = require('../models/placnikModel');

exports.post = async function (req, res, next) {
    var placnik = new placnikModel();
    placnik.ime = req.body.ime;
    placnik.priimek = req.body.priimek;
    placnik.naslov = req.body.naslov;
    placnik.posta = req.body.posta;
    placnik.postnaStevilka = req.body.postnaStevilka;
    placnik.email = req.body.email;
    placnik.telefon = req.body.telefon;

    placnik.save(function (err) {
        if (err){
            next(err);
        }
        else{
            res.json({
                message: 'Placnik created',
                data: placnik
            });
        }
    });   
};

exports.getAll = async function (req, res, next) {
    placnikModel.find(function (err, placniks) {
        if (err)
            next(err);
        res.json({
            message: 'Finding placniks..',
            data: placniks
        });
    });
};

exports.get = async function (req, res, next) {
    placnikModel.findById(req.params.placnikID, function (err, placnik) {
        if (err){
            next(err);
        }
        res.json({
            message: 'Finding placnik..',
            data: placnik
        });
    });
};

exports.put = async function (req, res, next) {
    placnikModel.findById(req.params.placnikID, function (err, placnik) {
        if (err){
            next(err);
        }
        
        placnik.ime = req.body.ime;
        placnik.priimek = req.body.priimek;
        placnik.naslov = req.body.naslov;
        placnik.posta = req.body.posta;
        placnik.postnaStevilka = req.body.postnaStevilka;
        placnik.email = req.body.email;
        placnik.telefon = req.body.telefon;

        placnik.save(function (err) {
            if (err) {
                next(err);
            }
            res.json({
                message: 'Placnik info updated',
                data: placnik
            });
        });
    });
};

exports.patch = async function (req, res, next) {
    placnikModel.findById(req.params.placnikID, function (err, placnik) {
        if (err){
            next(err);
        }
        
        placnik.ime = req.body.ime || placnik.ime;
        placnik.priimek = req.body.priimek || placnik.priimek;
        placnik.naslov = req.body.naslov || placnik.naslov;
        placnik.posta = req.body.posta || placnik.posta;
        placnik.postnaStevilka = req.body.postnaStevilka || placnik.postnaStevilka;
        placnik.email = req.body.email || placnik.email;
        placnik.telefon = req.body.telefon || placnik.telefon;

        placnik.save(function (err) {
            if (err) {
                next(err);
            }
            res.json({
                message: 'Placnik info updated',
                data: placnik
            });
        });
    });
};

exports.delete = async function (req, res, next) {
    placnikModel.findByIdAndDelete(req.params.placnikID, function (err, placnik) {
        if (err){
            next(err);
        }
        res.json({
            message: 'Placnik deleted',
            data: placnik,
        });
    });
};