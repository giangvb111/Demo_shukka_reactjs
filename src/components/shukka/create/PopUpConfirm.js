import React from 'react'

export default function PopUpConfirm({ onClose, handleEntryData }) {
  return (
    <div className='popup-confirm'>
      <div className='modal-body-confirm'>
        <div className='modal-title-confirm'>
          <h2>出荷登録</h2>
          <hr />
        </div>
        <div className='modal-message-confirm'>
          <p>登録処理を実行してよろしいですか？</p>
          <hr />
        </div>
        <div className='modal-footer-confirm'>
          <button className='modal-btn-confirm-ok' onClick={handleEntryData}>OK</button>
          <button className='modal-btn-confirm-cancel' onClick={onClose}>キャンセル</button>
        </div>
      </div>
    </div>
  )
}
