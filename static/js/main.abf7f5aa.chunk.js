(this["webpackJsonp@webchat_test/admin-ui"]=this["webpackJsonp@webchat_test/admin-ui"]||[]).push([[0],[,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var c=n(1),s=n.n(c),a=n(6),i=n.n(a),o=(n(12),n(13),n(7)),r=n(2),d=s.a.createContext(void 0),l=s.a.createContext(void 0),u=function(e){var t=Object(c.useState)(null),n=Object(r.a)(t,2),s=n[0],a=n[1],i=function(t){t.type in e?e[t.type](JSON.parse(t.data)):console.error("Unhandled socket event type {".concat(t.type,"}:"),t)};return Object(c.useEffect)((function(){a(function(e){try{var t=new WebSocket("wss://0cskis4880.execute-api.us-east-1.amazonaws.com/dev/");return t.onmessage=e,console.log("Successfully websocket connection:",t),t}catch(n){return console.log("Something went wrong while websocket connection: ",n),null}}(i))}),[]),s},j=n(0),b=function(e){var t=e.children,n=Object(c.useState)([]),s=Object(r.a)(n,2),a=s[0],i=s[1],b=u({message:function(e){console.log("Received message:",e),i((function(t){return[].concat(Object(o.a)(t),[e])}))}});return b?Object(j.jsx)(d.Provider,{value:{socket:b},children:Object(j.jsx)(l.Provider,{value:{messages:a},children:t})}):Object(j.jsx)(j.Fragment,{children:"Loading..."})},m=(n(15),n.p+"static/media/bg.8283151c.mp4"),O=function(e){return Object(j.jsx)("video",{className:"live_bg",src:m,autoPlay:!0,loop:!0,muted:!0,width:"100%",height:"100%"})},v=(n(16),function(e){var t=Object(c.useContext)(l).messages;return Object(j.jsx)("ul",{className:"messages_list",children:t.map((function(e){return Object(j.jsxs)("li",{className:"".concat((null===e||void 0===e?void 0:e.owner)?"my":""),children:["[",e.date,"]: ",e.text]},e.id)}))})}),f=function(){var e=Object(c.useContext)(d).socket;return{sendMessage:function(t){!function(e,t){var n={action:"sendmessage",text:t.message};e.send(JSON.stringify(n))}(e,{message:t})}}},h=(n(17),function(e){var t=Object(c.useState)(""),n=Object(r.a)(t,2),s=n[0],a=n[1],i=f().sendMessage,o=function(){a(""),i(s)};return Object(j.jsxs)("div",{className:"message_editor_container",children:[Object(j.jsx)("textarea",{onKeyDown:function(e){"Enter"===e.code&&(o(),e.preventDefault())},value:s,onChange:function(e){a(e.target.value)},name:"msg_editor",id:"msg_editor_textarea",cols:30,rows:10}),Object(j.jsx)("button",{onClick:o,className:"message_editor__send_button"})]})}),x=(n(18),function(e){var t=e.className,n=e.children,c=e.sideBar,s=(e.containerClassName,e.controls),a=e.toolbar;return Object(j.jsxs)("div",{className:"window ".concat(t||""),children:[Object(j.jsxs)("div",{className:"window__header",children:[s&&Object(j.jsx)("div",{className:"window__controls"}),a||null]}),Object(j.jsxs)("div",{className:"window__inner",children:[c&&Object(j.jsx)("div",{className:"window__sidebar",children:c}),Object(j.jsx)("div",{className:"window__content",children:n})]})]})}),g=(n(19),function(e){return Object(j.jsx)(x,{className:"main_window",controls:!0,children:Object(j.jsxs)("div",{className:"main_window__container",children:[Object(j.jsx)(v,{}),Object(j.jsx)(h,{})]})})});var w=function(){return Object(j.jsx)(b,{children:Object(j.jsxs)("div",{className:"App",children:[Object(j.jsx)(O,{}),Object(j.jsx)("div",{className:"app__container",children:Object(j.jsx)(g,{})})]})})},_=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,21)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),c(e),s(e),a(e),i(e)}))};i.a.render(Object(j.jsx)(s.a.StrictMode,{children:Object(j.jsx)(w,{})}),document.getElementById("root")),_()}],[[20,1,2]]]);
//# sourceMappingURL=main.abf7f5aa.chunk.js.map