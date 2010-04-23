load('/Library/Ruby/Gems/1.8/gems/jspec-4.1.0/lib/jspec.js');
load('/Library/Ruby/Gems/1.8/gems/jspec-4.1.0/lib/jspec.xhr.js');
load('src/mockHelper.js');
load('src/discrepancy.js');
load('src/argumentMatcher.js');
load('src/invocationBehaviour.js');
load('src/strictExpectationMatcher.js');
load('src/dynamicExpectationMatcher.js');
load('src/mock.js');
load('src/mockControl.js');
load('test/person.js');

load('spec/unit/spec.helper.js');

JSpec
.exec('spec/unit/argumentMatcherSpec.js')
.exec('spec/unit/invocationBehaviourSpec.js')
.exec('spec/unit/mockControlSpec.js')
.exec('spec/unit/mockHelperSpec.js')
.exec('spec/unit/mockSpec.js')
.run({ reporter: JSpec.reporters.Terminal, fixturePath: 'spec/fixtures' })
.report();