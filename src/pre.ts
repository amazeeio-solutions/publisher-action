import * as core from '@actions/core';

import { clearCache, config, notifyPublisher } from './lib.js';

core.info('Notifying Publisher');
await notifyPublisher({ status: 'started' });

if (config.cache && config.publisherPayload.clearCache) {
  core.info('Clearing caches');
  await clearCache();
}
