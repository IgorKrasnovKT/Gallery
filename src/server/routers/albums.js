const {Router} = require("express")
const router = Router();
const path = require("path");

router.get('/', function(request, response) {
    const fileName = path.resolve(__dirname, "./data/albums.json");
    response.sendFile(fileName, {});
});

module.exports = router;