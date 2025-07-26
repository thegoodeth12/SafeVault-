import { PUSH_CHANNELS, ENABLED_PUSH_CHANNELS } from './push.config';
import { SafeEventType } from './SafeEventTypes';

export function sendNotification(eventType: SafeEventType, payload: any) {
  if (ENABLED_PUSH_CHANNELS.includes("toast")) {
    console.log("Toast:", eventType, payload);
  }

  if (ENABLED_PUSH_CHANNELS.includes("slack")) {
    // POST to Slack Webhook
  }

  if (ENABLED_PUSH_CHANNELS.includes("telegram")) {
    // POST to Telegram Bot API
  }

  if (ENABLED_PUSH_CHANNELS.includes("github")) {
    // Log as GitHub status
  }
}
