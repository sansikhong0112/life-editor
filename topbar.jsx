/* ============ 顶部栏 ============ */
const topbarCSS = `
.topbar{height:64px; flex:none; display:flex; align-items:center; gap:22px;
  padding:0 18px 0 20px; background:var(--panel); border-bottom:1px solid var(--border);}
.tb-brand{display:flex; align-items:center; gap:11px;}
.tb-title{font-size:18px; font-weight:700; letter-spacing:.5px; color:#23262F;}
.tb-sub{margin-left:14px; font-size:13px; color:var(--text-3); white-space:nowrap;}
.tb-sub b{color:var(--text-2); font-weight:600;}
.tb-spacer{flex:1;}
.tb-search{display:flex; align-items:center; gap:9px; width:320px; height:38px;
  padding:0 12px; border-radius:11px; background:#F4F5F8; border:1px solid transparent; color:var(--text-3); transition:.15s;}
.tb-search:focus-within{background:#fff; border-color:var(--primary-soft); box-shadow:0 0 0 3px var(--primary-softer);}
.tb-search input{flex:1; border:none; background:none; outline:none; font-size:13.5px; color:var(--text);}
.tb-search input::placeholder{color:var(--text-3);}
.tb-kbd{font-size:11px; color:var(--text-4); border:1px solid var(--border-2); border-radius:5px; padding:1px 5px; font-weight:600;}
.tb-divider{width:1px; height:24px; background:var(--border);}
.tb-avatar{width:36px; height:36px; border-radius:50%; border:2px solid #fff; box-shadow:0 0 0 1px var(--border-2);
  background:linear-gradient(135deg,#7C6FF0,#A99CEC); color:#fff; font-size:14px; font-weight:700;
  display:flex; align-items:center; justify-content:center;}
.tb-tools{display:flex; align-items:center; gap:3px;}
@media (max-width:1180px){ .tb-sub{display:none;} }
@media (max-width:1024px){ .tb-search{width:210px;} .topbar{gap:16px;} }
@media (max-width:920px){ .tb-search{width:150px;} .topbar{gap:12px; padding:0 14px;} .tb-tools .iconbtn[title="\u5e2e\u52a9"]{display:none;} }
@media (max-width:820px){ .tb-search .tb-kbd{display:none;} }
`;

function TopBar({ count }) {
  return (
    <header className="topbar">
      <div className="tb-brand">
        <Logo/>
        <div className="tb-title">人生节点记录器</div>
      </div>
      <div className="tb-sub">记录人生重要时刻 · 连接过去、现在与未来</div>
      <div className="tb-spacer"></div>
      <label className="tb-search">
        <Icon name="search" cls="sm"/>
        <input placeholder="搜索节点、标签或地点" />
        <span className="tb-kbd">⌘K</span>
      </label>
      <div className="tb-tools">
        <button className="iconbtn" title="撤销"><Icon name="undo"/></button>
        <button className="iconbtn" title="重做"><Icon name="redo"/></button>
        <div className="tb-divider"></div>
        <button className="iconbtn" title="通知"><Icon name="bell"/></button>
        <button className="iconbtn" title="帮助"><Icon name="help"/></button>
        <button className="iconbtn" title="主题"><Icon name="sun"/></button>
      </div>
      <button className="tb-avatar" aria-label="头像">头</button>
    </header>
  );
}

Object.assign(window, { TopBar, topbarCSS });
