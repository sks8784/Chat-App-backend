const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://shubhamsinhaasus:sksinhachat123@cluster0.tynabcv.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = { connectDB };