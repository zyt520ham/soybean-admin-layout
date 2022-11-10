import { defineComponent as g, computed as h, openBlock as x, createElementBlock as b, normalizeStyle as w, unref as f, renderSlot as y, ref as tt, watch as et, onUnmounted as nt, createBlock as W, mergeProps as L, withCtx as C, createCommentVNode as T, createVNode as it } from "vue";
function ot(e) {
  let n = 0;
  for (let t = 0; t < e.length; ++t)
    e[t] === "&" && ++n;
  return n;
}
const j = /\s*,(?![^(]*\))\s*/g, rt = /\s+/g;
function dt(e, n) {
  const t = [];
  return n.split(j).forEach((i) => {
    let o = ot(i);
    if (o) {
      if (o === 1) {
        e.forEach((r) => {
          t.push(i.replace("&", r));
        });
        return;
      }
    } else {
      e.forEach((r) => {
        t.push(
          (r && r + " ") + i
        );
      });
      return;
    }
    let d = [
      i
    ];
    for (; o--; ) {
      const r = [];
      d.forEach((a) => {
        e.forEach((u) => {
          r.push(a.replace("&", u));
        });
      }), d = r;
    }
    d.forEach((r) => t.push(r));
  }), t;
}
function at(e, n) {
  const t = [];
  return n.split(j).forEach((i) => {
    e.forEach((o) => {
      t.push((o && o + " ") + i);
    });
  }), t;
}
function st(e) {
  let n = [""];
  return e.forEach((t) => {
    t = t && t.trim(), t && (t.includes("&") ? n = dt(n, t) : n = at(n, t));
  }), n.join(", ").replace(rt, " ");
}
function D(e) {
  if (!e)
    return;
  const n = e.parentElement;
  n && n.removeChild(e);
}
function z(e) {
  return document.querySelector(`style[cssr-id="${e}"]`);
}
function ut(e) {
  const n = document.createElement("style");
  return n.setAttribute("cssr-id", e), n;
}
function A(e) {
  return e ? /^\s*@(s|m)/.test(e) : !1;
}
const lt = /[A-Z]/g;
function R(e) {
  return e.replace(lt, (n) => "-" + n.toLowerCase());
}
function ft(e, n = "  ") {
  return typeof e == "object" && e !== null ? ` {
` + Object.entries(e).map((t) => n + `  ${R(t[0])}: ${t[1]};`).join(`
`) + `
` + n + "}" : `: ${e};`;
}
function ct(e, n, t) {
  return typeof e == "function" ? e({
    context: n.context,
    props: t
  }) : e;
}
function I(e, n, t, i) {
  if (!n)
    return "";
  const o = ct(n, t, i);
  if (!o)
    return "";
  if (typeof o == "string")
    return `${e} {
${o}
}`;
  const d = Object.keys(o);
  if (d.length === 0)
    return t.config.keepEmptyBlock ? e + ` {
}` : "";
  const r = e ? [
    e + " {"
  ] : [];
  return d.forEach((a) => {
    const u = o[a];
    if (a === "raw") {
      r.push(`
` + u + `
`);
      return;
    }
    a = R(a), u != null && r.push(`  ${a}${ft(u)}`);
  }), e && r.push("}"), r.join(`
`);
}
function k(e, n, t) {
  !e || e.forEach((i) => {
    if (Array.isArray(i))
      k(i, n, t);
    else if (typeof i == "function") {
      const o = i(n);
      Array.isArray(o) ? k(o, n, t) : o && t(o);
    } else
      i && t(i);
  });
}
function q(e, n, t, i, o, d) {
  const r = e.$;
  let a = "";
  if (!r || typeof r == "string")
    A(r) ? a = r : n.push(r);
  else if (typeof r == "function") {
    const s = r({
      context: i.context,
      props: o
    });
    A(s) ? a = s : n.push(s);
  } else if (r.before && r.before(i.context), !r.$ || typeof r.$ == "string")
    A(r.$) ? a = r.$ : n.push(r.$);
  else if (r.$) {
    const s = r.$({
      context: i.context,
      props: o
    });
    A(s) ? a = s : n.push(s);
  }
  const u = st(n), l = I(u, e.props, i, o);
  a ? (t.push(`${a} {`), d && l && d.insertRule(`${a} {
${l}
}
`)) : (d && l && d.insertRule(l), !d && l.length && t.push(l)), e.children && k(e.children, {
    context: i.context,
    props: o
  }, (s) => {
    if (typeof s == "string") {
      const c = I(u, { raw: s }, i, o);
      d ? d.insertRule(c) : t.push(c);
    } else
      q(s, n, t, i, o, d);
  }), n.pop(), a && t.push("}"), r && r.after && r.after(i.context);
}
function O(e, n, t, i = !1) {
  const o = [];
  return q(e, [], o, n, t, i ? e.instance.__styleSheet : void 0), i ? "" : o.join(`

`);
}
function ht(e) {
  for (var n = 0, t, i = 0, o = e.length; o >= 4; ++i, o -= 4)
    t = e.charCodeAt(i) & 255 | (e.charCodeAt(++i) & 255) << 8 | (e.charCodeAt(++i) & 255) << 16 | (e.charCodeAt(++i) & 255) << 24, t = (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), t ^= t >>> 24, n = (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16) ^ (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16);
  switch (o) {
    case 3:
      n ^= (e.charCodeAt(i + 2) & 255) << 16;
    case 2:
      n ^= (e.charCodeAt(i + 1) & 255) << 8;
    case 1:
      n ^= e.charCodeAt(i) & 255, n = (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16);
  }
  return n ^= n >>> 13, n = (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16), ((n ^ n >>> 15) >>> 0).toString(36);
}
typeof window < "u" && (window.__cssrContext = {});
function pt(e, n, t) {
  const { els: i } = n;
  if (t === void 0)
    i.forEach(D), n.els = [];
  else {
    const o = z(t);
    o && i.includes(o) && (D(o), n.els = i.filter((d) => d !== o));
  }
}
function P(e, n) {
  e.push(n);
}
function mt(e, n, t, i, o, d, r, a, u) {
  if (d && !u) {
    if (t === void 0) {
      console.error("[css-render/mount]: `id` is required in `silent` mode.");
      return;
    }
    const m = window.__cssrContext;
    m[t] || (m[t] = !0, O(n, e, i, d));
    return;
  }
  let l;
  if (t === void 0 && (l = n.render(i), t = ht(l)), u) {
    u.adapter(t, l != null ? l : n.render(i));
    return;
  }
  const s = z(t);
  if (s !== null && !r)
    return s;
  const c = s != null ? s : ut(t);
  if (l === void 0 && (l = n.render(i)), c.textContent = l, s !== null)
    return s;
  if (a) {
    const m = document.head.querySelector(`meta[name="${a}"]`);
    if (m)
      return document.head.insertBefore(c, m), P(n.els, c), c;
  }
  return o ? document.head.insertBefore(c, document.head.querySelector("style, link")) : document.head.appendChild(c), P(n.els, c), c;
}
function gt(e) {
  return O(this, this.instance, e);
}
function xt(e = {}) {
  const { id: n, ssr: t, props: i, head: o = !1, silent: d = !1, force: r = !1, anchorMetaName: a } = e;
  return mt(this.instance, this, n, i, o, d, r, a, t);
}
function yt(e = {}) {
  const { id: n } = e;
  pt(this.instance, this, n);
}
const B = function(e, n, t, i) {
  return {
    instance: e,
    $: n,
    props: t,
    children: i,
    els: [],
    render: gt,
    mount: xt,
    unmount: yt
  };
}, $t = function(e, n, t, i) {
  return Array.isArray(n) ? B(e, { $: null }, null, n) : Array.isArray(t) ? B(e, n, null, t) : Array.isArray(i) ? B(e, n, t, i) : B(e, n, t, null);
};
function v(e = {}) {
  let n = null;
  const t = {
    c: (...i) => $t(t, ...i),
    use: (i, ...o) => i.install(t, ...o),
    find: z,
    context: {},
    config: e,
    get __styleSheet() {
      if (!n) {
        const i = document.createElement("style");
        return document.head.appendChild(i), n = document.styleSheets[document.styleSheets.length - 1], n;
      }
      return n;
    }
  };
  return t;
}
const bt = g({ name: "LayoutHeader" }), wt = /* @__PURE__ */ g({
  ...bt,
  props: {
    fixed: { type: Boolean, default: !0 },
    zIndex: { default: 1001 },
    useMinWidthLayout: { type: Boolean },
    minWidth: { default: 1200 },
    height: { default: 56 },
    paddingLeft: { default: 0 },
    transitionDuration: { default: 300 },
    transitionTimingFunction: { default: "ease-in-out" }
  },
  setup(e) {
    const n = e, t = h(() => {
      const { fixed: d, zIndex: r, minWidth: a, height: u, paddingLeft: l, transitionDuration: s, transitionTimingFunction: c } = n, m = d ? "fixed" : "static", $ = n.useMinWidthLayout ? `min-width:${a}px;` : "";
      return `position:${m};z-index:${r};${$}height:${u}px;padding-left:${l}px;transition-duration:${s}ms;transition-timing-function:${c};`;
    }), { c: i } = v(), o = i(".admin-layout__header", {
      left: 0,
      top: 0,
      flexShrink: 0,
      boxSizing: "border-box",
      width: "100%",
      transitionProperty: "padding-left"
    });
    return o.render(), o.mount(), (d, r) => (x(), b("header", {
      class: "admin-layout__header",
      style: w(f(t))
    }, [
      y(d.$slots, "default")
    ], 4));
  }
}), _t = g({ name: "LayoutTab" }), vt = /* @__PURE__ */ g({
  ..._t,
  props: {
    fixed: { type: Boolean, default: !0 },
    top: { default: 56 },
    zIndex: { default: 999 },
    useMinWidthLayout: { type: Boolean },
    minWidth: { default: 1200 },
    height: { default: 56 },
    paddingLeft: { default: 0 },
    transitionDuration: { default: 300 },
    transitionTimingFunction: { default: "ease-in-out" }
  },
  setup(e) {
    const n = e, t = h(() => {
      const { fixed: d, top: r, zIndex: a, minWidth: u, height: l, paddingLeft: s, transitionDuration: c, transitionTimingFunction: m } = n, $ = d ? "fixed" : "static", S = n.useMinWidthLayout ? `min-width: ${u}px;` : "";
      return `position:${$};top:${r}px;z-index:${a};${S}height:${l}px;padding-left:${s}px;transition-duration:${c}ms;transition-timing-function:${m};`;
    }), { c: i } = v(), o = i(".admin-layout__tab", {
      left: 0,
      flexShrink: 0,
      boxSizing: "border-box",
      width: "100%",
      transitionProperty: "padding-left"
    });
    return o.render(), o.mount(), (d, r) => (x(), b("div", {
      class: "admin-layout__tab",
      style: w(f(t))
    }, [
      y(d.$slots, "default")
    ], 4));
  }
}), St = g({ name: "LayoutSider" }), Lt = /* @__PURE__ */ g({
  ...St,
  props: {
    zIndex: { default: 1002 },
    width: { default: 200 },
    paddingTop: { default: 0 },
    transitionDuration: { default: 300 },
    transitionTimingFunction: { default: "ease-in-out" }
  },
  setup(e) {
    const n = e, t = h(() => {
      const { zIndex: d, width: r, paddingTop: a, transitionDuration: u, transitionTimingFunction: l } = n;
      return `z-index:${d};width:${r}px;padding-top:${a}px;transition-duration:${u}ms;transition-timing-function:${l};`;
    }), { c: i } = v(), o = i(".admin-layout__sider", {
      position: "fixed",
      left: 0,
      top: 0,
      boxSizing: "border-box",
      width: "100%",
      height: "100%",
      transitionProperty: "all"
    });
    return o.render(), o.mount(), (d, r) => (x(), b("aside", {
      class: "admin-layout__sider",
      style: w(f(t))
    }, [
      y(d.$slots, "default")
    ], 4));
  }
}), Ct = g({ name: "LayoutContent" }), Tt = /* @__PURE__ */ g({
  ...Ct,
  props: {
    paddingTop: { default: 0 },
    paddingBottom: { default: 0 },
    paddingLeft: { default: 0 },
    overflowHidden: { type: Boolean },
    transitionDuration: { default: 300 },
    transitionTimingFunction: { default: "ease-in-out" }
  },
  setup(e) {
    const n = e, t = h(() => {
      const { paddingTop: d, paddingBottom: r, paddingLeft: a, transitionDuration: u, transitionTimingFunction: l } = n, s = `overflow:${n.overflowHidden ? "hidden" : "visible"};`;
      return `padding-top:${d}px;padding-bottom:${r}px;padding-left:${a}px;${s}transition-duration:${u}ms;transition-timing-function:${l};`;
    }), { c: i } = v(), o = i(".admin-layout__content", {
      flexGrow: 1,
      boxSizing: "border-box",
      width: "100%",
      transitionProperty: "padding-left"
    });
    return o.render(), o.mount(), (d, r) => (x(), b("main", {
      style: w(f(t)),
      class: "admin-layout__content"
    }, [
      y(d.$slots, "default")
    ], 4));
  }
}), Et = g({ name: "LayoutFooter" }), Wt = /* @__PURE__ */ g({
  ...Et,
  props: {
    fixed: { type: Boolean, default: !0 },
    zIndex: { default: 999 },
    useMinWidthLayout: { type: Boolean },
    minWidth: { default: 1200 },
    height: { default: 56 },
    paddingLeft: { default: 0 },
    transitionDuration: { default: 300 },
    transitionTimingFunction: { default: "ease-in-out" }
  },
  setup(e) {
    const n = e, t = h(() => {
      const { fixed: d, zIndex: r, minWidth: a, height: u, paddingLeft: l, transitionDuration: s, transitionTimingFunction: c } = n, m = d ? "fixed" : "static", $ = n.useMinWidthLayout ? `min-width:${a}px;` : "";
      return `position:${m};z-index:${r};${$}height:${u}px;padding-left:${l}px;transition-duration:${s}ms;transition-timing-function:${c};`;
    }), { c: i } = v(), o = i(".admin-layout__footer", {
      left: 0,
      bottom: 0,
      flexShrink: 0,
      boxSizing: "border-box",
      width: "100%",
      transitionProperty: "padding-left"
    });
    return o.render(), o.mount(), (d, r) => (x(), b("footer", {
      class: "admin-layout__footer",
      style: w(f(t))
    }, [
      y(d.$slots, "default")
    ], 4));
  }
});
function At(e) {
  const n = tt(0), t = h(() => `transform: translateX(${-n.value}px);`);
  let i = !1;
  function o(s) {
    n.value = s;
  }
  function d() {
    var c;
    const s = ((c = document.scrollingElement) == null ? void 0 : c.scrollLeft) || 0;
    o(s);
  }
  function r() {
    d();
  }
  function a() {
    document.addEventListener("scroll", d);
  }
  function u() {
    !i || document.removeEventListener("scroll", d);
  }
  function l() {
    r(), a(), i = !0;
  }
  return et(
    e,
    (s) => {
      s ? l() : u();
    },
    { immediate: !0 }
  ), nt(() => {
    u();
  }), t;
}
const Bt = g({ name: "AdminLayout" }), Z = /* @__PURE__ */ g({
  ...Bt,
  props: {
    mode: { default: "vertical" },
    isMobile: { type: Boolean, default: !1 },
    maskBg: { default: "rgba(0,0,0,0.3)" },
    useMinWidthLayout: { type: Boolean, default: !1 },
    minWidth: { default: 1200 },
    headerVisible: { type: Boolean, default: !0 },
    headerHeight: { default: 56 },
    tabVisible: { type: Boolean, default: !0 },
    tabHeight: { default: 44 },
    fixedHeaderAndTab: { type: Boolean, default: !0 },
    addMainOverflowHidden: { type: Boolean, default: !1 },
    footerVisible: { type: Boolean, default: !0 },
    footerHeight: { default: 48 },
    fixedFooter: { type: Boolean, default: !0 },
    siderVisible: { type: Boolean, default: !0 },
    siderWidth: { default: 200 },
    siderCollapsedWidth: { default: 64 },
    siderCollapse: { type: Boolean, default: !1 },
    transitionDuration: { default: 300 },
    transitionTimingFunction: { default: "ease-in-out" }
  },
  emits: ["update:sider-collapse"],
  setup(e, { emit: n }) {
    const t = e, i = h(() => t.useMinWidthLayout ? `min-width:${t.minWidth}px;` : ""), o = h(() => t.useMinWidthLayout && (t.fixedHeaderAndTab || t.fixedFooter)), d = At(o), r = h(() => t.fixedHeaderAndTab ? d.value : ""), a = h(() => t.fixedFooter ? d.value : ""), u = h(() => {
      const { transitionDuration: p, transitionTimingFunction: _ } = t;
      return {
        transitionDuration: p,
        transitionTimingFunction: _
      };
    }), l = h(() => t.mode === "vertical"), s = 1001, c = 999, m = h(() => t.isMobile || l.value ? 1003 : 1e3), $ = 998, S = h({
      get() {
        return t.siderCollapse;
      },
      set(p) {
        n("update:sider-collapse", p);
      }
    });
    function N() {
      S.value = !0;
    }
    const U = h(() => t.isMobile && !S.value), G = h(() => {
      const { transitionDuration: p, transitionTimingFunction: _ } = t;
      return `background-color:${t.maskBg};transition-duration:${p}ms;transition-timing-function:${_};`;
    }), H = h(() => {
      const { siderWidth: p, siderCollapsedWidth: _ } = t, V = t.isMobile ? 0 : _, Y = S.value ? V : p;
      return t.siderVisible ? Y : 0;
    }), E = h(() => t.isMobile ? 0 : H.value), X = h(() => l.value ? E.value : 0), J = h(
      () => !t.isMobile && !l.value && t.headerVisible ? t.headerHeight : 0
    ), K = h(() => {
      let p = 0;
      return t.fixedHeaderAndTab && (t.headerVisible && (p += t.headerHeight), t.tabVisible && (p += t.tabHeight)), p;
    }), Q = h(() => t.fixedFooter && t.footerVisible ? t.footerHeight : 0), { c: M } = v(), F = M(
      ".admin-layout",
      {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%"
      },
      [
        M("&__sider-mask", {
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 1002,
          width: "100%",
          height: "100%",
          transitionProperty: "background-color"
        })
      ]
    );
    return F.render(), F.mount(), (p, _) => (x(), b("div", {
      class: "admin-layout",
      style: w(f(i))
    }, [
      e.headerVisible ? (x(), W(f(wt), L({ key: 0 }, f(u), {
        fixed: e.fixedHeaderAndTab,
        "z-index": s,
        "min-width": e.minWidth,
        height: e.headerHeight,
        "padding-left": f(X),
        style: f(r)
      }), {
        default: C(() => [
          y(p.$slots, "header")
        ]),
        _: 3
      }, 16, ["fixed", "min-width", "height", "padding-left", "style"])) : T("", !0),
      e.tabVisible ? (x(), W(f(vt), L({ key: 1 }, f(u), {
        fixed: e.fixedHeaderAndTab,
        "z-index": c,
        "min-width": e.minWidth,
        top: e.headerHeight,
        height: e.tabHeight,
        "padding-left": f(E),
        style: f(r)
      }), {
        default: C(() => [
          y(p.$slots, "tab")
        ]),
        _: 3
      }, 16, ["fixed", "min-width", "top", "height", "padding-left", "style"])) : T("", !0),
      e.siderVisible ? (x(), W(f(Lt), L({ key: 2 }, f(u), {
        "z-index": f(m),
        width: f(H),
        "padding-top": f(J)
      }), {
        default: C(() => [
          y(p.$slots, "sider")
        ]),
        _: 3
      }, 16, ["z-index", "width", "padding-top"])) : T("", !0),
      f(U) ? (x(), b("div", {
        key: 3,
        class: "admin-layout__sider-mask",
        style: w(f(G)),
        onClick: N
      }, null, 4)) : T("", !0),
      it(f(Tt), L(f(u), {
        "padding-top": f(K),
        "padding-bottom": f(Q),
        "padding-left": f(E),
        "overflow-hidden": e.addMainOverflowHidden
      }), {
        default: C(() => [
          y(p.$slots, "default")
        ]),
        _: 3
      }, 16, ["padding-top", "padding-bottom", "padding-left", "overflow-hidden"]),
      e.footerVisible ? (x(), W(f(Wt), L({ key: 4 }, f(u), {
        fixed: e.fixedFooter,
        "z-index": $,
        "min-width": e.minWidth,
        height: e.footerHeight,
        "padding-left": f(E),
        style: f(a)
      }), {
        default: C(() => [
          y(p.$slots, "footer")
        ]),
        _: 3
      }, 16, ["fixed", "min-width", "height", "padding-left", "style"])) : T("", !0)
    ], 4));
  }
});
function kt(e) {
  e.component("AdminLayout", Z);
}
Z.install = kt;
export {
  Z as default
};
