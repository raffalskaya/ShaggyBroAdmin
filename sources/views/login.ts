//-------------------------------------------------------------------------------------------------
// Страница входа
//-------------------------------------------------------------------------------------------------
import ShaggyBroAdminApp, { IAppState } from "sources/app";
import { JetView } from "webix-jet";
//79998293350
export default class LoginView extends JetView{
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
							localId: "phoneNumberInput",
							label: "Введите номер телефона",
							labelPosition: "top",
							placeholder: "7 (XXX) XXX-XX-XX",
						},
						{
							view: "button",
							value: "Отправить",
							css: "webix_primary",
							click: () => {
								const phoneNumberInput = this.$$('phoneNumberInput') as webix.ui.text;
								this.m_appState.phoneNumber = phoneNumberInput.getValue();
            
            					// Проверка номера телефона
								if (!this.m_appState.phoneNumber.match(/^\+?[0-9\s\-\(\)]{10,20}$/)) {
									webix.message('Пожалуйста, введите корректный номер телефона', 'error');
									return;
								}

								// Отправка номера телефона
								fetch(this.m_appState.baseUrl + 'admin/auth/send', {
									method: 'POST',
									headers: {
										'Content-Type': 'application/json',
									},
									body: JSON.stringify({ phone: this.m_appState.phoneNumber }),
								})
								.then(async (response) => {
									if (!response.ok) {
										const errorData = await response.text();
										throw new Error(errorData);
									}
									return response.json();
								})
								.then(() => {
									this.show("/code");
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