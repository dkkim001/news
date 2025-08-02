// src/components/Modal.jsx
import React from 'react';
import './Modal.css'; // 모달 스타일을 위한 CSS 파일

const Modal = ({ show, onClose, link }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <a href={link} target="_blank" rel="noopener noreferrer" className="modal-link">
          해당 기사로 이동하기
        </a>
        <button onClick={onClose} className="modal-close-button">닫기</button>
      </div>
    </div>
  );
};

export default Modal;