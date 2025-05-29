//-------------------------------------------------------------------------------------------------
// Боковая панель для страницы приложения
//-------------------------------------------------------------------------------------------------
import { JetView, plugins } from "webix-jet"
import { IJetURL } from "webix-jet/dist/types/interfaces";
import ShaggyBroAdminApp from "sources/app";

export default class SideBar extends JetView {
	// private m_appState: IAppState;
    constructor(app: ShaggyBroAdminApp){
        super(app, "");
		// this.m_appState = app.getAppState();
    }
    public config() {
        const sidebar = {
            view: "sidebar",
            css: "webix_dark",
            localId: "sidebar",
            minWidth: 40,
            width: 190,
            multipleOpen: true,
            data: [
                {
                    id: "statistic", 
                    icon: "mdi mdi-view-dashboard", 
                    value: "Статистика"
                }
            ] 
        };
        return sidebar;
    }
    public init(sidebar: webix.ui.sidebar, _$: IJetURL) {
        this.use(plugins.Menu,this.$$("sidebar"));
		this.on(this.app,"sidebar:toggle",() => {
            sidebar.toggle();
            const state: webix.WebixTreeState = sidebar.getState();
            console.log(state);
        });

        sidebar.select("statistic");
    }
}