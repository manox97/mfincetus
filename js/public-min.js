if (!dtGlobals) var dtGlobals = {};
dtGlobals.demostandCookiesSettings = {
        expires: 1,
        path: dtDemostand.cookiePath || "/"
    },
    function($, t, e) {
        function a(t) {
            return t
        }

        function o(t) {
            return n(decodeURIComponent(t.replace(i, " ")))
        }

        function n(t) {
            return 0 === t.indexOf('"') && (t = t.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")), t
        }

        function s(t) {
            return r.json ? JSON.parse(t) : t
        }
        var i = /\+/g,
            r = $.cookie = function(n, i, l) {
                if (i !== e) {
                    if (l = $.extend({}, r.defaults, l), null === i && (l.expires = -1), "number" == typeof l.expires) {
                        var d = l.expires,
                            c = l.expires = new Date;
                        c.setDate(c.getDate() + d)
                    }
                    return i = r.json ? JSON.stringify(i) : String(i), t.cookie = [encodeURIComponent(n), "=", r.raw ? i : encodeURIComponent(i), l.expires ? "; expires=" + l.expires.toUTCString() : "", l.path ? "; path=" + l.path : "", l.domain ? "; domain=" + l.domain : "", l.secure ? "; secure" : ""].join("")
                }
                for (var u = r.raw ? a : o, f = t.cookie.split("; "), h = n ? null : {}, p = 0, m = f.length; m > p; p++) {
                    var v = f[p].split("="),
                        k = u(v.shift()),
                        g = u(v.join("="));
                    if (n && n === k) {
                        h = s(g);
                        break
                    }
                    n || (h[k] = s(g))
                }
                return h
            };
        r.defaults = {}, $.removeCookie = function(t, e) {
            return null !== $.cookie(t) ? ($.cookie(t, null, e), !0) : !1
        }
    }(jQuery, document), jQuery(function($) {
        function t(t, e, a, o) {
            if (replaceDuplicates = !0, 0 == t.indexOf("#")) return t;
            if (t.indexOf("#") > 0) {
                var n = t.indexOf("#");
                urlhash = t.substring(t.indexOf("#"), t.length)
            } else urlhash = "", n = t.length;
            sourceUrl = t.substring(0, n);
            var s = sourceUrl.split("?"),
                i = "";
            if (s.length > 1)
                for (var r = s[1].split("&"), l = 0; l < r.length; l++) {
                    var d = r[l].split("=");
                    replaceDuplicates && d[0] == e || ("" == i ? i = "?" : i += "&", i += d[0] + "=" + (d[1] ? d[1] : ""))
                }
            return "" == i && (i = "?"), o ? i = "?" + e + "=" + a + (i.length > 1 ? "&" + i.substring(1) : "") : ("" !== i && "?" != i && (i += "&"), i += e + "=" + (a ? a : "")), s[0] + i + urlhash
        }

        function e() {
            $thumbnails = $(".load-on-click", r), $thumbnails.each(function(t) {
                var e = $(this);
                e.attr("src", e.attr("data-src"))
            }), $thumbnails.loaded(function() {
                $(this).parent().addClass("thumb-loaded")
            })
        }
        var a = function(e) {
                var a = location.origin + location.pathname,
                    o = a;
                e && (o = t(a, dtDemostand.skinURI.key, dtDemostand.skinURI.value)), location.assign(o)
            },
            o = function(e, a) {
                return a.skin = a.skin || dtDemostand.skin, a.layout = a.layout || dtDemostand.layout, t(e, dtDemostand.skinURI.key, encodeURIComponent([a.skin, a.layout].join("+")))
            },
            n = function() {
                var e = $(this);
                this.host === location.host && dtDemostand.skinURI.value && e.attr("href", t(e.attr("href"), dtDemostand.skinURI.key, dtDemostand.skinURI.value))
            };
        dtDemostand.skin = dtDemostand.skin || "skin07s", dtDemostand.layout = dtDemostand.layout || "wide";
        var s = $(".skins-box .demo-thumb"),
            i = $(".layouts-box .demo-thumb");
        s.filter("[data-value=" + dtDemostand.skin + "]").addClass("act"), i.filter("[data-value=" + dtDemostand.layout + "]").addClass("act"), s.each(function() {
            var t = $(this),
                e = t.data("value");
            t.attr("href", o(t.attr("href"), {
                skin: e
            }))
        }), i.each(function() {
            var t = $(this),
                e = t.data("value");
            t.attr("href", o(t.attr("href"), {
                layout: e
            }))
        }), $("#page a").each(n), $(window).on("dt.ajax.content.appended", function() {
            dtGlobals.ajaxContainerItems.find("a").each(n)
        }), s.on("click", function(t) {
            if ("cookie" == dtDemostand.transport) {
                var e = $(this),
                    o = e.attr("data-value");
                t.preventDefault(), $.cookie("skin", o, dtGlobals.demostandCookiesSettings), a()
            }
        }), i.on("click", function(t) {
            if ("cookie" == dtDemostand.transport) {
                var e = $(this),
                    o = e.attr("data-value");
                if (t.preventDefault(), "wide" == val) $("#page").removeClass("boxed"), $("#phantom .ph-wrap").removeClass("boxed"), $("body").addClass("no-bg");
                else {
                    if ("boxed" != val) return;
                    $("#page").addClass("boxed"), $("#phantom .ph-wrap").addClass("boxed"), $("body").removeClass("no-bg")
                }
                $(window).trigger("resize"), $.cookie("layout", o, dtGlobals.demostandCookiesSettings), a()
            }
        });
        var r = $(".demo-panel"),
            l = $(".demo-switch", r),
            d = $(".demo-overlay"),
            c = $(".content-panel"),
            u = $(".demo-teaser"),
            f = $("html"),
            h = $("#phantom"),
            p = document.querySelector(".content-panel");
        p.addEventListener("wheel", function(t) {
            var e = t.deltaY,
                a = p.scrollHeight,
                o = p.offsetHeight,
                n = p.scrollTop;
            0 === n && 0 > e ? t.preventDefault() : o + n === a && e > 0 && t.preventDefault()
        });
        var m;
        c.on({
            touchstart: function(t) {
                m = t
            },
            touchmove: function(t) {
                (t.originalEvent.pageY > m.originalEvent.pageY && 0 == this.scrollTop || t.originalEvent.pageY < m.originalEvent.pageY && this.scrollTop + this.offsetHeight >= this.scrollHeight) && t.preventDefault()
            }
        });
        var v;
        l.one("click.paintImages", function() {
            e()
        }), l.on("click", function() {
            r.hasClass("act") ? (r.css("width", 0).removeClass("act"), d.removeClass("act")) : ($.cookie("panel_used") || $.cookie("panel_used", !0, dtGlobals.demostandCookiesSettings), c.scrollTop(0), r.css("width", 500).addClass("act"), u.removeClass("act"), d.addClass("act"))
        }), c.on("mouseenter", function(t) {
            c.css("overflow-y", "auto")
        }), c.on("mouseleave", function(t) {
            c.css("overflow-y", "hidden")
        }), u.on("click", function() {
            l.trigger("click")
        }), d.on("click touchstart", function() {
            l.trigger("click")
        }), setTimeout(function() {
            r.hasClass("act") || $.cookie("panel_used") || u.addClass("act")
        }, 5e3);
        var k = $(".skins-box"),
            g = "info-box skins-box",
            b = $(".demo-filter a");
        b.on("click", function() {
            var t = $(this),
                e = t.attr("data-filter");
            b.removeClass("act"), t.addClass("act"), k.attr("class", g).addClass(e)
        })
    });