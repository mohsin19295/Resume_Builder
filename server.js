const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(express())

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Running on PORT ${PORT}`)
})