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
        genre: string;
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
        books_count: number;
        capacity: number;
        zone_id: string;
    }[];
    genres: { value: string; label: string }[];
}

export default function CreateBook({genres, floors, zones, bookcases}:BookFormProps) {
    const { t } = useTranslations();

    return (
        <BookLayout title={t('ui.books.create')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-100% m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1">
                                <Book color="#2762c2" />
                                {t('ui.books.cards.create.title')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.books.cards.create.description')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <BookForm genres={genres} floors={floors} zones={zones} bookcases={bookcases}/>
                    </CardContent>
                </Card>
            </div>
        </BookLayout>
    );
}