class CommonWindowBg extends fgui.GComponent {

	tabBar: fgui.GList
	viewStack: TabView
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		this.tabBar = this.getChild("tabBar") as fgui.GList
		this.viewStack = this.getChild("viewStack") as TabView

	}
}

// class WindowTabBarItem {

// 	public constructor() {
// 	}
	
// 	public itemRenderer(index: number, obj: fgui.GComponent) {
// 		if (!obj["INIT_KEY"]) {
// 			obj["INIT_KEY"] = true
// 			obj["m_Icon"] = obj.getChild("icon")
// 		}

// 		(<fgui.GLoader>obj["m_Icon"]).icon = fgui.UIPackage.getItemURL("atlas_ui", "ui_tyzy_yq_zb");// "ui_tyzy_yq_zb"
// 	}
// }