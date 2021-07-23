import React, { Component } from 'react'

export default class ModalPhoto extends Component {

    handleCloseClick = () => {
        const {handleCloseClick} = this.props;
        handleCloseClick(1);
    }

    render() {
        const {url} = this.props.photo;

        return (
            <div id="myModal" className="modal">
                <span className="close" onClick={this.handleCloseClick}>&times;</span>
                <img 
                    className="modal-content" 
                    src={url} 
                    alt={this.props.photo.title}
                />
                <div id="caption"></div>
            </div>
        )
    }
}
