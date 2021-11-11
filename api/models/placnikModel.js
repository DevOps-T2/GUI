const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const placnikSchema = new Schema({
    ime:                { type: String, required: true},
    priimek:            { type: String, required: true},
    naslov:             { type: String, required: true},
    posta:              { type: String, required: true},
    postnaStevilka:     { type: Number, required: true},
    email:              { type: String, required: true},
    telefon:            { type: String }
}, { timestamps: true });

const placnikModel = mongoose.model('placniki', placnikSchema, 'placniki');

module.exports = placnikModel;