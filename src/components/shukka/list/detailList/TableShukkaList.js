import React from 'react'
import DetailList from './DetailList'

export default function TableShukkaList(props) {

  let { columns, searchResults } = props;

  return (
    <div className="table table-list table-list-shukka">
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
            />
          </tbody>
        </table>
      </div>
    </div>
  )
}
