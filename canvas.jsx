/* ============ 中间画布 ============ */
const canvasCSS = `
.canvas{flex:1; min-width:0; display:flex; flex-direction:column; background:var(--bg); position:relative;}

/* 工具条 */
.cv-toolbar{flex:none; display:flex; align-items:center; gap:13px; padding:12px 22px 10px; flex-wrap:nowrap;}
.cv-btn{display:inline-flex; align-items:center; gap:6px; height:36px; padding:0 14px; border-radius:10px;
  background:#fff; border:1px solid var(--border-2); font-size:13.5px; font-weight:600; color:var(--text-2); transition:.13s;}
.cv-btn:hover{border-color:#D3D7DF; color:var(--text); box-shadow:var(--shadow-card);}
.cv-nav{display:flex; background:#fff; border:1px solid var(--border-2); border-radius:10px; overflow:hidden;}
.cv-nav button{width:36px; height:36px; display:flex; align-items:center; justify-content:center; color:var(--text-2); transition:.13s;}
.cv-nav button:hover{background:var(--hairline); color:var(--text);}
.cv-nav button+button{border-left:1px solid var(--border);}
.cv-range{font-size:18px; font-weight:700; color:var(--text); font-variant-numeric:tabular-nums; letter-spacing:.3px; white-space:nowrap; flex:none;}
.cv-count{font-size:13px; color:var(--text-3); white-space:nowrap; flex:none;}
.cv-count b{color:var(--text-2); font-weight:700;}
.cv-spacer{flex:1;}
.cv-zlabel{font-size:13px; color:var(--text-3); margin-right:2px; white-space:nowrap; flex:none;}
.cv-zoom{display:flex; align-items:center; gap:9px; flex:none;}
.seg{flex:none;}
@media (max-width:1560px){ .cv-zlabel{display:none;} }
@media (max-width:1430px){ .cv-count{display:none;} }
@media (max-width:1320px){ .cv-zrange{width:64px;} .cv-toolbar{gap:9px;} }
.cv-zrange{appearance:none; width:96px; height:4px; border-radius:3px; background:#E2E5EC; outline:none;}
.cv-zrange::-webkit-slider-thumb{appearance:none; width:15px; height:15px; border-radius:50%; background:var(--primary); border:2.5px solid #fff; box-shadow:0 1px 4px rgba(107,93,230,.5); cursor:pointer;}

/* 概览缩放轴 */
.cv-overview{flex:none; margin:0 22px; background:#fff; border:1px solid var(--border); border-radius:13px;
  height:78px; position:relative; padding:14px 16px 22px;}
.cv-ovtrack{position:absolute; left:16px; right:16px; top:18px; height:30px;}
.cv-ovdot{position:absolute; width:7px; height:7px; border-radius:50%; transform:translate(-50%,-50%); top:50%;}
.cv-axis{position:absolute; left:16px; right:16px; bottom:5px; height:14px;}
.cv-tick{position:absolute; transform:translateX(-50%); font-size:11px; color:var(--text-4); font-variant-numeric:tabular-nums;}
.cv-brush{position:absolute; top:8px; bottom:14px; border-radius:8px; background:rgba(107,93,230,.08);
  border:1.5px solid var(--primary); cursor:grab;}
.cv-brush:active{cursor:grabbing;}
.cv-bhandle{position:absolute; top:50%; width:7px; height:24px; border-radius:5px; background:#fff; border:1.5px solid var(--primary);
  transform:translateY(-50%); box-shadow:0 1px 3px rgba(0,0,0,.12);}
.cv-bhandle.l{left:-4px;} .cv-bhandle.r{right:-4px;}

/* 图谱 */
.cv-graph{flex:1; min-height:0; margin:12px 22px 8px; background:#fff; border:1px solid var(--border);
  border-radius:14px; display:flex; overflow:hidden; position:relative;}
.gr-labels{width:144px; flex:none; position:relative; border-right:1px dashed var(--border-2); background:linear-gradient(90deg,#FBFBFE,#fff); z-index:4;}
.gr-label{position:absolute; left:14px; right:10px; display:flex; align-items:center; gap:10px; transform:translateY(-50%);}
.gr-stageico{width:30px;height:30px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:15px;flex:none;}
.gr-stagename{font-size:13.5px; font-weight:700; color:var(--text);}
.gr-stageage{font-size:11.5px; color:var(--text-3); margin-top:1px;}
.gr-plot{flex:1; overflow-x:auto; overflow-y:hidden; position:relative;}
.gr-inner{position:relative; height:100%; transform-origin:left center;}
.gr-lane{position:absolute; left:0; right:0; border-bottom:1px dashed var(--hairline);}
.gr-svg{position:absolute; inset:0; width:100%; height:100%; pointer-events:none; overflow:visible;}
.gr-year{position:absolute; transform:translateX(-50%); font-size:12px; font-weight:600; color:var(--text-3); font-variant-numeric:tabular-nums;}
.gr-marker{position:absolute; top:14px; bottom:10px; width:0; border-left:1.5px dashed #B9B2EE; z-index:2;}
.gr-mpill{position:absolute; top:-9px; left:50%; transform:translateX(-50%); background:var(--primary); color:#fff;
  font-size:12px; font-weight:700; padding:3px 11px; border-radius:20px; box-shadow:0 3px 8px rgba(107,93,230,.35);}

/* 节点卡片 */
.node{position:absolute; transform:translateY(-50%); display:flex; align-items:center; gap:9px;
  height:44px; padding:0 13px 0 9px; background:#fff; border:1.5px solid var(--border-2); border-radius:12px;
  box-shadow:var(--shadow-node); cursor:pointer; transition:transform .13s, box-shadow .13s, border-color .13s; z-index:3; white-space:nowrap;}
.node:hover{transform:translateY(-50%) translateY(-2px); box-shadow:var(--shadow-pop); border-color:#D3D7DF;}
.node.sel{border-color:var(--primary); box-shadow:0 0 0 3px var(--primary-softer), var(--shadow-pop);}
.node-ico{width:28px; height:28px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:15px; flex:none;}
.node-title{font-size:13.5px; font-weight:600; color:var(--text);}
.node.group{height:54px; padding:0 15px 0 11px; border-style:dashed; background:#FCFCFE;}
.node.group .node-title{font-size:13.5px;}
.node-sub{font-size:11px; color:var(--text-3); margin-top:1px;}
.node-col{display:flex; flex-direction:column; justify-content:center;}

/* 底部缩略图 */
.cv-minimap{flex:none; margin:0 22px 10px; height:62px; position:relative;}
.cv-mmsvg{position:absolute; inset:0; width:100%; height:42px;}
.cv-mmaxis{position:absolute; left:0; right:0; bottom:0; height:14px;}
.cv-mmbrush{position:absolute; top:2px; height:38px; border-radius:7px; border:1.5px solid var(--primary);
  background:rgba(107,93,230,.06); cursor:grab;}

/* 图例 */
.cv-legend{flex:none; display:flex; align-items:center; justify-content:center; gap:22px; padding:6px 0 14px;}
.cv-leg{display:flex; align-items:center; gap:7px; font-size:12.5px; color:var(--text-2);}
.cv-leg .d{width:9px; height:9px; border-radius:50%;}
`;

const YEAR_MIN = 1988, YEAR_MAX = 2031;
const yearPct = y => (y - YEAR_MIN) / (YEAR_MAX - YEAR_MIN) * 100;
const AX_TICKS = [1990,1995,2000,2005,2010,2015,2020,2025,2030];

function catColor(id){ return (CATEGORIES.find(c=>c.id===id)||{}).color || "#9AA1AC"; }

window.Canvas = function Canvas({ nodes, selId, onSelect, zoomLevel, setZoomLevel }) {
  const [scale, setScale] = React.useState(1);
  const plotRef = React.useRef(null);
  const [brush, setBrush] = React.useState({ left: 27, width: 46 }); // percent

  // 阶段分行 y 坐标（内容相对像素）
  const stageY = { childhood:62, student:178, studentLow:230, explore:292, growth:402, growthLow:492, future:512 };
  const laneCenters = { childhood:62, student:178, explore:292, growth:402, future:512 };
  const contentW = 1180, contentH = 580;

  // 节点尺寸估算
  const nodeBox = n => {
    const isG = n.variant === "group";
    const w = isG ? (88 + (n.title.length)*15) : (54 + n.title.length*15);
    const h = isG ? 54 : 44;
    const y = stageY[n.variant==="group" ? (n.stage) : n.stage] || stageY[n.stage];
    return { x:n.x, y, w, h, cx:n.x+w/2 };
  };
  const boxes = {}; nodes.forEach(n=>{ boxes[n.id]=nodeBox(n); });

  // 连接线定义： [from, to, dashed]
  const links = [
    ["n_birth","n_primary",0],["n_primary","n_move",0],
    ["n_move","n_middle",0],["n_middle","n_trip",0],["n_trip","n_high",0],
    ["n_high","n_college",0],["n_college","n_grad",0],
    ["n_high","g_college",1],
    ["n_grad","n_job",0],["n_job","n_city",0],["n_city","n_love",0],
    ["n_love","g_rel",1],["n_love","n_future",1],
  ];
  const ports = (a,b)=>{
    const aR=a.x+a.w, aL=a.x, bR=b.x+b.w, bL=b.x;
    if(bL >= aR-8) return [aR, bL];      // b 在右 → 右出 左入
    if(bR <= aL+8) return [aL, bR];      // b 在左 → 左出 右入
    return [aR, bL];
  };
  const elbow = (a,b)=>{
    if(!a||!b) return "";
    const ay=a.y, by=b.y, [sx,tx]=ports(a,b);
    if(Math.abs(ay-by)<6) return `M${sx} ${ay} H${tx}`;
    const dir = by>ay?1:-1, s = sx<tx?1:-1, r=10;
    const midX = sx + (s>0 ? Math.min(30,(tx-sx)/2) : Math.max(-30,(tx-sx)/2));
    return `M${sx} ${ay} H${midX-s*r} Q${midX} ${ay} ${midX} ${ay+dir*r} V${by-dir*r} Q${midX} ${by} ${midX+s*r} ${by} H${tx}`;
  };

  // 拖动概览 brush → 滚动图谱
  const startBrush = (e)=>{
    e.preventDefault();
    const track = e.currentTarget.parentElement.getBoundingClientRect();
    const startX = e.clientX, startLeft = brush.left;
    const move = (ev)=>{
      const dx = (ev.clientX-startX)/track.width*100;
      let nl = Math.max(0, Math.min(100-brush.width, startLeft+dx));
      setBrush(b=>({...b, left:nl}));
      if(plotRef.current){
        const max = plotRef.current.scrollWidth - plotRef.current.clientWidth;
        plotRef.current.scrollLeft = nl/(100-brush.width)*max;
      }
    };
    const up = ()=>{ window.removeEventListener("mousemove",move); window.removeEventListener("mouseup",up); };
    window.addEventListener("mousemove",move); window.addEventListener("mouseup",up);
  };

  const zoomBy = d => setScale(s=>Math.max(0.6, Math.min(1.5, +(s+d).toFixed(2))));

  return (
    <div className="canvas">
      {/* 工具条 */}
      <div className="cv-toolbar">
        <button className="cv-btn"><Icon name="today" cls="sm"/>今天</button>
        <div className="cv-nav"><button><Icon name="chevL" cls="sm"/></button><button><Icon name="chevR" cls="sm"/></button></div>
        <div className="cv-range">1988 — 2030</div>
        <div className="cv-count">共 <b>{nodes.length}</b> 个节点</div>
        <div className="cv-spacer"></div>
        <span className="cv-zlabel">缩放级别</span>
        <div className="seg">
          {ZOOM_LEVELS.map(z=>(
            <button key={z} className={z===zoomLevel?"on":""} onClick={()=>setZoomLevel(z)}>{z}</button>
          ))}
        </div>
        <div className="cv-zoom">
          <button className="iconbtn" onClick={()=>zoomBy(-0.1)}><Icon name="minus" cls="sm"/></button>
          <input className="cv-zrange" type="range" min="0.6" max="1.5" step="0.05" value={scale}
            onChange={e=>setScale(+e.target.value)}/>
          <button className="iconbtn" onClick={()=>zoomBy(0.1)}><Icon name="plus" cls="sm"/></button>
        </div>
        <button className="iconbtn" title="全屏"><Icon name="expand" cls="sm"/></button>
      </div>

      {/* 概览缩放轴 */}
      <div className="cv-overview">
        <div className="cv-ovtrack">
          {SCATTER.map(([y,c],i)=>(
            <span key={i} className="cv-ovdot" style={{left:yearPct(y)+"%", background:catColor(c)}}></span>
          ))}
          <div className="cv-brush" style={{left:brush.left+"%", width:brush.width+"%"}} onMouseDown={startBrush}>
            <span className="cv-bhandle l"></span><span className="cv-bhandle r"></span>
          </div>
        </div>
        <div className="cv-axis">
          {AX_TICKS.map(y=>(<span key={y} className="cv-tick" style={{left:yearPct(y)+"%"}}>{y}</span>))}
        </div>
      </div>

      {/* 图谱 */}
      <div className="cv-graph">
        <div className="gr-labels">
          {STAGES.map(s=>(
            <div key={s.id} className="gr-label" style={{top:laneCenters[s.id]}}>
              <span className="gr-stageico" style={{background:hex2rgba(s.color,.14), color:s.color}}>{s.icon}</span>
              <div><div className="gr-stagename">{s.name}</div><div className="gr-stageage">{s.age}</div></div>
            </div>
          ))}
        </div>
        <div className="gr-plot" ref={plotRef}>
          <div className="gr-inner" style={{width:contentW, transform:`scale(${scale})`}}>
            {/* lane separators */}
            {Object.values(laneCenters).map((y,i)=>(<div key={i} className="gr-lane" style={{top:y+58}}></div>))}
            {/* connectors */}
            <svg className="gr-svg" viewBox={`0 0 ${contentW} ${contentH}`} preserveAspectRatio="none">
              {links.map(([f,t,dash],i)=>{
                const a=boxes[f], b=boxes[t]; if(!a||!b) return null;
                return <path key={i} d={elbow(a,b)} fill="none"
                  stroke={dash? "#C9CDD6":"#CDD2DB"} strokeWidth="1.6"
                  strokeDasharray={dash?"4 4":"0"} strokeLinecap="round"/>;
              })}
              {links.filter(l=>!l[2]).map(([f,t],i)=>{
                const a=boxes[f], b=boxes[t]; if(!a||!b) return null;
                const [sx,tx]=ports(a,b);
                return <g key={"d"+i}>
                  <circle cx={sx} cy={a.y} r="2.6" fill="#fff" stroke="#C2C7D0" strokeWidth="1.4"/>
                  <circle cx={tx} cy={b.y} r="2.6" fill="#fff" stroke="#C2C7D0" strokeWidth="1.4"/>
                </g>;
              })}
            </svg>
            {/* 年份标签 */}
            {nodes.filter(n=>n.year).map(n=>{
              const b=boxes[n.id];
              return <span key={"y"+n.id} className="gr-year" style={{left:b.cx, top:b.y-b.h/2-22}}>{n.year}</span>;
            })}
            {/* 2008 marker */}
            <div className="gr-marker" style={{left:boxes.n_college? boxes.n_college.x-34:690}}>
              <span className="gr-mpill">2008</span>
            </div>
            {/* 节点 */}
            {nodes.map(n=>{
              const b=boxes[n.id], col=catColor(n.cat), isG=n.variant==="group";
              return (
                <div key={n.id}
                  className={"node"+(isG?" group":"")+(n.id===selId?" sel":"")}
                  style={{left:b.x, top:b.y, width:b.w}}
                  onClick={()=>onSelect(n.id)}>
                  <span className="node-ico" style={{background:hex2rgba(col,.13)}}>{n.icon}</span>
                  <div className="node-col">
                    <span className="node-title">{n.title}</span>
                    {isG && n.sub? <span className="node-sub">{n.sub}</span>:null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 底部缩略图 */}
      <Minimap brush={brush}/>

      {/* 图例 */}
      <div className="cv-legend">
        {CATEGORIES.map(c=>(
          <div key={c.id} className="cv-leg"><span className="d" style={{background:c.color}}></span>{c.name}</div>
        ))}
      </div>
    </div>
  );
};

function Minimap({ brush }){
  // 生成一条平滑面积曲线
  const pts = React.useMemo(()=>{
    const n=44; let d="M0 42";
    for(let i=0;i<=n;i++){
      const x=i/n*100;
      const v=18 + 14*Math.sin(i*0.7)+8*Math.sin(i*0.31+2)+5*Math.cos(i*1.3);
      d+=` L${x.toFixed(1)} ${(40-Math.max(2,v)).toFixed(1)}`;
    }
    return d+" L100 42 Z";
  },[]);
  return (
    <div className="cv-minimap">
      <svg className="cv-mmsvg" viewBox="0 0 100 42" preserveAspectRatio="none">
        <defs><linearGradient id="mmg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6B5DE6" stopOpacity=".22"/><stop offset="1" stopColor="#6B5DE6" stopOpacity=".02"/>
        </linearGradient></defs>
        <path d={pts} fill="url(#mmg)" stroke="#B7AFEC" strokeWidth="1" vectorEffect="non-scaling-stroke"/>
      </svg>
      <div className="cv-mmbrush" style={{left:brush.left+"%", width:brush.width+"%"}}></div>
      <div className="cv-mmaxis">
        {AX_TICKS.map(y=>(<span key={y} className="cv-tick" style={{left:yearPct(y)+"%", bottom:0}}>{y}</span>))}
      </div>
    </div>
  );
}

Object.assign(window, { canvasCSS, catColor });
