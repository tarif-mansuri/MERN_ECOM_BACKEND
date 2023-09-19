const http = require('http');
const app = require('./app/app');

const PORT = process.env.PORT || 8000;

app.listen(PORT, function(error){
    console.log(`Server is running at port: ${PORT}`);
})

