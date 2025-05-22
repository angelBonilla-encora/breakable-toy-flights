import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { SearchFlightForm } from "../flights/components/SearchFlight/SearchFlightForm";
import { MemoryRouter } from "react-router";
import { store } from "../redux";

describe("SearchFlightForm", () => {
  test("shows and hides Return Date based on flight type", () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <SearchFlightForm />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.queryByLabelText(/return date/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/round trip/i));

    expect(screen.getByLabelText(/return date/i)).toBeInTheDocument();
  });
});
