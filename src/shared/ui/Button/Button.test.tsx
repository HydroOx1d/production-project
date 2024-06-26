import { render, screen } from "@testing-library/react";
import Button from "@/shared/ui/Button/Button";

describe("Button", () => {
	test("render button", () => {
		render(<Button>TEST</Button>);

		expect(screen.queryByText("TEST")).toBeInTheDocument();
	});
});