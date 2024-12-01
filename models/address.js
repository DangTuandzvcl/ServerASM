const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Address = new Scheme({
    name: {type: String},
    phone: {type: String},
    address: {type: String},
},{
    timestamps: true
})

module.exports = mongoose.model('address', Address)


