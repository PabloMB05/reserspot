import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableSkeleton } from "@/components/stack-table/TableSkeleton";
import { BookLayout } from "@/layouts/books/BookLayout";
import { Book, useDeleteBook, useBooks } from "@/hooks/books/useBooks";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { useState, useMemo } from "react";
import { Link, usePage } from "@inertiajs/react";
import { useTranslations } from "@/hooks/use-translations";
import { Table } from "@/components/stack-table/Table";
import { createTextColumn, createDateColumn, createActionsColumn } from "@/components/stack-table/columnsTable";
import { DeleteDialog } from "@/components/stack-table/DeleteDialog";
import { FiltersTable, FilterConfig } from "@/components/stack-table/FiltersTable";
import { toast } from "sonner";
import { ColumnDef, Row } from "@tanstack/react-table";

interface BookIndexProps {
    authors: {value: string, label: string}[];
}

export default function BooksIndex({authors}:BookIndexProps) {
  const { t } = useTranslations();
  const { url } = usePage();

  // Obtener los parámetros de la URL actual
  const urlParams = new URLSearchParams(url.split('?')[1] || '');
  const pageParam = urlParams.get('page');
  const perPageParam = urlParams.get('per_page');

  // Inicializar el estado con los valores de la URL o los valores predeterminados
  const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam) : 1);
  const [perPage, setPerPage] = useState(perPageParam ? parseInt(perPageParam) : 10);
  const [filters, setFilters] = useState<Record<string, any>>({
    author: {label: "Loading labels", value: "loading values"},
  });
  const { data: books, isLoading, isError, refetch } = useBooks({
    author: filters.author,
    page: currentPage,
    perPage: perPage,
  });

  const deleteBookMutation = useDeleteBook();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (newFilters: Record<string, any>) => {
    setFilters(newFilters);
    console.log('Filters changed:', newFilters);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleDeleteBook = async (id: string) => {
    try {
      await deleteBookMutation.mutateAsync(id);
      refetch();
    } catch (error) {
      toast.error(t("ui.books.deleted_error") || "Error deleting book");
      console.error("Error deleting book:", error);
    }
  };

  const columns = useMemo(() => ([
    createTextColumn<Book>({
      id: "title",
      header: t("ui.books.columns.title") || "Title",
      accessorKey: "title",
    }),
    createTextColumn<Book>({
      id: "genres",
      header: t("ui.books.columns.genres") || "Genres",
      accessorKey: "genres",
    }),
    createTextColumn<Book>({
      id: "author",
      header: t("ui.books.columns.author") || "Author",
      accessorKey: "author",
    }),
    createTextColumn<Book>({
      id: "length",
      header: t("ui.books.columns.length") || "Length",
      accessorKey: "length",
    }),
    createTextColumn<Book>({
      id: "editor",
      header: t("ui.books.columns.editor") || "Editor",
      accessorKey: "editor",
    }),
    createTextColumn<Book>({
      id: "floor_id",
      header: t("ui.books.columns.floor") || "Floor",
      accessorKey: "floor_id",
    }),
    createTextColumn<Book>({
      id: "zone_id",
      header: t("ui.books.columns.zone") || "Zone",
      accessorKey: "zone_id",
    }),
    createTextColumn<Book>({
      id: "bookcase_id",
      header: t("ui.books.columns.bookcase") || "Bookcase",
      accessorKey: "bookcase_id",
    }),
    createDateColumn<Book>({
      id: "created_at",
      header: t("ui.books.columns.created_at") || "Created At",
      accessorKey: "created_at",
    }),
    createActionsColumn<Book>({
      id: "actions",
      header: t("ui.books.columns.actions") || "Actions",
      renderActions: (book) => (
        <>
          <Link href={`/books/${book.id}/edit?page=${currentPage}&perPage=${perPage}`}>
            <Button variant="outline" size="icon" title={t("ui.books.buttons.edit") || "Edit book"}>
              <PencilIcon className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteDialog
            id={book.id}
            onDelete={handleDeleteBook}
            title={t("ui.books.delete.title") || "Delete book"}
            description={t("ui.books.delete.description") || "Are you sure you want to delete this book? This action cannot be undone."}
            trigger={
              <Button variant="outline" size="icon" className="text-destructive hover:text-destructive" title={t("ui.users.buttons.delete") || "Delete user"}>
                <TrashIcon className="h-4 w-4" />
              </Button>
            }
          />
        </>
      ),
    }),
  ] as ColumnDef<Book>[]), [t, handleDeleteBook]);

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

                  <div className="space-y-4">
                      <FiltersTable
                          filters={
                              [
                                //   {
                                //     id: "author",
                                //     label: t('ui.books.filters.author') || 'Author',
                                //     type: "select",
                                //     options: authors.map((author) => ({
                                //         value: author.value,
                                //         label: author.label,
                                //       }))
                                //   },
                              ] as FilterConfig[]
                          }
                          onFilterChange={handleFilterChange}
                          initialValues={filters}
                      />
                  </div>

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
      </BookLayout>
  );
}