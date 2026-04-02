/**
 * Audit logs, system settings, and email events.
 * Source: docs/FUTURE_STATE_SCHEMA.md
 */

import type { UUID } from "./profiles";
import type { EmailEventType } from "./enums";

export interface AuditLog {
  id: UUID;
  actor_profile_id: UUID | null;
  action: string;
  entity_type: string | null;
  entity_id: UUID | null;
  data_before: Record<string, unknown> | null;
  data_after: Record<string, unknown> | null;
  ip: string | null;
  user_agent: string | null;
  created_at: string;
}

export interface SystemSetting {
  key: string;
  value: string | null;
  updated_at: string;
  updated_by_profile_id: UUID | null;
}

export interface EmailEvent {
  id: UUID;
  event_type: EmailEventType;
  recipient_email: string;
  subject: string | null;
  template_id: string | null;
  entity_type: string | null;
  entity_id: UUID | null;
  sent_at: string;
  provider_message_id: string | null;
  metadata: Record<string, unknown> | null;
}
