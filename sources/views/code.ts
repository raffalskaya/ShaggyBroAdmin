//-------------------------------------------------------------------------------------------------
// Страница с отправкой кода проверки
//-------------------------------------------------------------------------------------------------
import ShaggyBroAdminApp, { IAppState } from "sources/app";
import { JetView } from "webix-jet";

export default class CodeView extends JetView{
	private m_appState: IAppState;
    constructor(app: ShaggyBroAdminApp) {
		super(app, "");
		this.m_appState = app.getAppState();
	}
	config() {
		const ui = {
			cols:[
				{},
				{
					rows:[
						{},
						{
							view: "text",
							width: 400,
							name: "phone",
							localId: "codeInput",
							label: "Введите код подтверждения",
							labelPosition: "top",
							placeholder: "XXXXXX",
						},
						{
							view: "button",
							value: "Отправить",
							css: "webix_primary",
							click: () => {
								const codeInput = this.$$('codeInput') as webix.ui.text;
								const code = codeInput.getValue();
            
								fetch(this.m_appState.baseUrl + 'admin/auth/verify', {
									method: 'POST',
									headers: {
										'Content-Type': 'application/json',
									},
									body: JSON.stringify({ code: code, phone: this.m_appState.phoneNumber }),
								})
								.then(async (response) => {
									if (!response.ok) {
										const errorData = await response.text();
										throw new Error(errorData);
									}
									return response.json();
								})
								.then((data) => {
									console.log(data);
									this.show("/main");
								})
								.catch(error => {
									webix.message(`Ошибка: ${error.message}`, 'error');
								});
							}
						},
						{}
					]
				},
				{}
			]
			
		};
		return ui;
	}
}