/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

module skin {

	export class UI_hpbarSkin extends fairygui.GProgressBar {
		public m_hpbar:fairygui.GImage;
		public m_mpbar:fairygui.GImage;
		public static URL:string = "ui://ff2brinwjofl0";

		public static createInstance():UI_hpbarSkin {
			return <UI_hpbarSkin>(fairygui.UIPackage.createObject("skin", "hpbarSkin"));
		}

		protected constructFromXML(xml:any):void {
			super.constructFromXML(xml);

			this.m_hpbar = <fairygui.GImage>(this.getChild("hpbar"));
			this.m_mpbar = <fairygui.GImage>(this.getChild("mpbar"));
		}
	}
}