const t = () => {
        let t,
            e = {
                messageStyle: 'none',
                tex2jax: {
                    inlineMath: [
                        ['$', '$'],
                        ['\\(', '\\)'],
                    ],
                    skipTags: [
                        'script',
                        'noscript',
                        'style',
                        'textarea',
                        'pre',
                    ],
                },
                skipStartupTypeset: !0,
            }
        return {
            id: 'mathjax2',
            init: function (a) {
                t = a
                let n = t.getConfig().mathjax2 || t.getConfig().math || {},
                    i = { ...e, ...n },
                    s =
                        (i.mathjax ||
                            'https://cdn.jsdelivr.net/npm/mathjax@2/MathJax.js') +
                        '?config=' +
                        (i.config || 'TeX-AMS_HTML-full')
                ;((i.tex2jax = { ...e.tex2jax, ...n.tex2jax }),
                    (i.mathjax = i.config = null),
                    (function (t, e) {
                        let a = document.querySelector('head'),
                            n = document.createElement('script')
                        ;((n.type = 'text/javascript'), (n.src = t))
                        let i = () => {
                            'function' == typeof e && (e.call(), (e = null))
                        }
                        ;((n.onload = i),
                            (n.onreadystatechange = () => {
                                'loaded' === this.readyState && i()
                            }),
                            a.appendChild(n))
                    })(s, function () {
                        ;(MathJax.Hub.Config(i),
                            MathJax.Hub.Queue([
                                'Typeset',
                                MathJax.Hub,
                                t.getRevealElement(),
                            ]),
                            MathJax.Hub.Queue(t.layout),
                            t.on('slidechanged', function (t) {
                                MathJax.Hub.Queue([
                                    'Typeset',
                                    MathJax.Hub,
                                    t.currentSlide,
                                ])
                            }))
                    }))
            },
        }
    },
    e = t
/*!
 * This plugin is a wrapper for the MathJax2,
 * MathJax3 and KaTeX typesetter plugins.
 */
var a = (Plugin = Object.assign(e(), {
    KaTeX: () => {
        let t,
            e = {
                version: 'latest',
                delimiters: [
                    { left: '$$', right: '$$', display: !0 },
                    { left: '$', right: '$', display: !1 },
                    { left: '\\(', right: '\\)', display: !1 },
                    { left: '\\[', right: '\\]', display: !0 },
                ],
                ignoredTags: [
                    'script',
                    'noscript',
                    'style',
                    'textarea',
                    'pre',
                    'code',
                ],
            }
        const a = (t) =>
            new Promise((e, a) => {
                const n = document.createElement('script')
                ;((n.type = 'text/javascript'),
                    (n.onload = e),
                    (n.onerror = a),
                    (n.src = t),
                    document.head.append(n))
            })
        return {
            id: 'katex',
            init: function (n) {
                t = n
                let i = t.getConfig().katex || {},
                    s = { ...e, ...i }
                const { local: l, version: o, extensions: r, ...c } = s
                let d = s.local || 'https://cdn.jsdelivr.net/npm/katex',
                    p = s.local ? '' : '@' + s.version,
                    u = d + p + '/dist/katex.min.css',
                    h = d + p + '/dist/contrib/mhchem.min.js',
                    x = d + p + '/dist/contrib/auto-render.min.js',
                    m = [d + p + '/dist/katex.min.js']
                ;(s.extensions && s.extensions.includes('mhchem') && m.push(h),
                    m.push(x))
                const f = () => {
                    ;(renderMathInElement(n.getSlidesElement(), c), t.layout())
                }
                ;(((t) => {
                    let e = document.createElement('link')
                    ;((e.rel = 'stylesheet'),
                        (e.href = t),
                        document.head.appendChild(e))
                })(u),
                    (async function (t) {
                        for (const e of t) await a(e)
                    })(m).then(() => {
                        t.isReady() ? f() : t.on('ready', f.bind(this))
                    }))
            },
        }
    },
    MathJax2: t,
    MathJax3: () => {
        let t,
            e = {
                tex: {
                    inlineMath: [
                        ['$', '$'],
                        ['\\(', '\\)'],
                    ],
                },
                options: {
                    skipHtmlTags: [
                        'script',
                        'noscript',
                        'style',
                        'textarea',
                        'pre',
                    ],
                },
                startup: {
                    ready: () => {
                        ;(MathJax.startup.defaultReady(),
                            MathJax.startup.promise.then(() => {
                                t.layout()
                            }))
                    },
                },
            }
        return {
            id: 'mathjax3',
            init: function (a) {
                t = a
                let n = t.getConfig().mathjax3 || {},
                    i = { ...e, ...n }
                ;((i.tex = { ...e.tex, ...n.tex }),
                    (i.options = { ...e.options, ...n.options }),
                    (i.startup = { ...e.startup, ...n.startup }))
                let s =
                    i.mathjax ||
                    'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js'
                ;((i.mathjax = null),
                    (window.MathJax = i),
                    (function (t, e) {
                        let a = document.createElement('script')
                        ;((a.type = 'text/javascript'),
                            (a.id = 'MathJax-script'),
                            (a.src = t),
                            (a.async = !0),
                            (a.onload = () => {
                                'function' == typeof e && (e.call(), (e = null))
                            }),
                            document.head.appendChild(a))
                    })(s, function () {
                        t.addEventListener('slidechanged', function (t) {
                            MathJax.typeset()
                        })
                    }))
            },
        }
    },
}))
export { a as default }
