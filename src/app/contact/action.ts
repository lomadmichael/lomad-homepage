"use server";

export interface ContactFormState {
  success: boolean;
  message: string;
}

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const content = formData.get("content") as string;

  if (!name || !email || !content) {
    return { success: false, message: "필수 항목을 입력해 주세요." };
  }

  console.log("Contact form submitted:", Object.fromEntries(formData));
  return { success: true, message: "문의가 접수되었습니다. 감사합니다!" };
}
