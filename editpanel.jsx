/* ============ 右侧编辑面板 ============ */
const panelCSS = `
.panel{width:344px; flex:none; background:var(--panel); border-left:1px solid var(--border);
  display:flex; flex-direction:column; overflow:hidden;}
.panel.is-overlay{position:absolute; top:0; right:0; bottom:0; z-index:40; border-left:1px solid var(--border-2);
  box-shadow:-12px 0 38px rgba(28,32,44,.14); animation:panelIn .24s cubic-bezier(.22,1,.36,1) both;}
@keyframes panelIn{from{transform:translateX(26px); opacity:0;} to{transform:none; opacity:1;}}
.pn-head{flex:none; display:flex; align-items:center; gap:10px; padding:16px 18px; border-bottom:1px solid var(--border);}
.pn-title{font-size:15.5px; font-weight:700; flex:1;}
.pn-body{flex:1; overflow-y:auto; padding:18px;}
.pn-foot{flex:none; display:flex; gap:10px; padding:14px 18px; border-top:1px solid var(--border);}
.pn-cancel,.pn-save{flex:1; height:42px; border-radius:11px; font-size:14px; font-weight:700; transition:.14s;}
.pn-cancel{background:#fff; border:1px solid var(--border-2); color:var(--text-2);}
.pn-cancel:hover{background:var(--hairline);}
.pn-save{background:var(--primary); color:#fff; box-shadow:0 5px 14px rgba(107,93,230,.3);}
.pn-save:hover{background:var(--primary-600); transform:translateY(-1px);}

.fld{margin-bottom:16px;}
.fld-label{display:block; font-size:12.5px; font-weight:600; color:var(--text-2); margin-bottom:7px;}
.fld-label .req{color:var(--c-travel); margin-left:2px;}
.inp{width:100%; height:40px; padding:0 12px; border-radius:10px; border:1px solid var(--border-2);
  background:#fff; font-size:13.5px; outline:none; transition:.14s;}
.inp::placeholder{color:var(--text-4);}
.inp:focus{border-color:var(--primary); box-shadow:0 0 0 3px var(--primary-softer);}
.inp-ico{position:relative;}
.inp-ico .icon{position:absolute; left:11px; top:50%; transform:translateY(-50%); color:var(--text-3); pointer-events:none;}
.inp-ico .inp{padding-left:35px;}
.inp.placeholder{color:var(--text-4);}
textarea.inp{height:auto; min-height:94px; padding:10px 12px; line-height:1.6; resize:none;}
.fld-count{text-align:right; font-size:11.5px; color:var(--text-4); margin-top:5px;}

/* 自定义下拉 */
.dd{position:relative;}
.dd-btn{width:100%; height:40px; padding:0 12px; border-radius:10px; border:1px solid var(--border-2);
  background:#fff; display:flex; align-items:center; gap:9px; font-size:13.5px; transition:.14s;}
.dd-btn:hover{border-color:#D3D7DF;}
.dd-btn.open{border-color:var(--primary); box-shadow:0 0 0 3px var(--primary-softer);}
.dd-btn .chev{margin-left:auto; color:var(--text-3);}
.dd-ico{width:22px;height:22px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:13px;flex:none;}
.dd-menu{position:absolute; top:46px; left:0; right:0; z-index:30; background:#fff; border:1px solid var(--border);
  border-radius:11px; box-shadow:var(--shadow-pop); padding:6px; max-height:240px; overflow-y:auto;}
.dd-item{display:flex; align-items:center; gap:9px; padding:8px 9px; border-radius:8px; font-size:13.5px; cursor:pointer;}
.dd-item:hover{background:var(--hairline);}
.dd-item.on{background:var(--primary-soft); color:var(--primary); font-weight:600;}

.tags-row{display:flex; flex-wrap:wrap; gap:7px; align-items:center;}
.tag-chip{display:inline-flex; align-items:center; gap:5px; padding:3px 5px 3px 10px; border-radius:18px; font-size:12px; font-weight:600;}
.tag-x{display:inline-flex; width:16px; height:16px; border-radius:50%; align-items:center; justify-content:center; opacity:.7;}
.tag-x:hover{opacity:1; background:rgba(0,0,0,.07);}
.tag-add{width:26px; height:26px; border-radius:50%; border:1.5px dashed var(--border-2); display:flex;
  align-items:center; justify-content:center; color:var(--text-3); transition:.13s;}
.tag-add:hover{border-color:var(--primary); color:var(--primary);}

.att-grid{display:grid; grid-template-columns:repeat(4,1fr); gap:9px;}
.att{position:relative; aspect-ratio:1; border-radius:10px; overflow:hidden; border:1px solid var(--border);
  background:#F2F3F6; display:flex; align-items:center; justify-content:center;}
.att img{width:100%; height:100%; object-fit:cover; display:block;}
.att-glyph{color:rgba(255,255,255,.92); filter:drop-shadow(0 1px 1px rgba(0,0,0,.15));}
.att-name{position:absolute; left:0; right:0; bottom:0; font-size:9px; color:#fff; padding:8px 4px 3px;
  background:linear-gradient(transparent,rgba(0,0,0,.6)); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;}
.att-more{display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px;
  border:1.5px dashed var(--border-2); color:var(--text-3); cursor:pointer; background:#FAFBFC; font-size:10.5px; font-weight:600;}
.att-more:hover{border-color:var(--primary); color:var(--primary);}
.fld-addlink{float:right; font-size:12px; font-weight:600; color:var(--primary); display:inline-flex; gap:4px; align-items:center;}

.pn-meta{margin-top:20px; padding-top:14px; border-top:1px solid var(--hairline); font-size:11.5px; color:var(--text-4); line-height:1.9;}
`;

const ATT_TINTS = [
  ["#FCE9D6","#F3B27A"], ["#DCE7FB","#8FB0F0"], ["#E2DEF8","#A99CEC"],
  ["#D9F0E3","#7CCBA0"], ["#FBD9E0","#EE9BAE"], ["#E3E6EB","#AEB6C2"],
];

window.EditPanel = function EditPanel({ draft, set, onSave, onCancel, onDelete, overlay }){
  const [ddCat,setDdCat]=React.useState(false);
  const [ddEmo,setDdEmo]=React.useState(false);
  const [ddTag,setDdTag]=React.useState(false);
  if(!draft) return null;

  const cat = CATEGORIES.find(c=>c.id===draft.cat)||CATEGORIES[0];
  const emo = EMOTIONS.find(e=>e.id===draft.emotion)||EMOTIONS[1];
  const tagObjs = (draft.tags||[]).map(id=>TAGS.find(t=>t.id===id)).filter(Boolean);
  const remTags = TAGS.filter(t=>!(draft.tags||[]).includes(t.id));
  const atts = draft.attachments||[];
  const note = draft.note||"";

  return (
    <aside className={"panel "+(overlay?"is-overlay":"fade-in")} key={draft.id}>
      <div className="pn-head">
        <div className="pn-title">编辑节点</div>
        <button className="iconbtn" onClick={onDelete} title="删除"><Icon name="trash" cls="sm"/></button>
        <button className="iconbtn" onClick={onCancel} title="关闭"><Icon name="close" cls="sm"/></button>
      </div>

      <div className="pn-body">
        <div className="fld">
          <label className="fld-label">标题<span className="req">*</span></label>
          <input className="inp" value={draft.title} onChange={e=>set({title:e.target.value})}/>
        </div>

        <div className="fld">
          <label className="fld-label">时间<span className="req">*</span></label>
          <div className="inp-ico"><Icon name="cal2" cls="sm"/>
            <input className="inp" value={draft.date||""} placeholder="YYYY-MM" onChange={e=>set({date:e.target.value})}/>
          </div>
        </div>

        <div className="fld">
          <label className="fld-label">结束时间</label>
          <div className="inp-ico"><Icon name="cal2" cls="sm"/>
            <input className={"inp"+(draft.endDate?"":" placeholder")} value={draft.endDate||""}
              placeholder="选择结束时间" onChange={e=>set({endDate:e.target.value})}/>
          </div>
        </div>

        <div className="fld">
          <label className="fld-label">分类<span className="req">*</span></label>
          <div className="dd">
            <button className={"dd-btn"+(ddCat?" open":"")} onClick={()=>{setDdCat(v=>!v);setDdEmo(false);setDdTag(false);}}>
              <span className="dd-ico" style={{background:hex2rgba(cat.color,.14)}}>{cat.icon}</span>
              {cat.name}<Icon name="chevDown" cls="xs chev"/>
            </button>
            {ddCat && <div className="dd-menu">
              {CATEGORIES.map(c=>(
                <div key={c.id} className={"dd-item"+(c.id===draft.cat?" on":"")}
                  onClick={()=>{set({cat:c.id});setDdCat(false);}}>
                  <span className="dd-ico" style={{background:hex2rgba(c.color,.14)}}>{c.icon}</span>{c.name}
                </div>
              ))}
            </div>}
          </div>
        </div>

        <div className="fld">
          <label className="fld-label">地点</label>
          <div className="inp-ico"><Icon name="pin" cls="sm"/>
            <input className="inp" value={draft.place||""} placeholder="添加地点" onChange={e=>set({place:e.target.value})}/>
          </div>
        </div>

        <div className="fld">
          <label className="fld-label">情绪</label>
          <div className="dd">
            <button className={"dd-btn"+(ddEmo?" open":"")} onClick={()=>{setDdEmo(v=>!v);setDdCat(false);setDdTag(false);}}>
              <span style={{fontSize:16}}>{emo.emoji}</span>{emo.label}<Icon name="chevDown" cls="xs chev"/>
            </button>
            {ddEmo && <div className="dd-menu">
              {EMOTIONS.map(e=>(
                <div key={e.id} className={"dd-item"+(e.id===draft.emotion?" on":"")}
                  onClick={()=>{set({emotion:e.id});setDdEmo(false);}}>
                  <span style={{fontSize:15}}>{e.emoji}</span>{e.label}
                </div>
              ))}
            </div>}
          </div>
        </div>

        <div className="fld">
          <label className="fld-label">标签</label>
          <div className="tags-row">
            {tagObjs.map(t=>(
              <span key={t.id} className="tag-chip" style={{background:hex2rgba(t.color,.13), color:t.color}}>
                {t.name}
                <span className="tag-x" onClick={()=>set({tags:draft.tags.filter(x=>x!==t.id)})}><Icon name="close" cls="xs"/></span>
              </span>
            ))}
            <div className="dd" style={{display:"inline-block"}}>
              <button className="tag-add" onClick={()=>{setDdTag(v=>!v);setDdCat(false);setDdEmo(false);}}><Icon name="plusSm" cls="xs"/></button>
              {ddTag && remTags.length>0 && <div className="dd-menu" style={{left:"auto",right:0,minWidth:130}}>
                {remTags.map(t=>(
                  <div key={t.id} className="dd-item" onClick={()=>{set({tags:[...(draft.tags||[]),t.id]});setDdTag(false);}}>
                    <span className="sb-dot" style={{background:t.color,width:8,height:8,borderRadius:"50%"}}></span>{t.name}
                  </div>
                ))}
              </div>}
            </div>
          </div>
        </div>

        <div className="fld">
          <label className="fld-label">备注</label>
          <textarea className="inp" maxLength={500} value={note} onChange={e=>set({note:e.target.value})}/>
          <div className="fld-count">{note.length}/500</div>
        </div>

        <div className="fld">
          <label className="fld-label">附件<a className="fld-addlink"><Icon name="plusSm" cls="xs"/>添加</a></label>
          <div className="att-grid">
            {atts.slice(0,3).map((name,i)=>{
              const [a,b]=ATT_TINTS[i%ATT_TINTS.length];
              return (
                <div className="att" key={name} style={{background:`linear-gradient(135deg,${a},${b})`}}>
                  <span className="att-glyph"><Icon name="image" cls="sm"/></span>
                  <span className="att-name">{name}</span>
                </div>
              );
            })}
            <div className="att att-more"><Icon name="plus" cls="sm"/>更多</div>
          </div>
        </div>

        <div className="pn-meta">
          <div>创建于：{draft.created||"—"}</div>
          <div>最后更新：{draft.updated||"—"}</div>
        </div>
      </div>

      <div className="pn-foot">
        <button className="pn-cancel" onClick={onCancel}>取消</button>
        <button className="pn-save" onClick={onSave}>保存</button>
      </div>
    </aside>
  );
};

Object.assign(window, { panelCSS });
