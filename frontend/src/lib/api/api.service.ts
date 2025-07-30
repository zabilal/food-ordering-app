import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import config from '../../../env.config';
import { FoodCategory, FoodItem } from '@/types/food';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: config.api.baseUrl,
      timeout: config.api.timeout,
      headers: config.api.headers,
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        // You can add auth tokens or other headers here
        // const token = localStorage.getItem('authToken');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        // Handle common errors (401, 403, 404, 500, etc.)
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('API Error Response:', {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers,
          });
        } else if (error.request) {
          // The request was made but no response was received
          console.error('API Error Request:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('API Error:', error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  // Generic request method
  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.request<T>(config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle specific error cases if needed
        if (error.response?.status === 401) {
          // Handle unauthorized (e.g., redirect to login)
          // router.push('/login');
        }
      }
      throw error;
    }
  }

  // Food API methods
  public async getFoods(): Promise<FoodItem[]> {
    return this.request<FoodItem[]>({
      method: 'GET',
      url: config.api.endpoints.foods,
    });
  }

  public async getFoodById(id: string): Promise<FoodItem> {
    return this.request<FoodItem>({
      method: 'GET',
      url: config.api.endpoints.foodById(id),
    });
  }

  public async getCategories(): Promise<FoodCategory[]> {
    return this.request<FoodCategory[]>({
      method: 'GET',
      url: config.api.endpoints.categories,
    });
  }

  public async searchFoods(query: string): Promise<FoodItem[]> {
    return this.request<FoodItem[]>({
      method: 'GET',
      url: config.api.endpoints.searchFoods(query),
    });
  }

  public async getFoodsByCategory(categoryId: string): Promise<FoodItem[]> {
    return this.request<FoodItem[]>({
      method: 'GET',
      url: config.api.endpoints.foodsByCategory(categoryId),
    });
  }

  public async createOrder(orderData: OrderData): Promise<Order> {
    return this.request<Order>({
      method: 'POST',
      url: config.api.endpoints.orders,
      data: orderData,
    });
  }

  // Add more API methods as needed
}

// Export a singleton instance
const apiService = new ApiService();
export default apiService;
