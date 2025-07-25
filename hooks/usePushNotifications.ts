import { useEffect } from "react";
import { sendNotification } from "../sendNotification";
import { SafeEventType } from "../SafeEventTypes";

export const usePushNotifications = (event: SafeEventType, payload: any) => {
  useEffect(() => {
    sendNotification(event, payload);
  }, [event, payload]);
};
