// src/types/common.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}

export interface ProjectFeedback {
  rating: number;
  comment: string;
  userId?: string;
  email?: string;
}

// Use Next.js's built-in context type instead of creating our own
export type NextContext = {
  req?: NextApiRequest;
  res?: NextApiResponse;
} | undefined;
