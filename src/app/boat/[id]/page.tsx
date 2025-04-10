"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { zodResolver } from "@hookform/resolvers/zod";
import { Boat, BoatDetailPageProps, BoatValues } from "@/lib/types";
import BoatEdit from "@/components/BoatEdit";
import BoatDetails from "@/components/BoatDetails";
import { deleteBoat, getBoat, updateBoat } from "@/lib/services/boatServices";
import { boatSchema } from "@/lib/schemas";

export default function BoatDetailPage({ params }: BoatDetailPageProps) {
  const [boat, setBoat] = useState<Boat | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const { id } = params;
  const [apiError, setApiError] = useState<string | null>(null);

  const form = useForm<BoatValues>({
    resolver: zodResolver(boatSchema),
  });

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const fetchBoatData = async () => {
      try {
        const data = await getBoat(id);
        setBoat(data);
        form.reset({
          name: data.name,
          description: data.description || "",
          boatSize: data.boatSize,
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Failed to fetch boat details.");
        } else {
          setError("Failed to fetch boat details.");
        }
      }
    };

    fetchBoatData();
  }, [id, form]);

  const handleDelete = async () => {
    const success = await deleteBoat(id);
    if (success) {
      router.push("/");
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  async function onSubmit(values: BoatValues) {
    setApiError(null);

    try {
      const success = await updateBoat(id, values);
      if (success) {
        router.refresh();
        setIsEditing(false);
        const updatedBoat = await getBoat(id);
        setBoat(updatedBoat);
      } else {
        setApiError("Failed to update boat.");
      }
    } catch (error) {
      console.error("Error updating boat:", error);
      setApiError("An unexpected error occurred while updating the boat.");
    }
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!boat) {
    return <div>Boat details not found.</div>;
  }

  return (
    <main className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Boat List
          </Button>
        </Link>
      </div>

      {isEditing ? (
        <BoatEdit
          boat={boat}
          form={form}
          onSubmit={onSubmit}
          onCancel={handleCancelEdit}
          apiError={apiError}
        />
      ) : (
        <BoatDetails
          boat={boat}
          onEditClick={handleEditClick}
          onDeleteClick={handleDelete}
        />
      )}
    </main>
  );
}
