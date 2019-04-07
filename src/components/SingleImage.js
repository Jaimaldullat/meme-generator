import React from "react";

class SingleImage extends React.Component {
    render() {
        return (
            <div className='meme-image'>
                <img src={this.props.imageData.url} onClick = {()=>{this.props.openModalBox(this.props.imageData.id)}} />
            </div>
            )
        }
}

export default SingleImage;