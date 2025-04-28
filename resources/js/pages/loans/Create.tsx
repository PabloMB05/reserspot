import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { LoanLayout } from '@/layouts/loans/LoanLayout';
import { Book, Layers } from 'lucide-react';
import { LoanForm } from './components/LoanForm';
import { usePage } from '@inertiajs/react';

interface LoanFormProps {
    initialData?: {
        book_id: string;
        email: string;

    },
    lang: string;
    emailList: string[];

}

export default function CreateLoan({lang, emailList}:LoanFormProps) {
    const { t } = useTranslations();

    const paramsString = window.location.search;
    const searchParams = new URLSearchParams(paramsString);
    const book_id = searchParams.get("bookID");

    return (
        <LoanLayout title={t('ui.loans.create')}>
            <div className="flex max-w-screen items-center self-center">
                <Card className="w-100% m-4 p-4 shadow-lg dark:shadow-xs dark:shadow-white">
                    <CardHeader>
                        <CardTitle>
                            <div className="flex items-center gap-1">
                                <Layers color="#2762c2" />
                                {t('ui.loans.cards.create.title')}
                            </div>
                        </CardTitle>
                        <CardDescription>{t('ui.loans.cards.create.description')}</CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent>
                        <LoanForm emailList={emailList} bookIDButton={book_id} lang={lang}/>
                    </CardContent>
                </Card>
            </div>
        </LoanLayout>
    );
}