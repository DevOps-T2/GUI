const povprasevanjeModel = require('../models/povprasevanjeModel');
const placnikModel = require('../models/placnikModel');

exports.post = async function (req, res, next) {
    var povprasevanje = new povprasevanjeModel();
    povprasevanje.placnik = req.body.placnik;
    povprasevanje.datum = req.body.datum;
    povprasevanje.status = req.body.status;
    povprasevanje.skupaj = req.body.skupaj;
    povprasevanje.izdelki = req.body.izdelki;

    povprasevanje.save(function (err) {
        if (err){
            next(err);
        }
        else{
            res.json({
                message: 'Povprasevanje created',
                data: povprasevanje
            });
        }
    });   
};

exports.getAll = async function (req, res, next) {
    
    let povprasevanja = await povprasevanjeModel.find().populate('placnik');

    res.json({
        message: 'Finding povprasevanja..',
        data: povprasevanja 
    });
    return;

    povprasevanjeModel.find(async function (err, povprasevanja) {
        povprasevanja = await povprasevanja.populate('placnik').execPopulate();
        
    });
};

exports.get = async function (req, res, next) {
    povprasevanjeModel.findById(req.params.povprasevanjeID, async function (err, povprasevanje) {
        if (err){
            next(err);
        }

        povprasevanje = await povprasevanje.populate('placnik').execPopulate();
        
        res.json({
            message: 'Finding povprasevanje..',
            data: povprasevanje
        });
    });
};

exports.put = async function (req, res, next) {
    povprasevanjeModel.findById(req.params.povprasevanjeID, function (err, povprasevanje) {
        if (err){
            next(err);
        }
        
        povprasevanje.placnik = req.body.placnik;
        povprasevanje.datum = req.body.datum;
        povprasevanje.status = req.body.status;
        povprasevanje.skupaj = req.body.skupaj;
        povprasevanje.izdelki = req.body.izdelki;

        povprasevanje.save(function (err) {
            if (err) {
                next(err);
            }
            res.json({
                message: 'Povprasevanje info updated',
                data: povprasevanje
            });
        });
    });
};

exports.patch = async function (req, res, next) {
    povprasevanjeModel.findById(req.params.povprasevanjeID, function (err, povprasevanje) {
        if (err){
            next(err);
        }
        
        povprasevanje.placnik = req.body.placnik || povprasevanje.placnik;
        povprasevanje.datum = req.body.datum || povprasevanje.datum;
        povprasevanje.status = req.body.status || povprasevanje.status;
        povprasevanje.skupaj = req.body.skupaj || povprasevanje.skupaj;
        povprasevanje.izdelki = req.body.izdelki || povprasevanje.izdelki;

        povprasevanje.save(function (err) {
            if (err) {
                next(err);
            }
            res.json({
                message: 'Povprasevanje info updated',
                data: povprasevanje
            });
        });
    });
};

exports.delete = async function (req, res, next) {
    povprasevanjeModel.findByIdAndDelete(req.params.povprasevanjeID, function (err, povprasevanje) {
        if (err){
            next(err);
        }

        if(!povprasevanje){
            res.json({
                message: 'Povprasevanje doesnt exist',
                data: null,
            });
            return;
        }

        if(!povprasevanje.placnik){
            res.json({
                message: 'Povprasevanje deleted',
                data: [povprasevanje],
            });
            return;
        }

        placnikModel.findByIdAndDelete(povprasevanje.placnik, function (err, placnik) {
            if (err){
                next(err);
            }
    
            res.json({
                message: 'Povprasevanje and placnik deleted',
                data: [povprasevanje, placnik],
            });
            return;
        });
    });
};