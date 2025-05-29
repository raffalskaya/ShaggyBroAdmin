import ShaggyBroAdminApp from "sources/app";
import { JetView } from "webix-jet";

export default class ProfileMenuView extends JetView {
	// private m_appState: IAppState;
    constructor(app: ShaggyBroAdminApp){
        super(app, "");
		// this.m_appState = app.getAppState();
    }
	config(){
		return {
			view:"popup",
			body:{
				view:"list",
				localId:"menu",
				autoheight:true,
				width:150,
				borderless:true,
				data:[
					{ id:"profile", value:"Профиль", icon:"mdi mdi-emoticon-cool-outline" },
					{ id:"logout", value:"Выход", icon:"mdi mdi-logout" }
				],
				on:{
					onItemClick:id => {
						if (id === "profile"){
							this.webix.message("Нажат профиль")
                        }
						if (id === "logout"){
							this.webix.message("Нажат выход")
                        }
					}
				}
			}
		};
	}
	public showMenu(pos){
		(this.getRoot() as any).show(pos);
	}
}