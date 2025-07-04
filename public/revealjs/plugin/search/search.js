!(function (e, t) {
    'object' == typeof exports && 'undefined' != typeof module
        ? (module.exports = t())
        : 'function' == typeof define && define.amd
          ? define(t)
          : ((e =
                'undefined' != typeof globalThis
                    ? globalThis
                    : e || self).RevealSearch = t())
})(this, function () {
    'use strict'
    /*!
     * Handles finding a text string anywhere in the slides and showing the next occurrence to the user
     * by navigatating to that slide and highlighting it.
     *
     * @author Jon Snyder <snyder.jon@gmail.com>, February 2013
     */ return () => {
        let e, t, n, o, i, l, s
        function r() {
            ;((t = document.createElement('div')),
                t.classList.add('searchbox'),
                (t.style.position = 'absolute'),
                (t.style.top = '10px'),
                (t.style.right = '10px'),
                (t.style.zIndex = 10),
                (t.innerHTML =
                    '<input type="search" class="searchinput" placeholder="Search..." style="vertical-align: top;"/>\n\t\t</span>'),
                (n = t.querySelector('.searchinput')),
                (n.style.width = '240px'),
                (n.style.fontSize = '14px'),
                (n.style.padding = '4px 6px'),
                (n.style.color = '#000'),
                (n.style.background = '#fff'),
                (n.style.borderRadius = '2px'),
                (n.style.border = '0'),
                (n.style.outline = '0'),
                (n.style.boxShadow = '0 2px 18px rgba(0, 0, 0, 0.2)'),
                (n.style['-webkit-appearance'] = 'none'),
                e.getRevealElement().appendChild(t),
                n.addEventListener(
                    'keyup',
                    function (t) {
                        if (13 === t.keyCode)
                            (t.preventDefault(),
                                (function () {
                                    if (l) {
                                        var t = n.value
                                        '' === t
                                            ? (s && s.remove(), (o = null))
                                            : ((s = new f('slidecontent')),
                                              (o = s.apply(t)),
                                              (i = 0))
                                    }
                                    o &&
                                        (o.length && o.length <= i && (i = 0),
                                        o.length > i &&
                                            (e.slide(o[i].h, o[i].v), i++))
                                })(),
                                (l = !1))
                        else l = !0
                    },
                    !1
                ),
                d())
        }
        function a() {
            ;(t || r(), (t.style.display = 'inline'), n.focus(), n.select())
        }
        function d() {
            ;(t || r(), (t.style.display = 'none'), s && s.remove())
        }
        function c() {
            ;(t || r(), 'inline' !== t.style.display ? a() : d())
        }
        function f(t, n) {
            var o = document.getElementById(t) || document.body,
                i = n || 'EM',
                l = new RegExp('^(?:' + i + '|SCRIPT|FORM)$'),
                s = ['#ff6', '#a0ffff', '#9f9', '#f99', '#f6f'],
                r = [],
                a = 0,
                d = '',
                c = []
            ;((this.setRegex = function (e) {
                ;((e = e.trim()), (d = new RegExp('(' + e + ')', 'i')))
            }),
                (this.getRegex = function () {
                    return d
                        .toString()
                        .replace(/^\/\\b\(|\)\\b\/i$/g, '')
                        .replace(/\|/g, ' ')
                }),
                (this.hiliteWords = function (t) {
                    if (null != t && t && d && !l.test(t.nodeName)) {
                        if (t.hasChildNodes())
                            for (var n = 0; n < t.childNodes.length; n++)
                                this.hiliteWords(t.childNodes[n])
                        var o, f
                        if (3 == t.nodeType)
                            if ((o = t.nodeValue) && (f = d.exec(o))) {
                                for (
                                    var u = t;
                                    null != u && 'SECTION' != u.nodeName;

                                )
                                    u = u.parentNode
                                var p = e.getIndices(u),
                                    h = c.length,
                                    y = !1
                                for (n = 0; n < h; n++)
                                    c[n].h === p.h && c[n].v === p.v && (y = !0)
                                ;(y || c.push(p),
                                    r[f[0].toLowerCase()] ||
                                        (r[f[0].toLowerCase()] =
                                            s[a++ % s.length]))
                                var g = document.createElement(i)
                                ;(g.appendChild(document.createTextNode(f[0])),
                                    (g.style.backgroundColor =
                                        r[f[0].toLowerCase()]),
                                    (g.style.fontStyle = 'inherit'),
                                    (g.style.color = '#000'))
                                var v = t.splitText(f.index)
                                ;((v.nodeValue = v.nodeValue.substring(
                                    f[0].length
                                )),
                                    t.parentNode.insertBefore(g, v))
                            }
                    }
                }),
                (this.remove = function () {
                    for (
                        var e, t = document.getElementsByTagName(i);
                        t.length && (e = t[0]);

                    )
                        e.parentNode.replaceChild(e.firstChild, e)
                }),
                (this.apply = function (e) {
                    if (null != e && e)
                        return (
                            this.remove(),
                            this.setRegex(e),
                            this.hiliteWords(o),
                            c
                        )
                }))
        }
        return {
            id: 'search',
            init: (t) => {
                ;((e = t),
                    e.registerKeyboardShortcut('CTRL + Shift + F', 'Search'),
                    document.addEventListener(
                        'keydown',
                        function (e) {
                            'F' == e.key &&
                                (e.ctrlKey || e.metaKey) &&
                                (e.preventDefault(), c())
                        },
                        !1
                    ))
            },
            open: a,
            close: d,
            toggle: c,
        }
    }
})
