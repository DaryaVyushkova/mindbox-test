"use strict";(self.webpackChunktodo_app=self.webpackChunktodo_app||[]).push([[618],{618:(e,l,t)=>{t.r(l),t.d(l,{default:()=>o});t(5043);var n=t(6051),s=t(3433),i=t(200),r=t(8307),a=t(579);const o=()=>{const{filter:e,setFilter:l}=(0,r.Zw)(),t=e=>()=>{l(e)},o=l=>e===l?"primary":"default";return(0,a.jsxs)(n.A.Compact,{style:{width:"100%",justifyContent:"center"},children:[(0,a.jsx)(s.Ay,{onClick:t(i.D.All),type:o(i.D.All),children:"All"}),(0,a.jsx)(s.Ay,{type:o(i.D.Active),onClick:t(i.D.Active),children:"Active"}),(0,a.jsx)(s.Ay,{onClick:t(i.D.Completed),type:o(i.D.Completed),children:"Completed"})]})}},6051:(e,l,t)=>{t.d(l,{A:()=>x});var n=t(5043),s=t(8139),i=t.n(s),r=t(2149);function a(e){return["small","middle","large"].includes(e)}function o(e){return!!e&&("number"===typeof e&&!Number.isNaN(e))}var c=t(5296),d=t(5132);const p=n.createContext({latestIndex:0}),u=p.Provider,m=e=>{let{className:l,index:t,children:s,split:i,style:r}=e;const{latestIndex:a}=n.useContext(p);return null===s||void 0===s?null:n.createElement(n.Fragment,null,n.createElement("div",{className:l,style:r},s),t<a&&i&&n.createElement("span",{className:`${l}-split`},i))};var v=t(8309),y=function(e,l){var t={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&l.indexOf(n)<0&&(t[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var s=0;for(n=Object.getOwnPropertySymbols(e);s<n.length;s++)l.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(e,n[s])&&(t[n[s]]=e[n[s]])}return t};const f=n.forwardRef(((e,l)=>{var t,s,d;const{getPrefixCls:p,space:f,direction:C}=n.useContext(c.QO),{size:x=(null!==(t=null===f||void 0===f?void 0:f.size)&&void 0!==t?t:"small"),align:g,className:h,rootClassName:A,children:N,direction:b="horizontal",prefixCls:O,split:j,style:w,wrap:$=!1,classNames:k,styles:E}=e,D=y(e,["size","align","className","rootClassName","children","direction","prefixCls","split","style","wrap","classNames","styles"]),[z,P]=Array.isArray(x)?x:[x,x],I=a(P),F=a(z),G=o(P),S=o(z),_=(0,r.A)(N,{keepEmpty:!0}),M=void 0===g&&"horizontal"===b?"center":g,Q=p("space",O),[R,W,Z]=(0,v.A)(Q),q=i()(Q,null===f||void 0===f?void 0:f.className,W,`${Q}-${b}`,{[`${Q}-rtl`]:"rtl"===C,[`${Q}-align-${M}`]:M,[`${Q}-gap-row-${P}`]:I,[`${Q}-gap-col-${z}`]:F},h,A,Z),B=i()(`${Q}-item`,null!==(s=null===k||void 0===k?void 0:k.item)&&void 0!==s?s:null===(d=null===f||void 0===f?void 0:f.classNames)||void 0===d?void 0:d.item);let H=0;const J=_.map(((e,l)=>{var t,s;null!==e&&void 0!==e&&(H=l);const i=(null===e||void 0===e?void 0:e.key)||`${B}-${l}`;return n.createElement(m,{className:B,key:i,index:l,split:j,style:null!==(t=null===E||void 0===E?void 0:E.item)&&void 0!==t?t:null===(s=null===f||void 0===f?void 0:f.styles)||void 0===s?void 0:s.item},e)})),K=n.useMemo((()=>({latestIndex:H})),[H]);if(0===_.length)return null;const L={};return $&&(L.flexWrap="wrap"),!F&&S&&(L.columnGap=z),!I&&G&&(L.rowGap=P),R(n.createElement("div",Object.assign({ref:l,className:q,style:Object.assign(Object.assign(Object.assign({},L),null===f||void 0===f?void 0:f.style),w)},D),n.createElement(u,{value:K},J)))})),C=f;C.Compact=d.Ay;const x=C}}]);
//# sourceMappingURL=618.340bbe6e.chunk.js.map