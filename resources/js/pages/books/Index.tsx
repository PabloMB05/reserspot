import { createActionsColumn, createTextColumn } from '@/components/stack-table/columnsTable';
import { DeleteDialog } from '@/components/stack-table/DeleteDialog';
import { FilterConfig, FiltersTable } from '@/components/stack-table/FiltersTable';
import { Table } from '@/components/stack-table/Table';
import { TableSkeleton } from '@/components/stack-table/TableSkeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Book, useBooks, useDeleteBook } from '@/hooks/books/useBooks';
import { useTranslations } from '@/hooks/use-translations';
import { BookLayout } from '@/layouts/books/BookLayout';
import { Link, router, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ClipboardList, Handshake, Image, PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

interface BookIndexProps {
    floor_list: number[],
    zone_list: number[],
    bookcase_list: number[],
}

export default function BooksIndex({floor_list, zone_list, bookcase_list}:BookIndexProps) {
    const { t } = useTranslations();
    const { url } = usePage();
    const urlParams = new URLSearchParams(url.split('?')[1] || '');
    const pageParam = urlParams.get('page');
    const perPageParam = urlParams.get('per_page');

    const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam) : 1);
    const [perPage, setPerPage] = useState(perPageParam ? parseInt(perPageParam) : 10);
    const [filters, setFilters] = useState<Record<string, any>>({});
    const [open, setOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [reserMail, setReserMail] = useState('');

    const combinedSearch = [
        filters.title ? filters.title : 'null',
        filters.genres ? filters.genres : 'null',
        filters.author ? filters.author : 'null',
        filters.pages ? filters.pages : 'null',
        filters.publisher ? filters.publisher : 'null',
        filters.floor ? filters.floor : 'null',
        filters.zone ? filters.zone : 'null',
        filters.bookcase ? filters.bookcase : 'null',
        filters.ISBN ? filters.ISBN : 'null',
    ];

    const {
        data: books,
        isLoading,
        isError,
        refetch,
    } = useBooks({
        search: combinedSearch,
        page: currentPage,
        perPage: perPage,
    });

    const deleteBookMutation = useDeleteBook();

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    function handleLoanButton(bookID: string) {
        return router.get('/loans/create', { bookID });
    }



    const handleFilterChange = (newFilters: Record<string, any>) => {
        const filtersChanged = newFilters!==filters;

        if (filtersChanged) {
            setCurrentPage(1);
        }
        setFilters(newFilters);
        };

    const handlePerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setCurrentPage(1); 
    };

    const handleDeleteBook = async (id: string) => {
        try {
            await deleteBookMutation.mutateAsync(id);
            refetch();
        } catch (error) {
            toast.error(t('ui.books.deleted_error') || 'Error deleting book');
            console.error('Error deleting book:', error);
        }
    };
    function HandleReservation(bookID: string, userMail: string) {
        const reservationData = new FormData();
        reservationData.append('bookID', bookID);
        reservationData.append('userMail', userMail);
        router.post('/reservations', reservationData);
    }
    const columns = useMemo(
        () =>
            [
                createTextColumn<Book>({
                    id: 'title',
                    header: t('ui.books.columns.title') || 'Title',
                    accessorKey: 'title',
                }),
                createTextColumn<Book>({
                    id: 'isbn',
                    header: t('isbn') || 'Title',
                    accessorKey: 'isbn',
                    format: (value) => {
                        return value['number'] + ' - (' + value['loans'] + '/' + value['total'] + ')';

                    },
                }),
                createTextColumn<Book>({
                    id: 'genres',
                    header: t('ui.books.columns.genres') || 'Genres',
                    accessorKey: 'genres',
                    format: (value) => {
                        let aux;
                        let res: string[] = [];
                        if (value.includes(',')) {
                            aux = value.split(', ');
                            aux.map((genre) => {
                                genre = t(`ui.genres.names.${genre}`);
                                res.push(genre);
                            });
                            aux = res.join(', ');
                            return aux;
                        } else {
                            return t(`ui.genres.names.${value}`);
                        }
                    },
                }),
                createTextColumn<Book>({
                    id: 'author',
                    header: t('ui.books.columns.author') || 'Author',
                    accessorKey: 'author',
                }),
                createTextColumn<Book>({
                    id: 'length',
                    header: t('ui.books.columns.length') || 'Length',
                    accessorKey: 'length',
                }),
                createTextColumn<Book>({
                    id: 'editor',
                    header: t('ui.books.columns.editor') || 'Editor',
                    accessorKey: 'editor',
                }),
                createTextColumn<Book>({
                    id: 'floor_id',
                    header: t('ui.books.columns.floor') || 'Floor',
                    accessorKey: 'floor_id',
                }),
                createTextColumn<Book>({
                    id: 'zone_id',
                    header: t('ui.books.columns.zone') || 'Zone',
                    accessorKey: 'zone_id',
                }),
                createTextColumn<Book>({
                    id: 'bookcase_id',
                    header: t('ui.books.columns.bookcase') || 'Bookcase',
                    accessorKey: 'bookcase_id',
                }),
                createActionsColumn<Book>({
                    id: 'actions',
                    header: t('ui.books.columns.actions') || 'Actions',
                    renderActions: (book) => {
                        return (
                            <>
                                {!book.hasActive && (
                                    <Button
                                        disabled={book.hasActive}
                                        onClick={() => handleLoanButton(book.id)}
                                        variant="outline"
                                        size="icon"
                                        title={t('ui.books.buttons.loan') || 'Loan book'}
                                    >
                                        <Handshake className="h-4 w-4 text-green-500" />
                                    </Button>
                                )}

                                {book.hasActive && (
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        title={t('ui.books.buttons.queue') || 'Loan book'}
                                        onClick={() => {
                                            setSelectedBook(book);
                                            setOpen(true);
                                        }}
                                    >
                                        <ClipboardList className="h-4 w-4 text-orange-500" />
                                    </Button>
                                )}

                                <Link href={`/books/${book.id}/edit?page=${currentPage}&perPage=${perPage}`}>
                                    <Button variant="outline" size="icon" title={t('ui.books.buttons.edit') || 'Edit book'}>
                                        <PencilIcon className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <DeleteDialog
                                    id={book.id}
                                    onDelete={handleDeleteBook}
                                    title={t('ui.books.delete.title') || 'Delete book'}
                                    description={
                                        t('ui.books.delete.description') || 'Are you sure you want to delete this book? This action cannot be undone.'
                                    }
                                    trigger={
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="text-destructive hover:text-destructive"
                                            title={t('ui.users.buttons.delete') || 'Delete user'}
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                        </Button>
                                    }
                                />
                            </>
                        );
                    },
                }),
            ] as ColumnDef<Book>[],
        [t, handleDeleteBook],
    );

    return (
        <BookLayout title={t('ui.books.title')}>
            <div className="p-6">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">{t('ui.books.title')}</h1>
                        <Link href="/books/create">
                            <Button>
                                <PlusIcon className="mr-2 h-4 w-4" />
                                {t('ui.books.buttons.new')}
                            </Button>
                        </Link>
                    </div>
                    <div></div>

                    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
      <AccordionTrigger className="text-center w-full justify-center">
      {t('ui.common.filters.trigger')}</AccordionTrigger>
        <AccordionContent>
                    <div className="space-y-4">
                        <FiltersTable
                            filters={
                                [
                                    {
                                        id: 'title',
                                        label: t('ui.books.filters.title') || 'Titulo',
                                        type: 'text',
                                        placeholder: t('ui.books.placeholders.title') || 'Titulo...',
                                    },
                                    {
                                        id: 'ISBN',
                                        label: t('ISBN') || 'ISBN',
                                        type: 'text',
                                        placeholder: t('ui.books.placeholders.ISBN') || 'ISBN...',
                                    },
                                    
                                    {
                                        id: 'genres',
                                        label: t('ui.books.filters.genres') || 'Géneros',
                                        type: 'text',
                                        placeholder: t('ui.books.placeholders.genres') || 'Géneros...',
                                    },
                                    {
                                        id: 'author',
                                        label: t('ui.books.filters.author') || 'Autor',
                                        type: 'text',
                                        placeholder: t('ui.books.placeholders.author') || 'Autor...',
                                    },
                                    {
                                        id: 'pages',
                                        label: t('ui.books.filters.pages') || 'Páginas',
                                        type: 'number',
                                        placeholder: t('ui.books.placeholders.pages') || 'Páginas...',
                                    },
                                    {
                                        id: 'publisher',
                                        label: t('ui.books.filters.publisher') || 'Editorial',
                                        type: 'text',
                                        placeholder: t('ui.books.placeholders.publisher') || 'Editorial...',
                                    },
                                    {
                                        id: 'floor',
                                        label: t('ui.books.filters.floor') || 'Piso',
                                        type: 'select',
                                        options: floor_list,
                                        placeholder: t('ui.books.placeholders.floor') || 'Piso...',
                                    },
                                    {
                                        id: 'zone',
                                        label: t('ui.books.filters.zone') || 'Zona',
                                        type: 'select',
                                        options: zone_list,
                                        placeholder: t('ui.books.placeholders.zone') || 'Zona...',
                                    },
                                    {
                                        id: 'bookcase',
                                        label: t('ui.books.filters.bookcase') || 'Estantería',
                                        type: 'select',
                                        options: bookcase_list,
                                        placeholder: t('ui.books.placeholders.bookcase') || 'Estantería...',
                                    },
                                ] as FilterConfig[]
                            }
                            onFilterChange={handleFilterChange}
                            initialValues={filters}
                            containerClassName="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-4"
                        />
                    </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>

                    <div className="w-full overflow-hidden">
                        {isLoading ? (
                            <TableSkeleton columns={10} rows={10} />
                        ) : isError ? (
                            <div className="p-4 text-center">
                                <div className="mb-4 text-red-500">{t('ui.books.error_loading')}</div>
                                <Button onClick={() => refetch()} variant="outline">
                                    {t('ui.books.buttons.retry')}
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <Table
                                    data={
                                        books ?? {
                                            data: [],
                                            meta: {
                                                current_page: 1,
                                                from: 0,
                                                last_page: 1,
                                                per_page: perPage,
                                                to: 0,
                                                total: 0,
                                            },
                                        }
                                    }
                                    columns={columns}
                                    onPageChange={handlePageChange}
                                    onPerPageChange={handlePerPageChange}
                                    perPageOptions={[10, 25, 50, 100]}
                                    noResultsMessage={t('ui.books.no_results') || 'No books found'}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Dialog
                open={open}
                onOpenChange={(val) => {
                    setOpen(val);
                    if (!val) {
                        setReserMail('');
                        setSelectedBook(null);
                    }
                }}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{t('ui.reservations.utils.title')}</DialogTitle>
                        <DialogDescription>{t('ui.reservations.utils.description')}</DialogDescription>
                    </DialogHeader>
                    {selectedBook && (
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                {t('ui.reservations.utils.book')}
                                </Label>
                                <Input disabled id="name" value={selectedBook.title} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                {t('ui.reservations.utils.email')}
                                </Label>
                                <Input
                                    id="username"
                                    type="email"
                                    value={reserMail}
                                    onChange={(e) => setReserMail(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button
                            onClick={() => {
                                if (selectedBook) HandleReservation(selectedBook.id, reserMail);
                                if (selectedBook) setOpen(false);
                            }}
                        >
                            {t('ui.reservations.utils.confirm')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </BookLayout>
    );
}