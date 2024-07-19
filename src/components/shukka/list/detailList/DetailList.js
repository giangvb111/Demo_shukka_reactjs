import React from 'react'

export default function DetailList(props) {
    const { searchResults, column } = props;
    console.log("column : ", column);

    return (
        <>
            {searchResults.map((result, rowIndex) => (
                <tr key={rowIndex}>
                    <td><input id={`checkbox-data-${rowIndex}`} type="checkbox" /></td>
                    {column.map((column, columnIndex) => (
                        <td
                            key={`${rowIndex}-${columnIndex}`}
                            style={{
                                display: column.columnWidth === 0 ? 'none' : 'table-cell'
                            }}
                        >
                            {result[column.columnDisplayName]}
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
}

