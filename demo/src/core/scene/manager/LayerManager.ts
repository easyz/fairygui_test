enum LayerType {
	UI_Main,
}

class LayerManager {
	public static TOP_LAYER = "__TOP_LAYER__"

	public static readonly MAX_H = 1440
	
    public static Game_Main = new egret.DisplayObjectContainer();
    // public static UI_Main = new fgui.GComponent();

    private static m_Init = false

    public static Init(): void {
        if (this.m_Init) {
            return
        }
		this.m_Init = true
		LayerManager.Game_Main.touchEnabled = false

		let stage = egret.MainContext.instance.stage
		
		stage.addChildAt(LayerManager.Game_Main, 0);
		// stage.addChild(LayerManager.UI_Main.displayObject);
		stage.addChild(fgui.GRoot.inst.displayObject);

		this._SetType1(fgui.GRoot.inst)
	}

	private static _SetType1(group: fgui.GComponent): void {
        group[LayerManager.TOP_LAYER] = true
    }

	static GetRootType(layerType: LayerType): fgui.GComponent {
		return fgui.GRoot.inst
		// return LayerManager.UI_Main
    }
}