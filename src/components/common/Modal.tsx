import React from "react";
import "./modal.css";

interface Props {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal = ({ open, onClose, children }: Props) => {
    if (!open) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-container"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-inner">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;