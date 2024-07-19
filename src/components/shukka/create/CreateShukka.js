import React, { useState, useEffect } from 'react'
import DetailCreateList from './DetailCreateList'
import axios from 'axios'
import PopUpConfirm from './PopUpConfirm'
import SearchShukkaList from '../list/SearchShukkaList'
import { API_BASE_URL } from '../../../constants';


export default function CreateShukka({ onClose }) {

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [redirectToSearch, setRedirectToSearch] = useState(false);

  const [nouhinsakiList, setNouhinsakiList] = useState([])
  const [tantoshaList, setTantoshaList] = useState([])
  const [message, setMessage] = useState([])


  const [shukkaHeader, setShukkaHeader] = useState(
    {
      shukkaNo: '出荷ヘッダ',
      jyuchubi: '',
      shukkaYoteibi: '',
      shukkaJisseikiBi: '',
      nouhinsakiId: '',
      tekiyoHeader: '',
      tantoshaId: '',
      kenmei: '',
      zeitansu: '',
      comment: '',
      shukkaKubun: ''
    }
  );


  const [shukkaMesaiList, setShukkaMesaiList] = useState([
    {
      shukkaMesaiNo: '出荷明細',
      seihinId: '',
      shukkaYoteiSuryo: '',
      shukkaJisseikiSuryo: '',
      soukoId: '',
      tanabanId: '',
      lotNo: '',
      tanka: '',
      kingaku: '',
      tekiyoMesai: ''
    }
  ]);

  const handleOnchangeShukkaHeader = (event) => {
    const { name, value } = event.target;
    const updatedList = setShukkaHeader((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // const updatedList = [...shukkaHeader];
    // updatedList[name] = value;
    // set(updatedList);

    // Kiểm tra và cập nhật lại message nếu thông tin hợp lệ
    // validateHeader(updatedList);
    console.log('vao day 3');
  };

  // const validateHeader = (header) => {

  //   console.log('adas', header);

  //   // const newMessages = [];

  //   // if (!header.jyuchubi) {
  //   //   newMessages.push(`受注日は必須入力項目です。`);
  //   // }
  //   // if (!header.shukkaYoteibi) {
  //   //   newMessages.push(`出荷予定日は必須入力項目です。`);
  //   // }
  //   // if (!header.nouhinsakiId) {
  //   //   newMessages.push(`納品先は必須入力項目です。`);
  //   // }
  //   // if (!header.tantoshaId) {
  //   //   newMessages.push(`担当者は必須入力項目です。`);
  //   // }
  //   // setMessage(newMessages)

  // }

  // console.log('shukkaHeader==>', shukkaHeader);

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
    setShukkaMesaiList([
      {
        shukkaMesaiNo: '出荷明細',
        seihinId: '',
        shukkaYoteiSuryo: '',
        shukkaJisseikiSuryo: '',
        soukoId: '',
        tanabanId: '',
        lotNo: '',
        tanka: '',
        kingaku: '',
        tekiyoMesai: ''
      }
    ]);

    setMessage([]);
    console.log('vao day');
  }, [API_BASE_URL])

  const shukkaDto = {
    shukkaHeader,
    shukkaMesaiList
  }

  const addMessage = (message) => {
    setMessage(prevMessages => [...prevMessages, message]);
  }

  //出荷登録
  const handleBtnEntryData = async () => {

    console.log('vao day 122313');

    let hasError = false;

    setMessage([]);
    if (!shukkaHeader.jyuchubi) {
      addMessage(`受注日は必須入力項目です。`);
      hasError = true;
    }
    if (!shukkaHeader.shukkaYoteibi) {
      addMessage(`出荷予定日は必須入力項目です。`);
      hasError = true;
    }
    if (!shukkaHeader.nouhinsakiId) {
      addMessage(`納品先は必須入力項目です。`);
      hasError = true;
    }
    if (!shukkaHeader.tantoshaId) {
      addMessage(`担当者は必須入力項目です。`);
      hasError = true;
    }

    shukkaMesaiList.forEach((item, index) => {
      if (!item.seihinId) {
        addMessage(`出荷明細${index + 1} 製品コードは必須入力項目です。`);
        hasError = true;
      }
      if (!item.soukoId) {
        addMessage(`出荷明細${index + 1} 倉庫は必須入力項目です。`);
        hasError = true;
      }
      if (!item.shukkaYoteiSuryo) {
        addMessage(`出荷明細${index + 1} 数量は必須入力項目です。`);
        hasError = true;
      }

    });

    // Nếu có lỗi, dừng lại và không gọi hàm đăng ký
    if (hasError) {
      return;
    }

    setIsPopupVisible(true);
  }

  const handleEntryData = async () => {

    try {
      const res = await axios.post(`${API_BASE_URL}/shukka/create`, shukkaDto)
      if (res.data.status === 1) {
        setIsPopupVisible(false);
        setRedirectToSearch(true);
      } else {
        console.log("error", res.message);
      }
    } catch (error) {
      console.log("error catch =>>", error)
    }
    console.log(redirectToSearch);

  }

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="popup-create">
      <div className="body-create">

        {/* <!-- title popup start --> */}
        <div className="create-title">
          <h1>出荷登録</h1>
          <button className="close-btn" onClick={onClose}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
            fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
            <path
              d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg></button>
        </div>
        {/* <!-- title popup end --> */}

        {/* error message start */}
        <div className='error-message'>
          {message.map((msg, index) => (
            <div id='error-message-text' key={index}>
              {`. ${msg}`}
              <br />
            </div>
          ))}
        </div>
        {/* error message end */}

        {/* <!-- item header popup start --> */}
        <div className="create-header">
          <div className="create-header-default">
            {/* <!-- 受注日 --> */}
            <div className="header-create-item">
              <span className="span-number">1</span>
              <span className="header-item-name">受注日*</span>
              <span>
                <input
                  type="date"
                  name="jyuchubi"
                  value={shukkaHeader.jyuchubi}
                  onChange={(event) =>
                    handleOnchangeShukkaHeader(event)
                  }
                />
              </span>
            </div>
            {/* <!-- 出荷予定日* --> */}
            <div className="header-create-item">
              <span className="span-number">2</span>
              <span className="header-item-name">出荷予定日*</span>
              <span>
                <input
                  type="date"
                  name="shukkaYoteibi"
                  value={shukkaHeader.shukkaYoteibi}
                  onChange={(event) =>
                    handleOnchangeShukkaHeader(event)
                  }
                />
              </span>
            </div>

            {/* <!-- 納品先* --> */}
            <div className="header-create-item">
              <span className="span-number">3</span>
              <span className="header-item-name">納品先*</span>
              <span>
                <select name="nouhinsakiId" id="nohin-saki-header-create"
                  value={shukkaHeader.nouhinsakiId}
                  onChange={(event) => handleOnchangeShukkaHeader(event)}
                >
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
                <select name="tantoshaId" id="tantosha-header-create"
                  value={shukkaHeader.tantoshaId}
                  onChange={(event) => handleOnchangeShukkaHeader(event)}
                >
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
                <input id="kenmei-header-create" type="text"
                  name='kenmei'
                  value={shukkaHeader.kenmei}
                  onChange={(event) => handleOnchangeShukkaHeader(event)}
                />
              </span>
            </div>
          </div>
          <div className="create-header-advanced">
            {/* <!-- 出荷区分 --> */}
            <div className="header-create-item">
              <span className="span-number">6</span>
              <span className="header-item-name">出荷区分</span>
              <span>
                <select id="shukka-kbn-header-create"
                  name='shukkaKubun'
                  value={shukkaHeader.shukkaKubun}
                  onChange={(event) => handleOnchangeShukkaHeader(event)}
                >
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
                <select id="zei-tansushori-header-create"
                  name='zeitansu'
                  value={shukkaHeader.zeitansu}
                  onChange={(event) => handleOnchangeShukkaHeader(event)}
                >
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
                <input id="memo-header-create" type="text" name='tekiyoHeader'
                  value={shukkaHeader.tekiyoHeader}
                  onChange={(event) => handleOnchangeShukkaHeader(event)}
                />
              </span>
            </div>
          </div>
          <div className="create-btn-show-advanced">
            <button className="btn-show-advanced-popup">設定オプション</button>
          </div>
        </div>

        <div className="create-data">
          <div className="table table-create">

            <DetailCreateList shukkaMesaiList={shukkaMesaiList}
              setShukkaMesaiList={setShukkaMesaiList}
              setMessage={setMessage}
            />

            {/* <!-- calculate kingaku start --> */}

            {/* comment start */}
            <div className="comment">
              <p>コメントを残す</p>
              <textarea name="comment" className="shukka-create-comment"
                value={shukkaHeader.comment}
                onChange={(event) => handleOnchangeShukkaHeader(event)}
              ></textarea>
            </div>
            {/* comment end */}

            <div className="confirm">
              <button className="btn-entry" onClick={() => handleBtnEntryData()}>登録</button>
              <button className="btn-cancel" onClick={onClose}>キャンセル</button>
            </div>

            {/* <!-- calculate kingaku end --> */}

          </div>
        </div>
        {/* <!-- item data popup end --> */}

      </div>
      {isPopupVisible && <PopUpConfirm handleEntryData={handleEntryData} onClose={handleClosePopup} />}
      {redirectToSearch && <SearchShukkaList />}
    </div>
  )
}
