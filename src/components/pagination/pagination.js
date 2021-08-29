import React from "react"
import style from "./pagination.module.css"

const Pagination = (props) => {
    let arrPages = []
    let pages = props.linesCounter / 16
    for (let i = 0; i < pages; i++) {
        arrPages.push(i + 1)
    }

    return (
        <div className={style.pagination}>
            <div className={style.buttons}>
                {arrPages.map((num, index) => {
                    return (
                        <div
                            onClick={() => {
                                props.changeActivePage(index + 1)
                            }}
                            key={index + 1}
                            className={index + 1 === props.activePage
                                ? style.activePage
                                : style.page}>
                            <p>
                                {num}
                            </p>
                        </div>
                    )
                })}
                {
                    props.linesCounter > 16
                        ? <div onClick={props.activePage < arrPages.length
                            ? () => {
                                props.changeActivePage(props.activePage + 1)
                            }
                            : null}
                               className={style.nextPage}
                        ><p>
                            &#10150;
                        </p>
                        </div>
                        : null
                }
            </div>
        </div>
    )
}

export default Pagination