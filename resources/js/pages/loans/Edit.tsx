import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/hooks/use-translations';
import { LoanLayout } from '@/layouts/loans/LoanLayout';
import { Layers } from 'lucide-react';
import { LoanForm } from './components/LoanForm';

interface EditLoanProps {
  loan: {
    id: string;
    user_email: string;
    book_isbn: string;
    due_date: string | Date;
  };
  page?: string;
  perPage?: string;
  user_email: string;  // Cambiado de email a user_email
    book_isbn: string;  // Cambiado de isbn a book_isbn
}


export default function EditLoan({ loan,book_isbn,user_email, page, perPage }: EditLoanProps) {
  const { t } = useTranslations();
  console.log(loan)
  return (
    <LoanLayout title={t('Editar préstamo')}>
      <Card>
        <CardHeader>
          <CardTitle>
            <Layers className="inline-block w-5 h-5 mr-2" />
            {t('Editar préstamo')}
          </CardTitle>
          <CardDescription>{t('Modifica los datos del préstamo.')}</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <LoanForm loan={loan} book_isbn={book_isbn} user_email={user_email} page={page} perPage={perPage} />
        </CardContent>
      </Card>
    </LoanLayout>
  );
}
