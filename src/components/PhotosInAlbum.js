import React, { Component } from 'react'
import ModalPhoto from './ModalPhoto';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import EditModal from './EditModal';
import AddModal from './AddModal';

export default class PhotosInAlbum extends Component {

    state = {
        photos: [],
        isPhotoClicked: false,
        isEdit: false,
        isAdd: false,
        photo: null
    }

    async componentDidMount() {
        await this.updatePhotos();
    }

    updatePhotos = async () => {
        const photosUrl = `http://localhost:3001/photos?albumId=${this.props.albumId}`;
        const requestResult = await fetch(photosUrl);
        const photos = await requestResult.json();
        this.setState({photos});
    }

    handleAlbumClick = () => {
        const {handleAlbumClick} = this.props;
        handleAlbumClick(false);
    };

    handleOpenClick = (photo, param) => {
        if (param===1) this.setState({isPhotoClicked: true, photo});
        else if (param===2) this.setState({isEdit: true, photo});
        else if (param===3) this.setState({isAdd: true, photo});
    }

    handleCloseClick = async (param) => {
        if (param===1) this.setState({isPhotoClicked: false});
        else if (param===2) this.setState({isEdit: false});
        else if (param===3) this.setState({isAdd: false});

        await this.updatePhotos();
    }


    submit = id => {
        confirmAlert({
          title: 'Подтверждение удаления',
          message: 'Вы точно хотите удалить фото?',
          buttons: [
            {
              label: 'Да',
              onClick: () => this.deletePhoto(id)
            },
            {
              label: 'Нет',
              onClick: () => alert('Canceled')
            }
          ]
        });
      };

    deletePhoto = async id => {
        await fetch('http://localhost:3001/photos', {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({id: id})
        });

        await this.updatePhotos();
    }
  
    render() {
        const {photos} = this.state;
        const {photo} = this.state;
        return (
            <>
                <button className="add" onClick={() => this.handleOpenClick(null, 3)}>Добавить</button>
                {this.state.isPhotoClicked? <ModalPhoto handleCloseClick={this.handleCloseClick} photo={photo}/>:
                photos.map(photo =>
                                <div className="album">
                                    <button className="editadd" onClick={() => this.submit(photo.id)}>Удалить</button>
                                    <button className="editadd" onClick={() => this.handleOpenClick(photo, 2)}>Изменить</button>
                                    <img 
                                        src = {photo.thumbnailUrl} 
                                        className="album__cover" 
                                        key={photo.id} 
                                        alt={photo.title}
                                        onClick={() => this.handleOpenClick(photo, 1)}>
                                    </img>
                                </div>
                        ) 
                }
                {this.state.isEdit? 
                <EditModal 
                    handleCloseClick={this.handleCloseClick} 
                    photo={photo}
                    updatePhotos={this.updatePhotos}
                />: null}
                {this.state.isAdd? 
                <AddModal 
                    handleCloseClick={this.handleCloseClick} 
                    albumId={this.props.albumId}
                    updatePhotos={this.updatePhotos}
                />: null}
            </>
        )
    }
}
