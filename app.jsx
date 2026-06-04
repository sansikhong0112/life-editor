/* ============ 主应用 ============ */
const STORE_KEY = "life-nodes-v2";

function loadNodes(){
  try{ const s=localStorage.getItem(STORE_KEY); if(s) return JSON.parse(s); }catch(e){}
  return NODES.map(n=>({...n}));
}

function useVW(){
  const [w,setW] = React.useState(()=> typeof window!=="undefined" ? window.innerWidth : 1440);
  React.useEffect(()=>{
    const f=()=>setW(window.innerWidth);
    window.addEventListener("resize",f);
    return ()=>window.removeEventListener("resize",f);
  },[]);
  return w;
}

function App(){
  const [nodes,setNodes] = React.useState(loadNodes);
  const [selId,setSelId] = React.useState("n_job");
  const [draft,setDraft] = React.useState(null);
  const [zoomLevel,setZoomLevel] = React.useState("年");
  const [filters,setFilters] = React.useState({ stages:{}, cats:{}, tags:{} });
  const vw = useVW();

  // 持久化
  React.useEffect(()=>{ try{ localStorage.setItem(STORE_KEY, JSON.stringify(nodes)); }catch(e){} }, [nodes]);

  // 选中 → 生成草稿
  React.useEffect(()=>{
    const n = nodes.find(x=>x.id===selId);
    setDraft(n? JSON.parse(JSON.stringify(n)) : null);
  }, [selId]);

  const setField = (patch)=> setDraft(d=>({...d, ...patch}));

  const save = ()=>{
    setNodes(ns=>ns.map(n=>n.id===draft.id
      ? {...draft, updated:nowStr()} : n));
    flash();
  };
  const cancel = ()=> setSelId(null);
  const del = ()=>{
    if(!draft) return;
    setNodes(ns=>ns.filter(n=>n.id!==draft.id));
    setSelId(null);
  };
  const add = ()=>{
    const id = "n_"+Date.now();
    const node = { id, title:"新的节点", year:"2030", x:1400, stage:"future", cat:"growth",
      icon:"✨", date:"2030-01", place:"", emotion:"expect", tags:[], note:"",
      created:nowStr(), updated:nowStr() };
    setNodes(ns=>[...ns, node]);
    setSelId(id);
  };

  // 筛选：分类/阶段/标签 关闭则隐藏
  const visNodes = nodes.filter(n=>{
    if(filters.cats[n.cat]===false) return false;
    if(filters.stages[stageMap(n.stage)]===false) return false;
    const tg = n.tags||[];
    if(tg.length && tg.every(t=>filters.tags[t]===false)) return false;
    return true;
  });

  const toggle = (kind,id)=> setFilters(f=>({...f, [kind]:{...f[kind], [id]: f[kind][id]===false ? true : false}}));

  const counts = {};
  nodes.forEach(n=>{ counts[n.cat]=(counts[n.cat]||0)+1; });

  // 响应式布局：面板打开或屏幕变窄时，左栏收成图标栏；更窄时面板改为浮层
  const panelOpen   = draft != null;
  const navCollapsed = (panelOpen && vw < 1440) || vw < 1024;
  const panelOverlay = vw < 1180;
  const showScrim    = panelOpen && panelOverlay && vw < 1024;

  return (
    <div className="app">
      <TopBar count={nodes.length}/>
      <div className="app-main">
        <Sidebar filters={filters} toggle={toggle} counts={counts} onAdd={add} collapsed={navCollapsed}/>
        <Canvas nodes={visNodes} selId={selId} onSelect={setSelId}
          zoomLevel={zoomLevel} setZoomLevel={setZoomLevel}/>
        {showScrim && <div className="panel-scrim" onClick={cancel}></div>}
        <EditPanel draft={draft} overlay={panelOverlay} set={setField} onSave={save} onCancel={cancel} onDelete={del}/>
      </div>
      <div id="toast"></div>
    </div>
  );
}

function stageMap(s){ return s==="studentLow"?"student" : s==="growthLow"?"growth" : s; }
function nowStr(){
  const d=new Date(), p=x=>String(x).padStart(2,"0");
  return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}
function flash(){
  const t=document.getElementById("toast"); if(!t) return;
  t.textContent="已保存"; t.className="show";
  setTimeout(()=>{ t.className=""; }, 1600);
}

// 注入所有 CSS
const style=document.createElement("style");
style.textContent = topbarCSS + sidebarCSS + canvasCSS + panelCSS + `
.app-main{position:relative;}
.panel-scrim{position:absolute; inset:0; z-index:38; background:rgba(28,32,44,.20); animation:fade .2s ease both;}
#toast{position:fixed; left:50%; bottom:30px; transform:translateX(-50%) translateY(12px);
  background:#2B303B; color:#fff; padding:10px 22px; border-radius:11px; font-size:13.5px; font-weight:600;
  box-shadow:0 8px 24px rgba(0,0,0,.25); opacity:0; pointer-events:none; transition:.25s; z-index:99;
  display:flex; align-items:center; gap:8px;}
#toast.show{opacity:1; transform:translateX(-50%) translateY(0);}
#toast::before{content:"✓"; color:#34B864; font-weight:800;}
`;
document.head.appendChild(style);

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
