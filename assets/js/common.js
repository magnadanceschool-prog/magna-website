window.__rv=1;
(function(){var els=document.querySelectorAll(".rv");
if(!("IntersectionObserver" in window)){els.forEach(function(e){e.classList.add("in")});return}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:0,rootMargin:"0px 0px -6% 0px"});
els.forEach(function(e){io.observe(e)})})();
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest(".mn .pn a");if(a){var d=a.closest("details");if(d)d.open=false}});
