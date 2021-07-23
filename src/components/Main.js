import React, { Component } from 'react'
import Album from './Album';
import PhotosInAlbum from './PhotosInAlbum';

export default class Ccomponent extends Component {
    state = {
        albums: [],
        photos: [],
        error: '',
        clickedOnAlbum: false,
        albumId: null
    }
    
    async componentDidMount() {
        let albums = [];
        let photos = [];

        // const urlAlbums="https://jsonplaceholder.typicode.com/albums";
        // const urlPhotos="https://jsonplaceholder.typicode.com/photos";

        const urlAlbums="http://localhost:3001/albums";
        const urlPhotos="http://localhost:3001/photos";

        try {
            const resultAlbums = await fetch(urlAlbums)
            albums = await resultAlbums.json()
            const resultPhotos = await fetch(urlPhotos)
            photos = await resultPhotos.json()
        } catch (err) {
            this.setState({
                error: 'Ошибка получения данных'
            })
        }

        this.setState({
            albums, photos
        }) 
    }

    handleAlbumClick = param => {
        this.setState({clickedOnAlbum: param});
    }
    setAlbumId = albumId => {
        this.setState({albumId});
    }
    
    deleteAlbum = id => {
        this.setState({
            albums: this.state.albums.filter(album => album.id !== id)
        })   
    }

    render() {
        const {error, albums} = this.state
        
        return (
            
            <div className="albums">
                <h2 className="error">{error}</h2>
                {this.state.clickedOnAlbum? 
                <PhotosInAlbum 
                    albumId={this.state.albumId}
                    handleAlbumClick={this.handleAlbumClick}
                />:
                [...albums].map(album =>
                        <Album
                            album = {album}
                            key={album.id}
                            handleAlbumClick={this.handleAlbumClick} 
                            setAlbumId={this.setAlbumId}
                            deleteAlbum={() => this.deleteAlbum(album.id)}
                        />)
                }
                </div>
        )
    }
}
