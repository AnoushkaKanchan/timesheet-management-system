import { useAuth } from "./context/AuthContext";

function App() {
  const {
    user,
    isAuthenticated,
    login,
    logout,
  } = useAuth();

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>Auth Context Test</h1>

      <p>
        Authenticated:
        {isAuthenticated ? " Yes" : " No"}
      </p>

      <button
        onClick={() =>
          login({
            access: "access123",
            refresh: "refresh123",
            user: {
              email: "admin@test.com",
              role: "admin",
            },
          })
        }
      >
        Login
      </button>

      <button onClick={logout}>
        Logout
      </button>

      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  );
}

export default App;