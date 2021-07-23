const path = require("path");
const {Router} = require("express");
const router = Router();
const fs = require('fs');


router.get('/', function(request, response) {
    const fileName = path.resolve(__dirname, "./data/photos.json");

    if(Object.keys(request.query).length === 0) {
        response.sendFile(fileName, {});
        return;
    }

    const data = fs.readFileSync(fileName, 'utf8');
    const photos = JSON.parse(data);

    const {albumId} = request.query;
    const albumPhotos = photos.filter(photo => photo.albumId == albumId);
    response.end(JSON.stringify(albumPhotos, null, '  '));
});

router.post("/", function(request, response) {
    const fileName = path.resolve(__dirname, "./data/photos.json");
    const data = fs.readFileSync(fileName, 'utf8');
    const photos = JSON.parse(data);
    
    const newPhoto = request.body;
    newPhoto.id=photos[photos.length-1].id+1;
    photos.push(newPhoto);

    fs.writeFileSync(fileName, JSON.stringify(photos, null, '  '));
    response.status(201).json({message: "Add successful"});
});

router.delete("/", function(request, response) {
    const fileName = path.resolve(__dirname, "./data/photos.json");
    const data = fs.readFileSync(fileName, 'utf8');
    let photos = JSON.parse(data);
    
    const {id} = request.body;
    photos=photos.filter(photo => photo.id !== id);

    fs.writeFileSync(fileName, JSON.stringify(photos, null, '  '));

    response.status(200).json({message: "Delete successful"});
});

router.put("/", function(request, response) {
    const fileName = path.resolve(__dirname, "./data/photos.json");
    const data = fs.readFileSync(fileName, 'utf8');
    const photos = JSON.parse(data);
    
    const updatePhoto = request.body;
    index = photos.findIndex(photo => photo.id == updatePhoto.id);
    photos[index] = updatePhoto;

    fs.writeFileSync(fileName, JSON.stringify(photos, null, '  '));

    response.send(photos);
});



module.exports = router;