import { createContext, useReducer, useEffect } from "react";
import apiService from "../app/apiService";
import { isValidToken } from "../utils/jwt";
import { useSelector } from "react-redux";

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  isLoginAsAdmin: false,
};

const INITIALIZE = "AUTH.INITIALIZE";
const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS";
const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS";
const LOGOUT = "AUTH.LOGOUT";
const LOGIN_AS_ADMIN = "LOGIN.ADMIN";
const LOGIN_AS_USER = "LOGIN.USER";
const UPDATE_PROFILE = "AUTH.UPDATE_PROFILE";

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isLoginAsAdmin: false,
      };

    case INITIALIZE:
      const { isAuthenticated, isLoginAsAdmin, user } = action.payload;
      return {
        ...state,
        isInitialized: true,
        isAuthenticated,
        isLoginAsAdmin,
        user,
      };

    case LOGIN_AS_ADMIN:
      return {
        ...state,
        isLoginAsAdmin: true,
      };
    case LOGIN_AS_USER:
      return {
        ...state,
        isLoginAsAdmin: false,
      };
    case UPDATE_PROFILE:
      const { _id, avatarUrl, birthOfDate, phoneNumber, address, cartItem } =
        action.payload;
      return {
        ...state,
        user: {
          ...state.user,
          _id,
          avatarUrl,
          birthOfDate,
          phoneNumber,
          address,
          cartItem,
        },
      };
    default:
      return state;
  }
};

const setSession = (accessToken) => {
  if (accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("accessToken");
    delete apiService.defaults.headers.common.Authorization;
  }
};

const AuthContext = createContext({ ...initialState });

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const data = useSelector((state) => state.profile.updateProfile);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        // console.log(accessToken);
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const response = await apiService.get("/users/me");
          const user = response.data.data;
          const getViewRole =
            window.localStorage.getItem("isLoginAsAdmin") === "true"
              ? true
              : false;
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: true,
              isLoginAsAdmin: getViewRole,
              user,
            },
          });
        } else {
          setSession(null);
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: false, user: null },
          });
        }
      } catch (error) {
        setSession(null);
        dispatch({
          type: INITIALIZE,
          payload: { isAuthenticated: false, user: null },
        });
      }
    };
    initialize();
  }, []);

  useEffect(() => {
    if (data) dispatch({ type: UPDATE_PROFILE, payload: data });
  }, [data]);

  const login = async ({ email, password }, callback) => {
    const response = await apiService.post("/auth/login", { email, password });
    const { user, accessToken } = response.data.data;

    setSession(accessToken);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user },
    });
    callback();
  };

  const register = async ({ username, email, password }, callback) => {
    const response = await apiService.post("/users", {
      username,
      email,
      password,
    });
    const { user, accessToken } = response.data.data;

    setSession(accessToken);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { user },
    });

    callback();
  };

  const logout = (callback) => {
    setSession(null);
    dispatch({ type: LOGOUT });
    callback();
  };

  const loginAsAdmin = (callback) => {
    window.localStorage.setItem("isLoginAsAdmin", true);
    dispatch({ type: LOGIN_AS_ADMIN });
    callback();
  };

  const loginAsUser = (callback) => {
    window.localStorage.setItem("isLoginAsAdmin", false);
    dispatch({ type: LOGIN_AS_USER });
    callback();
  };

  return (
    <AuthContext.Provider
      value={{ ...state, login, register, logout, loginAsAdmin, loginAsUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
