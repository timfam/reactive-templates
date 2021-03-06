ReactiveTemplates = {
  _templates: {},
  _deps: {},
};

/**
 * We will save all the templates that any component need
 */
ReactiveTemplates.request = function(identifier, defaultTemplate) {
  check(identifier, String);
  check(defaultTemplate, Match.Optional(String));
  this._deps[identifier] = new Tracker.Dependency;
  this._templates[identifier] = defaultTemplate;
}

/**
 * Reactively returns the identifier of the template
 */
ReactiveTemplates.get = function(identifier) {
  if (!_.has(this._deps, identifier)) throw 'Template "' + identifier + '" is not requested';
  this._deps[identifier].depend();
  return this._templates[identifier];
}

/**
 * Assings a template to a template request
 */
ReactiveTemplates.set = function(identifier, templateName) {
  if (!_.has(this._deps, identifier)) throw 'Template "' + identifier + '" is not requested';
  this._templates[identifier] = templateName;
  this._deps[identifier].changed();
}