/**Главная страница приложения */
import { JetView } from "webix-jet";
import ToolBar from "./toolbar";
import ShaggyBroAdminApp, { IAppState } from "sources/app";
import SideBar from "./sidebar";

export default class MainView extends JetView{
	private m_toolbar: ToolBar;
	private m_sidebar: SideBar;
	private m_appState: IAppState;
    constructor(app: ShaggyBroAdminApp) {
		super(app, "");
		this.m_toolbar = new ToolBar(app);
		this.m_sidebar = new SideBar(app);
		this.m_appState = app.getAppState();
	}
	public config(){
		const ui = {
			rows:[
				this.m_toolbar,
				{
					cols:[
						this.m_sidebar,
						{
							localId: "subviewPage",
							rows: [
								{
									$subview:true
								}
							]
						}
						
					]
				}
			]
		}
        return ui;
	}
    public init() {
		const subviewPage = this.$$("subviewPage");
        webix.extend(subviewPage, webix.ProgressBar);
		console.log(this.m_appState);
    }
	/** Показывает иконку ожидания */
	// private showProgress():void {
	// 	const subviewPage = this.$$("subviewPage");
    //     (subviewPage as any).showProgress({ type: "icon" });
    //     // (this.getRoot() as any).showProgress({ type: "icon" });
	// }
	/** Скрывает иконку ожидания */
	// private hideProgress():void {
	// 	const subviewPage = this.$$("subviewPage");
    //     (subviewPage as any).hideProgress();
    //     // (this.getRoot() as any).hideProgress();
	// }
}