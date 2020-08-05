class CommonWindowBg extends fgui.GComponent {

	tabBar: fgui.GList
	viewStack: TabView
	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		this.tabBar = this.getChild("tabBar") as fgui.GList
		this.viewStack = this.getChild("viewStack") as TabView

	}

}