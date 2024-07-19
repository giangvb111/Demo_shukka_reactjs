import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../../../constants'
import TableShukkaList from './detailList/TableShukkaList'
import CreateShukka from '../create/CreateShukka'

export default function SearchShukkaList() {

    const [showCreateShukka, setShowCreateShukka] = useState(false);

    const handleCreatePopupClick = () => {
        setShowCreateShukka(true);

    };

    const handleClosePopup = () => {
        setShowCreateShukka(false);
    };

    const [nouhinsakiList, setNouhinsakiList] = useState([])
    const [tantoshaList, setTantoshaList] = useState([])
    const [soukoList, setSoukoList] = useState([])
    const [tanabanList, setTanabanList] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const [columns, setColumns] = useState([])

    const [searchResults, setSearchResults] = useState([]);

    const [shukkaYoteiBiFrom, setShukkaYoteiBiFrom] = useState('');
    const [shukkaYoteiBiTo, setShukkaYoteiBiTo] = useState('');
    const [shukkaJisseikiBiFrom, setShukkaJisseikiBiFrom] = useState('');
    const [shukkaJisseikiBiTo, setShukkaJisseikiBiTo] = useState('');
    const [jyuchuBiFrom, setJyuchuBiFrom] = useState('');
    const [jyuchuBiTo, setJyuchuBiTo] = useState('');
    const [nouhinsaki, setNouhinsaki] = useState('');
    const [seikyuusaki, setSeikyuusaki] = useState('');
    const [tantosha, setTantosha] = useState('');
    const [shukkaSoukoList, setShukkaSoukoList] = useState('');
    const [shukkaTanabanList, setShukkaTanabanList] = useState('');
    const [seihinCodeList, setSeihinCodeList] = useState('');
    const [seihinMeiList, setSeihinMeiList] = useState('');
    const [keywordList, setKeywordList] = useState('');

    // 納品先リスト取得
    const fetchNouhinsakiList = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/nouhinsaki/get-list`);
            setNouhinsakiList(res.data.data);
        } catch (error) {
            console.log('Error fetching nouhinsaki:', error);
        }
    };

    // 担当者リスト取得
    const fetchTantoshaList = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/tantosha/get-tantosha-by-taishoku-flg?taishokuFlg=0`);
            setTantoshaList(response.data.data);
        } catch (error) {
            console.log('Error fetching tantosha:', error);
        }
    };

    //倉庫リスト取得
    const fetchSoukoList = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/souko/get-list`);
            setSoukoList(response.data);
        } catch (error) {
            console.log('Error fetching souko:', error);
        }
    };

    //棚番リスト取得
    const fetchTanabanList = async (soukoId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/tanaban/get-tanaban-by-souko-id?soukoId=${soukoId}`);
            setTanabanList(response.data);
        } catch (error) {
            console.log('Error fetching tanaban:', error);
        }
    };

    const fetchColumns = async (screenId) => {
        try {

            const response = await axios.get(`${API_BASE_URL}/setting-data/get-list-by-screen-id?screenId=${screenId}`)
            setColumns(response.data.data);
        } catch (error) {
            console.log('Error fetching setting column:', error)
        }
    }


    useEffect(() => {
        fetchNouhinsakiList();
        fetchTantoshaList();
        fetchSoukoList();
        fetchColumns(1);
    }, [searchResults])

    const handleOnchangeSouko = (event) => {
        const selectedSoukoId = event.target.value;
        if (selectedSoukoId === '') {
            setTanabanList([])
        } else {
            fetchTanabanList(selectedSoukoId);
        }
    }

    const params = {
        shukkaYoteiBiFrom: shukkaYoteiBiFrom.replace(/-/g, ''),
        shukkaYoteiBiTo: shukkaYoteiBiTo.replace(/-/g, ''),
        shukkaJisseikiBiFrom: shukkaJisseikiBiFrom.replace(/-/g, ''),
        shukkaJisseikiBiTo: shukkaJisseikiBiTo.replace(/-/g, ''),
        jyuchuBiFrom: jyuchuBiFrom.replace(/-/g, ''),
        jyuchuBiTo: jyuchuBiTo.replace(/-/g, ''),
        nouhinsakiList: nouhinsaki,
        seikyuusaki: seikyuusaki,
        tantoshaList: tantosha,
        shukkaSoukoList: shukkaSoukoList,
        shukkaTanabanList: shukkaTanabanList,
        seihinCodeList: seihinCodeList,
        seihinMeiList: seihinMeiList,
        keywordList: keywordList
    }



    const handleOnclickSearch = () => {
        console.log('params', params);

        axios.post(
            `${API_BASE_URL}/shukka/get-list`, params
        )
            .then((res) => {
                if (res.data.data.length === 0) {
                    setErrorMessage(res.data.message)
                    setSearchResults([])
                } else {
                    console.log(res.data.data);
                    setErrorMessage('');
                    setSearchResults(res.data.data);
                }

            })
    }

    return (
        <>
            <div className="header-body">
                <div className="title">
                    <h1><span>●</span>出荷一覧</h1>
                </div>
                <button className="shukka-jisseki-btn" onClick={handleCreatePopupClick}>出荷登録</button>
            </div>
            <div className='error-message'>
                <span>{errorMessage}</span>
            </div>
            <div>
                <div className="search">
                    <div className="search-default">

                        {/* <!-- 出荷予定日 --> */}
                        <div className="label-search">
                            <div className="title-item-search">
                                <span>出荷予定日  </span>
                            </div>
                            <div className="data-item-search">
                                <input id="shukka-yotei-bi-from" type="date" name="shukka-yotei-bi-from" value={shukkaYoteiBiFrom}
                                    onChange={(event) => setShukkaYoteiBiFrom(event.target.value)} />
                                <span>～</span>
                                <input id="shukka-yoteibi-to" type="date" name="shukka-yoteibi-to" value={shukkaYoteiBiTo}
                                    onChange={(event) => setShukkaYoteiBiTo(event.target.value)} />
                            </div>
                        </div>

                        {/* <!-- 受注日 --> */}
                        <div className="label-search">
                            <div className="title-item-search">
                                <span>受注日  </span>
                            </div>
                            <div className="data-item-search">
                                <input id="juchuu-bi-from" type="date" name="juchuu-bi-from" value={jyuchuBiFrom}
                                    onChange={(event) => setJyuchuBiFrom(event.target.value)} />
                                <span>～</span>
                                <input id="juchuu-bi-to" type="date" name="juchuu-bi-to" value={jyuchuBiTo}
                                    onChange={(event) => setJyuchuBiTo(event.target.value)} />
                            </div>
                        </div>

                    </div>
                    <div className="search-advanced">
                        <div className="search-advanced-left">

                            {/* <!-- 出荷実績日 --> */}
                            <div className="label-search">
                                <div className="title-item-search">
                                    <span>出荷実績日  </span>
                                </div>
                                <div className="data-item-search">
                                    <input id="shukka-jisseki-bi-from" type="date" name="shukka-jisseki-bi-from" value={shukkaJisseikiBiFrom}
                                        onChange={(event) => setShukkaJisseikiBiFrom(event.target.value)} />
                                    <span>～</span>
                                    <input id="shukka-jisseki-bi-to" type="date" name="shukka-jisseki-bi-to" value={shukkaJisseikiBiTo}
                                        onChange={(event) => setShukkaJisseikiBiTo(event.target.value)} />
                                </div>
                            </div>

                            {/* <!-- 納品先 --> */}
                            <div className="label-search">
                                <div className="title-item-search">
                                    <span>納品先  </span>
                                </div>
                                <div className="data-item-search">
                                    <select name="nohin-saki" id="nohin-saki" value={nouhinsaki}
                                        onChange={(event) => setNouhinsaki(event.target.value)}>
                                        <option value=""></option>
                                        {/* <!-- 納品先リスト --> */}
                                        {nouhinsakiList.map(item => (
                                            <option key={item.nouhinsakiId} value={item.nouhinsakiId}>{item.nouhinsakiName}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* <!-- 請求先 --> */}
                            <div className="label-search">
                                <div className="title-item-search">
                                    <span>請求先  </span>
                                </div>
                                <div className="data-item-search">
                                    <select name="seikyu-saki" id="seikyu-saki" value={seikyuusaki}
                                        onChange={(event) => setSeikyuusaki(event.target.value)}>
                                        <option value=""></option>
                                    </select>
                                </div>
                            </div>

                            {/* <!-- 担当者 --> */}
                            <div className="label-search">
                                <div className="title-item-search">
                                    <span>担当者  </span>
                                </div>
                                <div className="data-item-search">
                                    <select name="tantosa" id="tantosa" value={tantosha}
                                        onChange={(event) => setTantosha(event.target.value)}>
                                        <option value=""></option>
                                        {/* <!-- 担当者リスト --> */}
                                        {tantoshaList.map(item => (
                                            <option key={item.tantoshaId} value={item.tantoshaId}>{item.tantoshaName}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div className="search-advanced-right">

                            {/* <!-- 出荷倉庫・棚番 --> */}
                            <div className="label-search">
                                <div className="title-item-search">
                                    <span>出荷倉庫・棚番  </span>
                                </div>
                                <div className="data-item-search" >
                                    <select name="souko" id="souko" value={shukkaSoukoList}
                                        onChange={(event) => {
                                            handleOnchangeSouko(event);
                                            setShukkaSoukoList(event.target.value);
                                        }}>
                                        <option value=""></option>
                                        {soukoList.map(item => (
                                            <option key={item.soukoId} value={item.soukoId}>{item.soukoName}</option>
                                        ))}
                                    </select>
                                    <select name="tanaban" id="tanaban" value={shukkaTanabanList}
                                        onChange={(event) => setShukkaTanabanList(event.target.value)}>
                                        <option value=""></option>
                                        {tanabanList.length > 0 && tanabanList.map(item => (
                                            <option key={item.tanabanId} value={item.tanabanId}>{item.tanabanName}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* <!-- 製品コード --> */}
                            <div className="label-search">
                                <div className="title-item-search">
                                    <span>製品コード  </span>
                                </div>
                                <div className="data-item-search">
                                    <input type="text" id="seihin-cd" value={seihinCodeList}
                                        onChange={(event) => setSeihinCodeList(event.target.value)} />
                                </div>
                            </div>

                            {/* <!-- 製品名 --> */}
                            <div className="label-search">
                                <div className="title-item-search">
                                    <span>製品名  </span>
                                </div>
                                <div className="data-item-search">
                                    <input type="text" id="seihin-mei" value={seihinMeiList}
                                        onChange={(event) => setSeihinMeiList(event.target.value)} />
                                </div>
                            </div>

                            {/* <!-- キーワード --> */}
                            <div className="label-search">
                                <div className="title-item-search">
                                    <span>キーワード  </span>
                                </div>
                                <div className="data-item-search">
                                    <input type="text" id="kiwado" value={keywordList}
                                        onChange={(event) => setKeywordList(event.target.value)} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="btn-show-search">
                    <button className="show-search-advanced" onClick={() => { handleOnclickSearch() }}>この条件で検索</button>
                    {/* <button className="search-btn" onClick={() => { handleOnclickSearch() }}>検索</button> */}
                </div>
                {searchResults.length > 0 &&
                    <div>
                        <TableShukkaList columns={columns} searchResults={searchResults} />
                    </div>
                }

                {showCreateShukka && <CreateShukka onClose={handleClosePopup}
                    setShowCreateShukka={setShowCreateShukka}
                // showCreateShukka={showCreateShukka} 
                />}

            </div>
        </>
    )
}
