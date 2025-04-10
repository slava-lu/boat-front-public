import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Boat } from "@/lib/types";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

type BoatDetailsProps = {
  boat: Boat;
  onEditClick: () => void;
  onDeleteClick: () => Promise<void>;
};

export default function BoatDetails({
  boat,
  onEditClick,
  onDeleteClick,
}: BoatDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{boat.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-3">
          <div className="grid grid-cols-[120px_1fr] gap-2">
            <div className="font-medium">Description:</div>
            <div>{boat.description}</div>
          </div>

          <div className="grid grid-cols-[120px_1fr] gap-2">
            <div className="font-medium">Size:</div>
            <div>
              <Badge
                variant={
                  boat.boatSize === "BIG"
                    ? "default"
                    : boat.boatSize === "MEDIUM"
                      ? "secondary"
                      : "outline"
                }
              >
                {boat.boatSize}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-[120px_1fr] gap-2">
            <div className="font-medium">Entry Date:</div>
            <div>{format(new Date(boat.createdAt), "PPP")}</div>
          </div>
        </div>
      </CardContent>
      <div className="flex justify-end space-x-2 p-4">
        <Button variant="secondary" size="sm" onClick={onEditClick}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Boat
        </Button>
        <Button variant="destructive" size="sm" onClick={onDeleteClick}>
          Delete Boat
        </Button>
      </div>
    </Card>
  );
}
