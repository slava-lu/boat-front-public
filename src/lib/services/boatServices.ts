import { BASE_URL } from "@/lib/const";
import { Boat, BoatValues } from "@/lib/types";

const boatsUrl = `${BASE_URL}/boats`;

export async function getBoats(): Promise<Boat[]> {
  try {
    const response = await fetch(boatsUrl, {
      next: { cache: "no-store" },
    } as RequestInit & { next: { cache: string } });

    if (!response.ok) {
      console.error(`Failed to fetch boats: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching boats data:", error);
    return [];
  }
}

export async function getBoat(id: string): Promise<Boat> {
  try {
    const response = await fetch(`${boatsUrl}/${id}`, {
      next: { cache: "no-store" },
    } as RequestInit & { next: { cache: string } });

    if (!response.ok) {
      console.error(`Failed to fetch boat: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching boat data:", error);
    throw error;
  }
}

export async function deleteBoat(id: string) {
  try {
    const response = await fetch(`${boatsUrl}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error(`Failed to delete boat: ${response.status}`);
    }
    return response.ok;
  } catch (error) {
    console.error("Error deleting boat:", error);
    return false;
  }
}

export async function addBoat(data: BoatValues): Promise<boolean> {
  try {
    const response = await fetch(boatsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error(`Failed to update boat: ${response.status}`);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error updating boat:", error);
    return false;
  }
}

export async function updateBoat(
  id: string,
  data: BoatValues,
): Promise<boolean> {
  try {
    const response = await fetch(`${boatsUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error(`Failed to update boat: ${response.status}`);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error updating boat:", error);
    return false;
  }
}
