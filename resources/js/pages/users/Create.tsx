import { UserForm } from "@/pages/users/components/UserForm";
import { UserLayout } from "@/layouts/users/UserLayout";
import { useTranslations } from "@/hooks/use-translations";

import RoleForm from '@/pages/users/components/RoleForm';
import { Tabsuser } from "./components/Tabsuser";

export default function CreateUser() {
  const { t } = useTranslations();

  return (
    <UserLayout title={t("ui.users.create")}>
      <div className="p-6">
        <div className="max-w-xl">
          <UserForm />
          <RoleForm></RoleForm>
          <Tabsuser></Tabsuser>
        </div>
      </div>
    </UserLayout>
  );

};

