import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { useTranslations } from "@/hooks/use-translations";
import { useForm } from "@tanstack/react-form";
import { BoxIcon, Shield, UserCircleIcon, PackageOpen, FileText, Settings, Save, X } from "lucide-react";
import React, { useState } from "react";

const RoleForm = () => {
    const { t } = useTranslations();
    const queryClient = useQueryClient();
    const form = useForm(); // Assuming you are using some form state management.
    const [selectrole, setSelectrole] = useState<string>(""); // Cambié el tipo a string porque solo seleccionas una opción

    // Función para manejar el cambio de selección
    const cambioRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectrole(e.target.value);  // Actualiza el estado con la opción seleccionada
  };

  return (
    <form>
      {/* Permisos */}
      <div className="p-4 rounded-lg shadow">
        <div className="flex w-full gap-2">
          <Shield className="text-blue-500" />
          <h2 className="text-lg font-semibold">{t("ui.headerpermits.title")}</h2>
        </div>
        
        <select
          id="select"
          value={selectrole}
          onChange={cambioRole}  // Llama la función cambioRole al cambiar la selección
          className="w-full border p-2 rounded mt-1"
        >
            <option value="selectrolea">{t("ui.headerpermits.rol")}</option>
            <option value="admin">{t("ui.headerpermits.role1")}</option>
            <option value="viewer">{t("ui.headerpermits.role2")}</option>
            <option value="editor">{t("ui.headerpermits.role3")}</option>
        </select>
                <p className="text-gray-500 text-sm mt-2">{t("ui.headerpermits.string")}</p>
                <hr></hr>
                <br/>
                <div className="flex w-full gap-2">
                    <Shield className="text-blue-500"></Shield> 
                   <h3 className="text-lg font-">{t("ui.specificpermits.permits")}</h3> 
                </div>
                {(() => {
        if (selectrole === 'admin') {
          return(
                <h1>Bienvenido, Administrador!</h1>
                
            ); 
        } else if (selectrole === 'editor') {
          return <h1>Bienvenido, Visualizador!</h1>;
        } else if (selectrole === 'viewer') {
          return <h1>Bienvenido, Usuario!</h1>;
        } else {
          return <h1>Rol no reconocido</h1>;
        }
      })()}

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                    <div className="flex">
                        <UserCircleIcon className="text-blue-500 mr-1 mb-1"></UserCircleIcon>
                        {t("ui.specificpermits.users.user")}
                        </div>
                        <ul>
                            <li className="ml-2"><Label><Checkbox id="verusuario" className="border-blue-500" ></Checkbox><a className="ml-2">{t("ui.specificpermits.users.seeuser")}</a></Label></li>
                            <li className="ml-2"><Label><Checkbox id="crearusuario" style={{borderColor:"blue"}} className="text-blue-500" ></Checkbox><a className="ml-2">{t("ui.specificpermits.users.createusers")}</a></Label></li>
                            <li className="ml-2"><Label><Checkbox id="editarusuario" style={{borderColor:"blue"}} className="text-blue-500" ></Checkbox> <a className="ml-2">{t("ui.specificpermits.users.editusers")}</a></Label></li>
                            <li className="ml-2"><Label><Checkbox id="deleteusuario" style={{borderColor:"blue"}} className="" ></Checkbox> <a className="ml-2">{t("ui.specificpermits.users.deleteusers")}</a></Label></li>
                        </ul>
                    </div>
                    
                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                        <div className="flex">
                            <PackageOpen className="text-blue-500 mr-1 mb-1"></PackageOpen>
                            {t("ui.specificpermits.products.products")}
                        </div>
                        <ul>
                            <li className="ml-2"><Label><Checkbox id="verproductos" style={{borderColor:"blue"}} className="text-blue-500" ></Checkbox><a className="ml-2">{t("ui.specificpermits.products.seeproduct")}</a></Label></li>
                            <li className="ml-2"><Label><Checkbox id="crearproductos" style={{borderColor:"blue"}} className="text-blue-500" ></Checkbox><a className="ml-2">{t("ui.specificpermits.products.createproduct")}</a></Label></li>
                            <li className="ml-2"><Label><Checkbox id="editarproductos" style={{borderColor:"blue"}} className="text-blue-500" ></Checkbox><a className="ml-2">{t("ui.specificpermits.products.editproduct")}</a></Label></li>
                            <li className="ml-2"><Label><Checkbox id="borrarproductos" style={{borderColor:"blue"}} className="text-blue-500" ></Checkbox><a className="ml-2">{t("ui.specificpermits.products.deleteproducts")}</a></Label></li>
                        </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                        <div className="flex">
                            <FileText className="text-blue-500 mr-1 mb-1"></FileText>
                            {t("ui.specificpermits.reports.reports")}
                        </div>
                        <ul>
                            <li className="ml-2"><Label><Checkbox id="verreportes" style={{borderColor:"blue"}} className="accent-blue-500" ></Checkbox><a className="ml-2">{t("ui.specificpermits.reports.seereports")}</a></Label></li>
                            <li className="ml-2"><Label><Checkbox id="exportarreportes" style={{borderColor:"blue"}} className="accent-blue-500" ></Checkbox><a className="ml-2">{t("ui.specificpermits.reports.exportreport")}</a></Label></li>
                            <li className="ml-2"><Label><Checkbox id="imprimirreportes" style={{borderColor:"blue"}} className="accent-blue-500" ></Checkbox><a className="ml-2">{t("ui.specificpermits.reports.printreport")}</a></Label></li>
                        </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                        <div className="flex">
                            <Settings className="text-blue-500 mr-1 mb-1"></Settings>
                            {t("ui.specificpermits.configs.configs")}
                        </div>
                        <ul>
                            <li className="ml-2"><Label><Checkbox id="accederconfiguracion" style={{borderColor:"blue"}} className="accent-blue-500" ></Checkbox><a className="ml-2">{t("ui.specificpermits.configs.accesssettings")}</a></Label></li>
                            <li className="ml-2"><Label><Checkbox id="modificarconfiguracion" style={{borderColor:"blue"}} className="accent-blue-500" ></Checkbox><a className="ml-2">{t("ui.specificpermits.configs.modifysettings")}</a></Label></li>
                        </ul>
                    </div>
                </div>
            

            {/* Form Buttons */}
            <hr/>
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
