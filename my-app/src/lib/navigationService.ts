import { Page } from "../types";

type NavigatorType = (page: Page) => void;

let navigator: NavigatorType;

const setNavigator = (tmpNavigator: NavigatorType) => [
    (navigator = tmpNavigator),
];

const navigate = (page: Page) => {
    if (!navigator) throw new Error("No navigator!");

    navigator(page);
};

export const NavigationService = {
    setNavigator,
    navigate,
};
