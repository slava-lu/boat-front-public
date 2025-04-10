import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import BoatDetailPage from "./page";
import { getBoat } from "@/lib/services/boatServices";

jest.mock("@/lib/services/boatServices");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    refresh: jest.fn(),
  })),
}));

describe("BoatDetailPage", () => {
  it('should render "Boat details not found." if boat data is null', async () => {
    (getBoat as jest.Mock).mockResolvedValue(null);
    const { findByText, asFragment } = render(
      <BoatDetailPage params={{ id: "123" }} />,
    );

    expect(await findByText("Boat details not found.")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
