export interface LoginPayload {
  email: string;
  password: string;
}
export const LoginAction = async (payload: LoginPayload) => {
  const response = await fetch(`${process.env.API_DOMAIN}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response.json();
};
export interface SignUpPayload {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
}
export const SignupAction = async (payload: SignUpPayload) => {
  const response = await fetch(`${process.env.API_DOMAIN}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return response.json();
};

export const userAction = async (cookie: string) => {
  const response = await fetch(`${process.env.API_DOMAIN}/api/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookie}`,
    },
  });
  return response.json();
};
