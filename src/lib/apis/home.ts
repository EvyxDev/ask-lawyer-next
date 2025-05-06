const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const sendContactForm = async ({
  name,
  mobile,
  email,
  subject,
  content,
}: ContactFormData) => {
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("content", content);
    formData.append("subject", subject);
    const response = await fetch(`${API_URL}api/store-contact-us`, {
      method: "POST",
      headers: {
        'Accept': 'application/json'
      },    
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }
    return data;
  } catch (error) {
    const err = error as Error;
    throw err;
  }
};
