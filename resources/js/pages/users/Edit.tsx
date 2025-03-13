import { UserForm } from "@/pages/users/components/UserForm";
import { UserLayout } from "@/layouts/users/UserLayout";
import { PageProps } from "@inertiajs/core";
import { useTranslations } from "@/hooks/use-translations";
import { Tabsuser, TabsuserEdit } from "./components/Tabsuser";

interface EditUserProps extends PageProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
  page?: string;
  perPage?: string;
}

export default function EditUser({ user, page, perPage }: EditUserProps) {
  const { t } = useTranslations();

  return (
    <UserLayout title={t("ui.users.edit")}>
      <div className="p-6">
        <div className="max-w-xl">
          <TabsuserEdit
            user={user}
            page={page}
            perPage={perPage}
          />
        </div>
      </div>
    </UserLayout>
  );
}
