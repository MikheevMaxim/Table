import React from "react"
import style from "./table.module.css"
import Pagination from "../pagination/pagination";
import Loader from "../loader/loader";

const Table = (props) => {
    let linesCounter = props.foundRows.length
    return (
        <div className={style.table}>
            {
                props.loader
                    ? <Loader/>
                    : null
            }
            <div onClick={() => {
                props.changeActiveFilter()
            }} className={style.filter}>
                <p>&#9776;</p>
            </div>
            <table cellpadding="5">
                <tr>
                    <th>Дата</th>
                    <th>Название</th>
                    <th>Количество</th>
                    <th>Растояние</th>
                </tr>
                {props.foundRows.map((row, index) => {
                    if (index < 16 * props.activePage && index >= 16 * (props.activePage - 1)) {
                        return (
                            <tr key={index}>
                                <td>{row.date}</td>
                                <td>{row.title}</td>
                                <td>{row.quantity}</td>
                                <td>{row.distance}</td>
                            </tr>
                        )
                    }
                })
                }
            </table>
            <Pagination
                changeActivePage={props.changeActivePage}
                activePage={props.activePage}
                linesCounter={linesCounter}
            />
        </div>
    )
}

export default Table