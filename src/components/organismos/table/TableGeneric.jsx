import { flexRender } from "@tanstack/react-table"
import {
	// Column,
	// Table,
	useReactTable,
	// ColumnFiltersState,
	getCoreRowModel,
	getFilteredRowModel,
	// getFacetedRowModel,
	// getFacetedUniqueValues,
	// getFacetedMinMaxValues,
	getPaginationRowModel,
	// sortingFns,
	getSortedRowModel,
	// FilterFn,
	// SortingFn,
	// ColumnDef,
	// flexRender,
	// FilterFns,
} from "@tanstack/react-table"
import { APP_CONFIG } from "../../../utils/dataEstatica"
import { FaArrowsAltV } from "react-icons/fa"
import { Pagination } from "./Pagination"


export const TableGeneric = ({
	data,
	columns,
	isStriped = true
}) => {

	const table = useReactTable({
		data,
		columns,
		initialState: {
			pagination: {
				pageSize: APP_CONFIG.table.pageSize,
			},
		},
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	})

	return (
		<>
			<div className="tableContainer">
				<table className="">
					<thead>
						{
							table.getHeaderGroups().map(headerGroup => (
								<tr key={headerGroup.id}>
									{
										headerGroup.headers.map(header => (
											<th key={header.id} className="">
												<span className="flex">
													{header.column.columnDef.header}
													{header.column.getCanSort() && (
														<span
															style={{ cursor: 'pointer' }}
															onClick={header.column.getToggleSortingHandler()}
														>
															<FaArrowsAltV />
														</span>
													)}
													{
														{
															asc: '🔼',
															desc: '🔽'
														}[header.column.getIsSorted()]
													}
												</span>
											</th>
										))
									}
								</tr>
							))
						}
					</thead>
					<tbody>
						{
							table.getRowModel().rows.map(item => (
								<tr key={item.id} className={`${(isStriped) ? 'tableStriped' : ''}`} >
									{
										item.getVisibleCells().map(cell => (
											<th key={cell.id} scope='row'>
												{
													flexRender(cell.column.columnDef.cell, cell.getContext())
												}
											</th>
										))
									}
								</tr>
							))
						}
					</tbody>
				</table>
			</div>

			<Pagination
				table={table}
				goBegin={() => table.setPageIndex(0)}
				page={table.getState().pagination.pageIndex + 1}
				pageCount={table.getPageCount()}
			/>
		</>
	)
}
