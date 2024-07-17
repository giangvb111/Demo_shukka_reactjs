import React, { useState } from 'react'

export default function DetailList() {

    const [shukkaDetailList, setShukkaDetailList] = useState([])

    return (
        <tr>
            <td><input id="checkbox-data" type="checkbox" /></td>
            <td id='kanri-bango-list'>hihi</td>
            <td id='jokyo-list'>hihi</td>
            <td id='shukka-yotei-bi-list'>hihi</td>
            <td id='shukka-jisseki-bi-list'>hihi</td>
            <td id='hikiate-list'>hihi</td>
            <td id='kenmei-list'>hihi</td>
            <td id='torihikisaki-list'>hihi</td>
            <td id='yotei-suu-list'>hihi</td>
            <td id='jisseki-suu-list'>hihi</td>
            <td id='zan-suu-list'>hihi</td>
            <td id='souko-list'>hihi</td>
            <td id='tanaban-list'>hihi</td>
            <td id='tantosha-list'>hihi</td>

        </tr>
    )
}
