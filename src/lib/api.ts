// src/lib/api.ts
// --- Day4 新規ファイル ---

import axios from "axios";

// ========================================
// axios インスタンスを作成
// ========================================
// 共通の設定を1箇所にまとめる

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8888",
  // → 全リクエストのベース URL
  headers: {
    "Content-Type": "application/json",
  },
});

// ========================================
// 投稿関連の API
// ========================================

// 投稿一覧を取得
export const getPosts = async (userId?: string) => {
  const url = userId ? `/api/posts?userId=${userId}` : "/api/posts";
  const response = await api.get(url);
  return response.data;
  // → axios は自動で JSON パースしてくれる
};

// 投稿を作成
export const createPost = async (data: {
  content: string;
  imageUrl?: string | null;
  userId: string;
}) => {
  const response = await api.post("/api/posts", data);
  return response.data;
};

// 投稿を削除
export const deletePost = async (id: number) => {
  const response = await api.delete(`/api/posts/${id}`);
  return response.data;
};

// ========================================
// いいね関連の API
// ========================================

// いいねを追加
export const addLike = async (postId: number, userId: string) => {
  const response = await api.post(`/api/posts/${postId}/like`, { userId });
  return response.data;
};

// いいねを削除
export const removeLike = async (postId: number, userId: string) => {
  const response = await api.delete(`/api/posts/${postId}/like`, {
    data: { userId },
    // → DELETE で body を送る場合は data に入れる
  });
  return response.data;
};

export default api;
