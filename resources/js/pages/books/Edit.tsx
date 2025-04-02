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
        genre: string;
    };
    authors: {label: string, value:string}[],
}

export default function CreateBook({book, authors}:BookFormProps) {
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
                        <BookForm  initialData={book} authors={authors}/>
                    </CardContent>
                </Card>
            </div>
        </BookLayout>
    );
}