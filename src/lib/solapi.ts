/**
 * SOLAPI 알림톡 발송 래퍼.
 * cert-manager의 동일 모듈을 로마드협동조합 채널 용도로 포팅.
 *
 * 보내는 주체는 KAKAO_CHANNEL_ID(=로마드협동조합 발신프로필).
 * 같은 SOLAPI 키를 쓰더라도 KAKAO_CHANNEL_ID 값에 따라 이용자에게 보이는
 * 발신자 이름이 바뀐다.
 */

const SOLAPI_API_KEY = process.env.SOLAPI_API_KEY || "";
const SOLAPI_API_SECRET = process.env.SOLAPI_API_SECRET || "";
const SOLAPI_SENDER = process.env.SOLAPI_SENDER || "";
const KAKAO_CHANNEL_ID = process.env.SOLAPI_KAKAO_CHANNEL_ID || "";
const SOLAPI_TEST_MODE = process.env.SOLAPI_TEST_MODE === "true";

interface SendAlimtalkParams {
  to: string;
  templateId: string;
  variables: Record<string, string>;
  // Fallback SMS body when kakao template is not yet approved
  fallbackText?: string;
}

export interface SendResult {
  success: boolean;
  channel: "alimtalk" | "sms" | "skipped";
  reason?: string;
  data?: unknown;
  error?: unknown;
}

/**
 * Send Kakao Alimtalk via SOLAPI. Falls back to SMS when fallbackText is
 * provided and Kakao channel ID is missing OR templateId is a placeholder
 * (starts with "TMPL_").
 *
 * Respects SOLAPI_TEST_MODE for dry runs — no actual SOLAPI call.
 */
export async function sendAlimtalk({
  to,
  templateId,
  variables,
  fallbackText,
}: SendAlimtalkParams): Promise<SendResult> {
  const cleanedTo = to.replace(/[-\s]/g, "");
  const cleanedFrom = SOLAPI_SENDER.replace(/[-\s]/g, "");

  const isPlaceholderTemplate = templateId.startsWith("TMPL_");
  const hasKakaoChannel = !!KAKAO_CHANNEL_ID;
  const shouldFallbackToSms =
    (!hasKakaoChannel || isPlaceholderTemplate) && !!fallbackText;

  // Test mode is checked first so local dev can exercise the route
  // even without SOLAPI keys configured.
  if (SOLAPI_TEST_MODE) {
    const mode = shouldFallbackToSms ? "SMS (fallback)" : "ALIMTALK";
    console.log(`[SOLAPI-TEST] ${mode} — would send:`, {
      to: cleanedTo,
      templateId,
      variables,
      fallbackText: shouldFallbackToSms ? fallbackText : undefined,
    });
    return {
      success: true,
      channel: shouldFallbackToSms ? "sms" : "alimtalk",
      reason: "test mode",
      data: { test: true, to: cleanedTo, templateId, variables },
    };
  }

  if (!SOLAPI_API_KEY || !SOLAPI_API_SECRET) {
    console.log("[SOLAPI] API keys not configured — skipping:", {
      to: cleanedTo,
      templateId,
      variables,
    });
    return {
      success: false,
      channel: "skipped",
      reason: "API keys not configured",
    };
  }

  if (!cleanedFrom) {
    console.error("[SOLAPI] SOLAPI_SENDER env var missing or empty");
    return {
      success: false,
      channel: "skipped",
      reason: "SOLAPI_SENDER env var not configured",
    };
  }

  try {
    const timestamp = new Date().toISOString();
    const salt = generateSalt();
    const signature = await generateSignature(timestamp, salt);

    const message: Record<string, unknown> = {
      to: cleanedTo,
      from: cleanedFrom,
    };

    if (shouldFallbackToSms) {
      message.text = interpolate(fallbackText!, variables);
    } else {
      message.kakaoOptions = {
        pfId: KAKAO_CHANNEL_ID,
        templateId,
        variables,
      };
    }

    const response = await fetch("https://api.solapi.com/messages/v4/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `HMAC-SHA256 apiKey=${SOLAPI_API_KEY}, date=${timestamp}, salt=${salt}, signature=${signature}`,
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("[SOLAPI] HTTP error:", response.status, data);
      return {
        success: false,
        channel: shouldFallbackToSms ? "sms" : "alimtalk",
        reason: `HTTP ${response.status}`,
        error: data,
      };
    }

    return {
      success: true,
      channel: shouldFallbackToSms ? "sms" : "alimtalk",
      data,
    };
  } catch (error) {
    console.error("[SOLAPI] Failed to send:", error);
    return {
      success: false,
      channel: shouldFallbackToSms ? "sms" : "alimtalk",
      error,
    };
  }
}

function interpolate(
  template: string,
  variables: Record<string, string>
): string {
  let out = template;
  for (const [key, val] of Object.entries(variables)) {
    out = out.split(key).join(val);
  }
  return out;
}

function generateSalt(): string {
  return (
    Math.random().toString(36).substring(2, 14) +
    Math.random().toString(36).substring(2, 14)
  );
}

async function generateSignature(
  timestamp: string,
  salt: string
): Promise<string> {
  const { createHmac } = await import("crypto");
  const hmac = createHmac("sha256", SOLAPI_API_SECRET);
  hmac.update(timestamp + salt);
  return hmac.digest("hex");
}
