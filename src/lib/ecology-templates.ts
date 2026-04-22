/**
 * 남대천 하구습지 생태체험 프로그램 알림톡 템플릿.
 *
 * 각 템플릿은:
 * - name: 사람이 읽기 쉬운 라벨
 * - templateId: SOLAPI/Kakao 승인 템플릿 ID (미승인은 "TMPL_..." placeholder)
 * - buildVariables: 도메인 데이터를 #{변수} 키로 매핑
 * - fallbackText: 템플릿 미승인 시 SMS 대체 문구
 *
 * NOTE: 톡투비즈(SOLAPI) 검수 승인 시 실제 templateId로 교체할 것.
 *       현재는 모두 placeholder → 자동으로 SMS fallback 전환.
 */

export const ECOLOGY_TEMPLATES = {
  application_confirmed: {
    name: "생태체험 접수 확정",
    templateId: "TMPL_ECOLOGY_APPLICATION_CONFIRMED",
    buildVariables: (data: {
      parentName: string;
      session: string; // 예: "5월 23일(토) 오전반 10:00"
      place: string;
      inquiry: string;
    }) => ({
      "#{보호자명}": data.parentName,
      "#{일시}": data.session,
      "#{장소}": data.place,
      "#{문의}": data.inquiry,
    }),
    fallbackText: `[로마드협동조합] #{보호자명}님, 남대천 하구습지의 봄 생태체험 프로그램 접수가 확정되었습니다.

일시: #{일시}
장소: #{장소}

활동복장·모자·운동화·마실 물을 챙겨와 주세요. 뜰채·루페·관찰통은 현장에서 제공됩니다.

문의: #{문의}`,
  },

  reminder_day_before: {
    name: "전날 리마인더",
    templateId: "TMPL_ECOLOGY_REMINDER_DAY_BEFORE",
    buildVariables: (data: {
      parentName: string;
      session: string;
      place: string;
      inquiry: string;
    }) => ({
      "#{보호자명}": data.parentName,
      "#{일시}": data.session,
      "#{장소}": data.place,
      "#{문의}": data.inquiry,
    }),
    fallbackText: `[로마드협동조합] #{보호자명}님, 내일 남대천 하구습지 생태체험에서 만나요!

일시: #{일시}
장소: #{장소}

준비물: 편한 복장·운동화·모자·마실 물
기상 상황에 따라 일정이 조정될 수 있으며, 변경 시 개별 안내드립니다.

문의: #{문의}`,
  },
} as const;

export type EcologyTemplateKey = keyof typeof ECOLOGY_TEMPLATES;

/**
 * 회차별 승인된 접수 확정 알림톡 템플릿 ID 매핑.
 * 톡투비즈 검수 완료 시 각 회차 키에 실제 ID 입력.
 * 미승인 회차는 placeholder 반환 → solapi.ts가 자동으로 SMS fallback 전환.
 *
 * Key: 회차 slug (FormPay 폼에서 선택한 option value 와 동일해야 함)
 */
export const APPROVED_APPLICATION_CONFIRMED_TEMPLATE_IDS: Record<string, string> = {
  // 정규 생태체험 프로그램 4회차
  "regular-may23-am": "TMPL_ECOLOGY_APPLICATION_CONFIRMED",
  "regular-may23-pm": "TMPL_ECOLOGY_APPLICATION_CONFIRMED",
  "regular-may30-am": "TMPL_ECOLOGY_APPLICATION_CONFIRMED",
  "regular-may30-pm": "TMPL_ECOLOGY_APPLICATION_CONFIRMED",
};

/**
 * 회차별 승인된 전날 리마인더 템플릿 ID 매핑.
 */
export const APPROVED_REMINDER_TEMPLATE_IDS: Record<string, string> = {
  "regular-may23-am": "TMPL_ECOLOGY_REMINDER_DAY_BEFORE",
  "regular-may23-pm": "TMPL_ECOLOGY_REMINDER_DAY_BEFORE",
  "regular-may30-am": "TMPL_ECOLOGY_REMINDER_DAY_BEFORE",
  "regular-may30-pm": "TMPL_ECOLOGY_REMINDER_DAY_BEFORE",
};

/**
 * 세션 슬러그 → 사람이 읽기 쉬운 일시 문자열.
 * FormPay 폼의 라디오 value 와 키를 맞출 것.
 */
export const SESSION_LABELS: Record<string, string> = {
  "regular-may23-am": "5월 23일(토) 오전반 10:00–12:00",
  "regular-may23-pm": "5월 23일(토) 오후반 14:00–16:00",
  "regular-may30-am": "5월 30일(토) 오전반 10:00–12:00",
  "regular-may30-pm": "5월 30일(토) 오후반 14:00–16:00",
};

export function getApplicationConfirmedTemplateId(session: string): string {
  return (
    APPROVED_APPLICATION_CONFIRMED_TEMPLATE_IDS[session] ??
    ECOLOGY_TEMPLATES.application_confirmed.templateId
  );
}

export function getReminderTemplateId(session: string): string {
  return (
    APPROVED_REMINDER_TEMPLATE_IDS[session] ??
    ECOLOGY_TEMPLATES.reminder_day_before.templateId
  );
}

export function getSessionLabel(session: string): string {
  return SESSION_LABELS[session] ?? session;
}
