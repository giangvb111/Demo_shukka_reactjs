import React from 'react'

export default function SearchShukkaList() {
    return (
        <div>
            <div className="search">
                <div className="search-default">

                    {/* <!-- 出荷予定日 --> */}
                    <div className="label-search">
                        <div className="title-item-search">
                            <span>出荷予定日: </span>
                        </div>
                        <div className="data-item-search">
                            <input id="shukka-yotei-bi-from" type="date" name="shukka-yotei-bi-from" />
                            <span>～</span>
                            <input id="shukka-yoteibi-to" type="date" name="shukka-yoteibi-to" />
                        </div>
                    </div>

                    {/* <!-- 受注日 --> */}
                    <div className="label-search">
                        <div className="title-item-search">
                            <span>受注日: </span>
                        </div>
                        <div className="data-item-search">
                            <input id="juchuu-bi-from" type="date" name="juchuu-bi-from" />
                            <span>～</span>
                            <input id="juchuu-bi-to" type="date" name="juchuu-bi-to" />
                        </div>
                    </div>

                </div>
                <div className="search-advanced">
                    <div className="search-advanced-left">

                        {/* <!-- 出荷実績日 --> */}
                        <div className="label-search">
                            <div className="title-item-search">
                                <span>出荷実績日: </span>
                            </div>
                            <div className="data-item-search">
                                <input id="shukka-jisseki-bi-from" type="date" name="shukka-jisseki-bi-from" />
                                <span>～</span>
                                <input id="shukka-jisseki-bi-to" type="date" name="shukka-jisseki-bi-to" />
                            </div>
                        </div>

                        {/* <!-- 納品先 --> */}
                        <div className="label-search">
                            <div className="title-item-search">
                                <span>納品先: </span>
                            </div>
                            <div className="data-item-search">
                                <select name="nohin-saki" id="nohin-saki">
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>

                        {/* <!-- 請求先 --> */}
                        <div className="label-search">
                            <div className="title-item-search">
                                <span>請求先: </span>
                            </div>
                            <div className="data-item-search">
                                <select name="seikyu-saki" id="seikyu-saki">
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>

                        {/* <!-- 担当者 --> */}
                        <div className="label-search">
                            <div className="title-item-search">
                                <span>担当者: </span>
                            </div>
                            <div className="data-item-search">
                                <select name="tantosa" id="tantosa">
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>

                    </div>
                    <div className="search-advanced-right">

                        {/* <!-- 出荷倉庫・棚番 --> */}
                        <div className="label-search">
                            <div className="title-item-search">
                                <span>出荷倉庫・棚番: </span>
                            </div>
                            <div className="data-item-search">
                                <select name="souko" id="souko">
                                    <option value=""></option>
                                </select>
                                <select name="tanaban" id="tanaban">
                                    <option value=""></option>
                                </select>
                            </div>
                        </div>

                        {/* <!-- 製品コード --> */}
                        <div className="label-search">
                            <div className="title-item-search">
                                <span>製品コード: </span>
                            </div>
                            <div className="data-item-search">
                                <input type="text" id="seihin-cd" />
                            </div>
                        </div>

                        {/* <!-- 製品名 --> */}
                        <div className="label-search">
                            <div className="title-item-search">
                                <span>製品コード: </span>
                            </div>
                            <div className="data-item-search">
                                <input type="text" id="seihin-mei" />
                            </div>
                        </div>

                        {/* <!-- キーワード --> */}
                        <div className="label-search">
                            <div className="title-item-search">
                                <span>キーワード: </span>
                            </div>
                            <div className="data-item-search">
                                <input type="text" id="kiwado" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="btn-show-search">
                <button className="show-search-advanced">この条件で検索</button>
                <button className="search-btn">検索</button>
            </div>
        </div>
    )
}
