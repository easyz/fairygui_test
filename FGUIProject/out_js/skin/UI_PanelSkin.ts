/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module skin {

	export class UI_PanelSkin extends fairygui.GComponent {
		public m_viewStack:fairygui.GComponent;
		public m_btnReturn:fairygui.GButton;
		public m_tabBar:fairygui.GList;
		public static URL:string = "ui://ff2brinwl3mee";

		public static createInstance():UI_PanelSkin {
			return <UI_PanelSkin>(fairygui.UIPackage.createObject("skin", "PanelSkin"));
		}

		protected constructFromXML(xml:any):void {
			super.constructFromXML(xml);

			this.m_viewStack = <fairygui.GComponent>(this.getChild("viewStack"));
			this.m_btnReturn = <fairygui.GButton>(this.getChild("btnReturn"));
			this.m_tabBar = <fairygui.GList>(this.getChild("tabBar"));
		}
	}
}