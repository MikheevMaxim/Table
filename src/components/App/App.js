import React, {Component} from "react"
import style from "./App.module.css"
import Table from "../table/table";
import Filter from "../filter/filter";
import axios from "axios";

class App extends Component {
    state = {
        allRows: [],    //Все строки
        foundRows: [],  //Отфильтрованные строки
        activePage: 1,  //Активная страница
        filter: {       //Параметры фильтрации
            activeFilter: false,
            column: "",
            condition: "",
            inputValue: ""
        },
        loader: false
    }

    componentDidMount() {
        this.downloadRows()
    }

    //Меняет массив строк
    changeAllRows = (arr) => {
        this.setState({allRows: arr})
    }

    //Загружает строки из FireBase
    downloadRows = async () => {
        this.setState({loader: true})
        let data = await axios.get("https://testtaskforwelbex-default-rtdb.firebaseio.com/rows.json")
        this.changeAllRows(data.data)
        this.setState({loader: false})
    }

    //Открывает вкладку фильтр
    changeActiveFilter = () => {
        let filter = this.state.filter
        this.setState({
            filter: {
                activeFilter: !filter.activeFilter,
                column: filter.column,
                condition: filter.condition,
                inputValue: filter.inputValue
            }
        })
    }
    //Меняет параметры фильтрации
    changeFilterValue = (filter) => {
        this.setState({
            filter: {
                activeFilter: !this.state.filter.activeFilter,
                column: filter.column,
                condition: filter.condition,
                inputValue: filter.inputValue
            }
        })
        this.changeActivePage(1)
    }

    //Формирует отфильтрованный массив
    changeFoundRows = (filter) => {
        let foundRows = []
        let allRows = this.state.allRows
        allRows.map((row, index) => {
                if (filter.column === "title" && filter.condition === "equally") {
                    if (filter.inputValue === row.title) {
                        return foundRows.push({
                            date: row.date,
                            title: row.title,
                            quantity: row.quantity,
                            distance: row.distance
                        })
                    }
                } else if (filter.column === "title" && filter.condition === "contains") {
                    if (row.title.includes(filter.inputValue)) {
                        return foundRows.push({
                            date: row.date,
                            title: row.title,
                            quantity: row.quantity,
                            distance: row.distance
                        })
                    }
                } else if (filter.column === "quantity" && filter.condition === "equally") {
                    if (+filter.inputValue === row.quantity) {
                        return foundRows.push({
                            date: row.date,
                            title: row.title,
                            quantity: row.quantity,
                            distance: row.distance
                        })
                    }
                } else if (filter.column === "quantity" && filter.condition === "contains") {
                    if (String(row.quantity).includes(filter.inputValue)) {
                        return foundRows.push({
                            date: row.date,
                            title: row.title,
                            quantity: row.quantity,
                            distance: row.distance
                        })
                    }
                } else if (filter.column === "quantity" && filter.condition === "more") {
                    if (+filter.inputValue < row.quantity) {
                        return foundRows.push({
                            date: row.date,
                            title: row.title,
                            quantity: row.quantity,
                            distance: row.distance
                        })
                    }
                } else if (filter.column === "quantity" && filter.condition === "less") {
                    if (+filter.inputValue > row.quantity) {
                        return foundRows.push({
                            date: row.date,
                            title: row.title,
                            quantity: row.quantity,
                            distance: row.distance
                        })
                    }
                } else if (filter.column === "distance" && filter.condition === "equally") {
                    if (+filter.inputValue === row.distance) {
                        return foundRows.push({
                            date: row.date,
                            title: row.title,
                            quantity: row.quantity,
                            distance: row.distance
                        })
                    }
                } else if (filter.column === "distance" && filter.condition === "contains") {
                    if (String(row.distance).includes(filter.inputValue)) {
                        return foundRows.push({
                            date: row.date,
                            title: row.title,
                            quantity: row.quantity,
                            distance: row.distance
                        })
                    }
                } else if (filter.column === "distance" && filter.condition === "more") {
                    if (+filter.inputValue < row.distance) {
                        return foundRows.push({
                            date: row.date,
                            title: row.title,
                            quantity: row.quantity,
                            distance: row.distance
                        })
                    }
                } else if (filter.column === "distance" && filter.condition === "less") {
                    if (+filter.inputValue > row.distance) {
                        return foundRows.push({
                            date: row.date,
                            title: row.title,
                            quantity: row.quantity,
                            distance: row.distance
                        })
                    }
                }

            }
        )
        this.setState({foundRows: foundRows})
    }

    //Меняет значение фильтра column
    changeColumnValue = (value) => {
        let filter = this.state.filter
        this.setState({
            filter: {
                activeFilter: filter.activeFilter,
                column: value,
                condition: filter.condition,
                inputValue: filter.inputValue
            }
        })
    }

    //Меняет активную страницу
    changeActivePage = (value) => {
        this.setState({activePage: value})
    }

    render() {
        return (
            <div className={style.App}>
                {this.state.filter.activeFilter
                    ? <Filter
                        columnValue={this.state.filter.column}
                        changeColumnValue={this.changeColumnValue}
                        changeFilterValue={this.changeFilterValue}
                        changeFoundRows={this.changeFoundRows}
                    />
                    : null
                }
                <Table
                    loader={this.state.loader}
                    changeActivePage={this.changeActivePage}
                    activePage={this.state.activePage}
                    filter={this.state.filter}
                    changeActiveFilter={this.changeActiveFilter}
                    pages={this.state.pages}
                    foundRows={
                        this.state.foundRows.length !== 0
                            ? this.state.foundRows
                            : this.state.allRows
                    }/>
            </div>
        )
    }
}

export default App
