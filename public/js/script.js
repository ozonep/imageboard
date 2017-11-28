Handlebars.templates = Handlebars.templates || {};
var templates = document.querySelectorAll('template');
Array.prototype.slice.call(templates).forEach(function(tmpl) {
    Handlebars.templates[tmpl.id] = Handlebars.compile(tmpl.innerHTML.replace(/{{&gt;/g, '{{>'));
});
Handlebars.partials = Handlebars.templates;

var main = $('#main');
var voices = speechSynthesis.getVoices();
var utterance = new SpeechSynthesisUtterance('Hello, Ivan');
utterance.voice = voices[1];
speechSynthesis.speak(utterance);

var router = new Router;
Backbone.history.start();