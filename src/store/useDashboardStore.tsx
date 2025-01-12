import { create } from "zustand";

interface UserStats {
  totalOrders: number;
  revenue: number;
  activeSubscriptions: number;
  lastLoginDate: Date;
}
interface DashboardState {
  // User information
  username: string;
  email: string;
  isLoading: boolean;
  error: string | null;

  // Dashboard statistics
  stats: UserStats;

  // Actions
  setUser: (username: string, email: string) => void;
  updateStats: (newStats: Partial<UserStats>) => void;
  fetchDashboardData: () => Promise<void>;
}

const useDashboardStore = create<DashboardState>((set, get) => ({
  // Initial state
  username: "",
  email: "",
  isLoading: false,
  error: null,

  stats: {
    totalOrders: 0,
    revenue: 0,
    activeSubscriptions: 0,
    lastLoginDate: new Date(),
  },

  // Actions
  setUser: (username, email) => set({ username, email }),

  updateStats: (newStats) =>
    set((state) => ({
      stats: { ...state.stats, ...newStats },
    })),

  fetchDashboardData: async () => {
    set({ isLoading: true, error: null });

    try {
      // Simulate API call
      const response = await new Promise<UserStats>((resolve) =>
        setTimeout(
          () =>
            resolve({
              totalOrders: 150,
              revenue: 15000,
              activeSubscriptions: 45,
              lastLoginDate: new Date(),
            }),
          1000
        )
      );

      set({ stats: response, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch dashboard data", isLoading: false });
    }
  },
}));

export default useDashboardStore;
