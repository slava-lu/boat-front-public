"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Boat } from "@/lib/types";
import Link from "next/link";

export function BoatList({ boats }: { boats: Boat[] }) {
  const [sizeFilter, setSizeFilter] = useState<string>("all");

  const filteredBoats =
    sizeFilter === "all"
      ? boats
      : boats.filter((boat) => boat.boatSize === sizeFilter);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Boats</CardTitle>
        <CardDescription>Manage the boat inventory.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <Label htmlFor="size-filter" className="whitespace-nowrap">
              Filter by size:
            </Label>
            <Select value={sizeFilter} onValueChange={setSizeFilter}>
              <SelectTrigger id="size-filter" className="w-[180px]">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All sizes</SelectItem>
                <SelectItem value="SMALL">Small</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="BIG">Big</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Entry Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBoats.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center h-24 text-muted-foreground"
                  >
                    No boats found
                  </TableCell>
                </TableRow>
              ) : (
                filteredBoats.map((boat) => (
                  <TableRow key={boat.id}>
                    <TableCell className="font-medium">
                      <Link
                        href={`/boat/${boat.id}`}
                        className="text-primary underline"
                      >
                        {boat.name}
                      </Link>
                    </TableCell>
                    <TableCell>{boat.description}</TableCell>
                    <TableCell className="capitalize">
                      {boat.boatSize}
                    </TableCell>
                    <TableCell>{format(boat.createdAt, "PPP")}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
