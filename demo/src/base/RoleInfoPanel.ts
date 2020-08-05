class RoleInfoPanel extends BaseView {

	public static ICON_NAME = "ui_tyzy_yq_zb"
	
	public InitSkin() {
		this.SetSkinName("skin", "RoleInfoSkin")
	}

	public OnInit() {
		console.log(this.skin)
	}

	public OnOpen() {
		// var list: fgui.GList = this.skin.getChild("list").asList;
		// list.addEventListener(fgui.ItemEvent.CLICK, this.onClickItem, this);
		// list.itemRenderer = this.renderListItem;
		// list.callbackThisObj = this;
		// list.setVirtual();
		// list.numItems = 45;
	}

	private renderListItem(index: number, obj: fgui.GObject): void {
		obj.icon = "resource/assets/Icons/i" + Math.floor(Math.random() * 10) + ".png";
		obj.text = "" + Math.floor(Math.random() * 100);
	}

	private onClickItem(evt: fgui.ItemEvent): void {
		console.log(evt)
	}
}