const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Acount = new Scheme({
    username: {type: String},
    password: {type: String},
    status: {type: String},
},{
    timestamps: true
})

module.exports = mongoose.model('acounts', Acount)