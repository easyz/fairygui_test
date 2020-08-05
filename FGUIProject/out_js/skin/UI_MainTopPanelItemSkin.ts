/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module skin {

	export class UI_MainTopPanelItemSkin extends fairygui.GComponent {
		public m_img:fairygui.GLoader;
		public m_numLab:fairygui.GTextField;
		public static URL:string = "ui://ff2brinwu9gkc";

		public static createInstance():UI_MainTopPanelItemSkin {
			return <UI_MainTopPanelItemSkin>(fairygui.UIPackage.createObject("skin", "MainTopPanelItemSkin"));
		}

		protected constructFromXML(xml:any):void {
			super.constructFromXML(xml);

			this.m_img = <fairygui.GLoader>(this.getChild("img"));
			this.m_numLab = <fairygui.GTextField>(this.getChild("numLab"));
		}
	}
}