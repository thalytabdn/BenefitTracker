interface Credentials {
  username: string;
  password: string;
}

class AuthService {
  login = async (credentials: Credentials): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        return false;
      }

      const data: { token: string } = await response.json();

      if (!data.token) {
        return false;
      }

      localStorage.setItem('token', data.token);

      return true;
    } catch (error) {
      console.error('Erro ao realizar login.');
      return false;
    }
  };

  getToken = (): string | null => {
    return localStorage.getItem('token');
  };

  logout = (): void => {
    localStorage.removeItem('token');
  };
}

export default new AuthService();
