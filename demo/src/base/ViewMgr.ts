class ViewMgr {

    private viewIdList: { [key: number]: typeof BaseView } = {}

    private _cacheViews: number[] = []
    private _views: { [key: number]: BaseView } = {}
    private _opens: number[] = []
    mViewImpl

    private viewPack: ViewPack = new ViewPack

    private static MAX_ID: number

	public static GenId(): number {
		return ++ViewMgr.MAX_ID
    }
    
    public Init() {
		ViewMgr.MAX_ID = ViewId.MAX + 1
		let def = (cls, parentCls) => {
			if (!cls.VIEW_ID) {
				cls.VIEW_ID = ++ViewMgr.MAX_ID
			}
			if (DEBUG) {
				let view = this.viewIdList[cls.VIEW_ID]
				if (view && view != cls) {
					throw `[ERROR] VIEW ID => ${egret.getQualifiedClassName(view)}  ${egret.getQualifiedClassName(cls)}`
				}
			}
			this.viewIdList[cls.VIEW_ID] = cls
			if (parentCls) {
				let parentView = cls.PARENT_VIEW
				if (parentView) {
					// if (parentView.length && parentView.length > 0) {
					// 	parentView.push(parentCls)
					// } else {
					// 	cls.PARENT_VIEW = [parentView, parentCls]
					// }
					if (DEBUG) {
						throw `[ERROR] ${egret.getQualifiedClassName(cls)} 包含父节点`
					}
				} else {
					cls.PARENT_VIEW = parentCls
				}
			}
			if (cls.GetChildView) {
				let childs: typeof BaseView[] = cls.GetChildView()
				for (let v of childs) {
					if (v.LAYER_TYPE) { // 一级界面不设置
						continue
					}
					def(v, cls)
				}
				if (childs && childs.length == 1 && !cls.GetDeblockingType && childs[0].GetDeblockingType) {
					cls.GetDeblockingType = childs[0].GetDeblockingType;
				}
			}
		}
		let allPanel = ViewMgr.ALL_PANEL
		for (let v of allPanel) {
			def(v, null)
		}
        ViewMgr.ALL_PANEL = []
        
        fairygui.UIObjectFactory.extensions["ui://skin/PanelSkin"] = CommonWindowBg;
        fairygui.UIObjectFactory.extensions["ui://skin/ViewStack"] = TabView;
    }
    
    public static ViewOpenCheckUnTip(cls, param?): boolean {
        return true
    }
    
    public static ViewOpenCheckFunc(cls, param?): boolean {
        return true
    }

    public OpenId(viewId: ViewId, param?): void {
        let viewCls = this.viewIdList[viewId]
        if (!viewCls) {
            let moreView = ViewMgr.ALL_PANEL_MORE[viewId];
            if (moreView) {
                viewCls = moreView.cls;
                param = param || moreView.param;
            } else {
                return;
            }
        }
        if (!ViewMgr.ViewOpenCheckFunc(viewCls, param)) {
            return;
        }
        let topCls = viewCls as any
        let clsArr: any[] = null
        while (true) {
            let cls = topCls.PARENT_VIEW
            if (cls) {
                if (!clsArr) {
                    clsArr = []
                }
                clsArr.unshift(topCls)
                topCls = cls
            } else {
                break;
            }
        }
        var view = this.openEasy(topCls, param, clsArr);
        if (view) {
            if (this.mViewImpl) {
                this.mViewImpl.OnOpenView(view)
            }
        }
    }

	/**
	 * 打开窗口
	 * @param cls 类
	 * @param param 参数
	 * 			默认字段：roleIndex 选中的子角色索引
	 */
    public Open(cls: new () => BaseView, param: any = null) {
        let id = cls["VIEW_ID"]
        if (DEBUG) {
            if (!id) {
                console.error("没有定义VIEW_ID => " + egret.getQualifiedClassName(cls))
            }
            if (param != null && typeof (param) != "object") {
                console.error("param 参数类型错误 => " + egret.getQualifiedClassName(cls))
            }
        }
        this.OpenId(id, param)
    }

    private openEasy(cls, param = null, clsArr: any[] = null) {
        if (cls == null) {
            console.log("open nameorclass is null")
            return;
        }
        let viewId = cls.VIEW_ID
        var view: BaseView = this._views[viewId];
        if (!view) {
            view = new cls()
            this._views[viewId] = view;
        }
        if (view == null) {
            console.error("panel " + egret.getQualifiedClassName(cls) + "不存在");
            return;
        }
        let views: number[] = this._cacheViews
        let index = views.indexOf(viewId);
        if (index > -1) {
            views.splice(index, 1);
        }

        if (param != null || clsArr != null) {
            view.ApplyOpenData(param, clsArr)
        }
        let viweRoot
        let layerType = cls.LAYER_TYPE
        if (layerType == null) {
            console.error("没有设置层级", egret.getQualifiedClassName(cls))
        } else {
            viweRoot = LayerManager.GetRootType(layerType)
        }

        view.Init(viweRoot)

        let openIndex = this._opens.indexOf(viewId)
        if (openIndex != -1) {
            this._opens.splice(openIndex, 1)
        }
        this._opens.push(viewId);

        return view;
    }

    public AddTo(parentNode: fgui.GComponent, tar: fgui.GObject) {
        if (parentNode[LayerManager.TOP_LAYER]) {

        }
        parentNode.addChild(tar)
        this.AdjustModalLayer()
    }

    
    private AdjustModalLayer(): void {
       
    }

    // private _OpenView(view: BaseEuiView): void {
    //     view.DoOpen.call(view);
    // }

    // private _CloseView(view: BaseEuiView): void {
    //     view.DoClose.apply(view);
    // }

    public CloseId(viewId: ViewId) {
        if (ViewMgr.ALL_PANEL_MORE[viewId]) {
            viewId = ViewMgr.ALL_PANEL_MORE[viewId].cls.VIEW_ID;
        }
        var view = this.closeEasy(viewId);
        if (view) {
            if (this.mViewImpl) {
                this.mViewImpl.OnCloseOneView(view)
            }
            return true
        }
        return false
    }

    /**
     * 关闭窗口
     * @param objOrCls 类、对象
     **/
    public Close(objOrCls) {
        let viewId = objOrCls.VIEW_ID || Util.GetClass(objOrCls).VIEW_ID
        if (!this.CloseId(viewId)) {
            if (DEBUG) {
                console.log("not close view " + egret.getQualifiedClassName(objOrCls))
            }
        }
    }

    // 关闭窗口
    private closeEasy(viewId: number) {
        if (!this.IsShowId(viewId)) {
            return null;
        }
        var view: BaseView = this._views[viewId];
        if (view) {
            let layerLevel = ViewMgr.GetLayerLevel(view)
            // if (!Util.GetClass(view).NOT_SOUND && layerLevel != LayerManager.UI_BATTLE && layerLevel != LayerManager.UI_USER_INFO && layerLevel != LayerManager.UI_Tips) {
            //     GG.SoundManager.PlayEffect(SoundEffType.WIN_CLOSE);
            // }
            var viewIndex = this._opens.indexOf(viewId);
            if (viewIndex >= 0) {
                this._opens.splice(viewIndex, 1);
                view.DoClose.apply(view);
            }
            layerLevel.removeChild(view)
            this.destroy(view)
        }
        return view;
    }

    private destroy(view: BaseView) {
		if (!view) {
			return
        }
        let viewId = Util.GetClass(view)["VIEW_ID"]
		let viewCls = Util.GetClass(view)
		if (viewCls.LAYER_TYPE != LayerType.UI_Main || viewCls.NOT_DELAY_DESTROY) {
            delete this._views[viewId]
            view.dispose()
			return;
		}
		let views: number[] = this._cacheViews
		let index = views.indexOf(viewId);
		if (index > -1) {
			views.splice(index, 1);
			views.push(viewId);
			return;
		} else {
			views.push(viewId);
		}

		if (views.length < 4) {
			return;
		}

		viewId = views.shift();
		view = this._views[viewId];
		if (!view) {
			_LOG("unknow error:not find ViewId:" + viewId);
			return;
		}
        delete this._views[viewId]
        view.dispose()
		// view.DoDestory();
	}

    public static GetLayerLevel(view: BaseView): fgui.GComponent {
		let cls = Util.GetClass(view)
		let layerLevel = cls.LAYER_TYPE
		if (layerLevel == null) {
			throw "BaseEuiView not find LAYER_TYPE!"
		}
		return layerLevel
    }
    
    /**
     * 获取一个UI对象
     * @param cls  类
     */
    public GetView(cls: typeof BaseView): BaseView {
        return this._views[cls && (cls as any).VIEW_ID] as BaseView
    }

    public GetViewCls(viewId: number): new () => BaseView {
        return this.viewIdList[viewId] || (ViewMgr.ALL_PANEL_MORE[viewId] ? ViewMgr.ALL_PANEL_MORE[viewId].cls : undefined)
    }

    public AddViewCls(cls): void {
        let id = cls.VIEW_ID
        if (!id) {
            return
        }
        this.viewIdList[id] = cls
    }

    /**
     * 关闭所有开启中的UI
     */
    public closeAll() {
        for (let i = this._opens.length - 1; i >= 0; --i) {
            this.closeEasy(this._opens[i]);
        }
        if (this._opens.length > 0) {
            console.error(this._opens.length + " => close all error !!!")
        }

        if (this.mViewImpl) {
            this.mViewImpl.OnCloseAll()
        }
    };

    /**
     * 当前ui打开数量
     */
    public currOpenNum() {
        return this._opens.length;
    }

    /**
     * UI是否开启
     * @param cls 类
     */
    public isShow(cls: any): boolean {
        return this.IsShowId(cls.VIEW_ID)
    }

    public IsShowId(viewId: number): boolean {
        return this._opens.indexOf(viewId) >= 0
    }

    public LoadPack(packName, cb: fgui.Handler) {
        this.viewPack.LoadPack(packName, cb)
    }

	/**
	 * 任务指引
	 */
    public Guide(index: ViewId, param: any = null) {
        this.OpenId(index, param)
    }

    private static ALL_PANEL = [];
    private static ALL_PANEL_MORE: { [id: string]: { id, cls, param?} } = {};

    public static DefWin(viewCls: any, layer) {
        viewCls.LAYER_TYPE = layer
        if (DEBUG) {
            let name = egret.getQualifiedClassName(viewCls)
            if (!ViewMgr["ALL_PANEL_NAME"]) {
                ViewMgr["ALL_PANEL_NAME"] = {}
            }
            if (ViewMgr["ALL_PANEL_NAME"][name]) {
                throw "重复定义view => " + name
            }
            ViewMgr["ALL_PANEL_NAME"][name] = true
        }
        ViewMgr.ALL_PANEL.push(viewCls)
    }
	/** 注册id对应面板
	 * @param viewId 面板ID
	 * @param viewCls 面板类
	 * @param param 自定义参数
	 */
    static DefView(viewId: ViewId, viewCls: any, param?) {
        if (DEBUG) {
            let name = egret.getQualifiedClassName(viewCls);
            // if (!ViewMgr["ALL_PANEL_NAME"] || !ViewMgr["ALL_PANEL_NAME"][name]) {
            // 	throw "未注册view =>" + name + " 需先注册DefWin方法";
            // }
            if (ViewMgr.ALL_PANEL_MORE[viewId]) {
                throw "重复定义view => " + name
            }
        }
        ViewMgr.ALL_PANEL_MORE[viewId] = { id: viewId, cls: viewCls, param: param };
    }
}

class ViewPack {
    private loaded: { [key: string]: boolean } = {}
    private loadList: { [key: string]: fgui.Handler[] } = {}

    public LoadPack(packName: string, cb: fgui.Handler) {
        if (this.loaded[packName]) {
            cb.runWith(packName)
            return
        }
        if (!this.loadList[packName]) {
            this.loadList[packName] = [cb]
            RES.getResAsync(packName + "_bin", (obj, url) => {
                if (obj) {
                    let pack = fgui.UIPackage.addPackage(packName, obj)
                    if (pack._dependencies && pack._dependencies.length) {
                        for (let v of pack._dependencies) {
                            this.LoadPack(v.name, fgui.Handler.create(this, this._DepLoadDone, [pack]))
                        }
                    } else {
                        this.LoadDone(packName)
                    }
                } else {
                    console.error("load err")
                }
            }, this)
        } else {
            this.loadList[packName].push(cb)
        }
    }

    private _DepLoadDone(pack: fgui.UIPackage, name: string) {
        let packName = pack.name
        if (!this.loadList[packName]) {
            return
        }
        for (let v of pack._dependencies) {
            if (!this.loaded[v.name]) {
                return
            }
        }
        this.LoadDone(packName)
    }

    public UnLoad(packName: string) {
        if (this.loaded[packName]) {
            delete this.loaded[packName]
            delete this.loadList[packName]
            fgui.UIPackage.removePackage(packName)
        }
    }

    private LoadDone(packName: string) {
        this.loaded[packName] = true
        if (this.loadList[packName]) {
            for (let v of this.loadList[packName]) {
                v.runWith(packName)
            }
            delete this.loadList[packName]
        }
    }
}