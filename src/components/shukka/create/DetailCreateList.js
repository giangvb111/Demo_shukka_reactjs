import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import DetailRow from './DetailRow';

export default function DetailCreateList({ setJuchuKingaku }) {
    const [seihinList, setSeihinList] = useState([]);
    const [soukoList, setSoukoList] = useState([]);
    const [rows, setRows] = useState([]);
    const [rowInit, setRowInit] = useState([]);
    const totalKingakuRef = useRef([]);

    useEffect(() => {

        // api get list seihin
        const fetchSeihin = async () => {
            try {
                const response = await axios.get('http://10.1.38.194:8080/seihin/get-list');
                setSeihinList(response.data);
            } catch (error) {
                console.log('Error fetching seihin:', error);
            }
        };

        // api get list souko
        const fetchSouko = async () => {
            try {
                const response = await axios.get('http://10.1.38.194:8080/souko/get-list');
                setSoukoList(response.data);
            } catch (error) {
                console.log('Error fetching souko:', error);
            }
        };

        fetchSeihin();
        fetchSouko();
    }, []);

    useEffect(() => {

        // Add an initial row if seihinList and soukoList are not empty and no rows exist
        if (seihinList.length > 0 && soukoList.length > 0 && rows.length === 0) {
            setRows([<DetailRow key={0} seihinList={seihinList} soukoList={soukoList} rowIndex={0} updateTotalKingaku={updateTotalKingaku} />]);
            setRowInit([<DetailRow key={0} seihinList={seihinList} soukoList={soukoList} rowIndex={0} updateTotalKingaku={updateTotalKingaku} />]);
        }
    }, [seihinList, soukoList]);

    // handle add column 
    const handleAddColumnButtonClick = () => {
        setRows([...rows, <DetailRow key={rows.length} seihinList={seihinList} soukoList={soukoList} rowIndex={rows.length} updateTotalKingaku={updateTotalKingaku} />]);
    };

    const updateTotalKingaku = (rowIndex, kingaku) => {
        totalKingakuRef.current[rowIndex] = kingaku;
        setJuchuKingaku(totalKingakuRef.current.reduce((total, k) => total + k, 0));
    };

    return (
        <div>
            <div className="add-column-create">
                <button onClick={handleAddColumnButtonClick} className="btn-add-column">追加</button>
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
                        {rows}
                    </tbody>
                </table>
            </div>
        </div>
    );
}