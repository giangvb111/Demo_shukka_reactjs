import React from 'react'

export default function PopUpConfirm() {
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
          <button className='modal-btn-confirm-ok'>OK</button>
          <button className='modal-btn-confirm-cancel'>キャンセル</button>
        </div>
      </div>
    </div>
  )
}
