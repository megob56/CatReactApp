import React from 'react';

const Modal = ({children, show, handleClose, handleChange, selectValue, choices}) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none"; 
    
    return(
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}
                <button className="js-close-modal-button" onClick={handleClose}>close</button>
                <select className='js-cat-breed-drop-down-menu' value={selectValue} onChange={handleChange}>
                {choices.map(breed => (
                    <option key={breed} value={breed}>
                        {breed}
                    </option>
                ))}
                </select>
            </section>
        </div>
    );
    
    
}

export default Modal;
