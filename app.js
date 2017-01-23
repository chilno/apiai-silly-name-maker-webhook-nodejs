// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

process.env.DEBUG = 'actions-on-google:*';
let Assistant = require('actions-on-google').ApiAiAssistant;
let express = require('express');
let bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json({type: 'application/json'}));

// const NAME_ACTION = 'make_name';
// const COLOR_ARGUMENT = 'color';
// const NUMBER_ARGUMENT = 'number';
let stories = ["The Grasshopper and the Ant. The Grasshopper having sung all the summer long, Found herself lacking food When the North Wind began its song. Not a single little piece Of fly or grub did she have to eat. She went complaining of hunger To the Ant's home, her neighbour, Begging there for a loan Of some grain to keep herself alive Til the next season did arrive, I shall pay you, she said Before next August, on my word as an animal. I'll pay both interest and pricipal. The Ant was not so inclined this not being one of her faults. What did you do all summer? Said she to the grasshopper. Night and day I sang, I hope that does not displease you. You sang? I will not look askance. But now my neighbour it's time to dance."]

// [START SillyNameMaker]
app.post('/', function (req, res) {
  const assistant = new Assistant({request: req, response: res});
  console.log('Request headers: ' + JSON.stringify(req.headers));
  console.log('Request body: ' + JSON.stringify(req.body));

  // Make a silly name
  function makeName (assistant) {
    // let number = assistant.getArgument(NUMBER_ARGUMENT);
    // let color = assistant.getArgument(COLOR_ARGUMENT);
    let story = stories[Math.floor(Math.random()*stories.length];
    assistant.tell(story);
  }

  let actionMap = new Map();
  actionMap.set(NAME_ACTION, makeName);

  assistant.handleRequest(actionMap);
});
// [END SillyNameMaker]

if (module === require.main) {
  // [START server]
  // Start the server
  let server = app.listen(process.env.PORT || 8080, function () {
    let port = server.address().port;
    console.log('App listening on port %s', port);
  });
  // [END server]
}

module.exports = app;
