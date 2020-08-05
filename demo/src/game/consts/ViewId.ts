/** 避免重复以及中途加入 
 * 建议:命名规则 
 * AAAABCC  AAAA模块编号  B 主面板标记 CC 序列 例如 商店模块 ShopWin 1020 主面板win为 1020000 子页签为 1020001...n 
 * 商店专属弹窗或者其他模块内UI 为 1020100 序列方式
 * 其他自有页面 用010 020命名*/
enum ViewId {
	NONE = 0,
	Main = 999,					// 主界面
	Recharge = 888, //充值

	RoleInfoPanel = 1000,		// 角色界面
	RoleWin = 1001,
	MainTop2Panel = 1002,
	MainBottomPanel = 1003,		// 主界面底部菜单
	MainTopPanel = 1004,
	BriberyBasePanel = 1005,
	BagWin = 1006,				// 背包

	BagEquipTypePanel = 1008,
	BagItemTypePanel = 1009,
	PlayFunView = 1010,			// 主界面功能界面
	SkillWin = 1011,
	SkillPanel = 1020,			// 技能界面
	GameSceneView = 1012,

	MailWinView = 1013,
	MailListView = 1014,

	RoleTransmigrationPanel = 1015,		// 转生界面
	SmeltEquipTotalWin = 1021,			// 熔炼

	ItemUseTipsWin = 1022,				// 物品使用
	ItemDetailedWin = 1023,
	ItemDetailedPidWin = 1024,
	ExDescItemDetailWin = 1025,
	PictorialUseTipWin = 1026,
	PictorialItemTipWin = 1027,
	GainGoodsWarn = 1028,
	ShopGoodsWarn = 1029,
	QiMenEquipItemDetailWin = 1030,
	PetFreeItemTip = 1031,

	GodEquipWin = 1100,
	EquipCompositePanel = 1101,
	EquipCompositeMaterialDialog = 1102,
	EquipCompositeResultPanel = 1103,
	MailDetailView = 1104,

	TeJieWin = 1105,
	SoulEquipPanel = 1106,
	SoulEquipCompositePanel = 1107,
	SoulEquipRunePanel = 1108,
	SoulEquipResolvePanel = 1109,
	SoulEquipSuitSkillDetailTip = 1110,
	SoulEquipUnlockTip = 1111,
	HorcruxSmeltPanel = 1112, //魂装熔炼

	ForgeWin = 1007,
	Forgeqh = 1016,				// 强化
	Forgejl = 1017,				// 精炼
	Forgezz = 1018,				// 铸造
	ForgeBsPanel = 1019,

	ExperienceWin = 1200,
	PictorialPanel = 1300, 		// 图鉴界面
	PictorialDetailPanel = 1301,// 图鉴激活界面
	PictorialDecomposePanel,
	PictorialActivePanel = 1303, // 激活成功
	PictorialSuitDetailPanel,

	AcupointPanel = 1500,		// 经脉界面
	GuanQiaRewardPanel = 1600,	// 关卡界面
	GuanQiaRewardWin = 1601,	// 关卡界面

	ArtifactPanel = 1620,

	EdgeEquipWin = 1700,
	EdgeEquipPanel = 1701,
	EdgeEquipIntensifyPanel = 1702,

	DressWin = 1800,			// 装扮主界面
	WingPanel = 1900,			// 神翼
	FootPanel = 2000,			// 足迹
	HaloPanel = 2100,			// 光环

	PetPanel = 999000,
	PetActivityMainPanel,
	PetMainPanel = 999002,			// 宠物升级界面
	PetActivityPanel = 999003,		// 宠物激活界面
	PetZyPanel = 999004,
	PetSkinMainPanel,
	PetDetailInfoPanel,
	PetShowSkinPanel = 999007,		// 激活界面
	PetParalysisPanel = 999008,		// 麻痹界面
	PetEquipThroughPanel = 999009,	// 宠物装备突破

	FieldBossPanel = 1000000,		// 野外boss
	PersonalBossPanel = 1000001,	// 个人boss
	BanneretBossPanel = 1000002,	// 爵位BOSS
	BossHomePanel = 1000003,		// BOSS之家
	WorldBossPanel = 1000004,		// 世界BOSS
	IntegralBossPanel = 1000005,	// 积分BOSS
	BossWin = 1000006,				// boss
	QimenBossPanel = 1000007,		// 奇门boss
	IntegralBossPanel1 = 1000011,	// 积分BOSS-1-野外
	IntegralBossPanel2 = 1000012,	// 积分BOSS-2-遗迹
	IntegralBossPanel3 = 1000013,	// 积分BOSS-3-爵位

	//爵位
	JWWin = 1001000,//爵位主面板
	JWInfoPanel = 1001001,//爵位
	JWRankPanel = 1001002,//爵位排行
	JWUpSuccWin = 1001021,//升级反馈
	JWListWin = 1001031,//爵位列表
	JWFlagWin = 1001041,//爵印

	//五行装备
	WxzbWin = 1002000,//五行主面板
	WxEquipPanel = 1002001,//五行装备
	WxxlPanel = 1002002,//五行修炼

	WxzpWin = 1002011,//五行转盘
	WxEquipSetWin = 1002021,//装备选择
	WxxlEquipSetWin = 1002031,//五行修炼装备选择
	WxTipWin = 1002041,//五行相克TIP
	WXSuccTipWin = 1002051,//五行修炼成功反馈
	WXTipActiveWin = 1002061,

	//四圣
	SszbWin = 1003000,//四圣装备主面板
	SszbEquipPanel = 1003001,//四圣装备
	SszbSelectWin = 1003010,//材料选择
	SszbTipSkillWin = 1003020,//技能描述
	SszbTipSuccWin = 1003030,//装备获得

	// 圣器
	HolyPanel = 1004000,	// 主界面
	HolySuitInfoPanel = 1004010,	// 套装界面
	HolyDownSuitInfoPanel = 1004011,	// 套装界面2
	HolyEquipShowPanel = 1004020,	// 展示界面

	// 行会
	GuildPanel = 1005000,	// 主界面
	GuildDepotPanel = 1005300,	// 仓库主界面
	GuildSkillPanel = 1005400,	// 技能主界面
	GuildMainListPanel = 1005500,	// 行会列表主界面
	GuildListPanel = 1005501,	// 行会列表
	GuildListPanel2 = 1005502,	// 行会列表

	// GuildBossWin = 1005100,	// boss主界面
	GuildBossPanel = 1005101,	// 行会boss界面
	// GuildBossPopWin = 1005102, //行会boss弹出界面
	// GuildShopWin = 1005110, // 行会商店主界面
	GuildShopPanel = 1005111, // 行会商店

	//遗迹boss
	YJBossWin = 1006000,
	YJBossPanel = 1006001,

	//排名
	RankWin = 1007000,
	RankPower = 1007001,//战力
	RankLevel = 1007002,//等级
	RankChapter = 1007004,//关卡
	RankJW = 1007005,//爵位

	/** 沙城争霸 */
	ShabakWin = 1008000,
	ShabakInfoPanel = 1008001,
	ShabakAwardWin = 1008010,//奖励面板
	ShabakRankWin = 1008020,//排行面板
	ShabakFightWin = 1008030,//战况
	ShabakWarnWin = 1008040,//皇宫警卫
	ShabakRaidPanel = 1008050,//战斗界面
	ShabakDialogWin = 1008060,//对话框
	ScjxPanel = 1008070,// 沙城捐献界面
	ScjxMainPanel = 1008071,	//沙城捐献主界面
	RagePanel = 1008072,		//  狂暴之力
	ScjxMainPanel2 = 1008073,		//  狂暴之力

	FbWin = 1009000,	// 副本
	//幻境
	DreamlandFbPanel = 1009001, //幻境
	ResultDreamlandWin = 1009002,
	//镇魔塔
	MonsterTowerPanel = 1010001,
	FbExpPanel = 1011001,			// 经验副本
	ResultFbExpPanel = 1011002,		// 经验副本结算
	MaterialPanel = 1012001, 	// 材料副本
	/** BOOS首杀 */
	FirstKillBossWin = 1012100,
	//每日悬赏
	EveryDayFirstPanel = 1012101,
	//全服首杀
	FirstKillBossPanel = 1012102,


	//奇门
	QiMenWin = 1013001,
	QiMenEquipZodiacPanel = 1013002,// 生肖
	QiMenEquipConstellationPanel = 1013003,  // 星座 
	QiMenEquipElementPanel = 1013004, // 元素
	QiMenEquipResolveDialog = 1013005, //分解界面

	//拍卖行
	AuctionWin = 1014001,
	AuctionGuildPanel = 1014002,
	AuctionNormalPanel = 1014003,

	//vip功能
	VipWin = 1015001,
	VipLvPanel = 1015002,
	VipGiftPanel = 1015003,
	VipUpTips = 1015004,
	VipUpEffTips = 1015005,
	VipLvPanel_Day = 1015006, // vip每日礼包

	//法宝
	TreasurePanel = 1016001,
	TreasureSkillTips = 1016002,
	TreasureActTips = 1016003,

	//未知暗殿
	UnknownPalacePanel = 1017001,
	UnknownShopPanel = 1017002,

	//红包
	RedEnvelopeWin = 1018000,

	//玛法寻宝
	MarfaWin = 1019100,
	// MarfaTreasurePanel = 1019100,
	// MarfaHimitsuTreasurePanel = 1019200,

	//竞技场
	ArenaWin = 1019000,
	ArenaInfoPanel = 1019001,
	ArenaRankWin = 1019010,
	ArenaRecordWin = 1019020,
	ArenaRewardWin = 1019030,
	ArenaRewardWin1 = 1019031,
	ArenaRewardWin2 = 1019032,

	//商店
	ShopWin = 1020000,
	ShopItemPanel = 1020001,
	ShopMysteryPanel = 1020002,
	ShopArenaPanel = 1020003,
	ShopExchangePanel = 1020004,
	BuyWin = 1020005,
	ShopIntegralPanel = 1020006,
	ShopTreasurePanel = 1020007,

	// 押镖
	DartPanel = 1021000,
	DartRobMessagePanel = 1021010,
	DartResultPanel = 1021020,
	DartMainSelectPanel = 1021030,
	DartSuccessPanel = 1021040,

	// 穿戴装备
	NewEquipWearTip = 1022000,



	/** 日常任务 */
	DailyWin = 1023000,
	DailyInfoPanel = 1023001,
	AwardTipWin = 1023010,

	/** 圣装 */
	HolyEquipPanel = 1024000,
	HolyEquipComplexPanel = 1024010,	// 合成界面
	HolyEquipAdvancePanel = 1024120,	// 进阶界面

	// 福利活动大厅
	WealPanel = 1025000,
	DailySignPanel = 1025100, //每日签到

	FirstRechargePanel = 1026100, //首充
	// RechargePanel = 1026201, //充值

	//直购礼包
	ZGLBWin = 1027000,
	ZGLBPanel = 1027001,

	//特权
	PrivilegeWin = 1028100,
	PrivilegePanel = 1028101,
	AutoTipWin = 1028200,

	//全民砍猪
	QMKZPanel = 1029100,

	//封魔大乱斗
	FMWin = 1030000,
	FMInfoPanel = 1030001,

	/** 宠物礼包 */
	PetGiftPanel = 1031000,

	/** 改名 */
	ChangeNamePanel = 1032000,
	ActCodePanel = 1032001,

	//金猪
	GoldenPigWin = 1033000,
	GoldenPigPanel = 1033100,

	ToStrongPanel = 1034000,
	ToStrongMainPanel = 1034001,
	ToStrongItemPanel = 1034002,
	ToStrongUpLvPanel = 1034003,
	CreateRolePanel = 1034040,

	// 登录奖励
	LoginRewardPanel = 1035000,
	//连续充值
	KeepRecharge = 1036000,

	MafaPassCheck = 1037000,

	// 大富翁-抽奖
	BigRichRandomPanel = 1038000,
	BigRichRewardPanel = 1038001,
	BigRichRandomRewardPanel = 1038002,

	//登录礼包
	LoginGiftPanel = 1039000,

	// 功能预告
	MainOpenFuncPanel = 1040000,
	//天下第一
	JobArenaStartPanel = 1041000,
	// 怪物攻城
	MonsterAtkCityPanel = 1041001,


	
	// 砍一刀
	// ChopItOncePanel = 1042000,
	ChopDetailTips = 1042001,

	// 白日门
	BRMPanel = 1043001,


	MAX,
}

namespace ViewIdFunc {
	export let MAX = MessageDef.MAX
	// 500000 活动ID 界面ID
	export function ACTIVITY(id: number) {
		return 100000000 + id;
	}
	// 500000 活动ID 界面ID
	export function ACTIVITY_WIN(openid) {
		return 1000000 + openid;
	}
}

if (DEBUG) {
	(function () {
		var map: { [key: number]: boolean } = {}
		var dict = ViewId as any
		for (let k in dict) {
			let v = dict[k]
			if (typeof (v) == "number") {
				if (map[v]) {
					throw "重复ViewId => " + v
				} else {
					map[v] = true
				}
			}
		}
	})()
}


