import React, { Component } from 'react'

export default class AddModal extends Component {

    handleCloseClick = () => {
        const {handleCloseClick} = this.props;
        handleCloseClick(3);
    }

    addPhoto = async e => {
        e.preventDefault();
        const newPhoto = {
            albumId: this.props.albumId,
            title: e.target.title.value,
            url: e.target.url.value,
            thumbnailUrl: e.target.thumbnailUrl.value
        }

        await fetch('http://localhost:3001/photos', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(newPhoto)
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
                <form className="form" onSubmit={this.addPhoto}>
                    <div className="form__content">
                        <label>title</label><br/>
                        <input type="text" name="title"></input><br/>
                        <label>url</label><br/>
                        <input type="text" name="url"></input><br/>
                        <label>thumbnailUrl</label><br/>
                        <input type="text" name="thumbnailUrl"></input><br/>
                        <input type="text" name="albumId" value={this.props.albumId} style={dispNone}></input><br/>
                        <button className="save" type="submit">Сохранить</button>
                    </div>
                </form>
                <div id="caption"></div>
            </div>
        )
    }
}