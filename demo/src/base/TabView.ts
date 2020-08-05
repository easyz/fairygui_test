interface ITabViewData {
	// className: string
	cls: any
	name: string
	iconName: string
	notShow: boolean
	obj?: BaseView
	args: any


	lock: boolean

	sortIndex: number
}

class TabView extends fgui.GComponent {

	public static readonly COPY = {
		"name": 1,
		"skinName": 1,
	}

	public static NO_PROPOSED_SELECTION = -2

	public static CreateTabViewData(cls: any, args?: any, notShow = false, tagRed?): ITabViewData {
		let data
		if (typeof (cls) == "string") {
			cls = egret.getDefinitionByName(cls)
		}
		data = {
			cls: cls,
			name: cls ? (cls.NAME || "") : "",
			iconName: cls ? (cls.ICON_NAME || "") : "",
			notShow: notShow,
			tagType: cls.TAG_TYPE,
			tagObj: tagRed,
		}
		if (args) {
			// for (let key in args) {
			//     data[key] = args[key]
			// }
			data.args = args
		}
		return data
	}

	private childrenDatas: ITabViewData[] = []
	protected childrenList: ITabViewData[] = []

	private static SORT_DATA(val: ITabViewData): number {
		let v = val.lock ? 100000 : 0
		return v + (val.sortIndex || 0)
	}

	private static SORT(lhs: ITabViewData, rhs: ITabViewData): number {
		return TabView.SORT_DATA(lhs) - TabView.SORT_DATA(rhs)
	}

	public constructor() {
		super();
	}

	// private _checkLock: boolean

	// public get checkLock(): boolean {
	// 	return this._checkLock
	// }

	// public set checkLock(val: boolean) {
	// 	this._checkLock = val
	// }

	protected proposedSelectedIndex: number = TabView.NO_PROPOSED_SELECTION;

	public _selectedIndex: number = -1;

	public get selectedIndex(): number {
		return this.proposedSelectedIndex != TabView.NO_PROPOSED_SELECTION ? this.proposedSelectedIndex : this._selectedIndex;
	}

	public set selectedIndex(value: number) {
		value = +value | 0;
		this.setSelectedIndex(value);
	}

	public ClearIndex() {
		if (this.selectedIndex == -1) {
			return
		}
		this.proposedSelectedIndex = -1
		this.commitSelection(-1)
	}

	private setSelectedIndex(value: number): void {
		if (value == this.selectedIndex) {
			return
		}
		if (!this.childrenList.length) {
			return
		}
		this.NewChild(value)
		this.proposedSelectedIndex = value;
		if (this.proposedSelectedIndex != TabView.NO_PROPOSED_SELECTION) {
			this.commitSelection(this.proposedSelectedIndex);
			this.proposedSelectedIndex = TabView.NO_PROPOSED_SELECTION;
		}
	}

	private commitSelection(newIndex: number): void {
		if (newIndex >= 0 && newIndex < this.childrenList.length) {
			if (this._selectedIndex != newIndex) {
				this.ShowOrHide(this._selectedIndex, false)
			}
			this._selectedIndex = newIndex;
			this.ShowOrHide(newIndex, true)
		}
		else {
			if (newIndex == -1) {
				if (this._selectedIndex >= 0 && this._selectedIndex < this.childrenList.length) {
					this.ShowOrHide(this._selectedIndex, false)
				}
				this._selectedIndex = -1;
			}
		}
	}

	public NewChild(index: number): boolean {
		let data = this.childrenList[index]
		if (data && !data.obj) {
			let cls = data.cls
			let obj: BaseView = data.obj = new cls
			if (data.args) {
				for (let key in data.args) {
					let value = data.args[key]
					if (!value) {
						continue
					}
					if (key == "id") {
						this[value] = obj
					} else {
						if (key.indexOf("$") == -1) {
							obj[key] = value
						}
					}
				}
				data.args = null
			}
			obj.Init(this)
			obj.visible = false
		}
		return data && data.obj ? true : false
	}

	// public Replace(cls: any): void {
	//     this.RemoveAll()
	//     this.childrenList[0] = TabView.CreateTabViewData(cls)
	//     this.selectedIndex = 0
	// }

	protected RemoveAll() {
		this._selectedIndex = -1
		this.proposedSelectedIndex = TabView.NO_PROPOSED_SELECTION

		this.removeChildren()
		for (let data of this.childrenList) {
			let id = data["id"]
			if (id) {
				this[id] = null
			}
		}
		this.childrenList = []
	}

	protected ShowOrHide(index: number, visible: boolean): BaseView {
		let data = this.childrenList[index]
		if (data && data.obj) {
			let child = data.obj
			// if (egret.is(child, "eui.UIComponent")) {
			// 	(<eui.UIComponent><any>child).includeInLayout = visible;
			// }
			child.visible = visible;
			return child
		}
	}

	private _UpdateList() {
		this.childrenList.length = 0
		for (let data of this.childrenDatas) {
			if (!data.cls) {
				continue
			}
			let dtype = data.cls.GetDeblockingType && data.cls.GetDeblockingType()
			if (dtype && !Deblocking.IsShow(dtype, false)) {
				continue
			}
			if (data.cls.NOT_LIST_SHOW) {
				data.notShow = true
			} else {
				if (data.cls.DYNAMIC_SHOW) {
					data.notShow = (data.cls.ShowCheck && !data.cls.ShowCheck()) ? true : false
				} else {
					if (data.cls.ShowCheck && !data.cls.ShowCheck()) {
						continue
					}
				}
			}
			if (dtype && !Deblocking.IsDeblocking(dtype)) {
				data.lock = true
			} else {
				data.lock = false
			}
			this.childrenList.push(data)
		}
		this.childrenList.sort(TabView.SORT)
	}

	public UpdateListShow() {
		this._UpdateList()
	}

	public get length(): number {
		return this.childrenList.length
	}

	public getItemAt(index: number): ITabViewData {
		let data = this.childrenList[index]
		return data
	}

	public getItemIndex(item: any): number {
		let list = this.childrenList;
		let length = list.length;
		for (let i = 0; i < length; i++) {
			if (list[i].name == item) {
				return i;
			}
		}
		return -1;
	}

	public getElementAt(index: number): BaseView {
		let data = this.childrenList[index]
		return data ? data.obj : null
	}

	public GetElementCls(index: number) {
		let data = this.childrenList[index]
		if (data) {
			if (data.cls) {
				return data.cls
			}
			if (data.obj) {
				return Util.GetClass(data.obj)
			}
		}
		return null
	}

	public set tabChildren(datas: ITabViewData[]) {
		for (let i = 0; i < datas.length; i++) {
			datas[i].sortIndex = i
		}
		this.childrenDatas = datas
		this._UpdateList()
	}

	clear() {
		this.childrenDatas.length = 0;
		this.childrenList.length = 0;
	}
}

