import { v } from '../../../styles/variables'

/*
Requiere que data tenfa una columna id
*/
export const Table = ({
    data,
    head,
    columns,
    isActions = true,
    justify = 'text-left',
    isStriped = true,
    isBgHead = true

}) => {
    return (
        <div className="tableContainer">
            <table>
                <thead>
                    <tr>
                        {
                            head.map(col => (
                                <th key={col} scope="col" className={`${justify} ${isBgHead? '':'bg-bgTemplate-dark text-textTemplate-dark'}`}>
                                    {col}
                                </th>

                            ))
                        }
                        {isActions &&
                            <th key={'action'} scope="col" className={`${justify}  ${isBgHead? '':'bg-bgTemplate-dark text-textTemplate-dark'}`}>
                                Action
                            </th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map(item => (
                            <tr key={item.id} className={`${ (isStriped)? 'tableStriped' : ''}`}> 
                                {
                                    columns.map(column => (
                                        <th key={column} scope="row" className={`${justify}`}>
                                            {item[column]}
                                        </th>
                                    ))
                                }
                                {isActions &&
                                    <th key={'action'} scope='row' className={`flex gap-7`}>
                                        <a href="#" className="tableActionEdit">{<v.iconeditarTabla />}</a>
                                        <a href="#" className="tableActionDelete">{<v.iconeliminarTabla />}</a>
                                    </th>
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
