"use strict";
/**
 *  Collections related to languages supported by the application,
 *  including image paths, dictionary query structures, regex etc.
 */
exports.__esModule = true;
exports.DictionaryQueriesMap = exports.DictSupportedLangMap = exports.RegexMap = exports.LangNames = exports.NavbarFlagLinks = exports.SupportedLanguages = void 0;
// Supported languages for learning
var SupportedLanguages = ['de', 'fr', 'es', 'it', 'sr', 'pt', 'el', 'ru'];
exports.SupportedLanguages = SupportedLanguages;
// Image paths
var NavbarFlagLinks = new Map();
exports.NavbarFlagLinks = NavbarFlagLinks;
NavbarFlagLinks.set('de', '../country flags/germany-flag-icon-35.png');
NavbarFlagLinks.set('fr', '../country flags/france-flag-icon-35.png');
NavbarFlagLinks.set('es', '../country flags/spain-flag-icon-35.png');
NavbarFlagLinks.set('it', '../country flags/italy-flag-icon-35.png');
NavbarFlagLinks.set('sr', '../country flags/serbia-flag-icon-35.png');
NavbarFlagLinks.set('pt', '../country flags/portugal-flag-icon-35.png');
NavbarFlagLinks.set('el', '../country flags/greece-flag-icon-35.png');
NavbarFlagLinks.set('ru', '../country flags/russia-flag-icon-35.png');
// Map with language names
var LangNames = new Map();
exports.LangNames = LangNames;
LangNames.set('de', 'German');
LangNames.set('fr', 'French');
LangNames.set('es', 'Spanish');
LangNames.set('it', 'Italian');
LangNames.set('sr', 'Serbian');
LangNames.set('pt', 'Portuguese');
LangNames.set('el', 'Greek');
LangNames.set('ru', 'Russian');
// Map with regular expressions for each language
var RegexMap = new Map();
exports.RegexMap = RegexMap;
RegexMap.set('en', '[a-zA-Z]+');
RegexMap.set('de', '[a-zA-ZäöüÄÖÜß]+');
RegexMap.set('fr', '[a-zA-ZàâäôéèëêïîçùûüÿæœÀÂÄÔÉÈËÊÏÎŸÇÙÛÜÆŒ]+');
RegexMap.set('es', '[a-zA-ZáéíñóúüÁÉÍÑÓÚÜ]+');
RegexMap.set('it', '[a-zA-ZàèéìíîòóùúÀÈÉÌÍÎÒÓÙÚ]+');
RegexMap.set('sr', '[абвгдђежзијклљмнњопрстћуфхцчџшАБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШ]+');
RegexMap.set('pt', '[a-zA-ZãáàâçéêíõóôúüÃÁÀÂÇÉÊÍÕÓÔÚÜ]+');
RegexMap.set('el', '[α-ωΑ-ΩίϊΐόάέύϋΰήώΊΪΌΆΈΎΫΉΏ]+');
RegexMap.set('ru', '[абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ]+');
// Names of online dictionaries and the languages they support
var DictSupportedLangMap = new Map();
exports.DictSupportedLangMap = DictSupportedLangMap;
DictSupportedLangMap.set('Google Translate', ['en', 'de', 'fr', 'sr', 'es', 'it', 'pt', 'el', 'ru']);
DictSupportedLangMap.set('WordReference', ['en', 'de', 'fr', 'es', 'it', 'pt', 'ru']);
DictSupportedLangMap.set('Yandex', ['en', 'de', 'fr', 'sr', 'es', 'it', 'pt', 'el', 'ru']);
DictSupportedLangMap.set('Bing', ['en', 'de', 'fr', 'es', 'it', 'pt', 'el', 'ru']);
// Names of online dictionaries and their query structure. Substrings <srcLang>, <targetLang>, <word> have to be changed in runtime with appropriate values.
var DictionaryQueriesMap = new Map();
exports.DictionaryQueriesMap = DictionaryQueriesMap;
DictionaryQueriesMap.set('Google Translate', 'https://translate.google.com/#view=home&op=translate&sl=<targetLang>&tl=<srcLang>&text=<word>');
DictionaryQueriesMap.set('WordReference', 'https://www.wordreference.com/<targetLang><srcLang>/<word>');
DictionaryQueriesMap.set('Yandex', 'https://translate.yandex.com/?lang=<targetLang>-<srcLang>&text=<word>');
DictionaryQueriesMap.set('Bing', 'https://www.bing.com/translator?from=<targetLang>&to=<srcLang>&text=<word>');
