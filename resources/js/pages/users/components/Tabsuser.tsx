import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/use-translations";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { UserForm } from "./UserForm";
import RoleForm from "./RoleForm";
import { User } from "lucide-react";

interface TabsuserEditProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
  page?: string;
  perPage?: string;
  permits?: string[];
  role?: string[];
}
interface TabsuserCreateProps {
  permits?: string[];
  role?: string[];
}

export function TabsuserEdit({ user, page, perPage, permits, role }: TabsuserEditProps) {
  const { t } = useTranslations();

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-100 overflow-auto">
      <Tabs defaultValue="account" className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg max-h-[90vh] overflow-auto">
        
        {/* Encabezado */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <User className="text-blue-500" size={30} />
            <Label className="text-2xl font-semibold ml-3">{t("ui.users.edit")}</Label>
          </div>
          <Label className="ml-3 text-gray-600">{t("ui.header.string")}</Label>
          <hr className="mt-3" />
        </div>

        {/* Lista de Tabs */}
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="account">{t("ui.header.tabtitle1")}</TabsTrigger>
          <TabsTrigger value="password">{t("ui.header.tabtitle2")}</TabsTrigger>
        </TabsList>

        {/* Contenido del Tab de Usuario */}
        <TabsContent value="account">
          <Card>
            <CardContent className="space-y-4">
              {/* Aquí pasamos el usuario correctamente */}
              <UserForm initialData={user} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contenido del Tab de Roles */}
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>{t("ui.headerpermits.passwordTitle")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 overflow-auto max-h-[70vh]">
              {/* Pasamos los permisos y roles correctamente */}
              <RoleForm initialData={user} permits={permits} role={role} />
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}

export function Tabsuser({permits,role}: TabsuserCreateProps) {
  const { t } = useTranslations();

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-100 ">
      <Tabs defaultValue="account" className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg max-h-[90vh] overflow-auto">
        {/* Encabezado */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <User className="text-blue-500" size={30} />
            <Label className="text-2xl font-semibold ml-3">{t("ui.header.titulo")}</Label>
          </div>
          <Label className="ml-3 text-gray-600">{t("ui.header.string")}</Label>
          <hr className="mt-3" />
        </div>

        {/* Tabs */}
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="account">{t("ui.header.tabtitle1")}</TabsTrigger>
          <TabsTrigger value="password">{t("ui.header.tabtitle2")}</TabsTrigger>
        </TabsList>

        {/* Contenido del Tab de Usuario */}
        <TabsContent value="account">
          <Card>
            <CardContent className="space-y-4">
              <UserForm />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contenido del Tab de Roles */}
        <TabsContent value="password">
          <Card>
            <CardContent className="space-y-4  ">
            <RoleForm permits={permits} role={role}/>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
