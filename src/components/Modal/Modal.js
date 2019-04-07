import React from 'react';
import './Modal.css';
const modal = (props) => {
    return (
        <div>
            <div className="modal-wrapper"
                 style={{
                     transform: props.show ? 'translate(-50%, -50%)' : 'translate(-50%, -200%)',
                     opacity: props.show ? '1' : '1'
                 }}>
                <div className="modal-header">
                    <h3>Generate Meme</h3>
                    <span className="close-modal-btn" onClick={props.close}>×</span>
                </div>
                <div className="modal-body">
                        {props.children}
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={props.close}>CLOSE</button>
                    <button className="btn-continue">CONTINUE</button>
                </div>
            </div>
        </div>
    )
}

export default modal;
