enum ViewId { }
enum TagType { }
enum DeblockingType { }
class Deblocking {
	static IsShow(dtype: any, arg1: boolean) {
		return true
	}
	static IsDeblocking(dtype: any) {
		return true
	}
}

interface TabSkin extends fgui.GComponent {
	tabBar: fgui.GList
	viewStack: TabView
	commonWindow: CommonWindowBg
}

abstract class BaseView extends fgui.GComponent {
	OnOpenIndex(m_OldIndex: number) {
	}

	public static LAYER_TYPE
	public static GetDeblockingType


	private static EMPTY = {}
	// private static RES_PATH = "resource/assets/atlas_ui/"
	// public static RES_PATH = "resource/assets/UI/"
	// public static RES_PATH_EXT = ".fui"

	private static LOAD_SRC = 1 << 0
	private static LOAD_SKIN = 1 << 1

	private _uiSources?: Array<fgui.IUISource>;
	protected _openData: { param: any, clsArr: any[], code?: string }

	public skin: TabSkin//fgui.GComponent
	// protected tabSkin: TabSkin

	private _modal: boolean;

	private _inited: number = 0
	private _loading: number
	private _isOpen: boolean

	protected _requestingCmd: number = 0;

	private _packName: string
	private _skinName: string

	protected _parentNode: fgui.GComponent

	protected m_TabBar: BaseView.TabBar;
	static M_VIEWS = []

	public Init(parent: fgui.GComponent) {
		if (this._inited) {
			return
		}
		this._parentNode = parent
		this._inited = 1
		if (this._uiSources && this._uiSources.length > 0) {
			for (let lib of this._uiSources) {
				if (!lib.loaded) {
					lib.load(this._UILoadComplete, this);
					this._loading = (this._loading || 0) | BaseView.LOAD_SRC
				}
			}
		}
		this.InitSkin()
		this._Init()
	}

	// 处理皮肤
	public InitSkin() {
		console.error("[ERROR] HandleSkin")
	}

	protected SetSkinName(packName: string, skinName: string) {
		this._packName = packName
		this._skinName = skinName

		let pack = fgui.UIPackage.getByName(packName)
		if (!pack) {
			this._loading = (this._loading || 0) | BaseView.LOAD_SKIN
			GG.ViewMgr.LoadPack(packName, fgui.Handler.create(this, this._LoadSkin));
		}
	}

	private _LoadSkin(packName: string) {
		if (packName != this._packName) {
			return
		}
		this._loading = (this._loading || 0) & ~BaseView.LOAD_SKIN
		this._Init()
	}

	public ApplyOpenData(param: any, clsArr: any[]): any {
		if (this._openData) {
			this._openData.param = param
			this._openData.clsArr = clsArr
		} else {
			this._openData = {
				param: param,
				clsArr: clsArr,
			}
		}
		this._openData.code = (param ? param.toString() : "") + (clsArr ? clsArr.toString() : "");
	}

	private _UILoadComplete(): void {
		for (let lib of this._uiSources) {
			if (!lib.loaded) {
				return
			}
		}
		this._loading = (this._loading || 0) & ~BaseView.LOAD_SRC
		this._Init();
	}


	private _Init(): void {
		if (this._loading > 0) {
			return
		}
		GG.ViewMgr.AddTo(this._parentNode, this)
		if (this._inited == 1) {
			this._inited = 2
			this.SetContentSkin(fgui.UIPackage.createObject(this._packName, this._skinName).asCom)
			this.OnInit();
		}

		this.DoOpen()
	}

	public DoOpen() {
		let param = BaseView.EMPTY
		let clsArr: any[] = null
		if (this._openData) {
			param = this._openData.param || BaseView.EMPTY
			clsArr = this._openData.clsArr
		}
		let updateBarList = false
		if (this.skin.tabBar) {
			if (!this.m_TabBar) {
				this.m_TabBar = new BaseView.TabBar
				this.m_TabBar.Init(this, this.skin.viewStack, this.skin.tabBar);
			} else {
				updateBarList = true
			}
		}
		if (!this._isOpen) {
			if (this.m_TabBar) {
				// if (updateBarList) {
				// 	this.viewStack.UpdateListShow()
				// }
				this.m_TabBar.OnAdded();
			}
			this._isOpen = true
			this.OnOpen.call(this, param);
		}
		this.OnResume.call(this, param)

		if (this.m_TabBar) {
			let cls = null
			if (clsArr && clsArr.length && clsArr.length > 0) {
				cls = clsArr.shift()
			}
			this.m_TabBar.OpenTab(cls, clsArr, param)
		}
		this._openData = null
	}

	private SetContentSkin(val: fgui.GComponent) {
		if (this.skin != val) {
			if (this.skin) {
				this.removeChild(this.skin);
			}
			this.skin = val as any;
			if (this.skin) {
				this.addChild(this.skin);
				this.setSize(this.skin.width, this.skin.height);
				this.skin.addRelation(this, fgui.RelationType.Size);
			}
		}
	}

	public DoClose() {
		this._openData = null
		if (!this._isOpen) {
			return
		}
		this._isOpen = false
		this.OnClose.apply(this);
		// this.m_Event.removeEvents()
		// this.m_Tag.UnRegisterTags()
		// this.removeObserve()
		if (this.m_TabBar) {
			this.m_TabBar.OnRemoved();
		}
		// GG.TM.removeAll(this)

		// let viewId = Util.GetClass(this).VIEW_ID
		// if (viewId) {
		// 	delete BaseView.M_VIEWS[viewId];
		// 	GG.GuideUtil.OnCloseView(viewId)
		// }
	}

	public get isShowing(): boolean {
		return this.parent != null;
	}

	public OnInit(): void {
	}

	public OnOpen(): void {
	}

	public OnResume(): void {
	}

	public OnClose(): void {
	}
}

namespace BaseView {

	export class TabBar {

		public tabBar: fgui.GList
		private viewStack: TabView
		private m_Added: boolean
		private m_OldIndex: number
		private m_CurShowView: BaseView;
		// private m_NotChange: boolean;
		private m_View: BaseView;

		private viewStackW
		private viewStackH
		public Init(view: BaseView, viewStack: TabView, tabbar: fgui.GList, itemRenderer: any = null) {
			this.tabBar = tabbar;
			this.viewStack = viewStack;
			this.viewStackW = viewStack.width
			this.viewStackH = viewStack.height
			this.m_View = view;

			if (!this.tabBar) {
				return
			}
			// this.tabBar.itemRenderer = itemRenderer //|| WindowTabBarItem

			let vieCls = Util.GetClass(view)
			if (!vieCls.GetChildView) {
				return null
			}
			if (!viewStack) {
				if (DEBUG) {
					throw ("not viewStack => " + egret.getQualifiedClassName(view))
				}
				return null
			}
			let list = vieCls.GetChildView()
			let outList = []
			// let getChildViewParam = view["GetChildViewParam"]
			for (let v of list) {
				outList.push(TabView.CreateTabViewData(v))
			}
			this.SetTabView(outList)
		}

		private SetTabView(datas: ITabViewData[]) {
			if (!egret.is(this.viewStack, "TabView")) {
				console.error("not tabview !!!")
				return
			}
			let tabView = this.viewStack as TabView
			tabView.tabChildren = datas
		}

		private WindowTabBarItem(index: number, obj: fgui.GComponent) {
			(obj.getChild("icon") as fgui.GLoader).icon = fgui.UIPackage.getItemURL("atlas_ui", "ui_tyzy_yq_zb");// "ui_tyzy_yq_zb"
		}

		public OnAdded() {
			if (!this.tabBar) {
				return
			}
			this.m_Added = true

			this.tabBar.addEventListener(fgui.ItemEvent.CLICK, this._OnTabTap, this);
			this.tabBar.itemRenderer = this.WindowTabBarItem
			this.tabBar.callbackThisObj = this;
			this.tabBar.setVirtual();
			this.tabBar.numItems = this.viewStack.length

			// this.tabBar.dataProvider = this.viewStack
			// this.TabBarSetData(this.tabBar, this.viewStack)
			// this.tabBar.validateNow()

			// this.tabBar.addEventListener(eui.ItemTapEvent.ITEM_TAP, this._OnTabTap, this)
			this.tabBar.addEventListener(egret.Event.CHANGE, this._OnTabChange, this)
		}

		public OnRemoved(): void {
			if (!this.m_Added) {
				return
			}
			this.m_Added = false
			this.tabBar.removeEventListener(egret.Event.CHANGE, this._OnTabChange, this)
			// this.tabBar.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this._OnTabTap, this)
			if (this.tabBar != null) {
				this.TabBarSetData(this.tabBar, null)
				// this.tabBar.dataProvider = null
			}
			this._SetCurShowView(null)
			// this.viewStack.selectedIndex = -1
			this.viewStack.ClearIndex()
		}

		/**
		 * 更新界面Title的显示
		 */
		private _UpdateTitle(): void {
			let iconName
			let view = this.m_CurShowView
			if (!view) {
				return
			}
			let win = (this.m_View).skin.commonWindow
			if (!win) {
				return
			}
			iconName = view.name
			if (!iconName) {
				iconName = this.m_View.name
			}
			// if (iconName) {
			// 	win.SetTitle(iconName)
			// }
			// if (view["btnHelp"]) {
			// 	win.SetHelp(false)
			// } else {
			// 	win.SetHelp(view.mHelpId ? true : false)
			// }
		}

		// private GetCmWin(): CommonWindowBg {
		// 	let view = this.m_View
		// 	while (true) {
		// 		let win = (view).commonWindow
		// 		if (win) {
		// 			return win
		// 		}
		// 		view = view.mParent
		// 		if (!view) {
		// 			break
		// 		}
		// 	}
		// 	return null
		// }

		public OpenTab(cls: any, clsArr: any[], param: any) {
			let index = 0
			if (cls) {
				for (let i = 0, len = this.viewStack.length; i < len; i++) {
					if (this.viewStack.GetElementCls(i) == cls) {
						index = i
						break
					}
				}
			}

			let j = index
			//检查这个界面可以开启吗，不可以就往后推一个，直到最后一个
			for (let i = 0, len = this.viewStack.length; i < len; i++) {
				let openIndex = (j++) % len
				let __class__ = this.viewStack.GetElementCls(openIndex);
				let isopen = ViewMgr.ViewOpenCheckUnTip(__class__)
				if (isopen === true) {
					index = openIndex
					break
				}
			}

			this.m_OldIndex = index
			this.viewStack.selectedIndex = index
			let curView = this.viewStack.getElementAt(this.viewStack.selectedIndex) as BaseView
			if ((this.m_CurShowView != curView || (clsArr && clsArr.length > 0 && !BaseView.M_VIEWS[clsArr[clsArr.length - 1]]))) {

				curView.ApplyOpenData(param, clsArr)
				this._SetCurShowView(curView, true)
			}

			this._UpdateTitle()
		}

		private _SetCurShowView(view: BaseView, fore?: boolean) {
			if (fore) {//重复打开界面
				if (this.m_CurShowView == view) {
					this.m_CurShowView.DoOpen();
					return;
				}
			}
			if (this.m_CurShowView == view) {
				return
			}
			if (this.m_CurShowView) {
				let winBgImg = this.m_CurShowView["winBgImg"] || this.m_CurShowView["winBlackBg"]
				if (winBgImg) {
					if (winBgImg.parent != this.m_CurShowView) {
						this.m_CurShowView.addChildAt(winBgImg, 0)
						if (DEBUG) {
							if (this.m_CurShowView["winBgImg"] && this.m_CurShowView["winBlackBg"]) {
								console.error("winBgImg =========== winBlackBg")
							}
							window["view_bg_name_index_count"] = (window["view_bg_name_index_count"] || 0) - 1
							console.log("[winBgImg]还原背景图层级", winBgImg["view_bg_name"], window["view_bg_name_index_count"])
						}
					}
				}

				// this.m_CurShowView.mParent = null
				this.m_CurShowView.DoClose()
				this.m_CurShowView = null
			}
			this.m_CurShowView = view
			if (this.m_CurShowView) {
				// this.m_CurShowView.mParent = this.m_View
				// let full = view.mFull || view.skinName == UIHelper.PANEL_SUB
				// if (full) {
				// 	this.viewStack.width = view.width = StageUtils.WIDTH
				// 	this.viewStack.height = view.height = LayerManager.GetShowHeight()
				// } else {
				// 	this.viewStack.width = this.viewStackW
				// 	this.viewStack.height = this.viewStackH
				// }
				// let cmWinBg = this.GetCmWin()
				// if (cmWinBg) {
				// 	let winBgImg = this.m_CurShowView["winBgImg"] || this.m_CurShowView["winBlackBg"]
				// 	if (winBgImg) {
				// 		let bgGroup = full ? cmWinBg.bgGroup : cmWinBg.bgGroup1
				// 		if (bgGroup) {
				// 			if (DEBUG) {
				// 				if (bgGroup.numChildren > 0) {
				// 					throw `有未移除的背景图 =》 ${bgGroup.$children[0]["view_bg_name"]}`
				// 				}
				// 				if (winBgImg.parent != view || view.getChildIndex(winBgImg) != 0) {
				// 					console.error("请设置 winBgImg 在最底部层级")
				// 				}
				// 				winBgImg["view_bg_name"] = egret.getQualifiedClassName(view)
				// 				window["view_bg_name_index_count"] = (window["view_bg_name_index_count"] || 0) + 1
				// 				console.log("[winBgImg]重设背景图层级", winBgImg["view_bg_name"], window["view_bg_name_index_count"])
				// 			}
				// 			bgGroup.addChild(winBgImg)
				// 		}
				// 		if (cmWinBg.bgColor) {
				// 			cmWinBg.bgColor.visible = this.m_CurShowView["winBlackBg"] ? true : false
				// 		}
				// 	} else {
				// 		if (cmWinBg.bgColor) {
				// 			cmWinBg.bgColor.visible = false
				// 		}
				// 	}
				// }
				// 设置角色选择对象
				// let subRoleSel = (this.m_View as any).subRoleSel as SubRoleSelView
				// if (subRoleSel) {
				// 	if (view.mNotRoleSel) {
				// 		subRoleSel.visible = false
				// 		subRoleSel.BindTag(null)
				// 	} else {
				// 		subRoleSel.visible = true
				// 		subRoleSel.BindTag(Util.GetClass(view).TAG_TYPE)
				// 	}
				// 	(view as any).subRoleSel = subRoleSel
				// }
				this.m_CurShowView.DoOpen()
			}
		}

		public GetCurView(): BaseView {
			return this.viewStack.getElementAt(this.viewStack.selectedIndex) as BaseView
		}
		/** 校验页面是否可开启 */
		private _CheckTab(index: number): boolean {
			let cls = (<TabView>this.viewStack).GetElementCls(index);
			if (cls.LAYER_LEVEL) {
				GG.ViewMgr.Open(cls)
				return false
			}
			if (!ViewMgr.ViewOpenCheckFunc(cls)) {
				return false;
			}
			return true
		}

		private _OnTabChange(): void {
			if (this.tabBar.selectedIndex != this.m_OldIndex) {
				this.m_OldIndex = this.tabBar.selectedIndex;
				this._SetCurShowView(this.viewStack.getElementAt(this.viewStack.selectedIndex) as BaseView)
				this._UpdateTitle()

				this.m_View.OnOpenIndex(this.m_OldIndex)
			}
		}

		public SetTabIndex(index): void {
			if (this._CheckTab(index)) {
				this.viewStack.selectedIndex = index;
				this._OnTabChange()
			}
		}

		// public ClearTalRedPoint(): void {
		// 	for (let i = 0; i < this.tabBar.numChildren; ++i) {
		// 		this.ShowTalRedPoint(i, false)
		// 	}
		// }

		// public ShowTalRedPoint(index: number, isShow: boolean) {
		// 	let redPoint = this._GetTalRedTarget(index)
		// 	if (redPoint) {
		// 		redPoint.visible = isShow
		// 	}
		// }

		private _OnTabTap(): void {
			let check = this._CheckTab(this.tabBar.selectedIndex)
			if (!check) {
				this.tabBar.selectedIndex = this.m_OldIndex
			}
		}

		// private _GetTalRedTarget(index: number): eui.Image {
		// 	if (index >= this.tabBar.numElements) {
		// 		return
		// 	}
		// 	let obj = this.tabBar.getElementAt(index)
		// 	if (!obj) {
		// 		return
		// 	}
		// 	return obj["redPoint"]
		// }

		private TabBarSetData(bar: fgui.GList, value: TabView) {

		}

		// private TabBarSetData(bar: eui.TabBar, value: eui.ICollection) {
		// 	let dp = bar.$dataProvider;
		// 	if (dp && egret.is(dp, "TabView")) {
		// 		dp.removeEventListener(eui.PropertyEvent.PROPERTY_CHANGE, (bar as any).onViewStackIndexChange, bar);
		// 		bar.removeEventListener(egret.Event.CHANGE, (bar as any).onIndexChanged, bar);
		// 	}
		// 	if (value && egret.is(value, "TabView")) {
		// 		value.addEventListener(eui.PropertyEvent.PROPERTY_CHANGE, (bar as any).onViewStackIndexChange, bar);
		// 		bar.addEventListener(egret.Event.CHANGE, (bar as any).onIndexChanged, bar);
		// 	}
		// }

		public getSelectedIndex() { return this.tabBar.selectedIndex; }
		// public getTabBarNumElement() { return this.tabBar.numElements; }

	}
}