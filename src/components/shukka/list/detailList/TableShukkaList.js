import React from 'react'
import DetailList from './DetailList'

export default function TableShukkaList() {
  return (
    <div className="table table-list">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th><input id="check-all" type="checkbox" /></th>
                  <th>管理番号</th>
                  <th>状況</th>
                  <th>出荷予定日</th>
                  <th>出荷実績日</th>
                  <th>引当</th>
                  <th>件名</th>
                  <th>取引先</th>
                  <th>予定数</th>
                  <th>実績数</th>
                  <th>残数</th>
                  <th>倉庫</th>
                  <th>棚番</th>
                  <th>担当者</th>
                </tr>
              </thead>
              <tbody>
                <DetailList/>
              </tbody>
            </table>
          </div>
        </div>
  )
}
