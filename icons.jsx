/* ============ 线性图标库 ============ */
const Ic = {
  search:   <path d="M11 11l4 4M7.5 13a5.5 5.5 0 110-11 5.5 5.5 0 010 11z"/>,
  undo:     <path d="M5 9h7a4 4 0 010 8H9M5 9l3-3M5 9l3 3"/>,
  redo:     <path d="M15 9H8a4 4 0 000 8h3M15 9l-3-3M15 9l-3 3"/>,
  bell:     <path d="M10 3a4 4 0 014 4c0 4 1.5 5 2 6H4c.5-1 2-2 2-6a4 4 0 014-4zM8.5 16a1.5 1.5 0 003 0"/>,
  help:     <path d="M10 17a7 7 0 100-14 7 7 0 000 14zM8.2 8a1.8 1.8 0 113 1.4c-.7.5-1.2.9-1.2 1.8M10 13.4h.01"/>,
  sun:      <path d="M10 4V2.5M10 17.5V16M16 10h1.5M2.5 10H4M14.2 5.8l1-1M4.8 15.2l1-1M14.2 14.2l1 1M4.8 4.8l1 1M10 7a3 3 0 100 6 3 3 0 000-6z"/>,
  timeline: <path d="M3 6h14M3 10h14M3 14h14M7 6v0M11 10v0M9 14v0"/>,
  calendar: <path d="M4 5h12v12H4zM4 8h12M7 3v3M13 3v3M8 12h0M11 12h0"/>,
  map:      <path d="M10 17s5-4.5 5-8a5 5 0 10-10 0c0 3.5 5 8 5 8zM10 7.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"/>,
  album:    <path d="M4 5h12v10H4zM4 12l3-3 3 3 3-4 3 3M13 8.2h0"/>,
  chart:    <path d="M4 16V9M9 16V4M14 16v-5M3 16.5h14"/>,
  plus:     <path d="M10 4.5v11M4.5 10h11"/>,
  plusSm:   <path d="M8 3.5v9M3.5 8h9"/>,
  today:    <path d="M4 5h12v11H4zM4 9h12M7 3v3M13 3v3M10 12h0"/>,
  chevL:    <path d="M12 5l-5 5 5 5"/>,
  chevR:    <path d="M8 5l5 5-5 5"/>,
  chevDown: <path d="M5 8l5 5 5-5"/>,
  minus:    <path d="M5 10h10"/>,
  expand:   <path d="M4 7V4h3M16 7V4h-3M4 13v3h3M16 13v3h-3"/>,
  trash:    <path d="M4 6h12M8 6V4h4v2M6 6l1 10h6l1-10M9 9v4M11 9v4"/>,
  close:    <path d="M5 5l10 10M15 5L5 15"/>,
  cal2:     <path d="M3.5 4.5h11v10h-11zM3.5 7.5h11M6 3v2.2M12 3v2.2"/>,
  pin:      <path d="M9 16s4.5-4 4.5-7.2A4.5 4.5 0 109 13M9 6.6a1.7 1.7 0 100 3.4 1.7 1.7 0 000-3.4z"/>,
  tag:      <path d="M3 3h6l7 7-6 6-7-7V3zM6 6h.01"/>,
  smile:    <path d="M9 16.5a7.5 7.5 0 100-15 7.5 7.5 0 000 15zM6.4 6.6h0M11.6 6.6h0M6.2 10.6a3.5 3.5 0 005.6 0"/>,
  image:    <path d="M3 4.5h12v9H3zM3 11l3-3 3 3 3-3.5 3 3M6 7.2h0"/>,
  manage:   <path d="M4 6h8M4 10h8M4 14h5M14 9l2 2-2 2M14 9v6"/>,
};

function Icon({ name, cls="" }) {
  return <svg viewBox="0 0 20 20" className={"icon "+cls} aria-hidden="true">{Ic[name]}</svg>;
}

// 简洁的树苗 / logo 标记
function Logo() {
  return (
    <svg viewBox="0 0 40 40" width="38" height="38" aria-hidden="true">
      <rect x="1" y="1" width="38" height="38" rx="11" fill="#fff" stroke="#E6E8EE"/>
      <path d="M20 31V16" stroke="#6B5DE6" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M20 20c0-3.6-2.6-6.4-6-7 0 3.8 2.4 6.6 6 7z" fill="#34B864"/>
      <path d="M20 17.5c0-3.4 2.5-6 5.8-6.6 0 3.6-2.4 6.2-5.8 6.6z" fill="#6B5DE6"/>
      <path d="M16 31h8" stroke="#9AA2AE" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  );
}

Object.assign(window, { Ic, Icon, Logo });
