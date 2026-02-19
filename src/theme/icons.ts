import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Info,
  XCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Semantic } from "./types";

const semanticIconMap: Record<Semantic, LucideIcon> = {
  action: Info,
  destructive: XCircle,
  neutral: Info,
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
  danger: XCircle,
  none: Info,
  pending: Clock,
  valid: CheckCircle,
  invalid: XCircle,
};

export function getDefaultIconForSemantic(semantic: Semantic): LucideIcon {
  return semanticIconMap[semantic];
}
