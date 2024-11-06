const ROLE_KEY = 'userRole';

export const setRole = (role: string) => {
  localStorage.setItem(ROLE_KEY, role);
};

export const getRole = (): string | null => {
  return localStorage.getItem(ROLE_KEY);
};

export const clearRole = () => {
  localStorage.removeItem(ROLE_KEY);
};
