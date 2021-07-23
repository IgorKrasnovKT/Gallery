import React, { Component } from 'react'

export default class Album extends Component {
    
    state = {
        lastImg: "",
        amountOfPhotos: null
    }

    async componentDidMount() {
        // const imgSrc = `https://jsonplaceholder.typicode.com/photos?albumId=${this.props.album.id}`;
        const imgSrc = `http://localhost:3001/photos?albumId=${this.props.album.id}`;
        const requestResult = await fetch(imgSrc);
        const imgList = await requestResult.json();
        const lastImg = imgList[imgList.length-1];
        const amountOfPhotos = imgList.length;
        this.setState({lastImg, amountOfPhotos});
    }

    handleAlbumClick = () => {
        const{handleAlbumClick} = this.props;
        const{setAlbumId} = this.props;

        setAlbumId(this.props.album.id);
        handleAlbumClick(true);
    }

    render() {
        const {thumbnailUrl}=this.state.lastImg;
        const {amountOfPhotos}= this.state;

        return (
                    <div className="album">
                        <div className="button">
                            <button onClick={this.props.deleteAlbum}>Скрыть</button>
                        </div>
                        <div className="album__cover-inner">
                            <img 
                                src={thumbnailUrl}
                                className="album__cover"
                                onClick={this.handleAlbumClick}
                                alt={this.props.album.id.title}
                            />
                            <div className="album__cover--cursor"></div>
                        </div>
                        <div className="album__info">
                            <div className="album__title" onClick={this.handleAlbumClick}>Название: {this.props.album.title}</div>
                            <div className="album__photoAmount" onClick={this.handleAlbumClick}>Фотографий: {amountOfPhotos}</div>
                        </div>
                    </div>
        )
    }
}
