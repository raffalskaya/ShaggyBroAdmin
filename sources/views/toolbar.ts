//-------------------------------------------------------------------------------------------------
// Панель быстрого доступа для страницы приложения
//-------------------------------------------------------------------------------------------------
import ShaggyBroAdminApp from "sources/app";
import { JetView } from "webix-jet"
import ProfileMenuView from "./profile_menu";

export default class ToolBar extends JetView {
	// private m_appState: IAppState;
    private m_profileMenu: any;
    constructor(app: ShaggyBroAdminApp){
        super(app, "");
		// this.m_appState = app.getAppState();
    }
    public config() {
        const userMenuButton = {
            view:"button", 
            label: "Имя пользователя",
            type:"icon", 
            icon:"mdi mdi-account",
            localId: "userMenuButton", 
			autowidth:true,
            click: (_id, _event) => {
                const userMenuButton = this.$$('userMenuButton') as unknown as webix.ui.button;
                this.m_profileMenu.showMenu(userMenuButton.$view);
            }
        };

        const elements: Array<any> = [
            {
                view:"icon",
                icon:"mdi mdi-menu",
                tooltip: "Скрыть/показать боковое меню",
                click:() => this.app.callEvent("sidebar:toggle", [])
            },  
            { batch:"default" }
        ];
        elements.push(userMenuButton);
        const toolbar = {
            view: "toolbar",
            localId: "toolbar",
            css: "webix_dark",
            height: 35,
            elements: elements
        };
        return toolbar;
    }
    public init() {
        this.m_profileMenu = this.ui(ProfileMenuView);
    }
}