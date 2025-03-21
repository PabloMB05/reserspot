import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { useTranslations } from "@/hooks/use-translations";
import { useForm } from "@tanstack/react-form";
import { BoxIcon, Shield, UserCircleIcon, PackageOpen, FileText, Settings, Save, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Value } from "@radix-ui/react-select";
interface CreateRoleForm {
  initialData?: {
    id: string;
    name: string;
    email: string;
  };
  permits?: string[];
  role?: string[];
}

export function RoleForm({  permits, role }: CreateRoleForm) {

  const { t } = useTranslations();
  const form = useForm();
  const [selectrole, setSelectrole] = useState<string>("");
  let [permisos, setPermisos] = useState<string[]>([]); // Empty array to start with

 function ponerrol(value: string) {
    permisos=[];
    setSelectrole(value);
    
    permits?.forEach(array => {
      if (array[0].includes(selectrole)) {
        permisos=[...permisos, array[1]];
        setPermisos(permisos);
      }
    });
  }

  function seleccionarcheckbox(permiso:string){
    if(permisos.includes(permiso)){
      permisos = permisos.filter(element=> element !== permiso);
      setPermisos(permisos);
    } else {
      permisos=[...permisos, permiso];
      setPermisos(permisos);
    }
    console.log(permisos);
  }
  
  useEffect(() => {
    if (selectrole) {
      ponerrol(selectrole);
    }
  }, [selectrole]); // Se ejecuta cuando `selectrole` cambia
  

  // Enviar formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    
    
    console.log("Permisos asignados:", permisos);
    // console.log(role);
    form.handleSubmit();
    
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Permisos */}
      <div className="p-4 rounded-lg shadow">
        <div className="flex w-full gap-2">
          <Shield className="text-blue-500" />
          <h2 className="text-lg font-semibold">{t("ui.headerpermits.title")}</h2>
        </div>

      <form.Field name="selectrole"
        children={(Field) => (
          <select
          id="select"
          
          onChange={(e) => {
            const roleselect = e.target.value;
            setSelectrole(roleselect); // Actualiza el estado con el nuevo valor
          }}   
                
          value={selectrole}
          className="w-full border p-2 rounded mt-1"
        >
          <option value="">{t("ui.headerpermits.rol")}</option>
          <option value="admin">{t("ui.headerpermits.role1")}</option>
          <option value="visualizer">{t("ui.headerpermits.role2")}</option>
          <option value="Editor">{t("ui.headerpermits.role3")}</option>
        </select>
      )}>
      </form.Field>


        <p className="text-gray-500 text-sm mt-2">{t("ui.headerpermits.string")}</p>
        <hr />
        <br />
        <div className="flex w-full gap-2">
          <Shield className="text-blue-500"></Shield>
          <h3 className="text-lg font-">{t("ui.specificpermits.permits")}</h3>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {/* Sección de usuarios */}
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <div className="flex">
              <UserCircleIcon className="text-blue-500 mr-1 mb-1"></UserCircleIcon>
              {t("ui.specificpermits.users.user")}
            </div>
            <ul>

              <form.Field
                name="verusuarios"
                children={(field) => (
                  <li className="ml-2">
                    <Label>
                      <Checkbox
                        id="verusuario"
                        checked={permisos.includes("users.view")}
                        onCheckedChange={(e)=>seleccionarcheckbox("users.view")} 
                      /> 
                      <span className="ml-2">{t("ui.specificpermits.users.seeuser")}</span>
                    </Label>
                  </li>
                )}
              />
              

              <form.Field name="crearusuario"
                children={(Field) => (
                  <li className="ml-2">
                    <Label>
                      <Checkbox id="crearusuario"
                      checked={permisos.includes("users.create")}
                      onCheckedChange={(e)=>seleccionarcheckbox("users.create")} 
                      ></Checkbox>
                      <a className="ml-2">{t("ui.specificpermits.users.createusers")}</a>
                    </Label>
                  </li>
                )} />

              <form.Field name="editarusuario"
                children={(Field) => (
                  <li className="ml-2">
                    <Label>
                      <Checkbox id="editarusuario"
                      checked={permisos.includes("users.edit")}
                      onCheckedChange={(e)=>seleccionarcheckbox("users.edit")} 
                      ></Checkbox>
                      <a className="ml-2">{t("ui.specificpermits.users.editusers")}</a>
                    </Label>
                  </li>
                )} />

              <form.Field name="deleteusuario"
                children={(Field) => (
                  <li className="ml-2">
                    <Label>
                      <Checkbox id="deleteusuario"
                      checked={permisos.includes("users.delete")}
                      onCheckedChange={(e)=>seleccionarcheckbox("users.delete")} 
                      ></Checkbox>
                      <a className="ml-2">{t("ui.specificpermits.users.deleteusers")}</a>
                    </Label>
                  </li>
                )} />
            </ul>
          </div>

          {/* Sección de productos */}
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <div className="flex">
              <PackageOpen className="text-blue-500 mr-1 mb-1"></PackageOpen>
              {t("ui.specificpermits.products.products")}
            </div>
            <ul>
              <form.Field name="verproductos"
                children={(Field) => (
                  <li className="ml-2">
                    <Label>
                      <Checkbox id="verproductos"
                        checked={permisos.includes("products.view")}
                        onCheckedChange={(e)=>seleccionarcheckbox("products.view")} 
                      ></Checkbox>
                      <a className="ml-2">{t("ui.specificpermits.products.seeproduct")}</a>
                    </Label>
                  </li>
                )} />

              <form.Field name="crearproductos"
                children={(Field) => (
                  <li className="ml-2">
                    <Label>
                      <Checkbox id="crearproductos"
                        checked={permisos.includes("products.create")}
                        onCheckedChange={(e)=>seleccionarcheckbox("products.create")}
                      ></Checkbox>
                      <a className="ml-2">{t("ui.specificpermits.products.createproduct")}</a>
                    </Label>
                  </li>
                )} />

              <form.Field name="editarproductos"
                children={(Field) => (
                  <li className="ml-2">
                    <Label>
                      <Checkbox id="editarproductos" 
                        checked={permisos.includes("products.edit")}
                        onCheckedChange={(e)=>seleccionarcheckbox("products.edit")}
                      ></Checkbox>
                      <a className="ml-2">{t("ui.specificpermits.products.editproduct")}</a>
                    </Label>
                  </li>
                )} />

              <form.Field name="borrarproductos"
                children={(Field) => (
                  <li className="ml-2">
                    <Label>
                      <Checkbox id="borrarproductos"
                        checked={permisos.includes("products.delete")}
                        onCheckedChange={(e)=>seleccionarcheckbox("products.delete")}
                      ></Checkbox>
                      <a className="ml-2">{t("ui.specificpermits.products.deleteproducts")}</a>
                    </Label>
                  </li>
                )} />
            </ul>
          </div>

          {/* Sección de reportes */}
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <div className="flex">
              <FileText className="text-blue-500 mr-1 mb-1"></FileText>
              {t("ui.specificpermits.reports.reports")}
            </div>
            <ul>
              <form.Field name="verreportes"
                children={(Field) => (
                  <li className="ml-2">
                    <Label>
                      <Checkbox id="verreportes"
                        checked={permisos.includes("reports.view")}
                        onCheckedChange={(e)=>seleccionarcheckbox("reports.view")}
                      ></Checkbox>
                      <a className="ml-2">{t("ui.specificpermits.reports.seereports")}</a>
                    </Label>
                  </li>
                )}></form.Field>

              <form.Field name="exportarreportes"
                children={(Field) => (
                  <li className="ml-2">
                    <Label>
                      <Checkbox id="exportarreportes"
                        checked={permisos.includes("reports.export")}
                        onCheckedChange={(e)=>seleccionarcheckbox("reports.export")}
                      ></Checkbox>
                      <a className="ml-2">{t("ui.specificpermits.reports.exportreport")}</a>
                    </Label>
                  </li>)}></form.Field>

              <form.Field name="imprimirreportes"
                children={(Field) => (
                  <li className="ml-2">
                    <Label>
                      <Checkbox id="imprimirreportes"
                        checked={permisos.includes("reports.print")}
                        onCheckedChange={(e)=>seleccionarcheckbox("reports.print")}
                      ></Checkbox>
                      <a className="ml-2">{t("ui.specificpermits.reports.printreport")}</a>
                    </Label>
                  </li>
                )}></form.Field>
            </ul>
          </div>

          {/* Sección de configuraciones */}
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <div className="flex">
              <Settings className="text-blue-500 mr-1 mb-1"></Settings>
              {t("ui.specificpermits.configs.configs")}
            </div>
            <ul>
              <form.Field name="accederconfiguracion"
                children={(Field) => (
                  <li className="ml-2">
                    <Label>
                      <Checkbox id="accederconfiguracion"
                        checked={permisos.includes("settings.access")}
                        onCheckedChange={(e)=>seleccionarcheckbox("settings.access")}
                      ></Checkbox>
                      <a className="ml-2">{t("ui.specificpermits.configs.accesssettings")}</a>
                    </Label>
                  </li>
                )}></form.Field>
              <form.Field name="modificarconfiguracion"
                children={(Field) => (
                  <li className="ml-2">
                    <Label>
                      <Checkbox id="modificarconfiguracion"
                        checked={permisos.includes("settings.modify")}
                        onCheckedChange={(e)=>seleccionarcheckbox("settings.modify")}
                      ></Checkbox>
                      <a className="ml-2">{t("ui.specificpermits.configs.modifysettings")}</a>
                    </Label>
                  </li>
                )}></form.Field>
            </ul>
          </div>
        </div>

        {/* Form Buttons */}
        <hr />
        <div className="flex justify-between w-full gap-4 mt-4">
          <Button type="button" variant="outline" onClick={() => router.visit("/users")}>
            <X size={20} />
            {t("ui.users.buttons.cancel")}
          </Button>
          <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) => (
              <Button className="bg-blue-500 text-white" type="submit" disabled={!canSubmit}>
                <Save size={20} />
                {isSubmitting ? t("ui.users.buttons.saving") : t("ui.users.buttons.save")}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </div>
    </form>

  );

};

export default RoleForm;
