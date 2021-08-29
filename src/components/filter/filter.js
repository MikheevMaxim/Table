import React from "react"
import style from "./filter.module.css"

const Filter = (props) => {
    let columnValue = props.columnValue
    let conditionValue = ""
    let inputValue = ""
    let newColumnValue = React.createRef()
    let newConditionValue = React.createRef()
    let newInputValue = React.createRef()

    //Меняет значение в переменной columnValue
    const changeColumnValue = () => {
        columnValue = newColumnValue.current.value
        props.changeColumnValue(columnValue)
    }
    //Меняет значение в переменной conditionValue
    const changeConditionValue = () => {
        conditionValue = newConditionValue.current.value
    }
    //Меняет значение в переменной inputValue
    const changeInputValue = () => {
        inputValue = newInputValue.current.value
    }
    //Записывает фильтры в state и формирует массив с отфильтрованными строками
    const search = () => {
        let filter = {
            column: columnValue,
            condition: conditionValue,
            inputValue: inputValue
        }
        props.changeFilterValue(filter)
        props.changeFoundRows(filter)
    }

    return (
        <div className={style.filter}>
            <div className={style.filterMenu}>
                <div className={style.column1}>
                    <p>Выбор колонки</p>
                    <select ref={newColumnValue}>
                        <option
                            onClick={changeColumnValue}
                            value="">
                            Не выбрано
                        </option>
                        <option
                            onClick={changeColumnValue}
                            value="title">
                            Название
                        </option>
                        <option
                            onClick={changeColumnValue}
                            value="quantity">
                            Количество
                        </option>
                        <option
                            onClick={changeColumnValue}
                            value="distance">
                            Расстояние
                        </option>
                    </select>
                </div>
                <div className={style.column2}>
                    <p>Выбор условия</p>
                    <select ref={newConditionValue}>
                        <option value="">Не выбрано</option>
                        <option
                            onClick={changeConditionValue}
                            value="equally">
                            Равно
                        </option>
                        {
                            (props.columnValue !== "quantity" && props.columnValue !== "distance")
                                ? <option
                                    onClick={changeConditionValue}
                                    value="contains">
                                    Содержит
                                </option>
                                : null
                        }
                        {
                            props.columnValue !== "title"
                                ? <option
                                    onClick={changeConditionValue}
                                    value="more">
                                    Больше
                                </option>
                                : null
                        }
                        {
                            props.columnValue !== "title"
                                ? <option
                                    onClick={changeConditionValue}
                                    value="less">
                                    Меньше
                                </option>
                                : null
                        }
                    </select>
                    <input
                        onChange={changeInputValue}
                        ref={newInputValue}
                        placeholder="Введите значение"/>
                    <button
                        onClick={search}>
                        Найти
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Filter