class RoleWin extends BaseView {
	public static VIEW_ID = ViewId.RoleWin

	public static GetChildView() {
		let list: any[] = [
			RoleInfoPanel,
			// RoleTransmigrationPanel,
			DressWin,
			// SszbEquipPanel, // SszbWin,
			// QiMenWin,
		]
		return list;
	}
	
	public InitSkin() {
		this.SetSkinName("skin", "PanelSkin")
	}

	// InitUI() {
	// 	this.skinName = UIHelper.PANEL_ROLE
	// }

	// public GetGuideTarget(id: number) {
	// 	if (id <= 3) {
	// 		return this.subRoleSel && this.subRoleSel.GetBtnIndex(id - 1)
	// 	}
	// 	return BaseEuiView.GetGuideTarget(this, id)
	// }
}
ViewMgr.DefWin(RoleWin, LayerType.UI_Main)