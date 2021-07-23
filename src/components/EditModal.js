import React, { Component } from 'react'

export default class EditModal extends Component {

    handleCloseClick = () => {
        const {handleCloseClick} = this.props;
        handleCloseClick(2);
    }

    // handleTitleChange = event => {
    //     this.setState({input: event.target.value})
    // }

    // handleUrlChange = event => {
    //     this.setState({input: event.target.value})
    // }

    // handleThumbnailUrlChange = event => {
    //     this.setState({input: event.target.value})
    // }

    editPhoto = async e => {
        e.preventDefault();
        const editedPhoto = {
            albumId: this.props.photo.albumId,
            id: this.props.photo.id,
            title: e.target.title.value,
            url: e.target.url.value,
            thumbnailUrl: e.target.thumbnailUrl.value
        }

        await fetch('http://localhost:3001/photos', {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(editedPhoto)
        });

        await this.props.updatePhotos();
        this.handleCloseClick();
    };

    render() {
        const dispNone = {
            display: 'none'
        };
        return (
            <div id="myModal" className="modal">
                <span className="close" onClick={this.handleCloseClick}>&times;</span>
                <form className="form" method="put" action="http://localhost:3001/photos" onSubmit={this.editPhoto}>
                    <div className="form__content">
                        <label>title</label><br/>
                        <input type="text" name="title" defaultValue={this.props.photo.title}></input><br/>
                        <label>url</label><br/>
                        <input type="text" name="url" defaultValue={this.props.photo.url}></input><br/>
                        <label>thumbnailUrl</label><br/>
                        <input type="text" name="thumbnailUrl" defaultValue={this.props.photo.thumbnailUrl}></input><br/>
                        <input type="text" name="albumId" value={this.props.photo.albumId} style={dispNone}></input><br/>
                        <input type="text" name="id" value={this.props.photo.id} style={dispNone}></input><br/>
                        <button className="save" type="submit" >Сохранить</button>
                    </div>
                </form>
                <div id="caption"></div>
            </div>
        )
    }
}