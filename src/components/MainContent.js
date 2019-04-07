import React from 'react';
import Draggable from 'react-draggable';
import SingleImage from './SingleImage';
import Modal from './Modal/Modal';
import SpinnerIMG from '../images/Triangles-1s-200px.gif';

class MainContent extends React.Component {

    canvas;
    ctx;
    ctxImage = new Image();

    constructor() {
        super();
    }

    state = {
        isLoading: true,
        isModalShowing: false,
        spinnerIMG: SpinnerIMG,
        topText: '',
        bottomText: '',
        imgURL: 'https://i.imgflip.com/1bij.jpg',
        images: [],
        topTextX: "50%",
        topTextY: "12%",
        bottomTextX: "50%",
        bottomTextY: "88%"
    }

    changeValue = (event) => {
        const {name, value} = event.target;
        this.setState(prevState => {
            return {
                [name]: value
            }
        })
    }

    changeImage = (e) => {
        e.preventDefault();
        /*const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")
        const img = this.refs.image
            ctx.drawImage(img, 0, 0)
            ctx.font = "40px Courier"
            ctx.fillText(this.state.topLine, 210, 75)

*/
        /* this.setState((prevState)=>{
             const randNumber = Math.floor(Math.random() * prevState.images.length)
             return {
                 imgURL: prevState.images[randNumber].url
             }
         })
         */
    }

    componentDidMount = () => {
        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    this.setState(() => {
                        return {
                            isLoading: false,
                            images: data.data.memes
                        }
                    })
                }
            })
    }

    openModalHandler = (id) => {

        this.setState(prevState => {
            let img = prevState.images.find(o => o.id === id);
            return {
                isModalShowing: true,
                imgURL: img.url
            }
        });
    }

    closeModalHandler = () => {
        this.setState({
            isModalShowing: false
        });
    }
    convertSvgToImage = () => {

    }

    render() {
        const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
        let content;
        if (this.state.isLoading) {
            content = <div className='spinner-div'><img src={this.state.spinnerIMG}/><p>Loading...</p></div>;
        } else {
            content = this.state.images.map((image) => (
                <SingleImage key={image.id} imageData={image} openModalBox={this.openModalHandler}/>
            ))
        }
        return (
            <main>
                <article className='meme-article'>
                    <div className='meme-images'>
                        {content}
                    </div>
                </article>

                <Modal
                    className="modal"
                    show={this.state.isModalShowing}
                    close={this.closeModalHandler}>
                    <form className='meme-form'>
                        <div className='form-control'>
                            <input
                                type='text'
                                name='topText'
                                onChange={this.changeValue}
                                value={this.state.topText}
                                placeholder='Enter Top Line'
                                autoComplete='off'
                            />
                            <input
                                type='text'
                                name='bottomText'
                                onChange={this.changeValue}
                                value={this.state.bottomText}
                                placeholder='Enter Bottom Line'
                                autoComplete='off'
                            />
                            <button onClick={this._handleSaveButton}>Generate</button>
                        </div>
                    </form>

                    <div className="result-div">
                        <span className='top-text'>{this.state.topText}</span>
                        <img ref="image" src={this.state.imgURL}/>
                        <span className='bottom-text'>{this.state.bottomText}</span>
                    </div>
                </Modal>
            </main>
        )
    }
}

export default MainContent;