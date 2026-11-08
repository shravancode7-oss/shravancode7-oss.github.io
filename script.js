(function () {
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Header prompt cycles through commands.
  var cmds = ["whoami", "./deploy --agents --env prod", "systems --list", "git log --career", "ping shravan"];
  var el = document.getElementById("cmd"), i = 0;
  function type(s, k, done) { el.textContent = s.slice(0, k); if (k < s.length) setTimeout(function () { type(s, k + 1, done); }, 55); else setTimeout(done, 2200); }
  function erase(done) { var s = el.textContent; if (s.length) { el.textContent = s.slice(0, -1); setTimeout(function () { erase(done); }, 22); } else done(); }
  function loop() { i = (i + 1) % cmds.length; erase(function () { type(cmds[i], 0, loop); }); }
  if (!reduce) setTimeout(loop, 2600);
  // Video: play on hover (muted) on pointer devices; always keep controls for sound.
  var v = document.getElementById("intro");
  if (v && matchMedia("(hover: hover)").matches && !reduce) {
    v.addEventListener("mouseenter", function () { if (v.paused) { v.muted = true; v.play().catch(function () {}); } });
  }
  // Reveal cards as they enter the viewport.
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".card").forEach(function (c) { c.classList.add("pre"); io.observe(c); });
  }
})();
