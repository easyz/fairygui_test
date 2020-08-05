/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module skin {

	export class UI_ItemIconSkin extends fairygui.GComponent {
		public m_imgBg:fairygui.GLoader;
		public m_imgIcon:fairygui.GLoader;
		public static URL:string = "ui://ff2brinwdbv0m";

		public static createInstance():UI_ItemIconSkin {
			return <UI_ItemIconSkin>(fairygui.UIPackage.createObject("skin", "ItemIconSkin"));
		}

		protected constructFromXML(xml:any):void {
			super.constructFromXML(xml);

			this.m_imgBg = <fairygui.GLoader>(this.getChild("imgBg"));
			this.m_imgIcon = <fairygui.GLoader>(this.getChild("imgIcon"));
		}
	}
}