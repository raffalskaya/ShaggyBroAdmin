//-------------------------------------------------------------------------------------------------
// Статистика
//-------------------------------------------------------------------------------------------------
import { JetView } from "webix-jet";

export default class StatisticView extends JetView{
    constructor(app) {
		super(app, "");
	}
	config() {
		const ui = {
            type: "space",
            margin: 5,
            padding: 5, 
			cols:[
				{
					template:"Страница для статистики"
				},
			]
			
		};
		return ui;
	}
}