import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { BookLayout } from '@/layouts/books/BookLayout';
import { BookForm } from '@/pages/books/components/BookForm';
import { Book } from 'lucide-react';

interface BookFormProps {
  initialData?: {
    id: string;
    title: string;
    author: string;
    editor: string;
    length: number;
    isbn: string;
    bookcase_id: number;
    genres: string;
    count_book?: number;
    count_loan_book?: number;
    avaiable?: boolean;
    zone_id?: number;
    floor_id?: number;
  };
  floors: {
    id: string;
    floor_number: number;
  }[];
  zones: {
    id: string;
    number: number;
    floor_id: string;
    genre_name: string;
  }[];
  bookcases: {
    id: string;
    number: number;
    books_count: number;
    capacity: number;
    zone_id: string;
  }[];
  genres: { value: string; label: string }[];
  page?: string;
  explosion?: string[];
  perPage?: string;
}

interface Genre {
  value: string;
  label?: string;
}

export default function CreateBook({initialData, genres, explosion, floors, zones, bookcases}:BookFormProps) {
    const { t } = useTranslations();

    return (
        <BookLayout title={t('ui.books.edit')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-100% m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1">
                                <Book color="#2762c2" />
                                {t('ui.books.cards.edit.title')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.books.cards.edit.description')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <BookForm initialData={initialData} genres={genres} explosion={explosion} floors={floors} zones={zones} bookcases={bookcases}/>
                    </CardContent>
                </Card>
            </div>
        </BookLayout>
    );
}