const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/dictionary_app';

mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
},
console.log(`DB running on ${url}`));