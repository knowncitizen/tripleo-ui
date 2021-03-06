/**
 * Copyright 2017 Red Hat Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

import { List, Record } from 'immutable';

export const AppConfig = Record({
  keystone: undefined,
  heat: undefined,
  ironic: undefined,
  'ironic-inspector': undefined,
  mistral: undefined,
  nova: undefined,
  swift: undefined,
  'zaqar-websocket': undefined,
  zaqarDefaultQueue: 'tripleo',
  zaqarLoggerQueue: 'tripleo-ui-logging',
  excludedLanguages: List(),
  loggers: List(['console', 'zaqar']),
  version: undefined,
  gitSha: undefined
});
