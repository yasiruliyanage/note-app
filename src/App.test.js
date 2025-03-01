import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import App from "./App";

describe(App,()=> {
    it("App header displays correct text logo", () => {
        const {getByTestId} = render(<App />);
        const textLogoValue = getByTestId("textLogo").textContent;
        expect(textLogoValue).toEqual("Notes");
    })
})

