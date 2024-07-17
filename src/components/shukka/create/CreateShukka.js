import React, { useState, useEffect } from 'react'
import DetailCreateList from './DetailCreateList'
import axios from 'axios'
import PopUpConfirm from './PopUpConfirm'
import { API_BASE_URL } from '../../../constants';


export default function CreateShukka() {
  const [nouhinsakiList, setNouhinsakiList] = useState([])
  const [tantoshaList, setTantoshaList] = useState([])
  const [juchuKingaku, setJuchuKingaku] = useState('')
  const [shohizeiGaku, setShohizeiGaku] = useState('')
  const [gokeiKingaku, setGokeiKingaku] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchNouhinsaki = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/nouhinsaki/get-list`);
        setNouhinsakiList(response.data.data);
      } catch (error) {
        console.log('Error fetching souko:', error);
      }
    };

    const fetchTantosha = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/tantosha/get-tantosha-by-taishoku-flg?taishokuFlg=0`);
        setTantoshaList(response.data.data);
      } catch (error) {
        console.log('Error fetching souko:', error);
      }
    };

    fetchTantosha();
    fetchNouhinsaki();
  }, [])

  useEffect(() => {
    setShohizeiGaku((isNaN(juchuKingaku) ? 0 : Math.round((juchuKingaku / 100) * 10)))
  }, [juchuKingaku])

  useEffect(() => {
    setGokeiKingaku((isNaN(juchuKingaku) ? 0 : juchuKingaku + shohizeiGaku))
  }, [shohizeiGaku])

  return (
    <div className="popup-create">
      <div className="body-create">

        {/* <!-- title popup start --> */}
        <div className="create-title">
          <h1>出荷登録</h1>
          <button className="close-btn"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
            fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
            <path
              d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg></button>
        </div>
        {/* <!-- title popup end --> */}

        {/* error message start */}

        <div className='error-message'>
          <p id='error-message-text'>{message}</p>
        </div>

        {/* error message end */}

        {/* <!-- item header popup start --> */}
        <div className="create-header">
          <div className="create-header-default">
            {/* <!-- 受注日 --> */}
            <div className="header-create-item">
              <span className="span-number">1</span>
              <span className="header-item-name">受注日*</span>
              <span><input type="date" /></span>
            </div>
            {/* <!-- 出荷予定日* --> */}
            <div className="header-create-item">
              <span className="span-number">2</span>
              <span className="header-item-name">出荷予定日*</span>
              <span><input type="date" /></span>
            </div>

            {/* <!-- 納品先* --> */}
            <div className="header-create-item">
              <span className="span-number">3</span>
              <span className="header-item-name">納品先*</span>
              <span>
                <select name="nohin-saki-header-create" id="nohin-saki-header-create">
                  <option value=""></option>
                  {nouhinsakiList.map(item => (
                    <option key={item.nouhinsakiId} value={item.nouhinsakiId}>{item.nouhinsakiName}</option>
                  ))}
                </select>
              </span>
            </div>

            {/* <!-- 担当者 --> */}
            <div className="header-create-item">
              <span className="span-number">4</span>
              <span className="header-item-name">担当者</span>
              <span>
                <select name="tantosha-header-create" id="tantosha-header-create">
                  <option value=""></option>
                  {tantoshaList.map(item => (
                    <option key={item.tantoshaId} value={item.tantoshaId}>{item.tantoshaName}</option>
                  ))}
                </select>
              </span>
            </div>

            {/* <!-- 件名 --> */}
            <div className="header-create-item">
              <span className="span-number">5</span>
              <span className="header-item-name">件名</span>
              <span>
                <input id="kenmei-header-create" type="text" />
              </span>
            </div>
          </div>
          <div className="create-header-advanced">
            {/* <!-- 出荷区分 --> */}
            <div className="header-create-item">
              <span className="span-number">6</span>
              <span className="header-item-name">出荷区分</span>
              <span>
                <select name="shukka-kbn-header-create" id="shukka-kbn-header-create">
                  <option value=""></option>
                  <option value="0">出荷</option>
                  <option value="1">返品</option>
                  <option value="2">販促</option>
                </select>
              </span>
            </div>

            {/* <!-- 税端数処理 --> */}
            <div className="header-create-item">
              <span className="span-number">7</span>
              <span className="header-item-name">税端数処理</span>
              <span>
                <select name="zei-tansushori-header-create" id="zei-tansushori-header-create">
                  <option value=""></option>
                  <option value="0">切り捨て</option>
                  <option value="1">切り上げ</option>
                  <option value="2">四捨五入</option>
                </select>
              </span>
            </div>

            {/* <!-- メモ --> */}
            <div className="header-create-item">
              <span className="span-number">8</span>
              <span className="header-item-name">メモ</span>
              <span>
                <input id="memo-header-create" type="text" />
              </span>
            </div>
          </div>
          <div className="create-btn-show-advanced">
            <button className="btn-show-advanced-popup">設定オプション</button>
          </div>
        </div>
        {/* <!-- item header popup end --> */}

        {/* <!-- item data popup start --> */}
        <div className="create-data">
          <div className="table table-create">

            <DetailCreateList setJuchuKingaku={setJuchuKingaku} />

            {/* <!-- calculate kingaku start --> */}
            <div className="calculate-kingaku">
              <div className="data-create-item">
                <span>受注金額</span>
                <span><input className="juchuu-kingaku" disabled type="number" value={juchuKingaku} /></span>
              </div>
              <div className="data-create-item">
                <span>消費税額</span>
                <span><input className="shohizei-gaku" disabled type="number" value={shohizeiGaku} /></span>
              </div>
              <div className="data-create-item">
                <span className='gokei-kingaku-title'>合計金額</span>
                <span><input className="gokei-kingaku" disabled type="number" value={gokeiKingaku} /></span>
              </div>
            </div>

            {/* comment start */}
            <div className="comment">
              <p>コメントを残す</p>
              <textarea name="comment" className="shukka-create-comment"></textarea>
            </div>
            {/* comment end */}

            <div className="confirm">
              <button className="btn-entry">登録</button>
              <button className="btn-cancel">キャンセル</button>
            </div>

            {/* <!-- calculate kingaku end --> */}

          </div>
        </div>
        {/* <!-- item data popup end --> */}

      </div>
      <PopUpConfirm />
    </div>
  )
}
