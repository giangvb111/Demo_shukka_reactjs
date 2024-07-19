import React, { useState, useEffect } from 'react'
import DetailList from './DetailList'

export default function TableShukkaList(props) {

  let { columns, searchResults } = props;

  // console.log("columns ==>>", columns);

  return (
    <div className="table table-list">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th><input id="check-all" type="checkbox" /></th>
              {columns.map((column) => (
                <th key={column.settingDataId} style={{
                  width: column.columnWidth,
                  display: column.columnWidth === 0 ? 'none' : 'table-cell'
                }}>
                  {column.columnDisplayName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <DetailList searchResults={searchResults} column={columns}
            // hiddenColumnIndexes={columns.filter(column => column.columnWidth === 0).map((column, index) => index)}
            />
          </tbody>
        </table>
      </div>
    </div>
  )
}
