import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { useTranslations } from "@/hooks/use-translations";
import { useForm } from "@tanstack/react-form";
import { BoxIcon, Shield, UserCircleIcon, PackageOpen, FileText, Settings, Save, X } from "lucide-react";

const RoleForm = () => {
    const { t } = useTranslations();
    const queryClient = useQueryClient();
    const form = useForm(); // Assuming you are using some form state management.

    return (
        <form>
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">          

            {/* Permisos */}
            <div className="bg-gray-100 p-4 rounded-lg shadow">
                <div className="flex w-full gap-2">
                    <Shield></Shield> 
                    <h2 className="text-lg font-semibold">{t("ui.headerpermits.title")}</h2>
                </div>
                
                <select className="w-full border p-2 rounded mt-1">
                    <option value="">{t("ui.headerpermits.rol")}</option>
                    <option value="admin">{t("ui.headerpermits.role1")}</option>
                    <option value="editor">{t("ui.headerpermits.role2")}</option>
                    <option value="viewer">{t("ui.headerpermits.role3")}</option>
                </select>
                <p className="text-gray-500 text-sm mt-2">{t("ui.headerpermits.string")}</p>
                <hr></hr>
                <br/>
                <div className="flex w-full gap-2">
                    <Shield className="text-blue-500"></Shield> 
                   <h3 className="text-lg font-">{t("ui.specificpermits.permits")}</h3> 
                </div>
                

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex">
                        <UserCircleIcon className="text-blue-500 mr-1 mb-1"></UserCircleIcon>
                        {t("ui.specificpermits.users.user")}
                        </div>
                        <ul>
                            <li className="ml-2"><Label><input className="text-blue-500" type="checkbox"></input><a className="ml-2">{t("ui.specificpermits.users.seeuser")}</a></Label></li>
                            <li className="ml-2"><Label><input className="text-blue-500" type="checkbox"></input><a className="ml-2">{t("ui.specificpermits.users.createusers")}</a></Label></li>
                            <li className="ml-2"><Label><input className="text-blue-500" type="checkbox"></input> <a className="ml-2">{t("ui.specificpermits.users.editusers")}</a></Label></li>
                            <li className="ml-2"><Label><input className="text-blue-500" type="checkbox"></input> <a className="ml-2">{t("ui.specificpermits.users.deleteusers")}</a></Label></li>
                        </ul>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="flex">
                            <PackageOpen className="text-blue-500 mr-1 mb-1"></PackageOpen>
                            {t("ui.specificpermits.products.products")}
                        </div>
                        <ul>
                            <li className="ml-2"><Label><input className="text-blue-500" type="checkbox"></input><a className="ml-2">{t("ui.specificpermits.products.seeproduct")}</a></Label></li>
                            <li className="ml-2"><Label><input className="text-blue-500" type="checkbox"></input><a className="ml-2">{t("ui.specificpermits.products.createproduct")}</a></Label></li>
                            <li className="ml-2"><Label><input className="text-blue-500" type="checkbox"></input><a className="ml-2">{t("ui.specificpermits.products.editproduct")}</a></Label></li>
                            <li className="ml-2"><Label><input className="text-blue-500" type="checkbox"></input><a className="ml-2">{t("ui.specificpermits.products.deleteproducts")}</a></Label></li>
                        </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="flex">
                            <FileText className="text-blue-500 mr-1 mb-1"></FileText>
                            {t("ui.specificpermits.reports.reports")}
                        </div>
                        <ul>
                            <li className="ml-2"><Label><input className="accent-blue-500" type="checkbox"></input><a className="ml-2">{t("ui.specificpermits.reports.seereports")}</a></Label></li>
                            <li className="ml-2"><Label><input className="accent-blue-500" type="checkbox"></input><a className="ml-2">{t("ui.specificpermits.reports.exportreport")}</a></Label></li>
                            <li className="ml-2"><Label><input className="accent-blue-500" type="checkbox"></input><a className="ml-2">{t("ui.specificpermits.reports.printreport")}</a></Label></li>
                        </ul>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="flex">
                            <Settings className="text-blue-500 mr-1 mb-1"></Settings>
                            {t("ui.specificpermits.configs.configs")}
                        </div>
                        <ul>
                            <li className="ml-2"><Label><input className="accent-blue-500" type="checkbox"></input><a className="ml-2">{t("ui.specificpermits.configs.accesssettings")}</a></Label></li>
                            <li className="ml-2"><Label><input className="accent-blue-500" type="checkbox"></input><a className="ml-2">{t("ui.specificpermits.configs.modifysettings")}</a></Label></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Form Buttons */}
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
