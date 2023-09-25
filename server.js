const app = require('./application/app');

const PORT = process.env.PORT || 8000;

app.listen(PORT, function(error){
    console.log(`Server is running at port: ${PORT}`);
})

