import { MemoryRouter } from "react-router-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Battle } from "../../components/pages/Battle";
import { baseURL } from "../testUtils/baseURL";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    workId: 1,
    smallGoalId: 1,
  }),
}));

jest.mock("../../hooks/useLoginUser.ts", () => ({
  useLoginUser: () => ({
    loginUserId: 1,
  }),
}));

jest
  .spyOn(window.HTMLMediaElement.prototype, "play")
  .mockImplementation(jest.fn());

jest
  .spyOn(window.HTMLMediaElement.prototype, "pause")
  .mockImplementation(jest.fn());

const handlers = [
  rest.get(`${baseURL}/fetch/smallgoal/battle/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const smallGoalId = Number(id);
    if (smallGoalId === 1) {
      return res(
        ctx.json({
          small_goal_name: "テスト",
          total_time: 5,
        })
      );
    }
  }),
  rest.get(`${baseURL}/fetch/report/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const userId = Number(id);
    if (userId === 1) {
      return res(
        ctx.json({
          monday: 1,
          tuesday: 1,
          wednesday: 1,
          thursday: 1,
          friday: 1,
          saturday: 1,
          sunday: 1,
        })
      );
    }
  }),
];
const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => {
  server.close();
});

describe("Battleページのテスト", () => {
  beforeEach(async () => {
    await waitFor(() => {
      render(
        <MemoryRouter>
          <Battle />
        </MemoryRouter>
      );
    });
  });
  it("Battleページのrenderテスト", async () => {
    const { getByText } = screen;

    await waitFor(() => {
      expect(getByText("テスト")).toBeTruthy();
      expect(getByText("5h")).toBeTruthy();

      const stopButton = getByText("一時停止");
      expect(stopButton).toBeTruthy();
      userEvent.click(stopButton);

      const battleButton = getByText("たたかう");
      expect(battleButton).toBeTruthy();

      const escapeButton = getByText("にげる");
      expect(escapeButton).toBeTruthy();
      userEvent.click(escapeButton);
      expect(getByText("前のページに戻りますか？"));
    });
  });
});
