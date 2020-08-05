class Util {

	private static _EgretVer: number[] = null
	private static _NewResMgr = null

	private static EgretVer(): number[] {
		if (!this._EgretVer) {
			let str = egret.Capabilities.engineVersion.split(".")
			this._EgretVer = []
			for (let v of str) {
				this._EgretVer.push(Number(v))
			}
		}
		return this._EgretVer
	}

	// ver 5.2
	public static IsNewEgretVer(): boolean {
		let v = this.EgretVer()
		return v[1] > 0
	}

	public static IsNewResMgr(): boolean {
		if (this._NewResMgr != null) {
			return this._NewResMgr
		}
		let _RES = RES as any
		if (_RES.config) {
			this._NewResMgr = true
		} else {
			this._NewResMgr = false
		}
		return this._NewResMgr
	}

	public static GetClass(obj: any): any {
		if (!obj) {
			return null
		}
		return obj.constructor
	}

	public static IsChildClass(cls: any, parentCls: any) {
		if (!cls || !parentCls) {
			return
		}
		if (!cls.prototype) {
			return
		}
		if (!cls.prototype.__types__) {
			return
		}
		return cls.prototype.__types__.indexOf(egret.getQualifiedClassName(parentCls)) != -1
	}

	public static GetHashCode(obj: any): number {
		if (!obj) {
			return 0
		}
		let code = obj.hashCode
		if (code) {
			return code
		}
		let type = typeof (obj)
		if (type == "function" || type == "object") {
			code = obj.hashCode = egret.$hashCount++;
			return code
		}
		return 0
	}

	public static ConcatHash(h1: number, h2: number): number {
		return h1 * 100000000 + h2
	}

	public static GetParentByType(obj: egret.DisplayObject, cls): egret.DisplayObject {
		if (obj == null) {
			return null
		}
		let parentName = egret.getQualifiedClassName(cls);
		let parent = obj
		if (egret.is(parent, parentName)) {
			return parent
		}
		for (let i = 0; i < 10; ++i) {
			parent = parent.parent
			if (parent == null) {
				return null
			}
			if (egret.is(parent, parentName)) {
				return parent
			}
		}
		return null
	}




	public static Copy(text: string): boolean {
		try {
			var t = document.createElement("input");
			t.value = text
			document.body.appendChild(t)
			t.select()
			t.setSelectionRange(0, t.value.length)
			document.execCommand("Copy")
			document.body.removeChild(t)
			return true
		} catch (e) {
			console.error("Copy => " + e)
		}
		return false
	}


	static ProxyView(view, addEvts?: () => void, delEvts?: () => void) {
		let v = view;
		let a = addEvts;
		let d = delEvts;

		view = undefined;
		addEvts = undefined;
		delEvts = undefined;

		if (v.$onAddToStage) {
			let add = v.$onAddToStage;
			v.$onAddToStage = (stage: egret.Stage, nestLevel: number) => {
				add.call(v, stage, nestLevel);
				a && a.call(v);
			}
			if (v.$hasAddToStage) {
				a && a.call(v);
			}
		}
		if (v.$onRemoveFromStage) {
			let rem = v.$onRemoveFromStage;
			v.$onRemoveFromStage = () => {
				rem.call(v);
				d && d.call(v);
			};
			if (!v.$hasAddToStage) {
				d && d.call(v);
			}
		}
	}
}