require('dotenv').config();
const app = require('./app');
const connectDB = require('./src/config/db');

connectDB();




const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});