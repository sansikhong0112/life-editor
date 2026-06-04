/* ============ 左侧栏 ============ */
const sidebarCSS = `
.sidebar{width:248px; flex:none; background:var(--panel); border-right:1px solid var(--border);
  display:flex; flex-direction:column; overflow:hidden; transition:width .22s cubic-bezier(.4,0,.2,1);}
.sidebar.rail{width:64px;}
.sidebar.rail .sb-scroll{padding:14px 12px 8px;}
.sidebar.rail .sb-nav{gap:6px; margin-bottom:0;}
.sidebar.rail .sb-navitem{justify-content:center; gap:0; padding:11px 0;}
.sidebar.rail .sb-foot{padding:12px;}
.sidebar.rail .sb-addnode{height:44px; border-radius:12px;}
.sb-scroll{flex:1; overflow-y:auto; padding:14px 14px 8px;}
.sb-nav{display:flex; flex-direction:column; gap:2px; margin-bottom:18px;}
.sb-navitem{display:flex; align-items:center; gap:11px; padding:9px 12px; border-radius:10px;
  font-size:14px; font-weight:600; color:var(--text-2); transition:.13s; text-align:left; width:100%;}
.sb-navitem:hover{background:var(--hairline); color:var(--text);}
.sb-navitem.on{background:var(--primary-soft); color:var(--primary);}
.sb-navitem .icon{color:inherit;}

.sb-sec{margin-bottom:18px;}
.sb-sechead{display:flex; align-items:center; justify-content:space-between; padding:0 4px 8px;}
.sb-sectitle{font-size:12px; font-weight:700; color:var(--text-3); letter-spacing:.6px;}
.sb-add{display:inline-flex; align-items:center; justify-content:center; width:22px; height:22px;
  border-radius:6px; color:var(--text-3); transition:.13s;}
.sb-add:hover{background:var(--primary-soft); color:var(--primary);}

.sb-row{display:flex; align-items:center; gap:10px; padding:7px 9px; border-radius:9px; transition:.13s; width:100%; text-align:left;}
.sb-row:hover{background:var(--hairline);}
.sb-row.off{opacity:.42;}
.sb-dot{width:9px; height:9px; border-radius:50%; flex:none;}
.sb-rowname{font-size:13.5px; color:var(--text); flex:1;}
.sb-rowmeta{font-size:12px; color:var(--text-4); font-variant-numeric:tabular-nums;}
.sb-catico{width:18px; text-align:center; font-size:14px; flex:none; filter:saturate(1.05);}
.sb-stageico{width:26px;height:26px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;flex:none;}

.sb-tags{display:flex; flex-wrap:wrap; gap:7px; padding:2px 4px;}
.sb-tag{cursor:pointer; border:1px solid transparent; transition:.13s;}
.sb-tag.off{opacity:.4;}
.sb-manage{display:inline-flex; align-items:center; gap:6px; margin:9px 4px 0; font-size:12.5px;
  color:var(--primary); font-weight:600;}
.sb-foot{padding:14px; border-top:1px solid var(--border);}
.sb-addnode{width:100%; height:46px; border-radius:13px; background:var(--primary); color:#fff;
  font-size:14.5px; font-weight:700; display:flex; align-items:center; justify-content:center; gap:8px;
  box-shadow:0 6px 16px rgba(107,93,230,.28); transition:.15s;}
.sb-addnode:hover{background:var(--primary-600); transform:translateY(-1px); box-shadow:0 9px 22px rgba(107,93,230,.34);}
.sb-addnode:active{transform:translateY(0);}
`;

function hex2rgba(h,a){const n=parseInt(h.slice(1),16);return `rgba(${n>>16&255},${n>>8&255},${n&255},${a})`;}

function Sidebar({ filters, toggle, counts, onAdd, collapsed }) {
  const nav = [
    ["timeline","时间线",true],["calendar","日历视图"],["map","地图视图"],
    ["album","回忆相册"],["chart","统计与洞察"],
  ];
  if(collapsed){
    return (
      <aside className="sidebar rail">
        <div className="sb-scroll no-scrollbar">
          <nav className="sb-nav">
            {nav.map(([ic,label,on])=>(
              <button key={ic} className={"sb-navitem"+(on?" on":"")} title={label}>
                <Icon name={ic} cls="sm"/>
              </button>
            ))}
          </nav>
        </div>
        <div className="sb-foot">
          <button className="sb-addnode" onClick={onAdd} title="添加节点">
            <Icon name="plus" cls="sm"/>
          </button>
        </div>
      </aside>
    );
  }
  return (
    <aside className="sidebar">
      <div className="sb-scroll no-scrollbar">
        <nav className="sb-nav">
          {nav.map(([ic,label,on])=>(
            <button key={ic} className={"sb-navitem"+(on?" on":"")}>
              <Icon name={ic} cls="sm"/>{label}
            </button>
          ))}
        </nav>

        <Section title="人生阶段">
          {STAGES.map(s=>(
            <button key={s.id} className={"sb-row"+(filters.stages[s.id]===false?" off":"")}
              onClick={()=>toggle("stages",s.id)}>
              <span className="sb-dot" style={{background:s.color}}></span>
              <span className="sb-rowname">{s.name}</span>
              <span className="sb-rowmeta">{s.age}</span>
            </button>
          ))}
        </Section>

        <Section title="分类">
          {CATEGORIES.map(c=>(
            <button key={c.id} className={"sb-row"+(filters.cats[c.id]===false?" off":"")}
              onClick={()=>toggle("cats",c.id)}>
              <span className="sb-catico">{c.icon}</span>
              <span className="sb-rowname">{c.name}</span>
              {counts[c.id]?<span className="sb-rowmeta">{counts[c.id]}</span>:null}
            </button>
          ))}
        </Section>

        <Section title="标签">
          <div className="sb-tags">
            {TAGS.map(t=>(
              <span key={t.id}
                className={"pill sb-tag"+(filters.tags[t.id]===false?" off":"")}
                onClick={()=>toggle("tags",t.id)}
                style={{background:hex2rgba(t.color,.13), color:t.color, borderColor:hex2rgba(t.color,.22)}}>
                {t.name}
              </span>
            ))}
          </div>
          <a className="sb-manage"><Icon name="manage" cls="xs"/>管理标签</a>
        </Section>
      </div>

      <div className="sb-foot">
        <button className="sb-addnode" onClick={onAdd}>
          <Icon name="plus" cls="sm"/>添加节点
        </button>
      </div>
    </aside>
  );
}

function Section({ title, children }) {
  return (
    <div className="sb-sec">
      <div className="sb-sechead">
        <span className="sb-sectitle">{title}</span>
        <button className="sb-add"><Icon name="plusSm" cls="xs"/></button>
      </div>
      {children}
    </div>
  );
}

Object.assign(window, { Sidebar, sidebarCSS, hex2rgba });
