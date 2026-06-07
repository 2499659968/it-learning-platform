// 简单的认证工具函数

export interface User {
  username: string;
  email: string;
  createdAt: string;
}

export interface UserData extends User {
  skillProgress: {
    completedSkills: string[];
    learningSkills: string[];
  };
}

// 获取当前用户
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;

  const userStr = localStorage.getItem("currentUser");
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

// 登录
export function login(username: string, password: string): { success: boolean; message: string } {
  if (!username || !password) {
    return { success: false, message: "请输入用户名和密码" };
  }

  // 从 localStorage 获取用户数据
  const usersStr = localStorage.getItem("users");
  const users: Record<string, { password: string; data: UserData }> = usersStr
    ? JSON.parse(usersStr)
    : {};

  // 检查用户是否存在
  if (users[username]) {
    if (users[username].password === password) {
      // 登录成功
      localStorage.setItem("currentUser", JSON.stringify(users[username].data));
      return { success: true, message: "登录成功" };
    } else {
      return { success: false, message: "密码错误" };
    }
  } else {
    return { success: false, message: "用户不存在" };
  }
}

// 注册
export function register(
  username: string,
  email: string,
  password: string
): { success: boolean; message: string } {
  if (!username || !email || !password) {
    return { success: false, message: "请填写完整信息" };
  }

  if (username.length < 3) {
    return { success: false, message: "用户名至少3个字符" };
  }

  if (password.length < 6) {
    return { success: false, message: "密码至少6个字符" };
  }

  // 简单的邮箱验证
  if (!email.includes("@")) {
    return { success: false, message: "邮箱格式不正确" };
  }

  // 获取现有用户
  const usersStr = localStorage.getItem("users");
  const users: Record<string, { password: string; data: UserData }> = usersStr
    ? JSON.parse(usersStr)
    : {};

  // 检查用户名是否已存在
  if (users[username]) {
    return { success: false, message: "用户名已存在" };
  }

  // 创建新用户
  const newUser: UserData = {
    username,
    email,
    createdAt: new Date().toISOString(),
    skillProgress: {
      completedSkills: [],
      learningSkills: [],
    },
  };

  users[username] = {
    password,
    data: newUser,
  };

  // 保存到 localStorage
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(newUser));

  return { success: true, message: "注册成功" };
}

// 登出
export function logout() {
  localStorage.removeItem("currentUser");
}

// 更新用户技能进度
export function updateUserProgress(
  completedSkills: string[],
  learningSkills: string[]
): boolean {
  const user = getCurrentUser();
  if (!user) return false;

  const usersStr = localStorage.getItem("users");
  if (!usersStr) return false;

  const users: Record<string, { password: string; data: UserData }> = JSON.parse(usersStr);

  if (users[user.username]) {
    users[user.username].data.skillProgress = {
      completedSkills,
      learningSkills,
    };

    // 更新 localStorage
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(users[user.username].data));

    return true;
  }

  return false;
}

// 获取用户技能进度
export function getUserProgress(): {
  completedSkills: string[];
  learningSkills: string[];
} | null {
  if (typeof window === "undefined") return null;

  const userStr = localStorage.getItem("currentUser");
  if (!userStr) return null;

  try {
    const user: UserData = JSON.parse(userStr);
    return user.skillProgress;
  } catch {
    return null;
  }
}

// 检查是否已登录
export function isLoggedIn(): boolean {
  return getCurrentUser() !== null;
}
