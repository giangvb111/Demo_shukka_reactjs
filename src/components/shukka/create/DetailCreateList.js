import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../../../constants';

export default function DetailCreateList({ shukkaMesaiList, setShukkaMesaiList, setMessage }) {

    const [seihinList, setSeihinList] = useState([]);
    const [soukoList, setSoukoList] = useState([]);
    const [juchuKingaku, setJuchuKingaku] = useState('');
    const [shohizeiGaku, setShohizeiGaku] = useState(3);
    const [gokeiKingaku, setGokeiKingaku] = useState('');

    useEffect(() => {

        // api get list seihin
        const fetchSeihin = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/seihin/get-list`);
                setSeihinList(response.data);
            } catch (error) {
                console.log('Error fetching seihin:', error);
            }
        };

        // api get list souko
        const fetchSouko = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/souko/get-list`);
                setSoukoList(response.data);
            } catch (error) {
                console.log('Error fetching souko:', error);
            }
        };

        fetchSeihin();
        fetchSouko();
        setShukkaMesaiList([
            {
                shukkaMesaiNo: '出荷明細',
                seihinId: '',
                seihinName: '',
                shukkaYoteiSuryo: '',
                shukkaJisseikiSuryo: '',
                soukoId: '',
                tanabanId: '',
                tanabanName: [],
                lotNo: '',
                tanka: '',
                kingaku: '',
                tekiyoMesai: ''
            }
        ]);
        setMessage([]);
        setJuchuKingaku('');
    }, []);

    //handle add column 
    const handleAddButton = () => {
        setShukkaMesaiList((prevList) => [
            ...prevList,
            {
                shukkaMesaiNo: '出荷明細',
                seihinId: '',
                shukkaYoteiSuryo: '',
                shukkaJisseikiSuryo: '',
                soukoId: '',
                seihinName: '',
                tanabanId: '',
                tanabanName: [],
                lotNo: '',
                tanka: '',
                kingaku: 0,
                tekiyoMesai: '',
            },
        ]);
        console.log('vao day 2');
    };

    const handleShukkaMesaiChange = (index, name, value) => {
        const updatedList = [...shukkaMesaiList];
        console.log(1111, name, value, updatedList);
        updatedList[index][name] = value;
        console.log(222, name, value, updatedList);

        setShukkaMesaiList(updatedList);
        // Kiểm tra và cập nhật lại message nếu thông tin hợp lệ
        validateEntries(updatedList);
        console.log('vao day 3');
    };

    const validateEntries = (list) => {
        const newMessages = [];

        list.forEach((item, index) => {
            if (!item.seihinId) {
                newMessages.push(`出荷明細${index + 1} 製品コードは必須入力項目です。`);
            }
            if (!item.soukoId) {
                newMessages.push(`出荷明細${index + 1} 倉庫は必須入力項目です。`);
            }
            if (!item.shukkaYoteiSuryo) {
                newMessages.push(`出荷明細${index + 1} 数量は必須入力項目です。`);
            }
        });

        setMessage(newMessages);
    };

    // get seihin name autofill when change seihincode
    const handleChangeSeihin = (index, event) => {
        const selectedSeihinId = event.target.value;
        const selectedSeihin = seihinList.find(item => item.seihinId == selectedSeihinId);
        console.log("selectedSeihin", selectedSeihin);
        handleShukkaMesaiChange(index, 'seihinId', selectedSeihinId);
        handleShukkaMesaiChange(index, 'seihinName', selectedSeihin ? selectedSeihin.seihinName : '');
        console.log('vao day 5 ', shukkaMesaiList);
    };

    // get list tanaban when change souko
    const handleChangeSouko = async (index, event) => {
        const selectedSoukoId = event.target.value;
        if (selectedSoukoId === '') {
            handleShukkaMesaiChange(index, 'tanabanName', []);
        } else {
            try {
                const response = await axios.get(`${API_BASE_URL}/tanaban/get-tanaban-by-souko-id?soukoId=${selectedSoukoId}`);
                handleShukkaMesaiChange(index, 'tanabanName', response.data);
            } catch (error) {
                console.log('Error fetching tanaban:', error);
            }
            handleShukkaMesaiChange(index, 'soukoId', selectedSoukoId);
        }

    };

    const handleChangeTanka = (index, event) => {
        const tanka = parseFloat(event.target.value) || '';

        handleShukkaMesaiChange(index, 'kingaku', shukkaMesaiList[index].shukkaYoteiSuryo * (tanka === '' ? 1 : tanka))
    }

    const handleChangeSuryo = (index, event) => {
        const newSuryo = parseFloat(event.target.value) || '';
        console.log("newSuryo", newSuryo);
        if (shukkaMesaiList[index].tanka === '') {
            handleShukkaMesaiChange(index, 'kingaku', newSuryo * 1)
            console.log('tanka', shukkaMesaiList[index].tanka);
        } else {
            console.log('tanka', shukkaMesaiList[index].tanka);
            handleShukkaMesaiChange(index, 'kingaku', newSuryo * shukkaMesaiList[index].tanka)
        }
    }

    useEffect(() => {
        const newTotalKingaku = shukkaMesaiList.reduce((acc, item) => {
            const kingakuNumber = parseFloat(item.kingaku) || 0;
            return acc + kingakuNumber;
        }, 0);
        setJuchuKingaku(newTotalKingaku);
    }, [shukkaMesaiList]);

    useEffect(() => {
        setGokeiKingaku((isNaN(juchuKingaku) ? 0 : juchuKingaku + shohizeiGaku))
    }, [juchuKingaku])

    return (
        <div>
            <div className="add-column-create">
                <button onClick={handleAddButton} className="btn-add-column">追加</button>
                <button style={{ marginLeft: 20, marginRight: 20 }} className="btn-copy">行複写</button>
                <button className="btn-copy">行削除</button>
            </div>
            <div className="table-container">
                <table id='table-create-shukka'>
                    <thead>
                        <tr>
                            <th><input id="check-all" type="checkbox" /></th>
                            <th>製品コード*</th>
                            <th>製品名</th>
                            <th>出荷倉庫*</th>
                            <th>棚番</th>
                            <th>数量*</th>
                            <th>ロットNo</th>
                            <th>単価</th>
                            <th>金額</th>
                            <th>メモ欄</th>
                        </tr>
                    </thead>
                    <tbody id="table-body-create">
                        {/* {rows} */}

                        {shukkaMesaiList.map((item, index) => (
                            <tr key={index}>
                                <td className="check-box"><input type="checkbox" id="checkbox-data" /></td>
                                <td className="text-code">
                                    <select name="seihinId" id='seihin-code' value={item.seihinId}
                                        onChange={(event) => {
                                            handleChangeSeihin(index, event);
                                            handleShukkaMesaiChange(index, event.target.name, event.target.value)
                                        }}

                                    >
                                        <option value=""></option>
                                        {seihinList.map(item => (
                                            <option key={item.seihinId} value={item.seihinId}>{item.seihinCode}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="text-name">
                                    <input id='seihin-mei-detail'
                                        name='seihinName'
                                        disabled type="text"
                                        value={item.seihinName}
                                        onChange={(event) => {
                                            handleShukkaMesaiChange(index, event.target.name, event.target.value)
                                        }}
                                    />
                                </td>
                                <td className="select-column">
                                    <select id='souko-detail' name='soukoId'
                                        value={item.soukoId}
                                        onChange={(event) => {
                                            handleChangeSouko(index, event);
                                            handleShukkaMesaiChange(index, event.target.name, event.target.value)
                                        }}>
                                        <option value=""></option>
                                        {soukoList.map(item => (
                                            <option key={item.soukoId} value={item.soukoId}>{item.soukoName}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="select-column">
                                    <select name="tanabanId" id="tanaban-detail"
                                        value={item.tanabanId}
                                        onChange={(event) => {
                                            handleShukkaMesaiChange(index, event.target.name, event.target.value)
                                        }}
                                    >
                                        <option value=""></option>
                                        {item.tanabanName.map(item1 => (
                                            <option key={item1.tanabanId} value={item1.tanabanId}>{item1.tanabanName}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="number-column">
                                    <input id='suryo-detail' type="number" name='shukkaYoteiSuryo'
                                        value={item.shukkaYoteiSuryo}
                                        onChange={(event) => {
                                            handleShukkaMesaiChange(index, event.target.name, event.target.value);
                                            handleChangeSuryo(index, event);
                                        }}
                                    />
                                </td>
                                <td className="text-column">
                                    <input id='lot-no-detail' type="text" name='lotNo'
                                        value={item.lotNo}
                                        onChange={(event) => {
                                            handleShukkaMesaiChange(index, event.target.name, event.target.value)
                                        }}

                                    />
                                </td>
                                <td className="number-column">
                                    <input id='tanka-detail' type="number" name='tanka'
                                        value={item.tanka}
                                        onChange={(event) => {
                                            handleShukkaMesaiChange(index, event.target.name, event.target.value)
                                            handleChangeTanka(index, event)
                                        }}
                                    />
                                </td>
                                <td className="number-column">
                                    <input id='kingaku-detail' name='kingaku'
                                        disabled type="number"
                                        value={item.kingaku}
                                        onChange={(event) => {
                                            handleShukkaMesaiChange(index, event.target.name, event.target.value)
                                        }}
                                    />
                                </td>
                                <td className="text-column">
                                    <input id='memo-ran-detail' type="text" name='tekiyoMesai'
                                        value={item.tekiyoMesai}
                                        onChange={(event) => {
                                            handleShukkaMesaiChange(index, event.target.name, event.target.value)
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            <div className="calculate-kingaku">
                <div className="data-create-item">
                    <span>受注金額</span>
                    <span><input className="juchuu-kingaku" disabled type="number"
                        value={juchuKingaku}
                    /></span>
                </div>
                <div className="data-create-item">
                    <span>消費税額</span>
                    <span><input className="shohizei-gaku" disabled type="number"
                        value={shohizeiGaku}
                    /></span>
                </div>
                <div className="data-create-item">
                    <span className='gokei-kingaku-title'>合計金額</span>
                    <span><input className="gokei-kingaku" disabled type="number"
                        value={gokeiKingaku}
                    /></span>
                </div>
            </div>
        </div>
    );
}