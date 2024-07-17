import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { API_BASE_URL } from '../../../constants';


export default function DetailRow({ seihinList, soukoList, rowIndex, updateTotalKingaku }) {
    const [seihinName, setSeihinName] = useState('');
    const [tanabanList, setTanabanList] = useState([]);
    const [suryo, setSuryo] = useState();
    const [tanka, setTanka] = useState('');
    const [kingaku, setKingaku] = useState();

    // get seihin name autofill when change seihincode
    const handleChangeSeihin = (event) => {
        const selectedSeihinId = event.target.value;
        const selectedSeihin = seihinList.find(item => item.seihinId === selectedSeihinId);
        setSeihinName(selectedSeihin ? selectedSeihin.seihinName : '');
    };

    // get list tanaban when change souko
    const handleChangeSouko = async (event) => {
        const selectedSoukoId = event.target.value;
        try {
            const response = await axios.get(`${API_BASE_URL}/tanaban/get-tanaban-by-souko-id?soukoId=${selectedSoukoId}`);
            setTanabanList(response.data);
        } catch (error) {
            console.log('Error fetching tanaban:', error);
        }
    };

    //caculate kingaku when suryo and tanka change
    const handleChangeTanka = (event) => {
        const newTanka = parseFloat(event.target.value) || '';
        setTanka(newTanka);
        setKingaku(suryo * (newTanka === '' ? 1 : newTanka));
    }
    const handleChangeSuryo = (event) => {
        const newSuryo = parseFloat(event.target.value) || '';
        setSuryo(newSuryo);
        if (tanka === '') {
            setKingaku(newSuryo * 1);
        } else {
            setKingaku(newSuryo * tanka);
        }
    }

    useEffect(() => {
        const newKingaku = parseFloat(suryo) * parseFloat(tanka || 1);
        const validKingaku = isNaN(newKingaku) ? 0 : newKingaku;
        setKingaku(validKingaku);
        updateTotalKingaku(rowIndex, validKingaku);
    }, [suryo, tanka]);

    return (
        <tr>
            <td className="check-box"><input type="checkbox" id="checkbox-data" /></td>
            <td className="text-code">
                <select name="" id='seihin-code' onChange={handleChangeSeihin}>
                    <option value=""></option>
                    {seihinList.map(item => (
                        <option key={item.seihinId} value={item.seihinId}>{item.seihinCode}</option>
                    ))}
                </select>
            </td>
            <td className="text-name"><input id='seihin-mei-detail' disabled type="text" value={seihinName} /></td>
            <td className="select-column">
                <select id='souko-detail' onChange={handleChangeSouko}>
                    <option value=""></option>
                    {soukoList.map(item => (
                        <option key={item.soukoId} value={item.soukoId}>{item.soukoName}</option>
                    ))}
                </select>
            </td>
            <td className="select-column">
                <select name="" id="tanaban-detail">
                    <option value=""></option>
                    {tanabanList.map(item => (
                        <option key={item.tanabanId} value={item.tanabanId}>{item.tanabanName}</option>
                    ))}
                </select>
            </td>
            <td className="number-column"><input id='suryo-detail' type="number" value={suryo} onChange={handleChangeSuryo} /></td>
            <td className="text-column"><input id='lot-no-detail' type="text" /></td>
            <td className="number-column"><input id='tanka-detail' type="number" value={tanka} onChange={handleChangeTanka} /></td>
            <td className="number-column"><input id='kingaku-detail' className={`kingaku-detail-${rowIndex}`} disabled type="number" value={kingaku} /></td>
            <td className="text-column"><input id='memo-ran-detail' type="text" /></td>
        </tr>
    );
}
