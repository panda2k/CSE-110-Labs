import { render, screen, fireEvent } from "@testing-library/react";
import { dummyGroceryList } from "./constants";
import { ToDoList } from "./toDoList";

describe("Read StickyNote", () => {
    test("All todolist items can read", () => {
        render(<ToDoList />)
        dummyGroceryList.forEach(n => {
            expect(screen.getByText(n.name)).toBeInTheDocument();
        })
    });
})

describe("Title display", () => {
    test("Sticky note title displays number of checked", () => {
        render(<ToDoList />)
        let checkedItems = 0;
        const toCheck = dummyGroceryList[0];
        expect(screen.getByText(`Items bought: ${checkedItems}`)).toBeInTheDocument();
        fireEvent.click(screen.getByTestId(`check-${toCheck.name}`))
        checkedItems++;
        expect(screen.getByText(`Items bought: ${checkedItems}`)).toBeInTheDocument();
    });
})

