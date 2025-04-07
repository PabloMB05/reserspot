import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { BookLayout } from '@/layouts/books/BookLayout';
import { BookForm } from '@/pages/books/components/BookForm';
import { Book } from 'lucide-react';

interface BookFormProps {
    book: {
        id: string;
        title: string;
        author: string;
        editor: string;
        length: number;
        genre: string;
        bookcase_id: string;
    };
    floors: {
        id: string;
        floor_number: number;
    }[];
    zones: {
        id: string;
        number: number;
        genre_name: string;
        floor_id: string;
    }[];
    
    bookcases: {
        id: string;
        number: number;
        capacity: number;
        books_count: number;
        zone_id: string;
    }[];
    explosion: string[];
    genres: { value: string; label: string }[];
    imgPreviaUrl: string;
}

export default function CreateBook({book, genres, explosion, floors, zones, bookcases, imgPreviaUrl}:BookFormProps) {
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
                        <BookForm initialData={book} genres={genres} explosion={explosion} floors={floors} zones={zones} bookcases={bookcases} imgPreviaUrl={imgPreviaUrl}/>
                    </CardContent>
                </Card>
            </div>
        </BookLayout>
    );
}