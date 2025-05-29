import { JetApp, EmptyRouter } from "webix-jet";
import { createState } from "jet-restate";
import "./styles/app.css";
import { IBaseView, IJetView, IRoute, ISubView } from "webix-jet/dist/types/interfaces";

export interface IAppState{
    baseUrl: string,
    phoneNumber?: string
};

export default class ShaggyBroAdminApp extends JetApp {
	private m_appState: IAppState;
    constructor(){
        let defaults = {
            id		: "ShaggyBroAdminApp",
            name    : "ShaggyBroAdminApp",
            version	: "1.0",
			debug	: true,
			router	: EmptyRouter,
            start	: "/main"
        };
        super({ ...defaults });

        
        const state: IAppState = {
           baseUrl: "http://45.10.41.142:8080/"
        };
        this.m_appState = createState(state);
    }
    public getAppState(): IAppState {
        return this.m_appState;
    }
    private getAccessToken() {
        return localStorage.getItem('accessToken');
    }
    private getRefreshToken() {
        return localStorage.getItem('refreshToken');
    }
    private clearTokens() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }
    private isTokenExpired(token) {
        if (!token) return true;
    
        const payload = JSON.parse(atob(token.split('.')[1]));
        const now = Math.floor(Date.now() / 1000);
    
        return payload.exp < now;
    }
    private saveTokens(accessToken, refreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    }
    private async refreshTokens(refreshToken) {
        const response = await fetch('/api/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken })
        });
    
        if (!response.ok) {
            throw new Error('Token refresh failed');
        }
    
        return await response.json();
    }
    private async checkAuth() {
        const accessToken = this.getAccessToken();
        const refreshToken = this.getRefreshToken();
    
        if (!accessToken && !refreshToken) {
            // Токены отсутствуют, требуется авторизация
            return false;
        }
    
        if (this.isTokenExpired(accessToken)) {
            try {
                // Попытка обновить токен
                const newTokens = await this.refreshTokens(refreshToken);
                this.saveTokens(newTokens.accessToken, newTokens.refreshToken);
            } catch (error) {
                // Обновление не удалось, требуется новая авторизация
                this.clearTokens();
                return false;
            }
        }
    
        // Токен действителен или успешно обновлен
        return true;
    }
    public async render(root?: string | HTMLElement | ISubView | undefined, url?: string | IRoute | undefined, parent?: IJetView | undefined): Promise<IBaseView> {
        if (await this.checkAuth() == false){
            this.config.start = "/login";
        }
        return super.render(root, url, parent);
    }
}

// Данный код необходим, если содание приложения происходит не из ядра
webix.ready(async () => {
    const app = new ShaggyBroAdminApp();
    app.attachEvent("app:error:resolve", function (name, error) {
        (webix as any).message({
            expire: 10000,
            text: name.toString()
        });
        window.console.error(error);
    });
    app.render();
});