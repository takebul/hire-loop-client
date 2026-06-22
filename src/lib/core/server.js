import { data, path } from "motion/react-client";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverGet = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);
  // handle 401, 404, 403
  return res.json();
};

export const serverPost = async (path, data) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // handle 401, 401, 403, 500

  return res.json();
};

export const serverPatch = async (path, data) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};
