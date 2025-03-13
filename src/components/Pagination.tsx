import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import { Button } from "@/components/ui/button"

type PaginationProps = {
    totalItems: number
    itemsPerPage: number
    currentPage: number
    onPageChange: (page: number) => void
    onItemsPerPageChange: (itemsPerPage: number) => void
}

export function Pagination({
                               totalItems,
                               itemsPerPage,
                               currentPage,
                               onPageChange,
                               onItemsPerPageChange,
                           }: PaginationProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startItem = (currentPage - 1) * itemsPerPage + 1
    const endItem = Math.min(currentPage * itemsPerPage, totalItems)

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 px-2">
            <div className="text-sm text-muted-foreground">
                Showing {startItem} to {endItem} of {totalItems} entries
            </div>
            <div className="flex items-center gap-4">

                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Rows per page</span>
                    <Select

                        value={itemsPerPage.toString()}
                        onValueChange={(value) => onItemsPerPageChange(Number(value))}
                    >
                        <SelectTrigger className=" border border-gray-300 rounded-[6px] w-[70px]  ">
                            <SelectValue>{itemsPerPage}</SelectValue>
                        </SelectTrigger>
                        <SelectContent className=" border border-gray-300 rounded-[6px] ">
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex gap-2">
                    <Button
                        className=" border-gray-400 rounded-[6px] border dark:border-white dark:text-secondary-color-text dark:bg-khotixs-background-dark"
                        variant="outline"
                        size="icon"
                        onClick={() => onPageChange(1)}
                        disabled={currentPage === 1}
                    >
                        {'<<'}
                    </Button>
                    <Button
                        className=" border-gray-400 rounded-[6px] border dark:border-white dark:text-secondary-color-text dark:bg-khotixs-background-dark"
                        variant="outline"
                        size="icon"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        {'<'}
                    </Button>
                    <Button
                        className=" border-gray-400 rounded-[6px] border dark:border-white dark:text-secondary-color-text dark:bg-khotixs-background-dark"
                        variant="outline"
                        size="icon"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        {'>'}
                    </Button>
                    <Button
                        className=" border-gray-400 rounded-[6px] border dark:border-white dark:text-secondary-color-text dark:bg-khotixs-background-dark"
                        variant="outline"
                        size="icon"
                        onClick={() => onPageChange(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        {'>>'}
                    </Button>
                </div>
            </div>
        </div>
    )
}
